import type { Metadata } from 'next';
import AdPlaceholder from '@/components/ads/AdPlaceholder';

export const metadata: Metadata = {
  title: 'Privacy Policy | TypingPro',
  description: 'Learn how we handle and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)', maxWidth: '800px', lineHeight: 1.7 }}>
      
      <div style={{ marginBottom: 'var(--space-10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <h1 style={{ 
            fontSize: 'var(--text-4xl)', 
            fontWeight: 800, 
            margin: 0,
            background: 'linear-gradient(135deg, #fff 0%, var(--accent-primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Privacy Policy
          </h1>
          <span className="badge badge--rrb" style={{ fontSize: 'var(--text-xs)', padding: '4px 10px' }}>Updated: April 2026</span>
        </div>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)' }}>
          At Typing-Sprint, your privacy is our priority. We believe in complete transparency regarding the information we collect and how it is used.
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        
        <section className="card hover-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xl)' }}>💾</div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, margin: 0 }}>1. Data Storage & Analytics</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>
            TypingPro is architected as a privacy-first, client-side application. All your typing history, performance metrics, and heatmap data are stored <strong>strictly locally</strong> in your browser using IndexedDB. 
            We do not transmit, collect, or sell your typing data to any external servers. If you clear your browser data or uninstall your browser, your history will be permanently deleted.
          </p>
        </section>

        <section className="card hover-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xl)' }}>🍪</div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, margin: 0 }}>2. Cookies & Third-Party Services</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>
            We use Google AdSense to display advertisements, which helps keep this platform free. Google may use cookies to serve ads based on your prior visits to our website or other websites across the internet. 
            You may opt out of personalized advertising at any time by visiting Google's Ads Settings.
          </p>
        </section>

        <section className="card hover-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xl)' }}>📬</div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, margin: 0 }}>3. Contact & Inquiries</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>
            If you have any concerns, questions, or requests regarding this Privacy Policy or how your data is handled on your local device, please don't hesitate to reach out to us at <strong><a href="mailto:hiteshbaghel03@gmail.com" style={{ color: 'var(--accent-primary)' }}>hiteshbaghel03@gmail.com</a></strong>.
          </p>
        </section>

      </div>

      <div style={{ marginTop: 'var(--space-12)' }}>
        <AdPlaceholder format="horizontal" slot="6780215702" />
      </div>
    </div>
  );
}
