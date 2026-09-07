import {
  About,
  Faq,
  FinalCta,
  FirstSession,
  Hero,
  Listened,
  Process,
  Reasons,
  TherapyForYou,
} from '@/components/sections';

/**
 * Pagina principală — o secțiune per componentă, în ordinea din brief.
 * 01 Hero · 02 Poate ai ajuns aici · 03 Este terapia pentru tine
 * 04 Cum începem · 05 A fi ascultat · 06 Despre mine
 * 07 Prima ședință · 08 Întrebări · 09 Final
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Reasons />
      <TherapyForYou />
      <Process />
      <Listened />
      <About />
      <FirstSession />
      <Faq />
      <FinalCta />
    </>
  );
}
