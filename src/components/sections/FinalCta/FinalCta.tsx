import { Button, Reveal, Section } from '@/components/ui';
import { anchors, final } from '@/content/site';
import styles from './FinalCta.module.css';

/** 09 — Final: închidem cercul deschis în hero */
export function FinalCta() {
  return (
    <Section id={anchors.final} tone="accent" size="lg" containerSize="md" ariaLabel="Programează o ședință">
      <Reveal className={styles.inner}>
        <h2 className={styles.lines}>
          {final.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>

        <Button href={final.cta.href} size="lg" withArrow>
          {final.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
