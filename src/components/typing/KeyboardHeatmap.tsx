'use client';

import { useMemo } from 'react';
import type { WordResult } from '@/types/typing';
import styles from './KeyboardHeatmap.module.css';

interface Props {
  wordResults: WordResult[];
}

const ROWS = [
  ['1','2','3','4','5','6','7','8','9','0','-','='],
  ['q','w','e','r','t','y','u','i','o','p','[',']'],
  ['a','s','d','f','g','h','j','k','l',';','\''],
  ['z','x','c','v','b','n','m',',','.','/']
];

export default function KeyboardHeatmap({ wordResults }: Props) {
  // Calculate error frequencies per character
  const heatMap = useMemo(() => {
    const counts: Record<string, { total: number; errors: number }> = {};
    
    // Initialize all keys
    ROWS.flat().forEach(k => { counts[k] = { total: 0, errors: 0 }; });
    
    wordResults.forEach(word => {
      if (word.status === 'pending' || word.status === 'current') return;
      
      word.charResults.forEach(cr => {
        const char = cr.char.toLowerCase();
        if (counts[char]) {
          counts[char].total++;
          if (cr.status === 'error') {
            counts[char].errors++;
          }
        }
      });
    });
    
    return counts;
  }, [wordResults]);

  const maxErrorRate = useMemo(() => {
    let max = 0;
    Object.values(heatMap).forEach(v => {
      const rate = v.total > 0 ? v.errors / v.total : 0;
      if (rate > max) max = rate;
    });
    return max || 1; // prevent div by zero
  }, [heatMap]);

  return (
    <div className={styles.heatmap} aria-label="Keyboard heatmap showing error rates">
      <h3 className={styles.title}>Error Heatmap</h3>
      <p className={styles.subtitle}>Keys highlighted in red have higher error rates</p>
      
      <div className={styles.keyboard}>
        {ROWS.map((row, i) => (
          <div key={i} className={styles.row}>
            {row.map(key => {
              const stats = heatMap[key];
              const rate = stats.total > 0 ? stats.errors / stats.total : 0;
              // Opacity based on error rate relative to max error rate
              const opacity = rate > 0 ? 0.2 + (rate / maxErrorRate) * 0.8 : 0;
              
              return (
                <div key={key} className={styles.key}>
                  <div 
                    className={styles.keyBg} 
                    style={{ backgroundColor: `rgba(255, 60, 60, ${opacity})` }} 
                  />
                  <span className={styles.keyLabel}>{key}</span>
                  {stats.errors > 0 && (
                    <span className={styles.keyStats}>{Math.round(rate * 100)}%</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
