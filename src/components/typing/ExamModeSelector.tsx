'use client';

import { useTypingStore } from '@/store/typingStore';
import type { ExamMode, Difficulty } from '@/types/typing';
import { DURATION_OPTIONS } from '@/types/typing';
import styles from './ExamModeSelector.module.css';

const MODES: { value: ExamMode; label: string; desc: string; cls: string }[] = [
  { value: 'SSC',      label: 'SSC',      desc: 'CGL / CHSL / DEO', cls: 'ssc'  },
  { value: 'RRB',      label: 'RRB',      desc: 'NTPC 10-word penalty', cls: 'rrb' },
  { value: 'Bank',     label: 'Banking',  desc: 'IBPS / SBI 5-char word', cls: 'bank'},
  { value: 'Standard', label: 'Standard', desc: 'Basic WPM mode', cls: 'std' },
];

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'numerical', label: 'Numerical' },
];

export default function ExamModeSelector() {
  const examMode = useTypingStore(s => s.examMode);
  const duration = useTypingStore(s => s.duration);
  const difficulty = useTypingStore(s => s.difficulty);
  const setExamMode = useTypingStore(s => s.setExamMode);
  const setDuration = useTypingStore(s => s.setDuration);
  const setDifficulty = useTypingStore(s => s.setDifficulty);
  const startSession = useTypingStore(s => s.startSession);
  const sessionState = useTypingStore(s => s.sessionState);

  if (sessionState !== 'idle' && sessionState !== 'loading') return null;

  return (
    <div className={styles.selector} aria-label="Exam configuration">
      {/* Exam mode */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Exam Mode</p>
        <div className={styles.modeGrid} role="radiogroup" aria-label="Exam mode">
          {MODES.map(m => (
            <button
              key={m.value}
              id={`mode-${m.value}`}
              role="radio"
              aria-checked={examMode === m.value}
              className={`${styles.modeBtn} ${examMode === m.value ? styles[`active-${m.cls}`] : ''}`}
              onClick={() => setExamMode(m.value)}
            >
              <span className={styles.modeName}>{m.label}</span>
              <span className={styles.modeDesc}>{m.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Duration</p>
        <div className={styles.durationGrid} role="radiogroup" aria-label="Session duration">
          {DURATION_OPTIONS.map(d => (
            <button
              key={d.value}
              id={`dur-${d.value}`}
              role="radio"
              aria-checked={duration === d.value}
              className={`${styles.durBtn} ${duration === d.value ? styles.durActive : ''}`}
              onClick={() => setDuration(d.value)}
            >
              <span className={styles.durLabel}>{d.label}</span>
              <span className={styles.durDesc}>{d.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Difficulty</p>
        <div className={styles.durationGrid} role="radiogroup" aria-label="Passage difficulty">
          {DIFFICULTIES.map(d => (
            <button
              key={d.value}
              id={`diff-${d.value}`}
              role="radio"
              aria-checked={difficulty === d.value}
              className={`${styles.durBtn} ${difficulty === d.value ? styles.durActive : ''}`}
              onClick={() => setDifficulty(d.value)}
            >
              <span className={styles.durLabel} style={{textTransform: 'capitalize'}}>{d.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Start */}
      <button
        id="start-session-btn"
        className={`btn btn--primary ${styles.startBtn}`}
        onClick={startSession}
        disabled={sessionState === 'loading'}
      >
        {sessionState === 'loading' ? 'Loading...' : 'Start Session ⌨️'}
      </button>
    </div>
  );
}
