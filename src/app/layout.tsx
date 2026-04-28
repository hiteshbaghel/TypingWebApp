import type { Metadata } from 'next';
import './globals.css';
import { inter, jetbrainsMono } from './fonts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdPlaceholder from '@/components/ads/AdPlaceholder';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'Typing Sprint - Free Typing Practice for SSC CGL, RRB, SBI PO | Typing Master',
    template: '%s | Typing Sprint - Typing Master',
  },
  description:
    'Typing Sprint (typingsprint): Best online typing practice platform for SSC CGL, CHSL, RRB NTPC, SBI PO, and IBPS PO. Improve your typing speed with our free Typing Master tools.',
  keywords: [
    'Typing Sprint',
    'typingsprint',
    'typing sprint',
    'typing sprint hitesh baghel',
    'typing practice',
    'typing practice for SSC CGL',
    'typing practice for SBI PO',
    'typing practice for IBPS PO',
    'Typing Master',
    'SSC typing',
    'CGL typing',
    'RRB typing',
    'SBI PO typing',
    'online typing test',
    'typing speed test',
    'SSC CGL typing test',
    'RRB NTPC typing',
    'banking typing test'
  ],
  metadataBase: new URL('https://typingsprint.hiteshbaghel.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://typingsprint.hiteshbaghel.in',
    siteName: 'Typing Sprint',
    title: 'Typing Sprint - Free Typing Practice for SSC CGL, RRB, SBI PO | Typing Master',
    description:
      'Typing Sprint (typingsprint): Practice typing online for SSC CGL, RRB NTPC, SBI PO, and IBPS PO. Improve WPM, accuracy, and master typing for competitive exams.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Typing Sprint - Typing Practice for Competitive Exams'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Typing Sprint - Free Typing Practice for SSC CGL, RRB, SBI PO | Typing Master',
    description: 'Typing Sprint (typingsprint): Practice typing online for SSC CGL, RRB NTPC, SBI PO, and IBPS PO. Improve WPM and accuracy.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
