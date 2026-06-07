'use client';
import { useEffect, useState } from 'react';
import { EVENT_DATE_ISO, EVENT_DATE_DISPLAY } from '@/config/site';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = new Date(EVENT_DATE_ISO).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Pad({ n }: { n: number }) {
  return <>{String(n).padStart(2, '0')}</>;
}

export function Countdown() {
  const [t, setT] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setT(getTimeLeft());
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) return null; // avoid hydration mismatch

  const units = [
    { label: 'Days',    value: t.days },
    { label: 'Hours',   value: t.hours },
    { label: 'Minutes', value: t.minutes },
    { label: 'Seconds', value: t.seconds },
  ];

  return (
    <div className="text-center" aria-label={`Countdown to ${EVENT_DATE_DISPLAY}`}>
      <p className="section-label mb-6">Race day countdown</p>
      <div className="flex items-center justify-center gap-3 md:gap-6" role="timer" aria-live="off">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-3 md:gap-6">
            <div className="text-center">
              <div className="font-display text-5xl leading-none text-ink md:text-7xl lg:text-8xl">
                <Pad n={u.value} />
              </div>
              <div className="mt-2 font-body text-xs font-bold uppercase tracking-widest text-ash">
                {u.label}
              </div>
            </div>
            {i < units.length - 1 && (
              <span className="font-display text-4xl text-petal md:text-6xl" aria-hidden="true">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
