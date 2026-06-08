import Link from 'next/link';
import { EVENT_DATE_DISPLAY, COURSE_GPX_URL } from '@/config/site';
import { MapPin, Flag, Clock, Download } from 'lucide-react';
import { CourseMapSection, ElevationChartSection } from '@/components/course/CourseClientSections';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Course | Race Against Cancer 2026',
  description:
    'Run 13.1 miles from Utah Lake to BYU campus along the Provo River Parkway. Nearly flat, fast, and beautiful. Race Against Cancer 2026 — November 7, Provo, Utah.',
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
  { mile: 'Finish',    supplies: 'Full recovery station — water, food, medical' },
];

const stats = [
  { label: 'Distance',       value: '13.1 Miles' },
  { label: 'Elevation Gain', value: '~200 ft' },
  { label: 'Surface',        value: 'Paved trail + city streets' },
  { label: 'Start',          value: 'Utah Lake State Park' },
  { label: 'Finish',         value: 'LaVell Edwards Stadium, BYU' },
  { label: 'Date',           value: EVENT_DATE_DISPLAY },
];

export default function CoursePage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="border-b border-line bg-mist py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">{EVENT_DATE_DISPLAY}</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">The Course</h1>
          <p className="mt-4 font-body text-lg font-semibold text-ash">
            13.1 Miles through the Heart of Provo
          </p>
          <p className="mt-4 mx-auto max-w-2xl font-body text-base text-ash leading-relaxed">
            From the shores of Utah&rsquo;s largest freshwater lake to the shadow of Y Mountain —
            Race Against Cancer takes you on a point-to-point journey along the Provo River
            Parkway. Flat, fast, and stunning in every direction.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-20 space-y-20">

        {/* Stats row */}
        <section>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-card border border-line p-6">
                <dt className="section-label mb-2">{s.label}</dt>
                <dd className="font-display text-xl uppercase text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Start */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <MapPin size={22} className="shrink-0 text-pink" />
            <h2 className="font-display text-3xl uppercase text-ink">
              The Start — Utah Lake State Park
            </h2>
          </div>
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-ash">
            4400 W Center St, Provo, UT 84601
          </p>
          <p className="font-body text-base leading-relaxed text-ash">
            Race morning begins at Utah Lake State Park, perched on the eastern shore of
            Utah&rsquo;s largest freshwater lake. With the Wasatch Range rising ahead of you and
            the open water at your back, there is no more cinematic starting line in Utah Valley.
            The park provides ample parking, restrooms, and staging space for all participants and
            crew. Getting here: Take I-15 to Provo Center Street (Exit 265B) and drive 2.5 miles
            west. Parking is free and abundant.
          </p>
        </section>

        {/* Finish */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <Flag size={22} className="shrink-0 text-pink" />
            <h2 className="font-display text-3xl uppercase text-ink">
              The Finish — BYU Campus, LaVell Edwards Stadium
            </h2>
          </div>
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-ash">
            1700 N Canyon Rd, Provo, UT 84604
          </p>
          <p className="font-body text-base leading-relaxed text-ash">
            Cross the finish line in the shadow of Y Mountain on BYU&rsquo;s iconic north campus.
            The LaVell Edwards Stadium parking area provides massive open space for the finish
            festival, spectator viewing, post-race celebration, and easy pickup. The UVX transit
            line stops directly at BYU Stadium if you prefer to leave your car at the start. The
            finish area will feature post-race food, music, and the Race Against Cancer community
            gathering.
          </p>
        </section>

        {/* Route description */}
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
              stadium finish — Y Mountain directly ahead, the crowd growing louder with every step.
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
          <p className="mb-6 font-body text-sm text-ash">
            Half Marathon — {EVENT_DATE_DISPLAY}
          </p>
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
            Locations subject to confirmation with race director
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
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
