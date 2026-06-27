import { ImageResponse } from 'next/og';
import { BRAND_NAME, BRAND_TAGLINE } from '@/config/site';

export const alt = 'Sunny Tides — hand-dyed totes and beach-day goods';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#D7ECF0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Sun stamp */}
        <svg width="160" height="150" viewBox="0 0 100 90">
          {Array.from({ length: 9 }).map((_, i) => {
            const a = Math.PI + (i / 8) * Math.PI;
            return (
              <line
                key={i}
                x1={50 + Math.cos(a) * 22}
                y1={52 + Math.sin(a) * 22}
                x2={50 + Math.cos(a) * 30}
                y2={52 + Math.sin(a) * 30}
                stroke="#F7DF75"
                strokeWidth={3.2}
                strokeLinecap="round"
              />
            );
          })}
          <path d="M30 52 A20 20 0 0 1 70 52 Z" fill="#F7DF75" />
          <path d="M14 64 q9 -7 18 0 t18 0 t18 0" fill="none" stroke="#173A47" strokeWidth={3.4} strokeLinecap="round" />
          <path d="M14 76 q9 -7 18 0 t18 0 t18 0" fill="none" stroke="#173A47" strokeWidth={3.4} strokeLinecap="round" />
        </svg>

        <div style={{ display: 'flex', marginTop: 28, fontSize: 92, fontWeight: 700, color: '#173A47', letterSpacing: '-0.02em' }}>
          {BRAND_NAME}
        </div>
        <div style={{ display: 'flex', marginTop: 8, fontSize: 30, color: '#3D96E0', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
          {BRAND_TAGLINE}
        </div>
      </div>
    ),
    { ...size },
  );
}
