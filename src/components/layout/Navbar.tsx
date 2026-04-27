'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/',        label: 'Practice'  },
  { href: '/history', label: 'History'   },
  { href: '/about',   label: 'About'     },
  { href: '/contact', label: 'Contact'   },
  { href: '/privacy', label: 'Privacy'   },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className={styles.header} role="banner">
      <nav className={styles.nav} aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="TypingPro home" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2em' }}>⌨️</span>
          <span style={{ background: 'linear-gradient(to right, #fff, var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            <span className={styles.logoAccent}>Typing</span>Pro
          </span>
        </Link>

        {/* Nav links */}
        <ul className={styles.links} role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${pathname === href ? styles.linkActive : ''}`}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Exam mode chips */}
        <div className={styles.modes} aria-label="Exam modes">
          <span className="badge badge--ssc">SSC</span>
          <span className="badge badge--rrb">RRB</span>
          <span className="badge badge--bank">Bank</span>
        </div>
      </nav>
    </header>
  );
}
