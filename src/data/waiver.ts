import {
  CHARITY_NAME,
  ORG_NAME,
  ORG_SHORT_NAME,
  REGISTRATION_TRANSFER_DEADLINE,
} from '@/config/site';

/**
 * Version stamped onto every registration in Stripe metadata alongside
 * `waiverAgreedBy` / `waiverAgreedAt`, so we can always tell which wording a
 * given athlete actually accepted.
 *
 * Bump this ONLY when the waiver text below changes in substance. Existing
 * Stripe records keep whatever version they were signed under — changing the
 * string retroactively would misattribute what those people agreed to.
 */
export const WAIVER_VERSION = '2026-v2';

export interface WaiverParagraph {
  text: string;
  /** Rendered bold + uppercase — the opening notice and the closing assent. */
  emphasis?: boolean;
}

export const WAIVER_TITLE = 'Release & Waiver of Liability';

/**
 * The single source of truth for the waiver. Rendered in two places:
 * the scroll box inside the registration form (`RegisterFlow`) and the public
 * `/terms` page. Keeping it here means the text someone reads before
 * registering is provably the same text they accept during registration.
 */
export const WAIVER_PARAGRAPHS: WaiverParagraph[] = [
  {
    emphasis: true,
    text: `ALL PARTICIPANTS IN THE ${ORG_SHORT_NAME.toUpperCase()} 10K & FUN RUN AND RELATED EVENTS ARE REQUIRED TO ASSUME ALL RISKS OF PARTICIPATION BY AGREEING TO THIS RELEASE AND WAIVER OF LIABILITY AGREEMENT AT THE TIME OF ONLINE REGISTRATION.`,
  },
  {
    text: `In consideration of being permitted to participate in the ${ORG_SHORT_NAME} 10K & Fun Run (the “Event”), the undersigned athlete (“Athlete”), on behalf of himself/herself and the Athlete’s personal representatives, heirs, executors, and assigns, hereby fully and forever releases, waives, discharges, and covenants not to sue ${ORG_NAME}, its officers, directors, employees, agents, and volunteers; ${CHARITY_NAME}; all sponsors and co-sponsors of the Event; Provo City, Utah County, the State of Utah, and any other municipality or government agency whose property and/or personnel are used in connection with the Event; and all timing, logistics, and other vendors providing services to the Event (collectively, the “Releasees”) from any and all liability, claims, demands, losses, or damages on account of injury to the Athlete or the Athlete’s property, or resulting in the death of the Athlete, whether caused by the active or passive negligence of any of the Releasees or otherwise, arising out of or in connection with the Athlete’s participation in the Event.`,
  },
  {
    text: `The Athlete represents and warrants that he/she is in good physical condition and is able to safely participate in the Event. The Athlete is fully aware of the risks and hazards inherent in running a road race, including, without limitation: falls; contact with other participants, spectators, or vehicles; the condition of the road and course; transportation to and from the event; and weather conditions such as heat, cold, wind, rain, snow, or ice. The Athlete voluntarily elects to participate knowing these risks and hereby assumes all risk of loss, damage, or injury that may be sustained while participating in the Event. The Athlete authorizes Event personnel to obtain or provide emergency medical treatment on his/her behalf if needed, and agrees to be responsible for the cost of any such treatment.`,
  },
  {
    text: `The Athlete grants ${ORG_NAME} permission to use his/her name, image, voice, and likeness in photographs, video, broadcasts, and other media for purposes of promoting the Event, without compensation.`,
  },
  {
    text: `The Athlete acknowledges that the registration payment is a charitable donation benefiting ${CHARITY_NAME} and is non-refundable. A registration may be transferred to another participant until ${REGISTRATION_TRANSFER_DEADLINE} by contacting the Event organizers; no transfers will be processed after that date. If the Event is delayed, modified, or canceled by reason of fire, strike, work stoppage, pandemic, insurrection, war, public disaster, flood, unavoidable casualty, extreme weather, acts of God, or any other cause beyond the control of ${ORG_NAME}, there shall be no refund of the donation or any other costs incurred by the Athlete in connection with the Event.`,
  },
  {
    text: `If the Athlete is under 18 years of age, this agreement must be accepted by the Athlete’s parent or legal guardian, who agrees to its terms on the minor’s behalf. This agreement is governed by the laws of the State of Utah. If any portion of this agreement is held invalid, the remainder shall continue in full force and effect. The Athlete warrants that all statements made during registration are true and correct and understands that the Releasees have relied on them in permitting the Athlete to participate in the Event.`,
  },
  {
    emphasis: true,
    text: `BY COMPLETING THE REGISTRATION PROCESS, THE ATHLETE (OR THE ATHLETE’S PARENT OR LEGAL GUARDIAN) HAS READ THE FOREGOING AND INTENTIONALLY AND VOLUNTARILY AGREES TO THIS RELEASE AND WAIVER OF LIABILITY AGREEMENT.`,
  },
];
