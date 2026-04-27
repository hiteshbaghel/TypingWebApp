import type { Metadata } from 'next';
import AdPlaceholder from '@/components/ads/AdPlaceholder';

export const metadata: Metadata = {
  title: 'About Us | Typing-Sprint',
  description: 'Learn about Typing-Sprint, the ultimate high-fidelity typing performance platform for Indian government and banking exams.',
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)', maxWidth: '900px' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <div style={{ display: 'inline-block', marginBottom: 'var(--space-4)' }}>
          <span className="badge badge--ssc" style={{ fontSize: 'var(--text-sm)', padding: '4px 12px' }}>Our Story</span>
        </div>
        <h1 style={{ 
          fontSize: 'var(--text-4xl)', 
          fontWeight: 800, 
          marginBottom: 'var(--space-6)',
          background: 'linear-gradient(135deg, #fff 0%, var(--accent-primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          About TypingPro
        </h1>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
          India's most advanced, high-fidelity typing simulator meticulously engineered for government and banking recruitment exams.
        </p>
      </div>

      {/* Mission Card */}
      <div className="card hover-card" style={{ marginBottom: 'var(--space-8)', position: 'relative', overflow: 'hidden', padding: 'var(--space-8)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, var(--accent-primary), var(--type-correct))' }} />
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span style={{ background: 'var(--bg-elevated)', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)' }}>🎯</span> 
          Our Mission
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'var(--text-lg)' }}>
          Most generic typing tests online fail to reflect the strict, often confusing marking schemes used by Indian recruitment bodies. We noticed candidates failing the Data Entry Speed Test (DEST) simply because they didn't understand the difference between a "Full Mistake" and a "Half Mistake". Our mission is to eliminate that surprise by offering a 1:1 simulation of the actual exam interface.
        </p>
      </div>

      {/* How it Works Grid */}
      <h2 style={{ fontSize: 'var(--text-2xl)', marginTop: 'var(--space-12)', marginBottom: 'var(--space-6)', fontWeight: 700, textAlign: 'center' }}>
        Why We Stand Out
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
        <div className="card hover-card">
          <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)', background: 'var(--bg-elevated)', display: 'inline-block', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>⚖️</div>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>SSC Marking System</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>Accurately calculates 1.0 (Full) and 0.5 (Half) mistakes based on the official DEST rulebook.</p>
        </div>
        <div className="card hover-card">
          <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)', background: 'var(--bg-elevated)', display: 'inline-block', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>🚆</div>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>RRB Penalty Mode</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>Emulates the TCS-iON interface with a 5% error buffer and a heavy 10-word penalty.</p>
        </div>
        <div className="card hover-card">
          <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)', background: 'var(--bg-elevated)', display: 'inline-block', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}>🏦</div>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>Banking Standard</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>Calculates WPM using the strict 5-character standardized word length.</p>
        </div>
      </div>

      {/* Privacy Section */}
      <div style={{ background: 'linear-gradient(145deg, var(--bg-surface), var(--bg-elevated))', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', textAlign: 'center', border: '1px solid var(--bg-border)' }}>
        <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>🔒</div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)', fontWeight: 700 }}>Your Data Stays Yours</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          We respect your privacy. All your typing history, metrics, and keystroke heatmaps are stored locally on your device using IndexedDB. We never transmit your typing data to external servers.
        </p>
      </div>

      <div style={{ marginTop: 'var(--space-12)' }}>
        <AdPlaceholder format="horizontal" />
      </div>
    </div>
  );
}
