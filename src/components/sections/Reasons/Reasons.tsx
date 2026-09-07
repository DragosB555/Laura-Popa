import { Heading, Reveal, Section } from '@/components/ui';
import { anchors, reasons } from '@/content/site';
import styles from './Reasons.module.css';

/** 02 — „Poate ai ajuns aici pentru că…” */
export function Reasons() {
  return (
    <Section id={anchors.reasons} tone="alt" containerSize="lg">
      <Reveal>
        <Heading level={2} size="xl">
          {reasons.title}
        </Heading>
      </Reveal>

      <ul className={styles.list}>
        {reasons.items.map((item, index) => (
          <Reveal key={item} as="li" delay={index * 60} className={styles.item}>
            {item}
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <p className={`${styles.statement} u-balance`}>{reasons.statement}</p>
      </Reveal>
    </Section>
  );
}
