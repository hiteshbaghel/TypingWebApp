'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from './JsonLd';
import styles from './FaqSection.module.css';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.faqSection} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={styles.faqTitle}>
        Frequently Asked Questions about Typing Practice
      </h2>
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              {item.q}
              <svg
                className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              id={`faq-answer-${i}`}
              className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ''}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
            >
              <div className={styles.faqAnswerInner}>{item.a}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
