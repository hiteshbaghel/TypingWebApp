import type { Metadata } from 'next';
import './globals.css';
import { inter, jetbrainsMono } from './fonts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdPlaceholder from '@/components/ads/AdPlaceholder';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'Typing-Sprint — SSC, RRB & Banking Exam Typing Practice',
    template: '%s | Typing-Sprint',
  },
  description:
    'High-fidelity typing practice platform for SSC, RRB NTPC, and Banking exams. Accurate error marking, KDPH, WPM tracking and keyboard heatmaps.',
  metadataBase: new URL('https://typingsprint.hiteshbaghel.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://typingsprint.hiteshbaghel.in',
    siteName: 'Typing-Sprint',
    title: 'Typing-Sprint — SSC, RRB & Banking Exam Typing Practice',
    description:
      'High-fidelity typing practice platform for SSC, RRB NTPC, and Banking exams.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'google3587f1ea4af83294',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6035074577927627"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Navbar />
        <div className="layout-with-ads">
          <aside className="ad-sidebar ad-sidebar-left">
            <AdPlaceholder format="vertical" slot="1914901837" />
          </aside>
          <main id="main-content">{children}</main>
          <aside className="ad-sidebar ad-sidebar-right">
            <AdPlaceholder format="vertical" slot="1914901837" />
          </aside>
        </div>
        <Footer />
      </body>
    </html>
  );
}
