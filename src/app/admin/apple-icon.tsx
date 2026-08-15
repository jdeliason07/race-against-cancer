import { ImageResponse } from 'next/og';
import { ribbonDataUri } from '@/lib/brandMark';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// The signed-out gate makes /admin render per request; the icon is the same
// picture every time, so it is built once instead of inheriting that.
export const dynamic = 'force-static';

/** Same mark as the public tile, inverted — on a home screen full of pink the
 *  organiser console reads as its own app at a glance. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(135deg, #2E2429 0%, #1C1719 100%)',
        }}
      >
        <img src={ribbonDataUri('#F0307A')} width={124} height={124} alt="" />
      </div>
    ),
    { ...size },
  );
}
