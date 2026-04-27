'use client';

import { useEffect, useRef } from 'react';
import { useTypingStore } from '@/store/typingStore';
import ExamModeSelector from './ExamModeSelector';
import MetricsBar from './MetricsBar';
import TextDisplay from './TextDisplay';
import TypingInput from './TypingInput';
import KeyboardHeatmap from './KeyboardHeatmap';
import AdPlaceholder from '@/components/ads/AdPlaceholder';
import styles from './TypingInterface.module.css';

export default function TypingInterface() {
  const sessionState = useTypingStore(s => s.sessionState);
  const resetSession = useTypingStore(s => s.resetSession);
  const metrics = useTypingStore(s => s.metrics);
  const duration = useTypingStore(s => s.duration);
  const examMode = useTypingStore(s => s.examMode);
  const wordsLength = useTypingStore(s => s.words.length);
  const currentWordIndex = useTypingStore(s => s.currentWordIndex);
  const endSession = useTypingStore(s => s.endSession);

  // Scroll to typing area when session starts
  const typingAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (sessionState === 'active' && typingAreaRef.current) {
      typingAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [sessionState]);

  return (
    <div className={styles.container}>
      {/* Live metrics (hidden when idle) */}
      <MetricsBar />

      {/* Config panel — shown only when idle */}
      <ExamModeSelector />

      {/* Passage + input — shown during active / completed */}
      {sessionState !== 'idle' && (
        <div
          ref={typingAreaRef}
          className={styles.typingArea}
          onClick={() => {
            // Click anywhere to focus the hidden textarea
            document.querySelector<HTMLTextAreaElement>('textarea')?.focus();
          }}
        >
          <TextDisplay />
          <TypingInput />

          {sessionState === 'active' && (
            <div className={styles.activeFooter}>
              <p className={styles.hint}>
                Press <kbd>Space</kbd> to advance · <kbd>Backspace</kbd> to correct · Click anywhere to focus
              </p>
              {currentWordIndex >= wordsLength && (
                <button 
                  className={`btn btn--primary ${styles.submitEarlyBtn}`}
                  onClick={endSession}
                >
                  Submit Early
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Results panel */}
      {sessionState === 'completed' && metrics && (
        <div className={`card ${styles.results}`} role="region" aria-label="Session results">
          <h2 className={styles.resultsTitle}>Session Complete 🎉</h2>
          <div className={styles.resultsGrid}>
            <Stat label="Net WPM"  value={metrics.netWpm.toFixed(1)}  accent />
            <Stat label="Gross WPM" value={metrics.grossWpm.toFixed(1)} />
            <Stat label="Accuracy"  value={`${metrics.accuracy.toFixed(1)}%`} />
            <Stat label="Full Mistakes" value={String(metrics.fullMistakes)} danger={metrics.fullMistakes > 0} />
            <Stat label="Half Mistakes" value={String(metrics.halfMistakes)} warn={metrics.halfMistakes > 0} />
            <Stat label="Error %"  value={`${metrics.errorPercent.toFixed(1)}%`} />
            <Stat label="Keystrokes" value={String(metrics.keyDepressions)} />
            <Stat label="Backspaces" value={String(metrics.backspaceCount)} />
          </div>

          {examMode === 'SSC' && (
            <div className={styles.sscVerdict}>
              <span className={`badge badge--ssc`}>SSC</span>
              <span className={styles.verdictText}>
                {metrics.errorPercent <= 20
                  ? '✅ Pass — UR threshold met (≤ 20%)'
                  : metrics.errorPercent <= 25
                  ? '✅ Pass — OBC/EWS threshold (≤ 25%)'
                  : metrics.errorPercent <= 30
                  ? '⚠️ Pass — SC/ST threshold (≤ 30%)'
                  : '❌ Fail — Error % exceeds all thresholds'}
              </span>
            </div>
          )}

          {examMode === 'RRB' && (
            <div className={styles.sscVerdict}>
              <span className="badge badge--rrb">RRB</span>
              <span className={styles.verdictText}>
                {metrics.netWpm >= 30 ? '✅ Pass — Net WPM ≥ 30' : '❌ Fail — Net WPM < 30 required'}
              </span>
            </div>
          )}

          <div className={styles.resultsActions}>
            <button id="try-again-btn" className="btn btn--primary" onClick={resetSession}>
              Try Again
            </button>
          </div>

          <div style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>
            <AdPlaceholder format="horizontal" slot="6780215702" />
          </div>

          <KeyboardHeatmap wordResults={useTypingStore.getState().wordResults} />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent, danger, warn }: {
  label: string; value: string; accent?: boolean; danger?: boolean; warn?: boolean;
}) {
  return (
    <div className={styles.stat}>
      <span className={[
        styles.statValue,
        accent ? styles.accent : '',
        danger ? styles.danger : '',
        warn   ? styles.warn   : '',
      ].join(' ')}>
        {value}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
