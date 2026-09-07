import type { LucideIcon } from 'lucide-react';
import { BatteryLow, Brain, Compass, MessagesSquare, Repeat, Speech } from 'lucide-react';
import { Heading, Reveal, Section } from '@/components/ui';
import { anchors, reasons } from '@/content/site';
import styles from './Reasons.module.css';

/** Numele din `content/site.ts` -> pictograma Lucide. */
const icons: Record<string, LucideIcon> = {
  batteryLow: BatteryLow,
  brain: Brain,
  speech: Speech,
  compass: Compass,
  repeat: Repeat,
  messages: MessagesSquare,
};

/** 02 — „Poate ai ajuns aici pentru că…” */
export function Reasons() {
  return (
    <Section id={anchors.reasons} tone="alt" containerSize="xl">
      <Reveal>
        <Heading level={2} size="xl">
          {reasons.title}
        </Heading>
      </Reveal>

      <ul className={styles.grid}>
        {reasons.items.map((item, index) => {
          const Icon = icons[item.icon];

          return (
            <Reveal key={item.text} as="li" delay={index * 60} className={styles.item}>
              {Icon ? <Icon className={styles.icon} aria-hidden="true" /> : null}
              <p className={styles.text}>{item.text}</p>
            </Reveal>
          );
        })}
      </ul>

      <Reveal>
        <p className={`${styles.statement} u-balance`}>{reasons.statement}</p>
      </Reveal>
    </Section>
  );
}
