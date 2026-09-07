import { Card, Eyebrow, Heading, Reveal, Section } from '@/components/ui';
import { anchors, firstSession } from '@/content/site';
import styles from './FirstSession.module.css';

/** 07 — „Poate vrei să știi cum va fi prima dată.” */
export function FirstSession() {
  return (
    <Section id={anchors.firstSession} tone="alt" containerSize="lg">
      <Reveal>
        <Eyebrow>{firstSession.eyebrow}</Eyebrow>
        <Heading level={2} size="xl">
          {firstSession.title}
        </Heading>
        <p className={styles.statement}>{firstSession.statement}</p>
      </Reveal>

      <div className={styles.details}>
        {firstSession.details.map((detail, index) => (
          <Reveal key={detail.label} delay={index * 80}>
            <Card variant="surface">
              <div className={styles.detail}>
                <span className={styles.detailLabel}>{detail.label}</span>
                <span className={styles.detailValue}>{detail.value}</span>
                <span className={styles.detailNote}>{detail.note}</span>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className={styles.description}>{firstSession.description}</p>
      </Reveal>
    </Section>
  );
}
