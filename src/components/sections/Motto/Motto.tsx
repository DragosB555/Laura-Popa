import { Section, TextReveal } from '@/components/ui';
import { motto } from '@/content/site';
import styles from './Motto.module.css';

/** Moto — un singur rand centrat, intre hero si sectiunea 02. */
export function Motto() {
  return (
    <Section size="sm" containerSize="md" ariaLabel="Moto" className={styles.section}>
      <TextReveal as="p" className={styles.text}>
        {motto.text}
      </TextReveal>
    </Section>
  );
}
