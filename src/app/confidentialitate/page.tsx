import type { Metadata } from 'next';
import { Container } from '@/components/ui';
import { CookieSettingsButton } from '@/components/layout/CookieConsent';
import { analytics, site } from '@/content/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Politica de confidențialitate și cookies',
  description: `Cum folosește ${site.name} datele personale și cookie-urile pe ${site.domain}.`,
  alternates: { canonical: '/confidentialitate' },
  robots: { index: false, follow: true },
};

/** Data ultimei actualizari a textului. Se schimba odata cu continutul. */
const UPDATED_AT = '16 septembrie 2026';

const cookies = [
  {
    name: 'lp-cookie-consent',
    provider: site.domain,
    purpose: 'Reține dacă ai acceptat cookie-urile de analiză sau ți-ai retras acordul.',
    type: 'Strict necesar (stocare locală în browser)',
    duration: '12 luni',
  },
  {
    name: '_ga',
    provider: 'Google Analytics',
    purpose: 'Deosebește vizitatorii unici, ca să putem număra vizitele.',
    type: 'Analiză — doar cu acordul tău',
    duration: '2 ani',
  },
  {
    name: `_ga_${analytics.gaId.replace(/^G-/, '')}`,
    provider: 'Google Analytics',
    purpose: 'Păstrează starea sesiunii de navigare.',
    type: 'Analiză — doar cu acordul tău',
    duration: '2 ani',
  },
];

/** Politica de confidentialitate si de cookie-uri, pe o singura pagina. */
export default function PrivacyPage() {
  return (
    <article className={styles.page}>
      <Container size="md">
        <header className={styles.intro}>
          <h1 className={styles.title}>Politica de confidențialitate și cookies</h1>
          <p className={styles.updated}>Ultima actualizare: {UPDATED_AT}</p>
        </header>

        <div className={styles.body}>
          <section>
            <h2>Cine suntem</h2>
            <p>
              Site-ul {site.domain} aparține lui {site.name}, care oferă servicii de coaching și
              dezvoltare personală, în București și online. Pentru orice întrebare despre datele tale
              ne poți scrie la <a href={`mailto:${site.email}`}>{site.email}</a> sau ne poți suna la{' '}
              <a href={`tel:+${site.phone.replace(/[^\d]/g, '')}`}>{site.phone}</a>.
            </p>
          </section>

          <section>
            <h2>Ce date colectăm</h2>
            <p>Site-ul nu are formulare și nu îți cere să îți creezi un cont. Colectăm date doar în două situații:</p>
            <ul>
              <li>
                <strong>Când ne contactezi</strong> prin telefon, WhatsApp sau e-mail: numele, numărul de
                telefon sau adresa de e-mail și ce alegi să ne scrii.
              </li>
              <li>
                <strong>Când accepți cookie-urile de analiză</strong>: date statistice despre cum folosești
                site-ul (paginile vizitate, durata vizitei, tipul de dispozitiv, orașul aproximativ).
                Aceste date nu ne spun cine ești.
              </li>
            </ul>
            <p>
              Ce discutăm în ședințele de coaching este confidențial și nu este colectat sau stocat prin
              acest site.
            </p>
          </section>

          <section>
            <h2>De ce folosim datele și pe ce temei</h2>
            <ul>
              <li>
                <strong>Ca să îți răspundem și să programăm ședințe</strong> — pe baza cererii tale, înainte
                de încheierea unei colaborări (art. 6 alin. (1) lit. b din GDPR).
              </li>
              <li>
                <strong>Ca să înțelegem cum este folosit site-ul și să îl îmbunătățim</strong> — doar pe
                baza consimțământului tău (art. 6 alin. (1) lit. a din GDPR), pe care îl poți retrage
                oricând.
              </li>
            </ul>
          </section>

          <section id="cookies">
            <h2>Cookie-uri</h2>
            <p>
              Cookie-urile sunt fișiere mici pe care un site le salvează în browserul tău. Folosim doar
              cookie-uri de analiză, prin Google Analytics, și numai dacă apeși „Accept” în bannerul de
              cookie-uri. Până nu apeși „Accept”, nu se încarcă niciun script Google și nu se salvează
              niciun cookie de analiză.
            </p>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Nume</th>
                    <th scope="col">Furnizor</th>
                    <th scope="col">Scop</th>
                    <th scope="col">Tip</th>
                    <th scope="col">Durată</th>
                  </tr>
                </thead>
                <tbody>
                  {cookies.map((cookie) => (
                    <tr key={cookie.name}>
                      <td>
                        <code>{cookie.name}</code>
                      </td>
                      <td>{cookie.provider}</td>
                      <td>{cookie.purpose}</td>
                      <td>{cookie.type}</td>
                      <td>{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              Dacă ai acceptat, îți poți retrage acordul oricând, iar cookie-urile de analiză se șterg:{' '}
              <CookieSettingsButton className={styles.inlineButton} />. Poți șterge cookie-urile și din
              setările browserului.
            </p>
          </section>

          <section>
            <h2>Cui transmitem datele</h2>
            <ul>
              <li>
                <strong>Google Ireland Limited</strong> (Google Analytics), doar dacă ai acceptat
                cookie-urile. Adresele IP sunt anonimizate, iar datele pot fi transferate în SUA în
                baza cadrului UE–SUA privind protecția datelor (Data Privacy Framework).
              </li>
              <li>
                <strong>Vercel Inc.</strong>, care găzduiește site-ul și păstrează temporar jurnale tehnice
                (de exemplu adresa IP), necesare funcționării și securității site-ului.
              </li>
              <li>
                <strong>WhatsApp (Meta)</strong> sau furnizorul tău de e-mail, atunci când alegi să ne scrii
                prin aceste canale. Folosirea lor se face conform politicilor proprii.
              </li>
            </ul>
            <p>Nu vindem și nu închiriem datele tale nimănui.</p>
          </section>

          <section>
            <h2>Cât timp păstrăm datele</h2>
            <p>
              Mesajele și datele de contact le păstrăm cât timp este nevoie pentru a-ți răspunde și pe durata
              colaborării, apoi le ștergem, cu excepția situațiilor în care legea ne obligă să le păstrăm mai
              mult. Datele statistice din Google Analytics se păstrează 14 luni.
            </p>
          </section>

          <section>
            <h2>Drepturile tale</h2>
            <p>Conform GDPR, ai dreptul:</p>
            <ul>
              <li>să afli ce date avem despre tine și să primești o copie a lor;</li>
              <li>să ceri corectarea sau ștergerea lor;</li>
              <li>să ceri restricționarea prelucrării sau să te opui ei;</li>
              <li>să primești datele într-un format care poate fi transmis altcuiva;</li>
              <li>să îți retragi consimțământul oricând, fără să afecteze ce s-a întâmplat înainte.</li>
            </ul>
            <p>
              Pentru oricare dintre ele, scrie-ne la <a href={`mailto:${site.email}`}>{site.email}</a>. Îți
              răspundem în cel mult o lună. Dacă ești nemulțumit, poți depune o plângere la Autoritatea
              Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (
              <a href="https://www.dataprotection.ro" target="_blank" rel="noreferrer">
                dataprotection.ro
              </a>
              ).
            </p>
          </section>

          <section>
            <h2>Modificări</h2>
            <p>
              Dacă schimbăm modul în care folosim datele, actualizăm această pagină și data de mai sus.
            </p>
          </section>
        </div>
      </Container>
    </article>
  );
}
