/* =========================================================================
   CONȚINUT SITE
   Toate textele, valorile și placeholderele într-un singur loc.
   Modifică doar acest fișier pentru a schimba copy-ul paginii.
   Placeholderele sunt marcate cu [...] — înlocuiește-le cu date reale.
   ========================================================================= */

export const site = {
  name: 'Laura Popa',
  role: 'Coaching și dezvoltare',
  /** Folosit în <title> și Open Graph. */
  tagline: 'Un spațiu în care poți spune lucrurile exact așa cum sunt.',
  description:
    'Coaching de viață, coaching de carieră și dezvoltare personală cu Laura Popa, în București (Sectorul 5) sau online. Prima ședință este gratuită.',
  /** Adresa site-ului, fara slash la capat — folosita pentru metadata, sitemap și robots. */
  url: 'https://laurapopa.com',
  /** Domeniul afisat (pe imaginea de distribuire). */
  domain: 'laurapopa.com',
  email: 'laurapopa.1972@yahoo.com',
  phone: '+40 755 347 814',
  /** Link scurt de WhatsApp, generat din contul de business. */
  whatsapp: 'https://wa.link/pg69w7',
  /** Fiecare element pe randul lui. */
  location: ['București, Sectorul 5', 'Online'],
  /** Adresa pentru datele structurate (Google). */
  address: { locality: 'București', region: 'Sectorul 5', country: 'RO' },
};

/* ------------------------------------------------------------------ SEO */
export const seo = {
  /** Titlul din Google si din tab. Sub ~60 de caractere, ca sa nu fie taiat. */
  title: `${site.name} - ${site.role} | București și online`,
  /** Textul de pe imaginea de distribuire (Open Graph). */
  ogHeadline: 'Coaching și dezvoltare personală',
  ogDetails: 'București · Online · Prima ședință gratuită',
  ogAlt: `${site.name} - ${site.role}, în București și online`,
  keywords: [
    'coaching',
    'coaching de viață',
    'coaching de carieră',
    'dezvoltare personală',
    'coach București',
    'coaching online',
    'relații și comunicare',
    'Laura Popa',
  ],
};

/** Ancorele secțiunilor — sursă unică pentru id-uri și linkuri de navigație. */
export const anchors = {
  hero: 'inceput',
  reasons: 'de-ce-esti-aici',
  therapyForYou: 'este-terapia-pentru-tine',
  process: 'cum-incepem',
  about: 'despre-mine',
  firstSession: 'prima-sedinta',
  faq: 'intrebari',
  final: 'contact',
};

export const nav = {
  /* Toate sectiunile paginii. Heroul lipseste — acolo duce numele din stanga —
     si la fel contactul, care e butonul din dreapta. Etichetele sunt scurte
     intentionat: intr-o bara care se stramteaza pe continut, titlul intreg al
     sectiunii ar sparge randul. */
  links: [
    { label: 'De ce ești aici', href: `#${anchors.reasons}` },
    { label: 'Avantaje', href: `#${anchors.therapyForYou}` },
    { label: 'Cum începem', href: `#${anchors.process}` },
    { label: 'Despre mine', href: `#${anchors.about}` },
    { label: 'Prima ședință', href: `#${anchors.firstSession}` },
    { label: 'Întrebări', href: `#${anchors.faq}` },
  ],
  /* `shortLabel` apare in meniul de pe telefon, unde eticheta lunga nu incape. */
  cta: { label: 'Programează o ședință', shortLabel: 'Contact', href: `#${anchors.final}` },
};

/* ------------------------------------------------------------------ 01 */
export const hero = {
  /* O singura fraza, pe trei randuri care se aduna pe masura ce cerul se
     insenineaza: furtuna -> la jumatate -> senin. */
  lines: ['Poate că acum e greu,', 'nu trebuie să rămână așa,', 'putem vorbi despre asta.'],
  /* Apar odata cu ultima fraza, pe cerul senin. */
  body: 'Prima discuție e despre tine: ce te apasă și de unde putem porni. Prima ședință e gratuită.',
  cta: { label: 'Despre mine', href: `#${anchors.about}` },
};

/* ------------------------------------------------------ moto (01 -> 02) */
export const motto = {
  text: 'Coachingul nu tratează o suferință, ci deblochează potențialul',
};

/* ------------------------------------------------------------------ 02 */
export const reasons = {
  title: 'Poate ai ajuns aici pentru că...',
  /* `icon` este un nume din setul Lucide; corespondența nume -> componentă
     se face în `Reasons.tsx`. Ca să schimbi pictograma, schimbă numele aici
     și adaugă-l în harta din componentă. */
  backdrop: ['despre', 'tine'],
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
};

