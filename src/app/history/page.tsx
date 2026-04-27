import type { Metadata } from 'next';
import HistoryDashboard from '@/components/history/HistoryDashboard';

export const metadata: Metadata = {
  title: 'Test History & Analytics',
  description: 'Review all your past typing sessions, WPM trends, accuracy over time, and keyboard heatmap insights.',
};

export default function HistoryPage() {
  return <HistoryDashboard />;
}
