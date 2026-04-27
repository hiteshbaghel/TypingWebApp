'use client';

import { useTypingStore } from '@/store/typingStore';
import WordSpan from './WordSpan';
import styles from './TextDisplay.module.css';

export default function TextDisplay() {
  const words = useTypingStore(s => s.words);
  const wordResults = useTypingStore(s => s.wordResults);
  const currentWordIndex = useTypingStore(s => s.currentWordIndex);
  const currentInput = useTypingStore(s => s.currentInput);
  const sessionState = useTypingStore(s => s.sessionState);

  return (
    <div
      className={styles.display}
      aria-label="Typing passage"
      aria-live="off"
      data-testid="text-display"
    >
      <p className={styles.text}>
        {words.map((_, i) => (
          <span key={i}>
            <WordSpan
              wordResult={wordResults[i]}
              isCurrent={sessionState === 'active' && i === currentWordIndex}
              currentInput={currentInput}
            />
            {i < words.length - 1 && (
              <span
                className={[
                  styles.space,
                  wordResults[i]?.status === 'correct'  ? styles.spaceCorrect :
                  wordResults[i]?.status === 'error-full' || wordResults[i]?.status === 'error-half' || wordResults[i]?.status === 'omitted' ? styles.spaceError : '',
                ].join(' ')}
              >
                {' '}
              </span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
}
