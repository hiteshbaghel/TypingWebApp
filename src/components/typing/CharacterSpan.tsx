'use client';

import React from 'react';
import type { CharResult } from '@/types/typing';
import styles from './CharacterSpan.module.css';

interface Props {
  result: CharResult;
  isCaret?: boolean;
}

function CharacterSpan({ result, isCaret }: Props) {
  return (
    <span
      className={[
        styles.char,
        styles[result.status],
        isCaret ? styles.caret : '',
      ].join(' ')}
    >
      {result.char}
    </span>
  );
}

export default React.memo(CharacterSpan);
