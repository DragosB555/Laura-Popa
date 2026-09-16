'use client';

import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { cx } from '@/lib/cx';
import styles from './GradientWaves.module.css';

/* =========================================================================
   GradientWaves — reactbits.dev
   Camp de valuri raymarchate in WebGL. Sursa originala este JavaScript;
   aici e portata la TypeScript si la conventiile proiectului (CSS Modules).
   Logica shaderului este neschimbata.
   ========================================================================= */

export type GradientWavesDetail = 'low' | 'medium' | 'high';

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const detailToSteps = (detail: GradientWavesDetail): number => {
  if (detail === 'low') return 40;
  if (detail === 'high') return 110;
  return 70;
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaveScale;
uniform float uWaveRatio;
uniform float uSwell;
uniform float uTurbulence;
uniform float uTilt;
uniform float uZoom;
uniform float uHeight;
uniform float uFogDepth;
uniform float uSteps;
uniform float uBrightness;
uniform float uOpacity;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec2 uMouse;
uniform float uParallax;
uniform bool uEnableMouse;
uniform vec3 uHorizonColor;
uniform vec3 uWaveColor;
uniform vec3 uCrestColor;
out vec4 fragColor;

const float MAX_DIST = 20000.0;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float plasma(vec3 r, vec2 freq, vec4 tc) {
  float mx = r.x + tc.x;
  mx += uSwell * sin((r.y + mx) / 20.0 + tc.y);
  float my = r.y - tc.z;
  my += uTurbulence * cos(r.x / 23.0 + tc.w);
  return r.z - (sin(mx * freq.x) * uAmplitude + sin(my * freq.y) * uAmplitude + uHeight);
}

float raymarch(vec3 pos, vec3 dir, vec2 freq, vec4 tc) {
  float dist = 0.0;
  for (int i = 0; i < 128; i++) {
    if (float(i) >= uSteps) break;
    float dscene = plasma(pos + dist * dir, freq, tc);
    if (abs(dscene) < 0.1) break;
    dist += 0.9 * dscene;
    if (!(abs(dist) < MAX_DIST)) return MAX_DIST;
  }
  return dist;
}

void main() {
  float T = iTime * uSpeed;
  vec2 freq = vec2(uWaveScale / 7.0, (uWaveScale * uWaveRatio) / 3.0);
  vec4 tc = vec4(T / 0.130, T / 0.810, T / 0.200, T / 0.710);
  float c, s;
  float vfov = (3.14159 / 2.3) / max(uZoom, 0.05);
  vec3 cam = vec3(0.0, 0.0, 30.0);
  vec2 uv = (gl_FragCoord.xy / iResolution.xy) - 0.5;
  uv.x *= iResolution.x / iResolution.y;
  uv.y *= -1.0;

  vec3 dir = vec3(0.0, 0.0, -1.0);
  float ulen = length(uv);
  float xrot = vfov * ulen;
  c = cos(xrot); s = sin(xrot);
  dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
  vec2 nuv = ulen > 1e-5 ? uv / ulen : vec2(1.0, 0.0);
  c = nuv.x; s = nuv.y;
  dir = mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0) * dir;
  c = cos(uTilt); s = sin(uTilt);
  dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;

  if (uEnableMouse) {
    float yaw = (uMouse.x - 0.5) * uParallax * 0.4;
    float pitch = (uMouse.y - 0.5) * uParallax * 0.4;
    c = cos(yaw); s = sin(yaw);
    dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;
    c = cos(pitch); s = sin(pitch);
    dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
  }

  float dist = raymarch(cam, dir, freq, tc);
  vec3 pos = cam + dist * dir;

  float t = clamp(uFogDepth / max(dist, 0.001), 0.0, 1.0);
  vec3 body = mix(uWaveColor, uCrestColor, clamp(pos.z * 0.08 + 0.5, 0.0, 1.0));
  vec3 col = mix(uHorizonColor, body, t);
  col *= uBrightness;
  col = clamp(col, 0.0, 1.0);

  float alpha = clamp(t, 0.0, 1.0) * uOpacity;
  if (uGrain > 0.5) {
    float g = hash21(gl_FragCoord.xy + mod(iTime, 64.0) * 11.0);
    alpha += (g - 0.5) * uGrainIntensity;
  }
  alpha = clamp(alpha, 0.0, 1.0);
  fragColor = vec4(col * alpha, alpha);
}
`;

export type GradientWavesProps = {
  /** Culoarea cetii de la orizont, in care se pierd valurile. */
  horizonColor?: string;
  /** Culoarea corpului valurilor. */
  waveColor?: string;
  /** Culoarea crestelor din prim-plan. */
  crestColor?: string;
  /** Viteza de animatie a campului de valuri. */
  speed?: number;
  /** Inaltimea valurilor. */
  amplitude?: number;
  /** Frecventa spatiala generala. */
  waveScale?: number;
  /** Raportul dintre lungimile de unda scurta si lunga. */
  waveRatio?: number;
  /** Distorsiune orizontala de amploare. */
  swell?: number;
  /** Turbulenta transversala. */
  turbulence?: number;
  /** Inclinarea camerei spre orizont (radiani). */
  tilt?: number;
  /** Apropierea in campul de valuri. */
  zoom?: number;
  /** Decalajul vertical al liniei orizontului. */
  height?: number;
  /** Distanta pe care valurile se pierd in ceata si in transparenta. */
  fogDepth?: number;
  /** Calitatea raymarch-ului. Mai mare inseamna mai scump de randat. */
  detail?: GradientWavesDetail;
  /** Multiplicator de luminozitate. */
  brightness?: number;
  /** Opacitatea globala a efectului. */
  opacity?: number;
  /** Parallax discret dupa cursor. */
  mouseInteraction?: boolean;
  /** Intensitatea parallax-ului. */
  parallaxStrength?: number;
  /** Granulatie fina peste efect. */
  grain?: boolean;
  /** Amplitudinea granulatiei. 0 o dezactiveaza. */
  grainIntensity?: number;
  className?: string;
};

type WebglContext = {
  renderer: Renderer;
  program: Program;
  mesh: Mesh;
};

export function GradientWaves({
  horizonColor = '#f4ece5',
  waveColor = '#8a5f46',
  crestColor = '#FFFFFF',
  speed = 0.4,
  amplitude = 2.5,
  waveScale = 0.6,
  waveRatio = 0.9,
  swell = 35,
  turbulence = 20,
  tilt = 1.11,
  zoom = 1,
  height = 5.5,
  fogDepth = 15,
  detail = 'medium',
  brightness = 1,
  opacity = 1,
  mouseInteraction = true,
  parallaxStrength = 0.5,
  grain = true,
  grainIntensity = 0.05,
  className,
}: GradientWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<WebglContext | null>(null);
  const enableMouseRef = useRef(mouseInteraction);

  /* Valorile de pornire ale uniformelor. `useRef` le retine doar de la primul
     render, deci contextul WebGL se creeaza direct cu culorile corecte —
     fara sa clipeasca o clipa in paleta implicita. */
  const initialRef = useRef({
    horizonColor,
    waveColor,
    crestColor,
    speed,
    amplitude,
    waveScale,
    waveRatio,
    swell,
    turbulence,
    tilt,
    zoom,
    height,
    fogDepth,
    detail,
    brightness,
    opacity,
    mouseInteraction,
    parallaxStrength,
    grain,
    grainIntensity,
  });

  /* Creeaza contextul WebGL o singura data. Schimbarile de prop-uri sunt
     preluate de efectul urmator, fara sa reconstruiasca scena. */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initial = initialRef.current;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: initial.speed },
        uAmplitude: { value: initial.amplitude },
        uWaveScale: { value: initial.waveScale },
        uWaveRatio: { value: initial.waveRatio },
        uSwell: { value: initial.swell },
        uTurbulence: { value: initial.turbulence },
        uTilt: { value: initial.tilt },
        uZoom: { value: initial.zoom },
        uHeight: { value: initial.height },
        uFogDepth: { value: initial.fogDepth },
        uSteps: { value: detailToSteps(initial.detail) },
        uBrightness: { value: initial.brightness },
        uOpacity: { value: initial.opacity },
        uGrain: { value: initial.grain ? 1 : 0 },
        uGrainIntensity: { value: initial.grainIntensity },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uParallax: { value: initial.parallaxStrength },
        uEnableMouse: { value: initial.mouseInteraction },
        uHorizonColor: { value: new Float32Array(hexToRgb(initial.horizonColor)) },
        uWaveColor: { value: new Float32Array(hexToRgb(initial.waveColor)) },
        uCrestColor: { value: new Float32Array(hexToRgb(initial.crestColor)) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    contextRef.current = { renderer, program, mesh };

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      const resolution = program.uniforms.iResolution.value as Float32Array;
      resolution[0] = gl.drawingBufferWidth;
      resolution[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    setSize();

    const currentMouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse[0] = (event.clientX - rect.left) / rect.width;
      targetMouse[1] = 1 - (event.clientY - rect.top) / rect.height;
    };
    const onPointerLeave = () => {
      targetMouse[0] = 0.5;
      targetMouse[1] = 0.5;
    };
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    let frame = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const startedAt = performance.now();

    /* Respectam preferinta de miscare redusa: nu pornim bucla,
       raman valurile randate static. */
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const loop = (now: number) => {
      program.uniforms.iTime.value = (now - startedAt) * 0.001;
      const targetX = enableMouseRef.current ? targetMouse[0] : 0.5;
      const targetY = enableMouseRef.current ? targetMouse[1] : 0.5;
      currentMouse[0] += 0.05 * (targetX - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetY - currentMouse[1]);
      const mouse = program.uniforms.uMouse.value as Float32Array;
      mouse[0] = currentMouse[0];
      mouse[1] = currentMouse[1];
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };

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

    /* Nu consumam GPU cand efectul e in afara ecranului sau tabul e ascuns. */
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) tryStart();
        else tryStop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) tryStart();
      else tryStop();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) tryStop();
      else tryStart();
    };
    reducedMotion.addEventListener('change', onMotionPreferenceChange);

    tryStart();

    return () => {
      tryStop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      contextRef.current = null;
      canvas.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  /* Sincronizeaza prop-urile cu uniformele, fara sa reconstruiasca scena. */
  useEffect(() => {
    const context = contextRef.current;
    if (!context) return;

    const { program, renderer, mesh } = context;
    const uniforms = program.uniforms;

    enableMouseRef.current = mouseInteraction;

    uniforms.uSpeed.value = speed;
    uniforms.uAmplitude.value = amplitude;
    uniforms.uWaveScale.value = waveScale;
    uniforms.uWaveRatio.value = waveRatio;
    uniforms.uSwell.value = swell;
    uniforms.uTurbulence.value = turbulence;
    uniforms.uTilt.value = tilt;
    uniforms.uZoom.value = zoom;
    uniforms.uHeight.value = height;
    uniforms.uFogDepth.value = fogDepth;
    uniforms.uSteps.value = detailToSteps(detail);
    uniforms.uBrightness.value = brightness;
    uniforms.uOpacity.value = opacity;
    uniforms.uGrain.value = grain ? 1 : 0;
    uniforms.uGrainIntensity.value = grainIntensity;
    uniforms.uParallax.value = parallaxStrength;
    uniforms.uEnableMouse.value = mouseInteraction;

    const write = (target: Float32Array, hex: string) => {
      const [r, g, b] = hexToRgb(hex);
      target[0] = r;
      target[1] = g;
      target[2] = b;
    };
    write(uniforms.uHorizonColor.value as Float32Array, horizonColor);
    write(uniforms.uWaveColor.value as Float32Array, waveColor);
    write(uniforms.uCrestColor.value as Float32Array, crestColor);

    /* Redeseneaza o data, ca schimbarea sa se vada si cand bucla e oprita
       (miscare redusa, tab ascuns, efect in afara ecranului). */
    renderer.render({ scene: mesh });
  }, [
    horizonColor,
    waveColor,
    crestColor,
    speed,
    amplitude,
    waveScale,
    waveRatio,
    swell,
    turbulence,
    tilt,
    zoom,
    height,
    fogDepth,
    detail,
    brightness,
    opacity,
    grain,
    grainIntensity,
    mouseInteraction,
    parallaxStrength,
  ]);

  return <div ref={containerRef} className={cx(styles.container, className)} />;
}
