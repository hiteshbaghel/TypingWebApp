'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

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

        {/* Hamburger Menu Toggle */}
        <button 
          className={styles.menuToggle} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <div className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`} />
        </button>

        {/* Exam mode chips - desktop only */}
        <div className={styles.modes} aria-label="Exam modes">
          <span className="badge badge--ssc">SSC</span>
          <span className="badge badge--rrb">RRB</span>
          <span className="badge badge--bank">Bank</span>
        </div>
      </nav>

      {/* Nav Content (Overlay on Mobile) */}
      <div className={`${styles.navContent} ${isMenuOpen ? styles.navContentOpen : ''}`}>
        <ul className={styles.links} role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href} className={styles.navItem}>
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

        {/* Exam mode chips - visible in mobile menu */}
        <div className={styles.mobileModes} aria-label="Exam modes">
          <span className="badge badge--ssc">SSC</span>
          <span className="badge badge--rrb">RRB</span>
          <span className="badge badge--bank">Bank</span>
        </div>
      </div>
    </header>
  );
}
