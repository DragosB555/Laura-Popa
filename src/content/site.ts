/* =========================================================================
   CONȚINUT SITE
   Toate textele, valorile și placeholderele într-un singur loc.
   Modifică doar acest fișier pentru a schimba copy-ul paginii.
   Placeholderele sunt marcate cu [...] — înlocuiește-le cu date reale.
   ========================================================================= */

export const site = {
  name: '[Nume Prenume]',
  role: 'Psiholog / Psihoterapeut',
  /** Folosit în <title> și Open Graph. */
  tagline: 'Un spațiu în care poți spune lucrurile exact așa cum sunt.',
  description:
    'Cabinet de psihoterapie și consiliere. Un spațiu sigur în care poți vorbi deschis, fără presiunea de a avea totul clar de la început.',
  /** Domeniul final — folosit pentru metadata, sitemap și robots. */
  url: 'https://example.com',
  email: '[adresa@email.ro]',
  phone: '[+40 7XX XXX XXX]',
  location: '[Oraș] / Online',
};

/** Ancorele secțiunilor — sursă unică pentru id-uri și linkuri de navigație. */
export const anchors = {
  hero: 'inceput',
  reasons: 'de-ce-esti-aici',
  therapyForYou: 'este-terapia-pentru-tine',
  process: 'cum-incepem',
  listened: 'ascultare',
  about: 'despre-mine',
  firstSession: 'prima-sedinta',
  faq: 'intrebari',
  final: 'contact',
};

export const nav = {
  links: [
    { label: 'Cum începem', href: `#${anchors.process}` },
    { label: 'Despre mine', href: `#${anchors.about}` },
    { label: 'Întrebări', href: `#${anchors.faq}` },
  ],
  cta: { label: 'Programează o ședință', href: `#${anchors.final}` },
};

/* ------------------------------------------------------------------ 01 */
export const hero = {
  intro: 'Poate că, în ultima vreme, ceva nu mai e chiar cum era.',
  lines: [
    'Poate ai prea multe lucruri în minte.',
    'Poate simți că te-ai îndepărtat de tine.',
    'Sau poate nici nu știi exact ce te-a făcut să cauți aici.',
  ],
  closing: 'Și e în regulă să nu știi încă.',
  cta: { label: 'Hai să vorbim', href: `#${anchors.final}` },
  image: {
    label: 'Fotografie — prezență și calm',
    /** Pune calea imaginii reale aici, ex. '/images/hero.jpg' */
    src: undefined as string | undefined,
    alt: 'Fotografie care transmite prezență și calm',
  },
};

/* ------------------------------------------------------------------ 02 */
export const reasons = {
  title: 'Poate ai ajuns aici pentru că...',
  /* `icon` este un nume din setul Lucide; corespondența nume -> componentă
     se face în `Reasons.tsx`. Ca să schimbi pictograma, schimbă numele aici
     și adaugă-l în harta din componentă. */
  items: [
    { icon: 'batteryLow', text: 'te simți obosit chiar și atunci când ai dormit.' },
    { icon: 'brain', text: 'îți este greu să oprești gândurile.' },
    { icon: 'speech', text: 'spui „sunt bine” mai des decât simți că e adevărat.' },
    {
      icon: 'compass',
      text: 'ai trecut printr-o schimbare și încă nu știi cum să te așezi în ea.',
    },
    {
      icon: 'repeat',
      text: 'în relațiile tale repeți lucruri pe care ți-ai promis că nu le vei mai repeta.',
    },
    { icon: 'messages', text: 'sau pur și simplu simți că ai nevoie să vorbești cu cineva.' },
  ] as const,
  statement: 'Nu trebuie să existe un motiv suficient de mare pentru a cere ajutor.',
};

/* ------------------------------------------------------------------ 03 */
export const therapyForYou = {
  title: 'Și poate te întrebi dacă terapia este pentru tine.',
  items: [
    'Nu trebuie să vii cu o problemă bine definită.',
    'Nu trebuie să știi ce să spui.',
    'Nu trebuie să ai răspunsurile pregătite.',
    'Nu trebuie să știi dacă „e destul de grav”.',
  ],
  closing:
    'Prima ședință poate fi pur și simplu o conversație. Despre ce se întâmplă acum, despre ce ai nevoie și despre ce ai vrea să fie diferit.',
  cta: { label: 'Află cum funcționează', href: `#${anchors.process}` },
};

