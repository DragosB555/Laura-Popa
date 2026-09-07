# Site de prezentare — cabinet de psihoterapie

Site one-page în română, construit cu **Next.js (App Router)** și **CSS Modules** peste un set de design tokens.
Pregătit pentru deploy pe **Vercel**.

## Comenzi

```bash
npm run dev        # server de dezvoltare — http://localhost:3000
npm run build      # build de producție
npm run start      # rulează build-ul de producție
npm run lint       # ESLint
npm run typecheck  # TypeScript, fără emit
```

## Unde modifici ce

| Vrei să schimbi | Fișier |
| --- | --- |
| Texte, nume, preț, contact, întrebări | `src/content/site.ts` |
| Culori, tipografie, spațiere, raze, umbre | `src/styles/tokens.css` |
| Culorile și viteza butonului primary | `--plasma-*` în `src/styles/tokens.css` |
| Reset global | `src/styles/reset.css` |
| Clase utilitare globale (`u-*`) | `src/styles/utilities.css` |
| Ordinea secțiunilor | `src/app/page.tsx` |
| Meniu și CTA din header | `nav` în `src/content/site.ts` |

**Tot conținutul editorial stă în `src/content/site.ts`.** Componentele nu conțin text scris de mână.
Placeholderele sunt marcate cu paranteze drepte, ex. `[Nume Prenume]`, `[Preț]`.

## Structura

```
src/
  app/
    layout.tsx          # <html>, fonturi, metadata, Header + Footer
    page.tsx            # pagina principală — cele 9 secțiuni, în ordine
    globals.css         # importă tokens + reset + utilities
    robots.ts           # robots.txt (styleguide-ul e exclus din indexare)
    sitemap.ts          # sitemap.xml
    styleguide/         # referință vizuală a sistemului de design
  components/
    ui/                 # componente reutilizabile, fără conținut propriu
      Accordion  Button  Card  Collapse  Container  Eyebrow
      Heading  MediaPlaceholder  Reveal  Section  Text
    layout/
      Header  Footer
    sections/           # câte o componentă per secțiune din pagină
      01 Hero
      02 Reasons             — „Poate ai ajuns aici pentru că…”
      03 TherapyForYou       — „Și poate te întrebi dacă terapia este pentru tine.”
      04 Process             — „Cum începem”
      05 Listened            — secțiunea despre a fi ascultat
      06 About               — „Cine este omul de partea cealaltă?”
      07 FirstSession        — „Ce se întâmplă la prima ședință?”
      08 Faq                 — „Întrebările pe care poate nu le-ai pus”
      09 FinalCta            — închiderea cercului
  content/site.ts       # tot conținutul
  lib/                  # cx() și useReveal()
  styles/               # tokens, reset, utilities
```

Fiecare componentă stă în folderul ei, cu `Component.tsx`, `Component.module.css` și `index.ts`.

## Butonul primary („lava")

Varianta `primary` are o suprafață animată de tip *metaball*: opt forme neclarizate
orbitează, iar filtrul SVG `#btn-goo` întărește canalul alfa, ceea ce le lipește
într-o siluetă organică. Peste tot se aplică un `hue-rotate` lent.

Formele au **o singură culoare plină**, nu gradient propriu — altfel s-ar vedea
cusături acolo unde se suprapun. Gradientul chihlimbar → portocaliu se aplică
o singură dată, ca strat peste toată suprafața (`.plasma::after`), exact ca în
originalul unde masca acoperea un singur strat colorat.

- Markup-ul suprafeței: `src/components/ui/Button/Plasma.tsx` (pur decorativ, `aria-hidden`)
- Stilurile: blocul „VARIANTA PRIMARY" din `Button.module.css`
- **Filtrul `#btn-goo` este definit o singură dată**, în `src/components/ui/SvgDefs`,
  randat din `layout.tsx`. Fără el, suprafața nu se randează — nu îl scoate din layout.
- Culorile și viteza se schimbă din `--plasma-1` … `--plasma-5`, `--plasma-ink`
  și `--plasma-speed` (`tokens.css`).
- Neclaritatea e în `em`, deci efectul rămâne proporțional la orice mărime de buton.
- La `prefers-reduced-motion` animațiile se opresc și butonul rămâne static.

Textul este maro-închis (`--plasma-ink`), nu alb: pe chihlimbar, albul ar coborî
sub pragul de contrast WCAG AA.

## Styleguide

`http://localhost:3000/styleguide` — arată toate tokenele și componentele, live.
Pagina este exclusă din `robots.txt` și marcată `noindex`.

## Imagini

Zonele de imagine folosesc `MediaPlaceholder`. Pentru a pune o poză reală:

1. Adaugă fișierul în `public/images/`.
2. În `src/content/site.ts`, setează `src` (ex. `src: '/images/portret.jpg'`) și `alt`.

Componenta trece automat pe `next/image`, cu AVIF/WebP și `sizes` corect.

## Deploy pe Vercel

1. Creează repo pe GitHub și fă push.
2. În Vercel: **New Project** → importă repo-ul. Framework-ul este detectat automat, fără setări suplimentare.
3. După ce știi domeniul, actualizează `site.url` în `src/content/site.ts` (folosit de metadata, sitemap și robots).

## Note tehnice

- Toate paginile sunt **statice** (prerenderate la build).
- Fonturile sunt încărcate cu `next/font` — fără request către Google la runtime, fără layout shift.
- Animația de intrare (`Reveal`) se dezactivează la `prefers-reduced-motion` și când JavaScript e indisponibil.
- Meniul mobil și FAQ-ul folosesc `Collapse`, care scoate conținutul închis din ordinea de tabulare (`inert`).
- Fără dark mode deocamdată; tokenele sunt pregătite dacă îl vrei mai târziu.
