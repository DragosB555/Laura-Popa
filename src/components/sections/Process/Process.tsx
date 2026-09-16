import { BackdropHeading, Reveal, Section } from '@/components/ui';
import { anchors, process } from '@/content/site';
import styles from './Process.module.css';

/** 04 — „Cum decurge o întâlnire” */
export function Process() {
  return (
    <Section id={anchors.process} containerSize="xl" className={styles.section}>
      <BackdropHeading backdrop={process.backdrop}>{process.title}</BackdropHeading>

      <ol className={styles.steps}>
        {process.steps.map((step, index) => (
          <Reveal
            key={step.number}
            as="li"
            delay={index * 80}
            className={`${styles.step} u-squircle`}
          >
            <span aria-hidden="true" className={styles.number}>
              {step.number}
            </span>

            <div className={styles.body}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
