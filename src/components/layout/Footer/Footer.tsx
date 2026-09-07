import Link from 'next/link';
import { Container } from '@/components/ui';
import { footer, site } from '@/content/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container size="xl">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.role}>{site.role}</span>
          </div>

          <address className={styles.contact}>
            <a href={`mailto:${site.email}`} className={styles.contactLink}>
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className={styles.contactLink}>
              {site.phone}
            </a>
            <span>{site.location}</span>
          </address>
        </div>

        <div className={styles.bottom}>
          <p className={styles.note}>{footer.note}</p>
          <ul className={styles.legalLinks}>
            {footer.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.legalLink}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>© {new Date().getFullYear()}</li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
