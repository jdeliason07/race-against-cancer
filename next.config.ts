import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Our product mockups are first-party SVGs served from /public.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
