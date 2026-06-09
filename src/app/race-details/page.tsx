import {
  EVENT_NAME, EVENT_DATE_DISPLAY, TEN_K_START_TIME, FIVE_K_START_TIME,
  EVENT_LOCATION_ADDRESS, EVENT_DATE_ISO,
  FINISH_LOCATION_NAME, FINISH_LOCATION_ADDRESS,
  FIVE_K_LOCATION_NAME, FIVE_K_LOCATION_ADDRESS,
  SHUTTLE_LOCATION,
  PACKET_PICKUP_DATE, PACKET_PICKUP_TIME, PACKET_PICKUP_LOCATION,
  COURSE_GPX_URL, SITE_URL, ORG_NAME,
} from '@/config/site';
import { MapPin, Clock, Package, Download, Flag, Bus } from 'lucide-react';
import Link from 'next/link';
import { CourseMapSection, ElevationChartSection } from '@/components/course/CourseClientSections';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Race Details',
  description: `Course info, start times, packet pickup, and logistics for Race Against Cancers 2026 on ${EVENT_DATE_DISPLAY}.`,
};

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: EVENT_NAME,
  startDate: EVENT_DATE_ISO,
  location: {
    '@type': 'Place',
    name: FINISH_LOCATION_NAME,
    address: {
      '@type': 'PostalAddress',
      streetAddress: FINISH_LOCATION_ADDRESS,
      addressLocality: 'Provo',
      addressRegion: 'UT',
      addressCountry: 'US',
    },
  },
  organizer: { '@type': 'Organization', name: ORG_NAME },
  url: `${SITE_URL}/race-details`,
};

const waves = [
  { wave: 'Wave 1', time: '7:00 AM', pace: 'Sub-8:00 min/mile' },
  { wave: 'Wave 2', time: '7:05 AM', pace: '8:00–10:00 min/mile' },
  { wave: 'Wave 3', time: '7:10 AM', pace: '10:00+ min/mile / run-walkers' },
];

const aidStations = [
  { mile: 'Mile 2',    supplies: 'Water + sports drink' },
  { mile: 'Mile 4',    supplies: 'Water + sports drink' },
  { mile: 'Finish',    supplies: 'Full recovery station — water, sports drink, and food' },
];

