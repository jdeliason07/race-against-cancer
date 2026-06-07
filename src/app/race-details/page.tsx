import {
  EVENT_DATE_DISPLAY, HALF_START_TIME, FIVE_K_START_TIME,
  EVENT_LOCATION_NAME, EVENT_LOCATION_ADDRESS, EVENT_LOCATION_MAPS_URL,
  PACKET_PICKUP_DATE, PACKET_PICKUP_TIME, PACKET_PICKUP_LOCATION,
  EVENT_COURSE_MAP_URL, REGISTRATION_URL
} from '@/config/site';
import { MapPin, Clock, Package, Car, Droplets, Info } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Race Details',
  description: `Course info, start times, packet pickup, and logistics for Race Against Cancer 2026 on ${EVENT_DATE_DISPLAY}.`,
};

const details = [
  {
    icon: Clock,
    title: 'Start Times',
    content: `Half Marathon: ${HALF_START_TIME}\n5K: ${FIVE_K_START_TIME}`,
    link: undefined as string | undefined,
    linkLabel: undefined as string | undefined,
  },
  {
    icon: MapPin,
    title: 'Location',
    content: `${EVENT_LOCATION_NAME}\n${EVENT_LOCATION_ADDRESS}`,
    link: EVENT_LOCATION_MAPS_URL,
    linkLabel: 'Get Directions',
  },
  {
    icon: Package,
    title: 'Packet Pickup',
    content: `${PACKET_PICKUP_DATE}\n${PACKET_PICKUP_TIME}\n${PACKET_PICKUP_LOCATION}`,
    link: undefined as string | undefined,
    linkLabel: undefined as string | undefined,
  },
  {
    icon: Car,
    title: 'Parking',
    content: '[[REPLACE: Parking details — lots, streets, shuttle info.]]',
    link: undefined as string | undefined,
    linkLabel: undefined as string | undefined,
  },
  {
    icon: Droplets,
    title: 'Aid Stations',
    content: '[[REPLACE: Number of aid stations, mile markers, what\'s offered — water, electrolytes, medical.]]',
    link: undefined as string | undefined,
    linkLabel: undefined as string | undefined,
  },
  {
    icon: Info,
    title: 'What to Expect',
    content: '[[REPLACE: Race-day flow — check-in, bag drop, corrals, finish line, post-race area.]]',
    link: undefined as string | undefined,
    linkLabel: undefined as string | undefined,
  },
];

export default function RaceDetailsPage() {
  return (
    <div className="bg-paper">
      <section className="bg-mist py-20 border-b border-line">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="section-label mb-4">Saturday, November 7, 2026</p>
          <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">Race Details</h1>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {details.map((d) => (
            <div key={d.title} className="rounded-card border border-line bg-paper p-8">
              <div className="mb-4 flex items-center gap-3">
                <d.icon size={20} className="text-pink shrink-0" aria-hidden="true" />
                <h2 className="font-display text-xl uppercase text-ink">{d.title}</h2>
              </div>
              <p className="font-body text-sm text-ash whitespace-pre-line leading-relaxed">
                {d.content}
              </p>
              {d.link && !d.link.includes('[[') && (
                <a
                  href={d.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-body text-xs font-bold uppercase tracking-widest text-pink hover:text-raspberry transition-colors"
                >
                  {d.linkLabel} →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Course map placeholder */}
        <section className="mt-16">
          <h2 className="font-display text-3xl uppercase text-ink mb-8">Course Map</h2>
          {EVENT_COURSE_MAP_URL && !EVENT_COURSE_MAP_URL.includes('[[') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={EVENT_COURSE_MAP_URL}
              alt="Race course map"
              className="w-full rounded-card border border-line"
            />
          ) : (
            <div className="flex h-64 items-center justify-center rounded-card border-2 border-dashed border-petal bg-mist">
              <p className="font-body text-sm text-ash text-center px-6">
                [[REPLACE: Add EVENT_COURSE_MAP_URL in site.ts, or embed a map here.]]
              </p>
            </div>
          )}
        </section>

        <div className="mt-16 text-center">
          <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
}
