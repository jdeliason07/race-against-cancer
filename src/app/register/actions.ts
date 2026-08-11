'use server';
import Stripe from 'stripe';
import {
  CONTACT_EMAIL,
  EVENT_NAME,
  MIN_DONATION_AMOUNT,
  MIN_DONATION_FUN_RUN,
  REFERRAL_ENABLED,
} from '@/config/site';
import { normalizePhone } from '@/lib/phone';
import { ADULT_AGE, ageOnRaceDay, isPlausibleDob } from '@/lib/utils';
import {
  canonicalEmail,
  findCustomerByEmail,
  getStripe,
  isRegistered,
} from '@/lib/stripeRegistration';

// A 'use server' module may only export async functions, so anything shared
// beyond the actions themselves has to live outside this file.
const WAIVER_VERSION = '2026-v2';

interface RegistrationInput {
  raceType: string;
  bandanaColor: string;
  amount: number; // in cents, e.g. 9900 for $99
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  emergencyName: string;
  emergencyPhone: string;
  guardianName: string; // required when the athlete is under 18 on race day
  waiverAgreed: boolean;
  referredByName: string; // full name of whoever referred them; '' when nobody
}

/**
 * Attaches the athlete to a Stripe Customer so registrations show up on the
 * Customers page — with a real phone number on the record — instead of living
 * only inside PaymentIntent metadata. Reuses the customer created when they
 * joined the waitlist, if there is one.
 */
async function upsertAthleteCustomer(
  stripe: Stripe,
  existing: Stripe.Customer | null,
  data: RegistrationInput,
  phone: string,
): Promise<Stripe.Customer> {
  const name = `${data.firstName.trim()} ${data.lastName.trim()}`;

  if (existing) {
    // A partial metadata update merges, so this preserves the waitlist `source`.
    return stripe.customers.update(existing.id, {
      name,
      phone,
      metadata: { event: EVENT_NAME, startedRegistrationAt: new Date().toISOString() },
    });
  }

  return stripe.customers.create({
    email: canonicalEmail(data.email),
    name,
    phone,
    description: `Registration — ${EVENT_NAME}`,
    metadata: {
      source: 'registration-form',
      event: EVENT_NAME,
      startedRegistrationAt: new Date().toISOString(),
    },
  });
}

export async function createPaymentIntent(
  registrationData: RegistrationInput,
): Promise<{ clientSecret: string; paymentIntentId: string } | { error: string }> {
  const stripe = getStripe();
  if (!stripe) {
    return { error: 'Payment is not configured yet. Please contact the race organizer.' };
  }

  // The waiver checkbox is enforced in the browser, but this action is
  // reachable by direct POST — so the release is only valid if the server
  // both receives the agreement and records what was actually agreed to.
  if (registrationData.waiverAgreed !== true) {
    return { error: 'You must accept the Release and Waiver of Liability to register.' };
  }

  const phone = normalizePhone(registrationData.phone);
  if (!phone) {
    return { error: 'Enter a valid phone number, e.g. (555) 123-4567.' };
  }
  const emergencyPhone = normalizePhone(registrationData.emergencyPhone);
  if (!emergencyPhone) {
    return { error: 'Enter a valid emergency contact phone number.' };
  }

  if (!isPlausibleDob(registrationData.dob)) {
    return { error: 'Enter a valid date of birth.' };
  }
  const age = ageOnRaceDay(registrationData.dob)!;
  const isMinor = age < ADULT_AGE;
  if (isMinor && !registrationData.guardianName.trim()) {
    return {
      error:
        'Athletes under 18 on race day need a parent or legal guardian to accept the waiver on their behalf.',
    };
  }

  // Enforce minimum on the server — UI minimum can be bypassed
  const minCents =
    (registrationData.raceType === 'fun-run' ? MIN_DONATION_FUN_RUN : MIN_DONATION_AMOUNT) * 100;
  if (registrationData.amount < minCents) {
    return {
      error: `Minimum donation for this event is $${minCents / 100}. Please increase your donation amount.`,
    };
  }

  try {
    const existingCustomer = await findCustomerByEmail(stripe, registrationData.email);
    if (existingCustomer && isRegistered(existingCustomer)) {
      return {
        error: `This email address is already registered. Email ${CONTACT_EMAIL} if you need to change your registration.`,
      };
    }

    const customer = await upsertAthleteCustomer(
      stripe,
      existingCustomer,
      registrationData,
      phone,
    );

    // Just a name — there's nobody to look up and nothing to validate, so the
    // weekly report groups these by name and you decide what counts.
    const referredByName = REFERRAL_ENABLED
      ? registrationData.referredByName.trim().replace(/\s+/g, ' ').slice(0, 100)
      : '';

    const intent = await stripe.paymentIntents.create({
      amount: registrationData.amount,
      currency: 'usd',
      customer: customer.id,
      // Enables card + wallet methods (Google Pay / Apple Pay / Link) that are
      // turned on in the Stripe Dashboard, so the Express Checkout button works.
      automatic_payment_methods: { enabled: true },
      receipt_email: canonicalEmail(registrationData.email),
      description: `${EVENT_NAME} — ${registrationData.raceType}`,
      metadata: {
        event: EVENT_NAME,
        raceType: registrationData.raceType,
        bandanaColor: registrationData.bandanaColor,
        firstName: registrationData.firstName.trim(),
        lastName: registrationData.lastName.trim(),
        email: canonicalEmail(registrationData.email),
        phone,
        dob: registrationData.dob,
        ageOnRaceDay: String(age),
        isMinor: String(isMinor),
        guardianName: isMinor ? registrationData.guardianName.trim() : '',
        emergencyName: registrationData.emergencyName.trim(),
        emergencyPhone,
        waiverAgreed: 'true',
        waiverAgreedBy: isMinor ? registrationData.guardianName.trim() : 'athlete',
        waiverAgreedAt: new Date().toISOString(),
        waiverVersion: WAIVER_VERSION,
        // Copied onto the customer by the webhook, so a referral only counts
        // once the payment actually succeeds.
        referredByName,
      },
    });

    return { clientSecret: intent.client_secret!, paymentIntentId: intent.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error creating payment.';
    return { error: message };
  }
}
