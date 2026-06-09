import {
  EVENT_DATE_DISPLAY, HALF_START_TIME, FIVE_K_START_TIME,
  EVENT_LOCATION_ADDRESS, EVENT_DATE_ISO,
  PACKET_PICKUP_DATE, PACKET_PICKUP_TIME, PACKET_PICKUP_LOCATION,
  COURSE_GPX_URL, SITE_URL,
} from '@/config/site';
import { MapPin, Clock, Package, Download, Flag } from 'lucide-react';
import Link from 'next/link';
import { CourseMapSection, ElevationChartSection } from '@/components/course/CourseClientSections';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Race Details',
  description: `Course info, start times, packet pickup, and logistics for Race Against Cancer 2026 on ${EVENT_DATE_DISPLAY}.`,
};

const waves = [
  { wave: 'Wave 1', time: '8:00 AM', pace: 'Sub-9:00 min/mile' },
  { wave: 'Wave 2', time: '8:05 AM', pace: '9:00–11:00 min/mile' },
  { wave: 'Wave 3', time: '8:10 AM', pace: '11:00–13:00 min/mile' },
  { wave: 'Wave 4', time: '8:15 AM', pace: '13:00+ min/mile / run-walkers' },
];

const aidStations = [
  { mile: 'Mile 3',    supplies: 'Water + electrolytes' },
  { mile: 'Mile 6',    supplies: 'Water + electrolytes' },
  { mile: 'Mile 9',    supplies: 'Water + electrolytes' },
  { mile: 'Mile 11.5', supplies: 'Water + electrolytes' },
  { mile: 'Finish',    supplies: 'Full recovery station — water and food' },
];

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Race Against Cancer 2026',
  startDate: EVENT_DATE_ISO,
  location: {
    '@type': 'Place',
    name: 'Utah Lake State Park',
    address: {
      '@type': 'PostalAddress',
      streetAddress: EVENT_LOCATION_ADDRESS,
      addressLocality: 'Provo',
      addressRegion: 'UT',
      addressCountry: 'US',
    },
  },
  url: `${SITE_URL}/race-details`,
};

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
                Half Marathon: 8:00 AM (Wave 1) · 8:05 (W2) · 8:10 (W3) · 8:15 (W4)<br />
                5K: {FIVE_K_START_TIME}
              </dd>
            </div>
            <div className="rounded-card border border-line p-6">
              <div className="mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-pink shrink-0" aria-hidden="true" />
                <dt className="section-label">Start Location</dt>
              </div>
              <dd className="font-body text-sm text-ink leading-relaxed">
                Utah Lake State Park<br />{EVENT_LOCATION_ADDRESS}
              </dd>
            </div>
            <div className="rounded-card border border-line p-6">
              <div className="mb-2 flex items-center gap-2">
                <Flag size={16} className="text-pink shrink-0" aria-hidden="true" />
                <dt className="section-label">Finish Location</dt>
              </div>
              <dd className="font-body text-sm text-ink leading-relaxed">
                LaVell Edwards Stadium<br />BYU Campus, Provo, UT
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

        {/* The Route */}
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">The Route</h2>
          <div className="space-y-4 font-body text-base leading-relaxed text-ash">
            <p>
              Race Against Cancer follows the Provo River Parkway — one of Utah Valley&rsquo;s
              most beloved multi-use trails — for the majority of its 13.1 miles. The course is
              nearly flat throughout, making it accessible to first-time half marathoners while
              rewarding experienced runners with a fast, PR-friendly surface.
            </p>
            <p>
              The race departs Utah Lake State Park and immediately picks up the paved Parkway
              trail, winding northeast through cottonwood groves and riverside parks as the river
              narrows and the Wasatch Mountains fill the horizon ahead. Through the heart of
              Provo, the trail passes through a corridor of neighborhood parks and green space,
              largely shielded from traffic, with mountain views opening and closing through the
              tree canopy.
            </p>
            <p>
              After approximately 8 miles, the course threads through north Provo and onto the BYU
              campus perimeter, where the final miles deliver a long, open stretch toward the
              stadium finish — Y Mountain directly ahead.
            </p>
          </div>
        </section>

        {/* Elevation profile */}
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">Elevation Profile</h2>
          <ElevationChartSection />
        </section>

        {/* Map */}
        <section>
          <h2 className="mb-6 font-display text-3xl uppercase text-ink">Course Map</h2>
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
              href="https://maps.google.com/?q=Utah+Lake+State+Park,+4400+W+Center+St,+Provo,+UT+84601"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-xs"
            >
              <MapPin size={14} /> Get Directions to Start
            </a>
          </div>
        </section>

        {/* Wave starts */}
        <section>
          <div className="mb-2 flex items-center gap-3">
            <Clock size={22} className="shrink-0 text-pink" />
            <h2 className="font-display text-3xl uppercase text-ink">Wave Starts</h2>
          </div>
          <p className="mb-6 font-body text-sm text-ash">Half Marathon — {EVENT_DATE_DISPLAY}</p>
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
            Locations subject to confirmation
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
          <Link href="/register" className="btn-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
