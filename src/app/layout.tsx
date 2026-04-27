import type { Metadata } from 'next';
import './globals.css';
import { inter, jetbrainsMono } from './fonts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdPlaceholder from '@/components/ads/AdPlaceholder';

export const metadata: Metadata = {
  title: {
    default: 'TypingPro — SSC, RRB & Banking Exam Typing Practice',
    template: '%s | TypingPro',
  },
  description:
    'High-fidelity typing practice platform for SSC, RRB NTPC, and Banking exams. Accurate error marking, KDPH, WPM tracking and keyboard heatmaps.',
  metadataBase: new URL('https://webapp.hiteshbaghel.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://webapp.hiteshbaghel.in',
    siteName: 'TypingPro',
    title: 'TypingPro — SSC, RRB & Banking Exam Typing Practice',
    description:
      'High-fidelity typing practice platform for SSC, RRB NTPC, and Banking exams.',
  },
  robots: {
    index: true,
    follow: true,
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
      <body>
        <Navbar />
        <div className="layout-with-ads">
          <aside className="ad-sidebar ad-sidebar-left">
            <AdPlaceholder format="vertical" />
          </aside>
          <main id="main-content">{children}</main>
          <aside className="ad-sidebar ad-sidebar-right">
            <AdPlaceholder format="vertical" />
          </aside>
        </div>
        <Footer />
      </body>
    </html>
  );
}
