'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { cx } from '@/lib/cx';
import styles from './SkyClouds.module.css';

/* =========================================================================
   SkyClouds
   Cer cu nori abstracti in WebGL: forme mari si moi, nu nori desenati. Un
   singur strat de zgomot fbm, deformat o data, care aluneca incet de la
   stanga la dreapta. Umbrirea vine din densitate si inaltime, fara probe
   in plus spre soare.

   E gandit sa fie ieftin: se deseneaza la o treime din pixeli (formele sunt
   oricum moi) si la cel mult ~30 de cadre pe secunda (se misca foarte incet).

   Cerul trece de la intunecat la un senin cald de rasarit. Cat de senin e se
   citeste din derularea prin `trackRef`: 0 cand elementul abia a ajuns sus,
   1 cand l-ai derulat pana la capat. Pe telefon nu se leaga de derulare:
   cerul se insenineaza singur, ca intro, in cateva secunde de la incarcare.
   Valoarea e scrisa pe element ca
   `--sky-clear`, iar `data-sky="open"` apare cand cerul e aproape senin —
   ca textul si butonul de deasupra sa se poata lua dupa ele.
   ========================================================================= */

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uCover;
uniform float uStormCover;
uniform float uClear;
uniform vec3 uSkyTop;
uniform vec3 uSkyMid;
uniform vec3 uSkyBottom;
uniform vec3 uSun;
uniform vec3 uCloudLight;
uniform vec3 uCloudShadow;
uniform vec3 uStormTop;
uniform vec3 uStormBottom;
uniform vec3 uStormLight;
uniform vec3 uStormShadow;
out vec4 fragColor;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

const mat2 ROT = mat2(1.6, 1.2, -1.2, 1.6);

