import { Eyebrow, MediaPlaceholder, Reveal, Section } from '@/components/ui';
import { about, anchors } from '@/content/site';
import styles from './About.module.css';

/** 06 — „Cine este omul de partea cealaltă?” */
export function About() {
  return (
    <Section id={anchors.about} containerSize="xl">
      <div className={styles.grid}>
        <Reveal className={styles.media}>
          <MediaPlaceholder
            ratio="4/5"
            label={about.image.label}
            src={about.image.src}
            alt={about.image.alt}
            sizes="(max-width: 60rem) 100vw, 35vw"
          />
        </Reveal>

        <Reveal delay={100}>
          <Eyebrow>{about.eyebrow}</Eyebrow>

          <div className={styles.identity}>
            <h2 className={styles.name}>{about.name}</h2>
            <span className={styles.role}>{about.role}</span>
          </div>

          <div className={styles.paragraphs}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="u-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className={styles.credentials}>
            {about.credentials.map((credential) => (
              <div key={credential.label}>
                <dt className={styles.credentialLabel}>{credential.label}</dt>
                <dd className={styles.credentialValue}>{credential.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
