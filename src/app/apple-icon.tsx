import { ImageResponse } from 'next/og';

// iOS ignores SVG icons when a page is added to the home screen — it wants a
// PNG at apple-touch-icon's 180px. Without this file it rendered a blank tile.
// One tile covers the whole site, /admin included.
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
          background: '#FFFFFF',
        }}
      >
        {/* The pink rule the site already uses as a divider, scaled up to
            carry a home screen on its own. */}
        <div
          style={{
            display: 'flex',
            width: 115,
            height: 29,
            borderRadius: 999,
            background: '#F0307A',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
