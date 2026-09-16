import { ImageResponse } from 'next/og';
import { LOGO_PATHS, LOGO_VIEWBOX } from '@/components/ui/Logo/paths';
import { seo, site } from '@/content/site';

/* =========================================================================
   Imaginea de distribuire (Open Graph): apare cand linkul e pus pe WhatsApp,
   Facebook, LinkedIn etc. Se genereaza la build, din aceleasi date ca site-ul.
   ========================================================================= */

export const alt = seo.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Mulish, doar cu literele de pe imagine. Fara retea, ramane fontul implicit. */
async function loadMulish(weight: number, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Mulish:wght@${weight}&text=${encodeURIComponent(text)}`,
    ).then((response) => response.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((response) => response.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const domain = site.domain;
  const text = `${seo.ogHeadline}${seo.ogDetails}${domain}`;
  const [medium, bold] = await Promise.all([loadMulish(500, text), loadMulish(700, text)]);

  const fonts = [
    medium && { name: 'Mulish', data: medium, weight: 500 as const, style: 'normal' as const },
    bold && { name: 'Mulish', data: bold, weight: 700 as const, style: 'normal' as const },
  ].filter((font) => font !== null);

  const logoWidth = 560;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 28,
          backgroundColor: '#f6ece4',
          fontFamily: 'Mulish',
        }}
      >
        {/* Cutia rotunjita, ca hero-ul site-ului. */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '72px 80px 64px',
            borderRadius: 56,
            color: '#fbfaf8',
            backgroundImage:
              'radial-gradient(circle at 85% 15%, rgba(185, 143, 119, 0.45), transparent 55%), linear-gradient(160deg, #543926 0%, #3e2b1e 45%, #2e1f16 100%)',
          }}
        >
          <svg
            width={logoWidth}
            height={(logoWidth * LOGO_VIEWBOX.height) / LOGO_VIEWBOX.width}
            viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
            fill="#fbfaf8"
          >
            {LOGO_PATHS.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }}>
              {seo.ogHeadline}
            </div>
            <div style={{ fontSize: 32, fontWeight: 500, color: 'rgba(251, 250, 248, 0.72)' }}>
              {seo.ogDetails}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-end',
              fontSize: 26,
              fontWeight: 500,
              color: 'rgba(251, 250, 248, 0.6)',
            }}
          >
            {domain}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
