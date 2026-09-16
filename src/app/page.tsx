import {
  About,
  Faq,
  FirstSession,
  Hero,
  Motto,
  Process,
  Reasons,
  TherapyForYou,
} from '@/components/sections';

/**
 * Pagina principală — o secțiune per componentă, în ordinea din brief.
 * 01 Hero · 02 Poate ai ajuns aici · 03 Este terapia pentru tine
 * 04 Cum începem · 05 Despre mine · 06 Prima ședință
 * 07 Întrebări
 *
 * Contactul nu e aici: sta fixat sub pagina, in layout, si se dezvaluie
 * pe masura ce continutul urca peste el.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Motto />
      <Reasons />
      <TherapyForYou />
      <Process />
      <About />
      <FirstSession />
      <Faq />
    </>
  );
}
