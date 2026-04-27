'use client';

import { useEffect, useRef } from 'react';
import { useTypingStore } from '@/store/typingStore';
import styles from './MetricsBar.module.css';

function fmt(n: number) { return isNaN(n) ? '0' : n.toFixed(1); }

function formatTime(seconds: number, totalSeconds: number): string {
  const remaining = Math.max(0, totalSeconds - seconds);
  const m = Math.floor(remaining / 60).toString().padStart(2, '0');
  const s = (remaining % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function MetricsBar() {
  const sessionState = useTypingStore(s => s.sessionState);
  const elapsedSeconds = useTypingStore(s => s.elapsedSeconds);
  const duration = useTypingStore(s => s.duration);
  const wordResults = useTypingStore(s => s.wordResults);
  const examMode = useTypingStore(s => s.examMode);
  const tick = useTypingStore(s => s.tick);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start/stop the timer
  useEffect(() => {
    if (sessionState === 'active') {
      intervalRef.current = setInterval(() => tick(), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [sessionState, tick]);

  // Compute live metrics
  const typed = wordResults.filter(w => w.status !== 'pending' && w.status !== 'current');
  const correct = typed.filter(w => w.errorType === 'none').length;
  const errors = typed.filter(w => w.errorType !== 'none').length;
  const totalWords = typed.length;
  const minutes = elapsedSeconds / 60 || 0.01;
  const liveWpm = totalWords / minutes;
  const accuracy = totalWords > 0 ? (correct / totalWords) * 100 : 100;

  const totalSeconds = duration * 60;
  const remaining = totalSeconds - elapsedSeconds;
  const isWarning = remaining <= 60 && sessionState === 'active';

  if (sessionState === 'idle') return null;

  return (
    <div className={`${styles.bar} ${isWarning ? styles.warning : ''}`} role="status" aria-live="polite">
      <div className={styles.metric}>
        <span className={styles.value} id="live-wpm">{fmt(liveWpm)}</span>
        <span className={styles.label}>WPM</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.metric}>
        <span className={styles.value}>{fmt(accuracy)}%</span>
        <span className={styles.label}>Accuracy</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.metric}>
        <span className={`${styles.value} ${isWarning ? styles.timerWarning : ''}`}>
          {formatTime(elapsedSeconds, totalSeconds)}
        </span>
        <span className={styles.label}>Remaining</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.metric}>
        <span className={styles.value}>{errors}</span>
        <span className={styles.label}>Errors</span>
      </div>
      <div className={styles.examBadge}>
        <span className={`badge badge--${examMode.toLowerCase()}`}>{examMode}</span>
      </div>
    </div>
  );
}
