'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Collapse, Container } from '@/components/ui';
import { anchors, nav, site } from '@/content/site';
import styles from './Header.module.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={styles.header} data-scrolled={isScrolled}>
      <Container size="xl">
        <div className={styles.inner}>
          <Link href={`#${anchors.hero}`} className={styles.brand}>
            <span className={styles.brandName}>{site.name}</span>
            <span className={styles.brandRole}>{site.role}</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Navigație principală">
            <ul className={styles.navList}>
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={nav.cta.href} size="sm">
              {nav.cta.label}
            </Button>
          </nav>

          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={isMenuOpen}
            aria-controls="meniu-mobil"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="u-visually-hidden">{isMenuOpen ? 'Închide meniul' : 'Deschide meniul'}</span>
            <svg
              className={styles.menuIcon}
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M5 5l12 12M17 5L5 17" />
              ) : (
                <path d="M3 7h16M3 15h16" />
              )}
            </svg>
          </button>
        </div>

        <Collapse open={isMenuOpen} id="meniu-mobil" className={styles.mobilePanel}>
          <nav aria-label="Navigație mobilă">
            <ul className={styles.mobileList}>
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className={styles.mobileCta}>
                <Button href={nav.cta.href} fullWidth onClick={() => setIsMenuOpen(false)}>
                  {nav.cta.label}
                </Button>
              </li>
            </ul>
          </nav>
        </Collapse>
      </Container>
    </header>
  );
}
