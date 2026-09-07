import { Button, Heading, Reveal, Section } from '@/components/ui';
import { anchors, therapyForYou } from '@/content/site';
import styles from './TherapyForYou.module.css';

/** 03 — „Și poate te întrebi dacă terapia este pentru tine.” */
export function TherapyForYou() {
  return (
    <Section id={anchors.therapyForYou} containerSize="lg">
      <div className={styles.grid}>
        <Reveal>
          <Heading level={2} size="xl">
            {therapyForYou.title}
          </Heading>
        </Reveal>

        <div>
          <ul className={styles.list}>
            {therapyForYou.items.map((item, index) => (
              <Reveal key={item} as="li" delay={index * 60} className={styles.item}>
                {item}
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className={styles.closing}>{therapyForYou.closing}</p>

            <div className={styles.cta}>
              <Button href={therapyForYou.cta.href} variant="link" withArrow>
                {therapyForYou.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