/* Sase octave: formele au contur si textura, nu sunt doar pete moi. */
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = ROT * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float aspect = iResolution.x / iResolution.y;
  float t = iTime * uSpeed;

  /* 0 = intunecat, 1 = senin. */
  float k = smoothstep(0.0, 1.0, uClear);

  /* Seninul are trei trepte: albastru sus, deschis la mijloc, cald jos. */
  vec3 clearSky = uv.y > 0.5
    ? mix(uSkyMid, uSkyTop, smoothstep(0.5, 1.0, uv.y))
    : mix(uSkyBottom, uSkyMid, smoothstep(0.0, 0.5, uv.y));
  /* Soarele abia rasarit: o stralucire joasa, in dreapta. */
  vec2 sunPos = vec2(0.78 * aspect, 0.12);
  float glow = exp(-length(vec2(uv.x * aspect, uv.y) - sunPos) * 2.4);
  clearSky = mix(clearSky, uSun, glow * 0.55);

  vec3 stormSky = mix(uStormBottom, uStormTop, uv.y);
  vec3 col = mix(stormSky, clearSky, k);

  /* Formele: un fbm deformat de altul, alunecand spre dreapta. */
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.25 + 3.0;
  p.x -= t * 0.06;
  float warp = fbm(p * 0.8 + vec2(t * 0.02, -t * 0.015));
  float n = fbm(p + vec2(warp, warp * 0.6) * 1.3);

  /* Mai putina acoperire jos, spre linia unde incepe pagina. */
  float cover = mix(uStormCover, uCover, k) * (0.65 + 0.35 * smoothstep(0.0, 0.7, uv.y));
  /* Trecere scurta intre cer si nor: marginea formelor se vede. */
  float d = smoothstep(1.0 - cover, 1.0 - cover + 0.16, n);

  /* Umbrire simpla: miezul si partea de sus a formelor sunt mai luminate. */
  float lit = clamp(0.3 + d * 0.6 + (uv.y - 0.5) * 0.4, 0.0, 1.0);
  vec3 light = mix(uStormLight, uCloudLight, k);
  vec3 shadow = mix(uStormShadow, uCloudShadow, k);
  col = mix(col, mix(shadow, light, lit), d * 0.95);

  fragColor = vec4(col, 1.0);
}
`;

export type SkyCloudsProps = {
  /** Elementul prin care derulezi ca sa se insenineze. Fara el, cerul e senin. */
  trackRef?: RefObject<HTMLElement | null>;
  /** Seninul, sus. */
  skyTop?: string;
  /** Seninul, la mijloc. */
  skyMid?: string;
  /** Seninul, spre orizont. */
  skyBottom?: string;
  /** Stralucirea soarelui de la orizont. */
  sun?: string;
  /** Formele pe senin, partea luminata. */
  cloudLight?: string;
  /** Formele pe senin, partea umbrita. */
  cloudShadow?: string;
  /** Cerul intunecat, sus. */
  stormTop?: string;
  /** Cerul intunecat, spre orizont. */
  stormBottom?: string;
  /** Formele pe intunecat, partea luminata. */
  stormLight?: string;
  /** Formele pe intunecat, partea umbrita. */
  stormShadow?: string;
  /** Viteza cu care aluneca formele. */
  speed?: number;
  /** Cat din cer e acoperit pe senin (0 -> 1). */
  cover?: number;
  /** Cat din cer e acoperit pe intunecat. */
  stormCover?: number;
  className?: string;
};

/** Jumatate din pixeli: formele raman clare, dar costa de patru ori mai putin. */
const RENDER_SCALE = 1 / 2;
/** Formele se misca foarte incet; 30 de cadre pe secunda ajung. */
const FRAME_MS = 1000 / 30;
/** De aici incolo cerul e considerat senin: apar textul si butonul. */
const OPEN_AT = 0.7;
/** Pe ecranele astea cerul se insenineaza singur, fara derulare. */
const INTRO_QUERY = '(max-width: 47.999rem)';
/** Pauza de la incarcare pana porneste intro-ul si durata lui. */
const INTRO_DELAY_MS = 300;
const INTRO_MS = 2800;

export function SkyClouds({
  trackRef,
  /* Paleta pleaca din culorile site-ului: intunericul e panoul espresso
     (#2e1f16) dus spre noapte, seninul e un rasarit incetosat in mocha si
     crem, nu albastru cu galben. */
  skyTop = '#b98f77',
  skyMid = '#e9d6c8',
  skyBottom = '#f6ece4',
  sun = '#f4d2ba',
  cloudLight = '#fffcf9',
  cloudShadow = '#d9bfae',
  stormTop = '#140f0c',
  stormBottom = '#2e1f16',
  stormLight = '#5e4436',
  stormShadow = '#1a120e',
  speed = 0.45,
  cover = 0.5,
  stormCover = 0.85,
  className,
}: SkyCloudsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialRef = useRef({
    skyTop,
    skyMid,
    skyBottom,
    sun,
    cloudLight,
    cloudShadow,
    stormTop,
    stormBottom,
    stormLight,
    stormShadow,
    speed,
    cover,
    stormCover,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initial = initialRef.current;
    const color = (hex: string) => ({ value: new Float32Array(hexToRgb(hex)) });

    const introQuery = window.matchMedia(INTRO_QUERY);
    const introReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const introStartedAt = performance.now();

    /* Cat de senin e: pe telefon dupa timpul scurs de la incarcare, altfel
       dupa cat ai derulat prin element. */
    const readClear = () => {
      if (introQuery.matches) {
        if (introReduced.matches) return 1;
        const elapsed = performance.now() - introStartedAt - INTRO_DELAY_MS;
        return Math.min(1, Math.max(0, elapsed / INTRO_MS));
      }
      const track = trackRef?.current;
      if (!track) return 1;
      const rect = track.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      if (range <= 0) return 1;
      return Math.min(1, Math.max(0, -rect.top / range));
    };

    /* Doar cand se schimba: fiecare scriere recalculeaza stilul sectiunii. */
    let published = '';
    let open = '';
    const publish = (value: number) => {
      const track = trackRef?.current;
      if (!track) return;
      const next = value.toFixed(3);
      if (next !== published) {
        published = next;
        track.style.setProperty('--sky-clear', next);
      }
      const nextOpen = value >= OPEN_AT ? 'open' : 'closed';
      if (nextOpen !== open) {
        open = nextOpen;
        track.dataset.sky = nextOpen;
      }
    };

    let clear = readClear();
    publish(clear);

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: false,
        antialias: false,
        depth: false,
        dpr: 1,
        powerPreference: 'low-power',
      });
    } catch {
      /* Fara WebGL ramane gradientul din CSS; textul se ia tot dupa derulare,
         iar pe telefon dupa timp. */
      const onScrollOnly = () => publish(readClear());
      window.addEventListener('scroll', onScrollOnly, { passive: true });
      let introFrame = 0;
      const introTick = () => {
        const value = readClear();
        publish(value);
        if (introQuery.matches && value < 1) introFrame = requestAnimationFrame(introTick);
      };
      introTick();
      return () => {
        cancelAnimationFrame(introFrame);
        window.removeEventListener('scroll', onScrollOnly);
      };
    }

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.display = 'block';
    /* Peste gradientul de rezerva din CSS, care e pozitionat. */
    canvas.style.position = 'relative';
    container.appendChild(canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: initial.speed },
        uCover: { value: initial.cover },
        uStormCover: { value: initial.stormCover },
        uClear: { value: clear },
        uSkyTop: color(initial.skyTop),
        uSkyMid: color(initial.skyMid),
        uSkyBottom: color(initial.skyBottom),
        uSun: color(initial.sun),
        uCloudLight: color(initial.cloudLight),
        uCloudShadow: color(initial.cloudShadow),
        uStormTop: color(initial.stormTop),
        uStormBottom: color(initial.stormBottom),
        uStormLight: color(initial.stormLight),
        uStormShadow: color(initial.stormShadow),
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const render = () => renderer.render({ scene: mesh });

    /* Pornim dintr-un moment oarecare, ca formele sa fie deja asezate. */
    const offset = 40;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(
        Math.max(1, Math.floor(rect.width * RENDER_SCALE)),
        Math.max(1, Math.floor(rect.height * RENDER_SCALE)),
      );
      /* `setSize` pune marimea in pixeli pe panza; o intindem inapoi. */
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      const resolution = program.uniforms.iResolution.value as Float32Array;
      resolution[0] = gl.drawingBufferWidth;
      resolution[1] = gl.drawingBufferHeight;
      render();
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    program.uniforms.iTime.value = offset;
    setSize();

    let frame = 0;
    let lastDraw = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const startedAt = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* Derularea e deja lina (Lenis), deci cerul o urmeaza direct. */
    const syncClear = () => {
      const next = readClear();
      const changed = next !== clear;
      clear = next;
      program.uniforms.uClear.value = clear;
      publish(clear);
      return changed;
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const changed = syncClear();
      /* Intre cadrele de ~30fps redesenam doar daca s-a schimbat derularea. */
      if (!changed && now - lastDraw < FRAME_MS) return;
      lastDraw = now;
      program.uniforms.iTime.value = offset + (now - startedAt) * 0.001;
      render();
    };

    /* Cand bucla nu ruleaza (fara miscare), redesenam doar la derulare. */
    const onScroll = () => {
      if (frame !== 0) return;
      if (syncClear()) render();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const tryStart = () => {
      if (reducedMotion.matches) return;
      if (isVisible && isPageVisible && frame === 0) frame = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (frame !== 0) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    /* Nu consumam GPU cand cerul e in afara ecranului sau tabul e ascuns. */
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) tryStart();
      else tryStop();
    });
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) tryStart();
      else tryStop();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        tryStop();
        syncClear();
        render();
      } else tryStart();
    };
    reducedMotion.addEventListener('change', onMotionPreferenceChange);

    tryStart();

    return () => {
      tryStop();
      window.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
      canvas.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [trackRef]);

  return <div ref={containerRef} className={cx(styles.container, className)} aria-hidden="true" />;
}
