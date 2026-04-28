/**
 * JSON-LD Structured Data for SEO
 * Renders schema.org markup that Google uses for rich snippets / knowledge panels.
 */

const BASE_URL = 'https://typingsprint.hiteshbaghel.in';

/* ── WebApplication Schema ─────────────────────────────────── */
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Typing Sprint - Typing Master',
  url: BASE_URL,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  description:
    'Best typing practice platform for SSC CGL, CHSL, RRB NTPC, SBI PO, and IBPS PO. Free online typing master with exam-accurate scoring, WPM tracking, and keyboard heatmaps.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    'SSC CGL DEST typing practice',
    'RRB NTPC typing test with TCS-iON interface',
    'SBI PO and IBPS PO banking typing test',
    'Real-time WPM and accuracy tracking',
    'Keyboard heatmap analytics',
    'Anti-cheat engine for exam simulation',
    'Multiple exam durations supported',
  ],
};

/* ── Organization Schema ───────────────────────────────────── */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Typing Sprint',
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.png`,
  sameAs: [
    'https://www.linkedin.com/in/hiteshbaghel',
    'https://www.hiteshbaghel.in',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hiteshbaghel03@gmail.com',
    contactType: 'customer support',
  },
};

/* ── FAQ Schema ────────────────────────────────────────────── */
export const FAQ_ITEMS = [
  {
    q: 'What is Typing Sprint?',
    a: 'Typing Sprint is India\'s most advanced free online typing practice platform specifically designed for competitive exams like SSC CGL, SSC CHSL, RRB NTPC, SBI PO, and IBPS PO. It provides exam-accurate scoring, real exam interfaces, and detailed analytics to help you master typing for government and banking exams.',
  },
  {
    q: 'How does typing practice for SSC CGL work on this platform?',
    a: 'Our SSC CGL typing practice mode replicates the exact DEST (Data Entry Speed Test) marking system. It tracks Full Mistakes (1.0) and Half Mistakes (0.5) according to the official SSC rulebook, with category-wise pass thresholds for UR, OBC, and SC/ST candidates. You can practice with 10-minute and 15-minute exam sessions.',
  },
  {
    q: 'Can I practice typing for SBI PO and IBPS PO exams here?',
    a: 'Yes! Typing Sprint offers dedicated typing practice for SBI PO and IBPS PO exams. We use the standard 5-character word calculation used in IBPS and SBI typing tests, giving you an accurate WPM score. Practice with banking-specific passages and 30-minute exam durations.',
  },
  {
    q: 'Is this typing master free to use?',
    a: 'Absolutely! Typing Sprint is 100% free. There are no hidden fees, no premium plans, and no login required. All features — including SSC, RRB, and banking typing modes, keyboard heatmaps, and detailed session analytics — are available at no cost.',
  },
  {
    q: 'How is this different from other online typing tests?',
    a: 'Unlike generic typing speed tests, Typing Sprint is purpose-built for Indian competitive exams. We replicate the exact marking schemes (SSC DEST, RRB TCS-iON penalty mode, IBPS/SBI standard word calculation), enforce anti-cheat rules (no paste, no backspace abuse), and provide per-key error heatmaps. No other typing practice tool offers this level of exam accuracy.',
  },
  {
    q: 'Does Typing Sprint work for RRB NTPC typing test preparation?',
    a: 'Yes, our RRB NTPC typing practice mode mirrors the TCS-iON interface used in Railway exams. It includes the 5% error buffer and 10-word penalty system, so you can practice under realistic exam conditions and improve your RRB NTPC typing speed.',
  },
  {
    q: 'What typing speed (WPM) do I need for SSC CGL?',
    a: 'For SSC CGL Data Entry Speed Test (DEST), you need a minimum typing speed of 8,000 key depressions per hour (KDPH), which is approximately 26-28 WPM with the SSC error calculation. Our platform tracks both WPM and KDPH so you know exactly where you stand.',
  },
  {
    q: 'Can I track my typing improvement over time?',
    a: 'Yes! Typing Sprint stores all your session history locally on your device. You can view WPM trends, accuracy progression, error patterns, and per-key heatmaps in the History & Analytics dashboard. All data stays private on your browser.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

/* ── BreadcrumbList Schema ─────────────────────────────────── */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ── Render Component ──────────────────────────────────────── */

interface JsonLdProps {
  /** Include FAQ schema (only on homepage) */
  includeFaq?: boolean;
  /** Additional schema objects to inject */
  extraSchemas?: Record<string, unknown>[];
}

export default function JsonLd({ includeFaq = false, extraSchemas = [] }: JsonLdProps) {
  const schemas = [webAppSchema, orgSchema, ...(includeFaq ? [faqSchema] : []), ...extraSchemas];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
