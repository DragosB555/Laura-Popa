'use client';

import { useRef } from 'react';
import { UserRound } from 'lucide-react';
import { Button, Container, ScrollHint, SkyClouds } from '@/components/ui';
import { anchors, hero } from '@/content/site';
import styles from './Hero.module.css';

/* =========================================================================
   01 — HERO

   Trei fraze, pe un cer care incepe intunecat si se insenineaza pe masura
   ce derulezi. Frazele se aduna una sub alta, pe masura ce se lumineaza; odata cu
   ultima vin si un rand de text si butonul spre „Despre mine”.
   Sectiunea e mai inalta decat ecranul; scena sta lipita sus cat derulezi
   prin surplus.

   Ancora hero-ului e la capatul derularii, nu la inceputul sectiunii: din
   meniu ajungi direct pe cerul senin.
   ========================================================================= */

export function Hero() {
  const trackRef = useRef<HTMLElement>(null);

  return (
    <section ref={trackRef} className={styles.hero}>
      <span id={anchors.hero} className={styles.anchor} aria-hidden="true" />

      <div className={styles.stage}>
        <div className={`${styles.frame} u-squircle`}>
          <SkyClouds trackRef={trackRef} className={styles.sky} />

          <Container size="xl">
            <div className={styles.head}>
              {/* Frazele apar una sub alta, dupa cer, si raman. Cititoarele de
                  ecran le citesc pe rand. */}
              <h1 className={styles.lines}>
                {hero.lines.map((text, index) => (
                  <span key={text} className={styles.line} data-step={index}>
                    {text}
                  </span>
                ))}
              </h1>

              <div className={styles.outro}>
                <p className={styles.body}>{hero.body}</p>
                <Button href={hero.cta.href} icon={<UserRound />}>
                  {hero.cta.label}
                </Button>
              </div>
            </div>
          </Container>

          <ScrollHint className={styles.scrollHint} />
        </div>
      </div>
    </section>
  );
}
