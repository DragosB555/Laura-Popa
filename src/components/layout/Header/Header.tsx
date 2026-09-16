'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Collapse, Container, Logo } from '@/components/ui';
import { anchors, nav, site } from '@/content/site';
import styles from './Header.module.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  /* Dupa hero, pe telefon si tableta, bara se strange doar pe butonul de meniu. */
  const [isCompact, setIsCompact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /* Sectiunile sunt pe prima pagina; de pe alta pagina linkurile duc acolo.
     Contactul e pe fiecare pagina, deci ramane ancora simpla. */
  const pathname = usePathname();
  const toSection = (href: string) => (pathname === '/' ? href : `/${href}`);

  useEffect(() => {
    const hero = document.getElementById(anchors.hero)?.closest('section');

    function onScroll() {
      setIsScrolled(window.scrollY > 8);
      /* Hero-ul a iesit pe jumatate din ecran. */
      setIsCompact(hero ? hero.getBoundingClientRect().bottom < window.innerHeight / 2 : false);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={styles.header} data-scrolled={isScrolled} data-compact={isCompact}
      data-menu-open={isMenuOpen}
    >
      <Container size="xl">
        <div className={styles.inner}>
          <Link
            href={toSection(`#${anchors.hero}`)}
            className={styles.brand}
            aria-hidden={isCompact || undefined}
            tabIndex={isCompact ? -1 : undefined}
          >
            <Logo className={styles.brandName} />
            <span className={styles.brandRole}>{site.role}</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Navigație principală">
            <ul className={styles.navList}>
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={toSection(link.href)} className={styles.navLink}>
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
            {/* Doua linii care se strang la mijloc si se rotesc in X. */}
            <span className={styles.menuIcon} data-open={isMenuOpen} aria-hidden="true">
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
            </span>
          </button>
        </div>

        <Collapse open={isMenuOpen} id="meniu-mobil" className={styles.mobilePanel}>
          <nav aria-label="Navigație mobilă">
            <ul className={styles.mobileList}>
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={toSection(link.href)} className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className={styles.mobileCta}>
                <Button href={nav.cta.href} onClick={() => setIsMenuOpen(false)}>
                  {nav.cta.shortLabel}
                </Button>
              </li>
            </ul>
          </nav>
        </Collapse>
      </Container>
    </header>
  );
}
