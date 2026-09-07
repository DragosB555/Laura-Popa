import type { Metadata } from 'next';
import {
  Accordion,
  Button,
  Card,
  Container,
  Eyebrow,
  Heading,
  MediaPlaceholder,
  Text,
} from '@/components/ui';
import styles from './styleguide.module.css';

export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
};

const colorGroups = [
  {
    title: 'Fundal & suprafețe',
    tokens: ['--color-bg', '--color-bg-alt', '--color-surface', '--color-bg-inverse'],
  },
  {
    title: 'Text',
    tokens: ['--color-ink', '--color-ink-muted', '--color-ink-soft', '--color-ink-inverse'],
  },
  {
    title: 'Accent',
    tokens: ['--color-accent', '--color-accent-strong', '--color-accent-soft'],
  },
  {
    title: 'Contur',
    tokens: ['--color-border', '--color-border-strong', '--color-border-inverse'],
  },
];

const textSizes = ['--text-4xl', '--text-3xl', '--text-2xl', '--text-xl', '--text-lg', '--text-md', '--text-base', '--text-sm', '--text-xs'];

const spaceTokens = [
  '--space-1',
  '--space-2',
  '--space-3',
  '--space-4',
  '--space-6',
  '--space-8',
  '--space-12',
  '--space-16',
  '--space-24',
];

const radiusTokens = ['--radius-sm', '--radius-md', '--radius-lg', '--radius-xl', '--radius-full'];
const shadowTokens = ['--shadow-sm', '--shadow-md', '--shadow-lg'];

type BlockProps = {
  title: string;
  note?: string;
  children: React.ReactNode;
};

