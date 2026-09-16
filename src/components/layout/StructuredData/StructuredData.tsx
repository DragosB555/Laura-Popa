import { about, faq, seo, site } from '@/content/site';

/** Cifrele numarului, in format international (+40...). */
const telephone = `+${site.phone.replace(/[^\d]/g, '')}`;

/**
 * Date structurate (JSON-LD, schema.org) pentru Google.
 *
 * Descriu cine e Laura Popa, ce servicii ofera, unde si cum poate fi
 * contactata — din aceleasi date ca pagina, deci nu pot ajunge sa se
 * contrazica. Se verifica la https://search.google.com/test/rich-results.
 */
export function StructuredData() {
  const ids = {
    website: `${site.url}/#website`,
    webpage: `${site.url}/#webpage`,
    business: `${site.url}/#business`,
    person: `${site.url}/#person`,
  };

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': ids.website,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: 'ro-RO',
        publisher: { '@id': ids.business },
      },
      {
        '@type': 'WebPage',
        '@id': ids.webpage,
        url: site.url,
        name: seo.title,
        description: site.description,
        inLanguage: 'ro-RO',
        isPartOf: { '@id': ids.website },
        about: { '@id': ids.business },
        primaryImageOfPage: `${site.url}/opengraph-image`,
      },
      {
        '@type': 'ProfessionalService',
        '@id': ids.business,
        name: `${site.name} - ${site.role}`,
        url: site.url,
        description: site.description,
        image: `${site.url}/opengraph-image`,
        logo: `${site.url}/apple-icon.png`,
        telephone,
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        areaServed: [
          { '@type': 'City', name: 'București' },
          { '@type': 'Country', name: 'România' },
        ],
        availableLanguage: 'ro',
        founder: { '@id': ids.person },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: site.role,
          itemListElement: about.cards.map((card) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: card.title,
              description: card.items.join(', '),
              provider: { '@id': ids.business },
              areaServed: 'București și online',
            },
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': ids.person,
        name: site.name,
        jobTitle: 'Coach',
        url: site.url,
        email: site.email,
        telephone,
        worksFor: { '@id': ids.business },
        knowsAbout: about.cards.flatMap((card) => [card.title, ...card.items]),
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}/#faq`,
        isPartOf: { '@id': ids.webpage },
        mainEntity: faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      /* `<` escapat, ca textul sa nu poata inchide eticheta script. */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }}
    />
  );
}
