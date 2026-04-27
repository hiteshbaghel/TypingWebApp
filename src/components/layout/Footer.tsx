import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <p className={styles.copy}>
            © {year}{' '}
            <Link href="https://www.hiteshbaghel.in" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
              Hitesh Baghel
            </Link>
            . All rights reserved.
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Built with passion for Indian aspirants.</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className={styles.links} role="list">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
