import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BackdropHeading, Container, DarkVeil } from '@/components/ui';
import { final, site } from '@/content/site';
import styles from './FinalCta.module.css';

/** Cifrele din numar, pentru linkul `tel:`. */
const digits = site.phone.replace(/[^\d]/g, '');

/**
 * Contactul, care inchide pagina.
 *
 * Nu face parte din fluxul ei: sta fixat dedesubt si se dezvaluie pe masura ce
 * pagina urca peste el. Suprafata inchisa acopera tot ecranul, ca sa aiba ce se
 * vedea si prin colturile rotunjite ale paginii. Continutul sta in banda de
 * jos, cat se dezvaluie.
 *
 * Nu foloseste `Section`: aceea vine cu fundalul crem al paginii.
 */
export function FinalCta() {
  return (
    <section aria-label="Contact" className={styles.dock}>
      {/* Fundalul animat umple tot stratul inchis; granulatia ramane peste el,
          pusa de `.grain`. */}
      <div className={styles.veil}>
        <DarkVeil
          speed={0.6}
          warpAmount={5}
          noiseIntensity={0.03}
          resolutionScale={0.5}
          tintColors={['#2e1f16', '#3e2b1e', '#543926']}
          /* Contactul sta fixat sub pagina; se vede doar cat distantierul
             de la capatul ei e in ecran. */
          visibilityTarget=".u-page-spacer"
        />
      </div>
      <span aria-hidden="true" className={styles.grain} />

      <div className={styles.band}>
        <Container size="xl">
          <BackdropHeading backdrop={final.backdrop} className={styles.heading}>
            {final.title}
          </BackdropHeading>

          <ul className={styles.cards}>
            <li className={`${styles.card} u-squircle`}>
              <MessageCircle aria-hidden="true" className={styles.icon} />
              <span className={styles.label}>WhatsApp</span>
              <a
                className={styles.value}
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                {site.phone}
              </a>
            </li>

            <li className={`${styles.card} u-squircle`}>
              <Phone aria-hidden="true" className={styles.icon} />
              <span className={styles.label}>Telefon</span>
              <a className={styles.value} href={`tel:+${digits}`}>
                {site.phone}
              </a>
            </li>

            <li className={`${styles.card} u-squircle`}>
              <Mail aria-hidden="true" className={styles.icon} />
              <span className={styles.label}>Email</span>
              <a className={styles.value} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>

            <li className={`${styles.card} u-squircle`}>
              <MapPin aria-hidden="true" className={styles.icon} />
              <span className={styles.label}>Locație</span>
              <span className={styles.value}>
                {site.location.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </Container>
      </div>
    </section>
  );
}
