import { BackdropHeading, Reveal, Section } from '@/components/ui';
import { about, anchors } from '@/content/site';
import styles from './About.module.css';

/** 05 — „Despre mine” */
export function About() {
  return (
    <Section id={anchors.about} containerSize="xl">
      <BackdropHeading backdrop={about.backdrop}>{about.title}</BackdropHeading>

      {/* Pe mobil textul vine primul; pe desktop cardurile trec in stanga, in
          locul unde statea fotografia. Ordinea din DOM ramane cea de citit. */}
      <div className={styles.grid}>
        <Reveal className={styles.intro}>
          <p className={styles.greeting}>{about.greeting}</p>

          <div className={styles.paragraphs}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="u-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Acelasi panou inchis ca la „Poate ai ajuns aici pentru ca...”, cu
            fisele translucide inauntru. */}
        <Reveal delay={100} className={`${styles.panel} u-squircle`}>
          <ul className={styles.cards}>
            {about.cards.map((card) => (
              <li key={card.title} className={`${styles.card} u-squircle`}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                {/* Temele curg intr-un singur rand, separate prin bara: o lista
                    cu buline citea ca o numerotare. */}
                <p className={styles.cardItems}>{card.items.join(' / ')}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
