import type { Metadata } from 'next';
import AdPlaceholder from '@/components/ads/AdPlaceholder';

export const metadata: Metadata = {
  title: 'Results',
  description: 'Detailed breakdown of your typing session — WPM, accuracy, error analysis and exam scoring.',
};

export default function ResultsPage() {
  return (
    <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
      <h1 style={{ marginBottom: 'var(--space-4)' }}>Session Results</h1>
      <p className="text-secondary">
        Detailed results will appear here after completing a typing session.
      </p>

      <div style={{ marginTop: 'var(--space-8)' }}>
        <AdPlaceholder format="horizontal" />
      </div>
    </div>
  );
}
