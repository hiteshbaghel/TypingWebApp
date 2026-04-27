'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './HistoryDashboard.module.css';

export default function HistoryDashboard() {
  const sessions = useLiveQuery(() => db.sessions.orderBy('date').reverse().toArray());

  if (!sessions) {
    return <div className="container" style={{padding: 'var(--space-12) 0'}}>Loading history...</div>;
  }

  if (sessions.length === 0) {
    return (
      <div className="container" style={{padding: 'var(--space-12) 0'}}>
        <h1 style={{marginBottom: 'var(--space-4)'}}>History &amp; Analytics</h1>
        <p className="text-secondary">No typing sessions recorded yet. Go practice!</p>
      </div>
    );
  }

  // Prepare chart data (reverse back to chronological)
  const chartData = [...sessions].reverse().map(s => ({
    date: new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    wpm: s.metrics.netWpm,
    accuracy: s.metrics.accuracy,
  }));

  // Averages
  const avgWpm = sessions.reduce((acc, s) => acc + s.metrics.netWpm, 0) / sessions.length;
  const avgAcc = sessions.reduce((acc, s) => acc + s.metrics.accuracy, 0) / sessions.length;

  return (
    <div className={`container ${styles.dashboard}`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
        <h1 className={styles.title} style={{ 
          background: 'linear-gradient(135deg, #fff 0%, var(--accent-primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          History &amp; Analytics
        </h1>
        <span className="badge badge--bank">Your Progress</span>
      </div>

      {/* Summary Stats */}
      <div className={styles.statsRow}>
        <div className={`card ${styles.statCard} hover-card`} style={{ borderTop: '4px solid var(--bank-color)' }}>
          <div className={styles.statLabel}>🏆 Total Sessions</div>
          <div className={styles.statValue}>{sessions.length}</div>
        </div>
        <div className={`card ${styles.statCard} hover-card`} style={{ borderTop: '4px solid var(--accent-primary)' }}>
          <div className={styles.statLabel}>⚡ Avg Net WPM</div>
          <div className={styles.statValue}>{avgWpm.toFixed(1)}</div>
        </div>
        <div className={`card ${styles.statCard} hover-card`} style={{ borderTop: '4px solid var(--type-correct)' }}>
          <div className={styles.statLabel}>🎯 Avg Accuracy</div>
          <div className={styles.statValue}>{avgAcc.toFixed(1)}%</div>
        </div>
      </div>

      {/* Chart */}
      <div className={`card ${styles.chartCard}`}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 'var(--space-6)' }}>Performance Trend (Net WPM)</h2>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--bg-border)" />
              <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ background: 'rgba(19, 19, 26, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
                itemStyle={{ color: 'var(--accent-primary)', fontWeight: 700 }}
                labelStyle={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}
              />
              <Area type="monotone" dataKey="wpm" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorWpm)" activeDot={{ r: 6, fill: 'var(--bg-base)', stroke: 'var(--accent-primary)', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <h2 className={styles.sectionTitle}>Recent Sessions</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Mode</th>
                <th>Diff</th>
                <th>WPM (Net / Gross)</th>
                <th>Accuracy</th>
                <th>Errors</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(s => (
                <tr key={s.id}>
                  <td>{new Date(s.date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td><span className={`badge badge--${s.examMode.toLowerCase()}`}>{s.examMode}</span></td>
                  <td style={{textTransform: 'capitalize'}}>{s.difficulty}</td>
                  <td>
                    <strong>{s.metrics.netWpm.toFixed(1)}</strong>
                    <span className={styles.dim}> / {s.metrics.grossWpm.toFixed(1)}</span>
                  </td>
                  <td>{s.metrics.accuracy.toFixed(1)}%</td>
                  <td>
                    {s.metrics.fullMistakes + s.metrics.halfMistakes}
                    {s.metrics.fullMistakes > 0 && <span className={styles.danger}> ({s.metrics.fullMistakes}F)</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