export default function RaceDetailsPage() {
  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      <section className="bg-mist py-20 border-b border-line">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">{EVENT_DATE_DISPLAY}</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">Race Details</h1>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-20 space-y-20">

        {/* Logistics summary */}
        <section>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-card border border-line p-6">
              <div className="mb-2 flex items-center gap-2">
                <Clock size={16} className="text-pink shrink-0" aria-hidden="true" />
                <dt className="section-label">Start Times</dt>
              </div>
              <dd className="font-body text-sm text-ink leading-relaxed">
                10K: {TEN_K_START_TIME}<br />
                5K: {FIVE_K_START_TIME}
              </dd>
            </div>

            <div className="rounded-card border border-line p-6">
              <div className="mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-pink shrink-0" aria-hidden="true" />
                <dt className="section-label">10K Start</dt>
              </div>
              <dd className="font-body text-sm text-ink leading-relaxed">
                N Canyon Road, Provo<br />
                <span className="text-ash text-xs">{EVENT_LOCATION_ADDRESS}</span>
              </dd>
            </div>

            <div className="rounded-card border border-line p-6">
              <div className="mb-2 flex items-center gap-2">
                <Flag size={16} className="text-pink shrink-0" aria-hidden="true" />
                <dt className="section-label">Finish Line</dt>
              </div>
              <dd className="font-body text-sm text-ink leading-relaxed">
                {FINISH_LOCATION_NAME}<br />
                <span className="text-ash text-xs">{FINISH_LOCATION_ADDRESS}</span>
              </dd>
            </div>

            <div className="rounded-card border border-line p-6">
              <div className="mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-pink shrink-0" aria-hidden="true" />
                <dt className="section-label">5K Start & Finish</dt>
              </div>
              <dd className="font-body text-sm text-ink leading-relaxed">
                {FIVE_K_LOCATION_NAME}<br />
                <span className="text-ash text-xs">{FIVE_K_LOCATION_ADDRESS}</span>
              </dd>
            </div>

            <div className="rounded-card border border-line p-6">
              <div className="mb-2 flex items-center gap-2">
                <Bus size={16} className="text-pink shrink-0" aria-hidden="true" />
                <dt className="section-label">10K Shuttle</dt>
              </div>
              <dd className="font-body text-sm text-ink leading-relaxed">
                Free shuttle to the 10K start<br />
                <span className="text-ash text-xs">{SHUTTLE_LOCATION}</span>
              </dd>
            </div>

            <div className="rounded-card border border-line p-6">
              <div className="mb-2 flex items-center gap-2">
                <Package size={16} className="text-pink shrink-0" aria-hidden="true" />
                <dt className="section-label">Packet Pickup</dt>
              </div>
              <dd className="font-body text-sm text-ink leading-relaxed whitespace-pre-line">
                {PACKET_PICKUP_DATE}{PACKET_PICKUP_TIME ? `\n${PACKET_PICKUP_TIME}` : ''}{PACKET_PICKUP_LOCATION ? `\n${PACKET_PICKUP_LOCATION}` : ''}
                {'\n'}Includes: race bib + bandana
              </dd>
            </div>
          </dl>
        </section>

        {/* 10K Route */}
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">The 10K Course</h2>
          <div className="space-y-4 font-body text-base leading-relaxed text-ash">
            <p>
              The 10K is a point-to-point, predominantly downhill course that drops approximately
              284 feet over 6.2 miles through Provo, Utah. With only one turn on the entire
              course, it is one of the cleanest and most runnable 10K routes in the state.
            </p>
            <p>
              Runners start on North Canyon Road near the mouth of Provo Canyon, at an elevation
              of approximately 4,788 feet. From there the course makes a single left turn onto
              University Avenue (US-189) and follows it straight south through Provo. The
              consistent, gentle downhill grade makes this course fast for all paces.
            </p>
            <p>
              The finish line sits at the intersection of University Avenue and Center Street in
              downtown Provo, in front of the Utah County Courthouse, at an elevation of
              4,504 feet. The final stretch is lined with spectators as runners pour into
              the heart of downtown.
            </p>
            <div className="rounded-card border border-petal bg-blush p-5 mt-4">
              <p className="font-body text-sm font-bold uppercase tracking-widest text-pink mb-2">Shuttle required — 10K</p>
              <p className="font-body text-sm text-ash">
                Because the 10K is point-to-point, a free shuttle takes runners from the finish
                area to the start. Buses depart from <strong className="text-ink">Provo Towne Centre Mall</strong> beginning
                at approximately 5:15 AM. Plan to arrive by 5:00 AM. Do not be late — the shuttle
                schedule is fixed.
              </p>
            </div>
          </div>
        </section>

        {/* 5K Route */}
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">The 5K Course</h2>
          <div className="space-y-4 font-body text-base leading-relaxed text-ash">
            <p>
              The 5K is a flat, out-and-back loop starting and finishing at the Riverwoods
              Shopping Center (Vivint Corporate Offices, 4931 N 300 W, Provo). No shuttle is
              required — parking is available in the UCCU Credit Union lot at 360 W 4800 N.
            </p>
            <p>
              The course winds through the Riverwoods complex and onto the paved Provo River Trail,
              following the river south before looping back through the neighborhood to the finish.
              Net elevation change is essentially zero — a fast, flat course suitable for all levels.
            </p>
          </div>
        </section>

        {/* Elevation profile */}
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">10K Elevation Profile</h2>
          <ElevationChartSection />
        </section>

        {/* Map */}
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">10K Course Map</h2>
          <CourseMapSection />
          <div className="mt-4 flex flex-wrap gap-3">
            {COURSE_GPX_URL ? (
              <a
                href={COURSE_GPX_URL}
                download
                className="btn-ghost inline-flex items-center gap-2 text-xs"
              >
                <Download size={14} /> Download Course GPX
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-pill border border-line px-5 py-3 font-body text-xs font-bold uppercase tracking-widest text-ash opacity-50 cursor-not-allowed">
                <Download size={14} /> GPX Coming Soon
              </span>
            )}
            <a
              href="https://maps.google.com/?q=N+Canyon+Rd,+Provo,+UT+84604"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-xs"
            >
              <MapPin size={14} /> Directions to 10K Start
            </a>
            <a
              href="https://maps.google.com/?q=4931+N+300+W,+Provo,+UT+84604"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2 text-xs"
            >
              <MapPin size={14} /> Directions to 5K Start
            </a>
          </div>
        </section>

        {/* Wave starts */}
        <section>
          <div className="mb-2 flex items-center gap-3">
            <Clock size={22} className="shrink-0 text-pink" />
            <h2 className="font-display text-3xl uppercase text-ink">Wave Starts</h2>
          </div>
          <p className="mb-6 font-body text-sm text-ash">10K — {EVENT_DATE_DISPLAY}</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse font-body text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-6 text-left text-xs font-bold uppercase tracking-widest text-ash">Wave</th>
                  <th className="py-3 pr-6 text-left text-xs font-bold uppercase tracking-widest text-ash">Time</th>
                  <th className="py-3 text-left text-xs font-bold uppercase tracking-widest text-ash">Pace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {waves.map((w) => (
                  <tr key={w.wave}>
                    <td className="py-4 pr-6 font-display text-lg uppercase text-ink">{w.wave}</td>
                    <td className="py-4 pr-6 font-body text-base text-ink">{w.time}</td>
                    <td className="py-4 font-body text-base text-ash">{w.pace}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Aid stations */}
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">Aid Stations</h2>
          <p className="mb-4 font-body text-xs font-bold uppercase tracking-widest text-ash">
            10K — locations subject to confirmation
          </p>
          <div className="space-y-0">
            {aidStations.map((a, i) => (
              <div key={a.mile} className="flex items-start gap-4 py-4 border-b border-line last:border-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink font-display text-xs text-white">
                  {i + 1}
                </div>
                <div>
                  <p className="font-display text-base uppercase text-ink">{a.mile}</p>
                  <p className="font-body text-sm text-ash">{a.supplies}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-4">
          <Link href="/register" className="btn-primary">Register</Link>
        </div>
      </div>
    </div>
  );
}
