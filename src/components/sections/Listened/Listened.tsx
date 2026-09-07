import { Reveal, Section } from '@/components/ui';
import { anchors, listened } from '@/content/site';
import styles from './Listened.module.css';

/** 05 — Secțiunea despre sentimentul de a fi ascultat */
export function Listened() {
  return (
    <Section
      id={anchors.listened}
      tone="inverse"
      size="lg"
      containerSize="xl"
      ariaLabel="Despre a fi ascultat"
      className={styles.section}
    >
      <div className={styles.inner}>
        <Reveal>
          <p className={`${styles.statement} u-balance`}>{listened.statement}</p>
        </Reveal>

        <Reveal delay={160} className={styles.lines}>
          {listened.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
