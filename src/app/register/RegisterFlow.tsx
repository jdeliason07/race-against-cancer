'use client';

import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { createPaymentIntent } from './actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const stripeAppearance = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#F0307A',
    colorBackground: '#FFFFFF',
    colorText: '#1C1719',
    colorTextSecondary: '#6E5C64',
    colorDanger: '#c81a1a',
    fontFamily: '"Saira", system-ui, sans-serif',
    borderRadius: '14px',
  },
  rules: {
    '.Input': {
      border: '1px solid #ECE2E6',
      boxShadow: 'none',
      padding: '12px 14px',
    },
    '.Input:focus': {
      border: '1px solid #F0307A',
      outline: '2px solid rgba(240,48,122,0.15)',
      boxShadow: 'none',
    },
    '.Label': {
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: '11px',
      color: '#6E5C64',
      marginBottom: '6px',
    },
    '.Error': {
      color: '#c81a1a',
      fontSize: '12px',
    },
  },
};

type Step = 1 | 2 | 3 | 4;
type RaceType = 'half' | '5k' | null;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  emergencyName: string;
  emergencyPhone: string;
}

// Step progress indicator
function StepIndicator({ step }: { step: Step }) {
  const labels = ['Race Selection', 'Athlete Info', 'Payment', 'Confirmation'];
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-body text-xs font-bold uppercase tracking-widest text-ash">
          Step {step} of 4 — {labels[step - 1]}
        </p>
        <p className="font-body text-xs text-ash">{step * 25}%</p>
      </div>
      <div className="flex gap-2">
        {([1, 2, 3, 4] as Step[]).map((s) => (
          <div
            key={s}
            className="h-1.5 flex-1 rounded-pill"
            style={{
              backgroundColor: s <= step ? '#F0307A' : '#ECE2E6',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Step 1 — Race Selection (two buttons only)
function StepRaceSelection({
  raceType,
  setRaceType,
  onNext,
}: {
  raceType: RaceType;
  setRaceType: (r: RaceType) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl uppercase text-ink mb-6">Choose Your Race</h2>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {([
          { key: 'half' as const, label: 'Half Marathon', sub: '13.1 mi' },
          { key: '5k' as const, label: '5K', sub: '3.1 mi' },
        ]).map((race) => (
          <button
            key={race.key}
            type="button"
            onClick={() => setRaceType(race.key)}
            className="rounded-card border-2 p-6 text-left transition-colors duration-150 focus-visible:outline-none"
            style={{
              borderColor: raceType === race.key ? '#F0307A' : '#ECE2E6',
              backgroundColor: raceType === race.key ? '#FDE7F0' : '#FFFFFF',
            }}
          >
            <p className="font-display text-2xl uppercase text-ink">{race.label}</p>
            <p className="font-body text-sm text-ash mt-1">{race.sub}</p>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={raceType === null}
        className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next: Athlete Info
      </button>
    </div>
  );
}

// Step 2 — Athlete Info + Donation + Waiver
function StepAthleteInfo({
  raceType,
  formData,
  setFormData,
  donationAmount,
  setDonationAmount,
  waiverAgreed,
  setWaiverAgreed,
  onNext,
  onBack,
  loading,
}: {
  raceType: RaceType;
  formData: FormData;
  setFormData: (f: FormData) => void;
  donationAmount: number;
  setDonationAmount: (a: number) => void;
  waiverAgreed: boolean;
  setWaiverAgreed: (v: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  loading: boolean;
}) {
  const minDonation = raceType === '5k' ? 49 : 99;
  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canAdvance =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    isEmailValid(formData.email) &&
    formData.phone.trim() &&
    formData.dob.trim() &&
    formData.emergencyName.trim() &&
    formData.emergencyPhone.trim() &&
    donationAmount >= minDonation &&
    waiverAgreed;

  const inputClass =
    'border border-line rounded-card px-4 py-3 font-body text-sm text-ink w-full focus:outline-none focus:border-pink';
  const labelClass =
    'font-body text-xs font-bold uppercase tracking-widest text-ash mb-1 block';

  return (
    <div>
      <h2 className="font-display text-3xl uppercase text-ink mb-6">Athlete Info</h2>

      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label className={labelClass}>First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={update('firstName')}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={update('lastName')}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass}>Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={update('email')}
          className={inputClass}
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass}>Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={update('phone')}
          className={inputClass}
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass}>Date of Birth</label>
        <input
          type="date"
          value={formData.dob}
          onChange={update('dob')}
          className={inputClass}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label className={labelClass}>Emergency Contact Name</label>
          <input
            type="text"
            value={formData.emergencyName}
            onChange={update('emergencyName')}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Emergency Contact Phone</label>
          <input
            type="tel"
            value={formData.emergencyPhone}
            onChange={update('emergencyPhone')}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Donation amount suggestion */}
      <div className="mb-6 rounded-card border border-petal bg-blush p-5">
        <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-ash">
          Donation Amount
        </p>
        <p className="mb-3 font-body text-sm text-ash">
          Minimum ${minDonation} — every dollar goes directly to the cause. Give more if you&rsquo;re able.
        </p>
        <input
          type="number"
          min={minDonation}
          value={donationAmount}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            setDonationAmount(isNaN(val) ? minDonation : val);
          }}
          className="border border-petal rounded-card px-4 py-3 font-body text-sm text-ink w-full focus:outline-none focus:border-pink bg-white"
        />
        {donationAmount < minDonation && (
          <p className="mt-1 font-body text-xs text-red-700">Minimum donation is ${minDonation}</p>
        )}
      </div>

      {/* Waiver */}
      <div className="mb-6">
        <label className={labelClass}>Release &amp; Waiver of Liability</label>
        <div
          className="border border-line rounded-card p-4 font-body text-xs text-ash leading-relaxed"
          style={{ maxHeight: '200px', overflowY: 'scroll' }}
        >
          <p className="mb-3 font-bold uppercase">
            ALL PARTICIPANTS IN THE EVENT AND RELATED EVENTS ARE REQUIRED TO ASSUME ALL RISK OF
            PARTICIPATION BY AGREEING TO THIS RELEASE AT TIME OF ONLINE REGISTRATION OR BY SIGNING
            THIS RELEASE AND WAIVER OF LIABILITY AGREEMENT
          </p>
          <p className="mb-3">
            The undersigned athlete (&ldquo;Athlete&rdquo;) on behalf of himself/herself and on behalf of the
            Athlete&rsquo;s personal representatives, assigns, heirs, executors, hereby fully and forever
            releases, waives, discharges and covenants not to sue Skol Sporting Management, Skol
            Events, the race organizer, management company, individual, and/or municipality associated
            directly or indirectly with this event, including all municipal agencies whose property
            and/or personnel are used and all other sponsoring or co-sponsoring companies or
            individuals related to the event (collectively, &ldquo;Releasees&rdquo;) from all liability to the
            Athlete and his/her personal representatives, assigns, heirs, and executors, for all
            loss(es) or damage(s) and any and all claims or demands therefore, on account of injury to
            the Athlete or property or resulting in the death of an Athlete, whether caused by the
            active or passive negligence of all or any of the Releasees or otherwise, in connection
            with the Athlete&rsquo;s participation in the event. The Athlete represents and warrants that
            he/she is in good physical condition and is able to safely participate in the event. The
            Athlete is fully aware of the risks and hazards inherent in participating in the event and
            hereby elects to voluntarily compete in the event, knowing the risks associated with the
            event, including, without limitation, weather conditions such as high heat and/or humidity,
            wind, hail, rain, snow, flood, traffic and the condition of the road, all such risks being
            known and appreciated by the Athlete. The Athlete hereby assumes all risks of loss(es),
            damage(s), or injury(ies) that may be sustained by him/her while participating in the
            event. The Athlete agrees to the use of his/her name and photograph in broadcasts,
            newspapers, brochures, and other media compensation. The Athlete acknowledges that the
            entry fee is non-refundable and non-transferable. In the event the event is delayed or
            prevented by reason of fire, threatened or actual strike, labor difficulty, work stoppage,
            pandemic, insurrection, war, public disaster, flood, unavoidable casualty, acts of God or
            the elements (including, without limitation, hurricanes, floods, tornadoes and
            earthquakes), or any other cause beyond the control of the race organizer and management,
            there shall be no refund of the entry fee or any other costs of the Athlete in connection
            with the event. The Athlete warrants that all statements made herein are true and correct
            and understands that Releasees have relied on them in allowing the Athlete to participate
            in the Marathon.
          </p>
          <p className="font-bold uppercase">
            BY COMPLETING THE REGISTRATION PROCESS IN ANY FORM (ONLINE, IN-PERSON, MAIL, ETC), THE
            ATHLETE HAS READ THE FOREGOING AND INTENTIONALLY AND VOLUNTARILY AGREES TO THIS RELEASE
            AND WAIVER OF LIABILITY AGREEMENT.
          </p>
        </div>
        <label className="mt-3 flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={waiverAgreed}
            onChange={(e) => setWaiverAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-pink"
          />
          <span className="font-body text-sm text-ink">
            I have read and agree to the Release and Waiver of Liability Agreement
          </span>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="btn-ghost flex-1"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canAdvance || loading}
          className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing…' : 'Next: Payment'}
        </button>
      </div>
    </div>
  );
}

// Inner payment form (must be inside <Elements>)
function PaymentForm({
  raceType,
  formData,
  donationAmount,
  onSuccess,
  onBack,
}: {
  raceType: RaceType;
  formData: FormData;
  donationAmount: number;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    setPaymentError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + '/register' },
      redirect: 'if_required',
    });

    if (paymentIntent?.status === 'succeeded') {
      onSuccess();
    } else if (error) {
      setPaymentError(error.message ?? 'Payment failed. Please try again.');
      setSubmitting(false);
    } else {
      setSubmitting(false);
    }
  };

  const raceLabel = raceType === 'half' ? 'Half Marathon (13.1 mi)' : '5K (3.1 mi)';

  return (
    <div>
      {/* Summary bar */}
      <div className="mb-6 rounded-card border border-line bg-mist p-4">
        <div className="flex flex-wrap gap-x-6 gap-y-1 font-body text-sm text-ink">
          <span>
            <span className="font-bold">Race:</span> {raceLabel}
          </span>
          <span>
            <span className="font-bold">Name:</span> {formData.firstName} {formData.lastName}
          </span>
          <span>
            <span className="font-bold">Donation:</span> ${donationAmount}
          </span>
        </div>
      </div>

      <h2 className="font-display text-3xl uppercase text-ink mb-6">Payment</h2>

      <div className="mb-6">
        <PaymentElement />
      </div>

      {paymentError && (
        <p className="mb-4 rounded-card border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
          {paymentError}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="btn-ghost flex-1"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting || !stripe || !elements}
          className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? 'Processing…' : 'Complete Registration'}
        </button>
      </div>
    </div>
  );
}

