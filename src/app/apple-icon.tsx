import { ImageResponse } from 'next/og';
import { ribbonDataUri } from '@/lib/brandMark';

// iOS ignores SVG icons when a page is added to the home screen — it wants a
// PNG at apple-touch-icon's 180px. Without this file it rendered a blank tile.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

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
          // iOS masks the tile into a squircle, so the art runs full bleed.
          backgroundImage: 'linear-gradient(135deg, #F0307A 0%, #C81A60 100%)',
        }}
      >
        <img src={ribbonDataUri('#FFFFFF')} width={124} height={124} alt="" />
      </div>
    ),
    { ...size },
  );
}
