import type { Metadata } from 'next';
import './globals.css';
import { inter, jetbrainsMono } from './fonts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdPlaceholder from '@/components/ads/AdPlaceholder';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'Typing Practice for SSC CGL, RRB, SBI PO, IBPS PO | Typing Master',
    template: '%s | Typing Practice',
  },
  description:
    'Best typing practice platform for SSC CGL, CHSL, RRB NTPC, SBI PO, and IBPS PO. Improve your typing speed and accuracy with our Typing Master tools. Real exam interface.',
  keywords: [
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
    siteName: 'Typing-Sprint',
    title: 'Typing Practice for SSC CGL, RRB, SBI PO, IBPS PO | Typing Master',
    description:
      'Practice typing online for SSC CGL, RRB NTPC, SBI PO, and IBPS PO. Improve WPM, accuracy, and master typing for competitive exams.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Typing Practice for Competitive Exams'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Typing Practice for SSC CGL, RRB, SBI PO, IBPS PO | Typing Master',
    description: 'Practice typing online for SSC CGL, RRB NTPC, SBI PO, and IBPS PO. Improve WPM and accuracy.',
    images: ['/og-image.png'],
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
