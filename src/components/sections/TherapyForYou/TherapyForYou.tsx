import type { LucideIcon } from 'lucide-react';
import { Handshake, Lightbulb, ListChecks, Target } from 'lucide-react';
import { BackdropHeading, Reveal, Section } from '@/components/ui';
import { anchors, therapyForYou } from '@/content/site';
import styles from './TherapyForYou.module.css';

/** Numele din `content/site.ts` -> pictograma Lucide. */
const icons: Record<string, LucideIcon> = {
  target: Target,
  listChecks: ListChecks,
  handshake: Handshake,
  lightbulb: Lightbulb,
};

/** 03 — „Și poate te întrebi de avantajele terapiei.” */
export function TherapyForYou() {
  return (
    <Section id={anchors.therapyForYou} containerSize="xl" className={styles.section}>
      <BackdropHeading backdrop={therapyForYou.backdrop}>{therapyForYou.title}</BackdropHeading>

      <div className={styles.bento}>
        <Reveal className={`${styles.feature} u-squircle`}>
          <p className={styles.closing}>{therapyForYou.closing}</p>
        </Reveal>

        <ul className={styles.items}>
          {therapyForYou.items.map((item, index) => {
            const Icon = icons[item.icon];

            return (
              <Reveal
                key={item.title}
                as="li"
                delay={index * 70}
                className={`${styles.item} u-squircle`}
              >
                {Icon ? <Icon className={styles.icon} aria-hidden="true" /> : null}
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
