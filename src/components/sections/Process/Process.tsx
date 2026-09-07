import { Heading, Reveal, Section } from '@/components/ui';
import { anchors, process } from '@/content/site';
import styles from './Process.module.css';

/** 04 — „Cum începem” */
export function Process() {
  return (
    <Section id={anchors.process} tone="alt" containerSize="xl">
      <Reveal>
        <Heading level={2} size="xl">
          {process.title}
        </Heading>
      </Reveal>

      <ol className={styles.steps}>
        {process.steps.map((step, index) => (
          <Reveal key={step.number} as="li" delay={index * 80} className={styles.step}>
            <span className={styles.number}>{step.number}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepText}>{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
