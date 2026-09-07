import { Button, Container, MediaPlaceholder, Reveal } from '@/components/ui';
import { anchors, hero } from '@/content/site';
import styles from './Hero.module.css';

/** 01 — HERO */
export function Hero() {
  return (
    <section id={anchors.hero} className={styles.hero}>
      <Container size="xl">
        <div className={styles.grid}>
          <Reveal className={styles.content}>
            <h1 className={`${styles.intro} u-balance`}>{hero.intro}</h1>

            <div className={styles.lines}>
              {hero.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <p className={styles.closing}>{hero.closing}</p>

            <Button href={hero.cta.href} size="lg" withArrow>
              {hero.cta.label}
            </Button>
          </Reveal>

          <Reveal delay={120} className={styles.media}>
            <MediaPlaceholder
              ratio="4/5"
              label={hero.image.label}
              src={hero.image.src}
              alt={hero.image.alt}
              priority
              sizes="(max-width: 60rem) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
