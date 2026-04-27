import type { Metadata } from 'next';
import TypingInterface from '@/components/typing/TypingInterface';
import AdPlaceholder from '@/components/ads/AdPlaceholder';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Practice Typing — SSC, RRB & Banking',
  description:
    'Start a typing session. Choose your exam mode (SSC, RRB, Banking) and duration, then practice with real exam passages and accurate scoring.',
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <h1 id="hero-heading" className={styles.heroTitle}>
          Exam-Accurate Typing Practice
        </h1>
        <p className={styles.heroSub}>
          Master SSC DEST, RRB NTPC &amp; Banking typing tests with India&apos;s most
          precise scoring engine. Real exam rules. Real pressure.
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
        <AdPlaceholder format="horizontal" />
      </div>

      {/* Feature highlights */}
      <section className={styles.features} aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Key Features</h2>
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
    </div>
  );
}

const FEATURES = [
  { icon: '🎯', title: 'SSC Marking System',    desc: 'Full mistakes (1.0) and half mistakes (0.5) per the official DEST rulebook. Category-wise pass thresholds for UR, OBC, SC/ST.' },
  { icon: '🚂', title: 'RRB NTPC Penalty Mode', desc: '5% error buffer with 10-word penalty per extra mistake — mirroring the TCS-iON interface used in Railway exams.' },
  { icon: '🏦', title: 'Banking Standard Word',  desc: 'IBPS/SBI scoring using the 5-character standard word definition for fair WPM calculation.' },
  { icon: '📊', title: 'Keyboard Heatmap',       desc: 'Per-key error rates visualised as an interactive heatmap. Know exactly which fingers need more drills.' },
  { icon: '⏱️', title: 'Exam Durations',          desc: 'Sessions from 1-minute warm-ups to 30-minute banking descriptive tests — every official duration supported.' },
  { icon: '🔒', title: 'Anti-Cheat Engine',      desc: 'Paste and context-menu disabled. Backspace frequency tracked. Practice exactly like it\'s the real exam.' },
];
