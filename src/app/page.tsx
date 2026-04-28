import type { Metadata } from 'next';
import TypingInterface from '@/components/typing/TypingInterface';
import AdPlaceholder from '@/components/ads/AdPlaceholder';
import FaqSection from '@/components/seo/FaqSection';
import JsonLd from '@/components/seo/JsonLd';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Typing Master & Typing Practice for SSC CGL, SBI PO, IBPS PO',
  description:
    'Start your typing practice for SSC CGL, RRB NTPC, SBI PO, and IBPS PO exams. The ultimate typing master platform to improve speed and accuracy with real exam passages.',
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      <JsonLd includeFaq />
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <h1 id="hero-heading" className={styles.heroTitle}>
          Typing Practice for SSC CGL, RRB, SBI PO &amp; IBPS PO
        </h1>
        <p className={styles.heroSub}>
          The ultimate Typing Master for competitive exams. Master SSC DEST, RRB NTPC &amp; Banking typing tests with India&apos;s most precise scoring engine. Real exam rules. Real pressure.
        </p>
        <div className={styles.heroBadges} aria-label="Supported exams">
          <span className="badge badge--ssc">SSC CGL / CHSL / DEO</span>
          <span className="badge badge--rrb">RRB NTPC</span>
          <span className="badge badge--bank">IBPS / SBI Clerk &amp; PO</span>
        </div>
      </section>

      {/* Typing Engine */}
      <section className={styles.typingSection} aria-label="Typing practice area">
        <TypingInterface />
      </section>

      <div style={{ margin: 'var(--space-8) auto', maxWidth: '1000px', width: '100%' }}>
        <AdPlaceholder format="horizontal" slot="6780215702" />
      </div>

      {/* Feature highlights */}
      <section className={styles.features} aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Why Choose Our Typing Master for SSC CGL, RRB &amp; SBI PO?</h2>
        <div className={styles.featureGrid}>
          {FEATURES.map((f) => (
            <article key={f.title} className={`card ${styles.featureCard}`}>
              <span className={styles.featureIcon} aria-hidden="true">{f.icon}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}

const FEATURES = [
  { icon: '🎯', title: 'SSC CGL Typing Practice',    desc: 'Perfect your typing practice for SSC CGL & CHSL with exact DEST rulebook scoring. Full (1.0) and half (0.5) mistakes accurately marked.' },
  { icon: '🚂', title: 'RRB NTPC Typing Master', desc: 'Experience the real TCS-iON interface. Features 5% error buffer and 10-word penalty to enhance your RRB NTPC typing speed.' },
  { icon: '🏦', title: 'SBI PO & IBPS PO Practice',  desc: 'Elevate your banking typing test score. Uses the standard 5-character word calculation used in typing practice for SBI PO and IBPS PO exams.' },
  { icon: '📊', title: 'Advanced Typing Master Analytics',       desc: 'Per-key error rates visualised as an interactive heatmap. Know exactly which fingers need more drills to improve WPM.' },
  { icon: '⏱️', title: 'Exam Durations',          desc: 'Sessions from 1-minute warm-ups to 30-minute banking descriptive tests — every official duration supported.' },
  { icon: '🔒', title: 'Anti-Cheat Engine',      desc: 'Paste and context-menu disabled. Backspace frequency tracked. Practice typing exactly like it\'s the real exam.' },
];