// Step 3 — Payment (wrapper that provides Elements context)
function StepPayment({
  clientSecret,
  raceType,
  formData,
  donationAmount,
  onSuccess,
  onBack,
}: {
  clientSecret: string;
  raceType: RaceType;
  formData: FormData;
  donationAmount: number;
  onSuccess: () => void;
  onBack: () => void;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: stripeAppearance }}
    >
      <PaymentForm
        raceType={raceType}
        formData={formData}
        donationAmount={donationAmount}
        onSuccess={onSuccess}
        onBack={onBack}
      />
    </Elements>
  );
}

// Step 4 — Confirmation
function StepConfirmation({
  raceType,
  formData,
  donationAmount,
}: {
  raceType: RaceType;
  formData: FormData;
  donationAmount: number;
}) {
  const raceLabel = raceType === 'half' ? 'Half Marathon (13.1 mi)' : '5K (3.1 mi)';

  return (
    <div className="text-center">
      {/* Success checkmark */}
      <div
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{ backgroundColor: '#FDE7F0' }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F0307A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="font-display text-4xl uppercase text-ink mb-2">You&rsquo;re Registered!</h2>
      <p className="font-body text-base text-ash mb-8">
        Thank you for signing up for Race Against Cancer 2026.
      </p>

      {/* Summary */}
      <div className="mb-8 rounded-card border border-line bg-mist p-6 text-left">
        <dl className="space-y-3 font-body text-sm">
          <div className="flex justify-between">
            <dt className="font-bold uppercase tracking-widest text-ash text-xs">Name</dt>
            <dd className="text-ink">
              {formData.firstName} {formData.lastName}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-bold uppercase tracking-widest text-ash text-xs">Race</dt>
            <dd className="text-ink">{raceLabel}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-bold uppercase tracking-widest text-ash text-xs">Donation</dt>
            <dd className="text-ink font-bold" style={{ color: '#F0307A' }}>
              ${donationAmount}
            </dd>
          </div>
        </dl>
      </div>

      <p className="mb-8 font-body text-sm text-ash">
        Check your email for a receipt from Stripe.
      </p>

      <a href="/" className="btn-primary">
        Back to Home
      </a>
    </div>
  );
}

