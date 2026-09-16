import { BackdropHeading, CountUp, Reveal, Section } from '@/components/ui';
import { anchors, firstSession } from '@/content/site';
import styles from './FirstSession.module.css';

/**
 * 06 — „Ce se întâmplă la prima ședință?”
 *
 * Datele sedintei stau intr-un singur panou inchis, ca o fisa: intai formatul,
 * apoi durata — care iese in fata, intr-o cutie deschisa.
 */
export function FirstSession() {
  const { duration, format } = firstSession;

  return (
    <Section id={anchors.firstSession} containerSize="xl" className={styles.section}>
      <BackdropHeading backdrop={firstSession.backdrop}>{firstSession.title}</BackdropHeading>

      <Reveal className={`${styles.panel} u-squircle`}>
        <dl className={styles.specs}>
          <Reveal className={styles.spec}>
            <dt className={styles.label}>{format.label}</dt>
            <dd className={styles.text}>{format.text}</dd>
          </Reveal>

          <Reveal delay={80} className={`${styles.spec} ${styles.specBoxed} u-squircle`}>
            <dt className={styles.label}>{duration.label}</dt>
            <dd className={styles.value}>
              <CountUp value={duration.value} />
              <span className={styles.unit}>{duration.unit}</span>
            </dd>
            <dd className={styles.note}>{duration.note}</dd>
          </Reveal>
        </dl>
      </Reveal>
    </Section>
  );
}
