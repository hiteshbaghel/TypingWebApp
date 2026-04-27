'use client';

import { useEffect } from 'react';
import styles from './AdPlaceholder.module.css';

interface Props {
  format?: 'horizontal' | 'rectangle' | 'vertical';
  slot?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdPlaceholder({ format = 'horizontal', slot, style }: Props) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && slot) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [slot]);

  if (!slot) {
    return (
      <div className={`${styles.adSpace} ${styles[format]}`} aria-hidden="true">
        <span className={styles.label}>Advertisement</span>
      </div>
    );
  }

  return (
    <div className={`${styles.adContainer} ${styles[format]}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-6035074577927627"
        data-ad-slot={slot}
        data-ad-format={format === 'vertical' ? 'vertical' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  );
}
