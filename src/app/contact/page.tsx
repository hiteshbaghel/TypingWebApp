import type { Metadata } from 'next';
import AdPlaceholder from '@/components/ads/AdPlaceholder';

export const metadata: Metadata = {
  title: 'Contact Us | TypingPro',
  description: 'Get in touch for support, feedback, or business inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)', maxWidth: '800px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <h1 style={{ 
          fontSize: 'var(--text-4xl)', 
          fontWeight: 800, 
          marginBottom: 'var(--space-4)',
          background: 'linear-gradient(135deg, #fff 0%, var(--accent-primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Get in Touch
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
          Have questions about our scoring algorithms, found a bug, or want to suggest a new feature? We'd love to hear from you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        
        <div className="card hover-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--space-8)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(79,156,255,0.1), rgba(79,156,255,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)', border: '1px solid rgba(79,156,255,0.2)' }}>
            💬
          </div>
          <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>User Support</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
            Need help understanding your exam scores or have a feature request?
          </p>
          <a href="mailto:hiteshbaghel03@gmail.com" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
            hiteshbaghel03@gmail.com
          </a>
        </div>

        <div className="card hover-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--space-8)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(123,97,255,0.1), rgba(123,97,255,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)', border: '1px solid rgba(123,97,255,0.2)' }}>
            🤝
          </div>
          <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>Business Inquiries</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
            Interested in partnering with us or utilizing our typing engine?
          </p>
          <a href="mailto:hiteshbaghel03@gmail.com" className="btn btn--ghost" style={{ width: '100%', justifyContent: 'center' }}>
            hiteshbaghel03@gmail.com
          </a>
        </div>

      </div>

      <div style={{ marginTop: 'var(--space-12)' }}>
        <AdPlaceholder format="rectangle" />
      </div>
    </div>
  );
}