// Main orchestrator
export function RegisterFlow() {
  const [step, setStep] = useState<Step>(1);
  const [raceType, setRaceType] = useState<RaceType>(null);
  const [donationAmount, setDonationAmount] = useState(99);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    emergencyName: '',
    emergencyPhone: '',
  });
  const [waiverAgreed, setWaiverAgreed] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState<string | null>(null);

  const handleStep2ToStep3 = useCallback(async () => {
    if (!raceType) return;
    setLoadingIntent(true);
    setIntentError(null);
    try {
      const result = await createPaymentIntent({
        raceType,
        amount: donationAmount * 100,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        emergencyName: formData.emergencyName,
        emergencyPhone: formData.emergencyPhone,
      });
      setClientSecret(result.clientSecret);
      setStep(3);
    } catch (err) {
      setIntentError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoadingIntent(false);
    }
  }, [raceType, donationAmount, formData]);

  return (
    <div>
      {step !== 4 && <StepIndicator step={step} />}

      {step === 1 && (
        <StepRaceSelection
          raceType={raceType}
          setRaceType={setRaceType}
          onNext={() => {
            setDonationAmount(raceType === '5k' ? 49 : 99);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <>
          <StepAthleteInfo
            raceType={raceType}
            formData={formData}
            setFormData={setFormData}
            donationAmount={donationAmount}
            setDonationAmount={setDonationAmount}
            waiverAgreed={waiverAgreed}
            setWaiverAgreed={setWaiverAgreed}
            onNext={handleStep2ToStep3}
            onBack={() => setStep(1)}
            loading={loadingIntent}
          />
          {intentError && (
            <p className="mt-4 rounded-card border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
              {intentError}
            </p>
          )}
        </>
      )}

      {step === 3 && clientSecret && (
        <StepPayment
          clientSecret={clientSecret}
          raceType={raceType}
          formData={formData}
          donationAmount={donationAmount}
          onSuccess={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <StepConfirmation
          raceType={raceType}
          formData={formData}
          donationAmount={donationAmount}
        />
      )}
    </div>
  );
}