/* ------------------------------------------------------------------ 04 */
export const process = {
  title: 'Cum începem',
  steps: [
    {
      number: '01',
      title: 'Vorbim',
      description: 'Începem de unde ești acum.',
    },
    {
      number: '02',
      title: 'Înțelegem',
      description: 'Punem puțină ordine în lucrurile care par greu de pus în cuvinte.',
    },
    {
      number: '03',
      title: 'Explorăm',
      description: 'Ne uităm împreună la tipare, emoții, relații și lucrurile care te influențează.',
    },
    {
      number: '04',
      title: 'Construim',
      description:
        'În ritmul tău, lucrăm spre o relație mai bună cu tine și cu ceea ce se întâmplă în viața ta.',
    },
  ],
};

/* ------------------------------------------------------------------ 05 */
export const listened = {
  statement:
    'Uneori, primul lucru de care avem nevoie este un loc în care putem spune lucrurile exact așa cum sunt.',
  lines: [
    'Fără să le facem mai mici.',
    'Fără să le justificăm.',
    'Fără să ne prefacem că suntem bine.',
  ],
};

/* ------------------------------------------------------------------ 06 */
export const about = {
  eyebrow: 'Cine este omul de partea cealaltă?',
  name: site.name,
  role: site.role,
  paragraphs: [
    `Sunt ${site.name} și cred că terapia începe, înainte de toate, cu o relație bazată pe încredere și siguranță.`,
    'În practica mea, încerc să creez un spațiu în care să poți vorbi deschis despre ceea ce trăiești, fără presiunea de a avea totul clar de la început.',
  ],
  credentials: [
    { label: 'Formare', value: '[Formare profesională]' },
    { label: 'Acreditări', value: '[Acreditări / Colegiul Psihologilor]' },
    { label: 'Experiență', value: '[Ani de experiență / domenii]' },
    { label: 'Abordare', value: '[Metodă / abordare terapeutică]' },
  ],
  image: {
    label: 'Fotografie — portret autentic',
    src: undefined as string | undefined,
    alt: `Portret ${site.name}`,
  },
};

/* ------------------------------------------------------------------ 07 */
export const firstSession = {
  eyebrow: 'Poate vrei să știi cum va fi prima dată.',
  title: 'Ce se întâmplă la prima ședință?',
  statement: 'Nu există un test pe care trebuie să îl treci și nici răspunsuri corecte.',
  details: [
    { label: 'Durată', value: '50 min', note: 'durata unei ședințe' },
    { label: 'Format', value: '[Online / Cabinet]', note: '[detalii]' },
    { label: 'Investiție', value: '[Preț]', note: 'per ședință' },
  ],
  description:
    'Prima întâlnire este despre a ne cunoaște. Îmi povestești ce te-a adus aici, atât cât simți că poți, iar la final decidem împreună dacă și cum continuăm.',
};

/* ------------------------------------------------------------------ 08 */
export const faq = {
  eyebrow: 'Întrebările pe care poate nu le-ai pus',
  title: 'Întrebări frecvente',
  items: [
    {
      question: 'Dacă nu știu despre ce să vorbesc?',
      answer: '[Răspuns — poți începe fără un plan; tăcerea și ezitarea fac parte din proces.]',
    },
    {
      question: 'Dacă mă emoționez?',
      answer: '[Răspuns — cabinetul este un loc în care emoția are voie să existe.]',
    },
    {
      question: 'Dacă nu știu dacă am nevoie de terapie?',
      answer: '[Răspuns — putem afla împreună, la prima întâlnire.]',
    },
    {
      question: 'Cât de des trebuie să vin?',
      answer: '[Răspuns — ritmul obișnuit și cum îl stabilim împreună.]',
    },
    {
      question: 'Pot să mă opresc dacă simt că nu este pentru mine?',
      answer: '[Răspuns — da; cum discutăm despre încheiere.]',
    },
  ],
};

/* ------------------------------------------------------------------ 09 */
export const final = {
  lines: ['Nu trebuie să știi exact de unde să începi.', 'Putem începe de aici.'],
  cta: { label: 'Programează o primă ședință', href: `mailto:${site.email}` },
};

export const footer = {
  note: 'Informațiile de pe acest site au caracter informativ și nu înlocuiesc o evaluare profesională.',
  links: [
    { label: 'Politica de confidențialitate', href: '/confidentialitate' },
    { label: 'Termeni și condiții', href: '/termeni' },
  ],
};
