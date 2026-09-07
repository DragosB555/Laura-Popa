import { Accordion, Eyebrow, Heading, Reveal, Section } from '@/components/ui';
import { anchors, faq } from '@/content/site';
import styles from './Faq.module.css';

/** 08 — Întrebările pe care poate nu le-ai pus */
export function Faq() {
  return (
    <Section id={anchors.faq} containerSize="md">
      <Reveal>
        <Eyebrow>{faq.eyebrow}</Eyebrow>
        <Heading level={2} size="xl">
          {faq.title}
        </Heading>
      </Reveal>

      <Reveal delay={100} className={styles.accordion}>
        <Accordion items={faq.items.map((item) => ({ question: item.question, answer: item.answer }))} />
      </Reveal>
    </Section>
  );
}