function Block({ title, note, children }: BlockProps) {
  return (
    <section className={styles.block}>
      <h2 className={styles.blockTitle}>{title}</h2>
      {note ? <p className={styles.blockNote}>{note}</p> : null}
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className={styles.page}>
      <Container size="lg">
        <header className={styles.header}>
          <Eyebrow>Referință internă</Eyebrow>
          <Heading level={1} size="xl">
            Styleguide
          </Heading>
          <Text measure="wide">
            Toate valorile de mai jos vin din <code>src/styles/tokens.css</code>. Schimbă un token acolo și se
            actualizează în tot site-ul. Pagina nu este indexată de motoarele de căutare.
          </Text>
        </header>

        {/* ---------------------------------------------------------- Culori */}
        <Block title="Culori" note="Paletă neutră de start. Înlocuiește valorile hex din tokens.css.">
          <div className={styles.stack}>
            {colorGroups.map((group) => (
              <div key={group.title}>
                <Text size="sm" tone="soft" measure={false} className={styles.blockNote}>
                  {group.title}
                </Text>
                <div className={styles.grid}>
                  {group.tokens.map((token) => (
                    <div key={token} className={styles.swatch}>
                      <div className={styles.swatchChip} style={{ backgroundColor: `var(${token})` }} />
                      <span className={styles.swatchName}>{token}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* ----------------------------------------------------- Tipografie */}
        <Block
          title="Tipografie"
          note="Scală fluidă cu clamp() — se adaptează singură între mobil și desktop, fără media queries."
        >
          <div className={styles.stack}>
            {textSizes.map((token) => (
              <div key={token}>
                <span className={styles.swatchName}>{token}</span>
                <p style={{ fontSize: `var(${token})`, lineHeight: 'var(--leading-snug)', margin: 0 }}>
                  Un spațiu în care poți spune lucrurile exact așa cum sunt.
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Componenta Heading" note="Nivelul semantic (h1–h6) este independent de mărimea vizuală.">
          <div className={styles.stack}>
            <Heading level={2} size="display">
              Heading display (serif)
            </Heading>
            <Heading level={2} size="xl">
              Heading xl
            </Heading>
            <Heading level={2} size="lg">
              Heading lg
            </Heading>
            <Heading level={2} size="md">
              Heading md
            </Heading>
            <Heading level={2} size="sm" sans>
              Heading sm — varianta sans
            </Heading>
          </div>
        </Block>

        <Block title="Componenta Text" note="Tonuri și mărimi pentru paragrafe.">
          <div className={styles.stack}>
            <Text size="xl" tone="default">
              Text xl — folosit pentru fraze-cheie.
            </Text>
            <Text size="lg">Text lg — introduceri de secțiune.</Text>
            <Text size="md">Text md — paragraful standard al site-ului.</Text>
            <Text size="base">Text base — paragraf implicit.</Text>
            <Text size="sm" tone="soft">
              Text sm, ton soft — note și detalii secundare.
            </Text>
          </div>
        </Block>

        {/* -------------------------------------------------------- Butoane */}
        <Block title="Butoane" note="Aceeași componentă randează <button> sau <a> (când primește href).">
          <div className={styles.stack}>
            <div className={styles.row}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link" withArrow>
                Link
              </Button>
            </div>
            <div className={styles.row}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg" withArrow>
                Large cu săgeată
              </Button>
            </div>
            <div className={styles.inverseDemo}>
              <div className={styles.row}>
                <Button variant="primary" onInverse>
                  Primary pe fundal închis
                </Button>
                <Button variant="secondary" onInverse>
                  Secondary
                </Button>
                <Button variant="link" onInverse withArrow>
                  Link
                </Button>
              </div>
            </div>
          </div>
        </Block>

        {/* --------------------------------------------------------- Carduri */}
        <Block title="Carduri" note="Variante de suprafață folosite în secțiuni.">
          <div className={styles.grid}>
            <Card variant="surface">
              <Text size="sm" measure={false}>
                surface
              </Text>
            </Card>
            <Card variant="outline">
              <Text size="sm" measure={false}>
                outline
              </Text>
            </Card>
            <Card variant="soft">
              <Text size="sm" measure={false}>
                soft
              </Text>
            </Card>
            <Card variant="elevated">
              <Text size="sm" measure={false}>
                elevated
              </Text>
            </Card>
          </div>
        </Block>

        {/* -------------------------------------------------------- Spațiere */}
        <Block title="Spațiere" note="Scală pe 4px. Secțiunile folosesc --section-y (fluid).">
          <div className={styles.stack}>
            {spaceTokens.map((token) => (
              <div key={token} className={styles.spaceRow}>
                <span className={styles.spaceLabel}>{token}</span>
                <span className={styles.spaceBar} style={{ width: `var(${token})` }} />
              </div>
            ))}
          </div>
        </Block>

        {/* ----------------------------------------------- Raze & umbre */}
        <Block title="Raze de colț">
          <div className={styles.grid}>
            {radiusTokens.map((token) => (
              <div key={token} className={styles.tokenBox} style={{ borderRadius: `var(${token})` }}>
                {token}
              </div>
            ))}
          </div>
        </Block>

        <Block title="Umbre">
          <div className={styles.grid}>
            {shadowTokens.map((token) => (
              <div key={token} className={`${styles.tokenBox} ${styles.shadowBox}`} style={{ boxShadow: `var(${token})` }}>
                {token}
              </div>
            ))}
          </div>
        </Block>

        {/* ---------------------------------------------------------- Media */}
        <Block title="Zone de imagine" note="Placeholder până la pozele reale. Primește src și devine next/image optimizat.">
          <div className={styles.grid}>
            <MediaPlaceholder ratio="1/1" label="1 / 1" />
            <MediaPlaceholder ratio="4/5" label="4 / 5" />
            <MediaPlaceholder ratio="16/9" label="16 / 9" />
            <MediaPlaceholder ratio="1/1" shape="circle" label="cerc" />
          </div>
        </Block>

        {/* ------------------------------------------------------- Accordion */}
        <Block title="Accordion" note="Folosit în secțiunea de întrebări. Accesibil cu tastatura.">
          <Accordion
            items={[
              { question: 'Prima întrebare', answer: 'Răspunsul primei întrebări.' },
              { question: 'A doua întrebare', answer: 'Răspunsul celei de-a doua întrebări.' },
            ]}
          />
        </Block>
      </Container>
    </div>
  );
}
