'use client';

import React from 'react';
import type { WordResult } from '@/types/typing';
import { buildLiveCharResults } from '@/lib/errorClassifier';
import CharacterSpan from './CharacterSpan';
import styles from './WordSpan.module.css';

interface Props {
  wordResult: WordResult;
  isCurrent: boolean;
  currentInput: string;
}

function WordSpan({ wordResult, isCurrent, currentInput }: Props) {
  const charResults = isCurrent
    ? buildLiveCharResults(currentInput, wordResult.reference)
    : wordResult.charResults;

  const caretIndex = isCurrent ? currentInput.length : -1;

  return (
    <span
      className={[
        styles.word,
        styles[wordResult.status] ?? '',
      ].join(' ')}
      aria-label={wordResult.reference}
    >
      {charResults.map((cr, i) => (
        <CharacterSpan
          key={i}
          result={cr}
          isCaret={isCurrent && i === caretIndex}
        />
      ))}
      {/* Caret at end of word when all chars typed */}
      {isCurrent && caretIndex >= wordResult.reference.length && (
        <span className={styles.endCaret} aria-hidden="true" />
      )}
    </span>
  );
}

export default React.memo(WordSpan, (prev, next) => {
  if (prev.isCurrent !== next.isCurrent) return false;
  if (prev.isCurrent && prev.currentInput !== next.currentInput) return false;
  if (!prev.isCurrent && prev.wordResult.status !== next.wordResult.status) return false;
  return true;
});
