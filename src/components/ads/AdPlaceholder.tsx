'use client';

import styles from './AdPlaceholder.module.css';

interface Props {
  format?: 'horizontal' | 'rectangle' | 'vertical';
}

export default function AdPlaceholder({ format = 'horizontal' }: Props) {
  // In production, this would render a Google AdSense <ins> tag
  return (
    <div className={`${styles.adSpace} ${styles[format]}`} aria-hidden="true">
      <span className={styles.label}>Advertisement</span>
    </div>
  );
}
