import type { Metadata } from 'next';
import { Fredoka, Hanken_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/components/cart/CartProvider';
import { BRAND_NAME, BRAND_TAGLINE, META_DESCRIPTION, SITE_URL } from '@/config/site';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: `${BRAND_NAME} — ${BRAND_TAGLINE}`, template: `%s · ${BRAND_NAME}` },
  description: META_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: BRAND_NAME,
    description: META_DESCRIPTION,
    type: 'website',
    siteName: BRAND_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND_NAME,
    description: META_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${hanken.variable} ${spaceMono.variable}`}>
      <body className="font-body antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