/* ------------------------------------------------------------------ 03 */
export const therapyForYou = {
  title: 'Și poate te întrebi de avantajele terapiei.',
  backdrop: ['pentru', 'tine'],
  /* `icon` e un nume din setul Lucide; corespondenta nume -> componenta se
     face in `TherapyForYou.tsx`. */
  items: [
    { icon: 'target', title: 'Claritate', text: 'Obiective bine definite.' },
    { icon: 'listChecks', title: 'Plan', text: 'Pași concreți, cu termene fixe.' },
    {
      icon: 'handshake',
      title: 'Responsabilizare',
      text: 'Un partener de „drum” care te ține aproape de obiectivele tale.',
    },
    {
      icon: 'lightbulb',
      title: 'Perspectivă',
      text: 'Discuțiile potrivite scot la suprafață opțiuni noi, pe care nu le vedeai.',
    },
  ],
  closing:
    'Prima ședință este gratuită și poate fi pur și simplu o conversație. Despre ce se întâmplă acum, despre ce ai nevoie și despre ce ai vrea să fie diferit.',
};

/* ------------------------------------------------------------------ 04 */
export const process = {
  title: 'Cum decurge o întâlnire',
  backdrop: ['cum', 'începem'],
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


/* ------------------------------------------------------------------ 06 */
export const about = {
  title: 'Laura Popa',
  backdrop: ['despre', 'mine'],
  greeting: 'Bună,',
  paragraphs: [
    'Ofer un spațiu sigur și fără judecată pentru discuții. Lucrez într-un mod empatic, adaptându-mă fiecărei persoane.',
    'Consider că fiecare individ este unic și are un drum unic, iar rolul meu este să te sprijin pe acest drum al cunoașterii de sine, pentru a crea împreună schimbarea pe care o cauți.',
  ],
  /* Cele patru directii de lucru, pe o grila 2x2. Fiecare card: un titlu si
     cateva teme. */
  cards: [
    {
      title: 'Dezvoltare personală',
      items: ['încredere în sine', 'blocaje', 'perioade dificile', 'comunicare'],
    },
    {
      title: 'Coaching de viață',
      items: ['stres', 'obiceiuri sănătoase', 'echilibru personal', 'părinți și copii'],
    },
    {
      title: 'Coaching de carieră',
      items: ['direcție profesională', 'echilibru', 'pregătire de schimbare'],
    },
    {
      title: 'Relații și comunicare',
      items: ['relații sănătoase', 'limite clare', 'conflicte', 'apropiere'],
    },
  ],
};

/* ------------------------------------------------------------------ 07 */
export const firstSession = {
  title: 'Ce se întâmplă la prima ședință?',
  backdrop: ['prima', 'ședință'],
  format: {
    label: 'Format',
    text: 'Ședințele se desfășoară fizic la cabinet sau online, doar cu programare.',
  },
  duration: { label: 'Durată', value: 50, unit: 'min', note: 'ședință' },
};

/* ------------------------------------------------------------------ 08 */
export const faq = {
  title: 'Înainte să începem',
  backdrop: ['Întrebări', 'frecvente'],
  chatName: 'Tu',
  chatStatus: 'online',
  chatPlaceholder: 'Mesaj',
  items: [
    {
      question: 'Dacă nu știu despre ce să vorbesc?',
      answer:
        'Nu ai nevoie de un plan. Putem porni de la ce simți acum sau de la ce te-a făcut să cauți o discuție, iar restul se leagă pe parcurs. Pauzele și ezitările fac și ele parte din proces.',
    },
    {
      question: 'Dacă mă emoționez?',
      answer:
        'E în regulă. Emoțiile au loc aici și nu trebuie ascunse sau grăbite. Facem o pauză dacă ai nevoie și mergem mai departe în ritmul tău.',
    },
    {
      question: 'Dacă nu știu dacă am nevoie de terapie?',
      answer:
        'Nu trebuie să știi dinainte. Prima ședință e gratuită tocmai pentru asta: vorbim despre ce trăiești și vedem împreună dacă procesul te poate ajuta. Dacă simt că ai nevoie de alt tip de sprijin, cum ar fi psihoterapia, îți spun deschis.',
    },
    {
      question: 'Cât de des trebuie să vin?',
      answer:
        'De obicei, o ședință pe săptămână sau la două săptămâni, de câte 50 de minute. Ritmul îl stabilim împreună, după obiectivele tale și după cum te simți pe parcurs.',
    },
  ],
};

/* ------------------------------------------------------------------ 09 */
export const final = {
  title: 'Prima ședință e gratuită.',
  backdrop: ['contact'],
};

