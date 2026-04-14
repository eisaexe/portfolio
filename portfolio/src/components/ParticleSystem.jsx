import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

const PARTICLE_COUNT = 6000;

// ── Python Logo — two interlocking snakes ─────────────────────────────────────
function generatePythonLogo() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const half = PARTICLE_COUNT / 2;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const isTop = i < half;
    const t = ((isTop ? i : i - half) / half) * Math.PI * 2;
    const r = 1.8;

    if (isTop) {
      // Top snake — curves right, open left
      const angle = t * 0.75 - 0.3;
      positions[i3]     = Math.cos(angle) * r * 0.9 + 0.35;
      positions[i3 + 1] = Math.sin(angle) * r * 0.55 + 0.7;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.25;
      // Scatter for body depth
      if (i % 12 === 0) {
        positions[i3]     += (Math.random() - 0.5) * 0.4;
        positions[i3 + 1] += (Math.random() - 0.5) * 0.4;
      }
    } else {
      // Bottom snake — mirror, curves left, open right
      const angle = t * 0.75 + Math.PI - 0.3;
      positions[i3]     = Math.cos(angle) * r * 0.9 - 0.35;
      positions[i3 + 1] = Math.sin(angle) * r * 0.55 - 0.7;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.25;
      if ((i - half) % 12 === 0) {
        positions[i3]     += (Math.random() - 0.5) * 0.4;
        positions[i3 + 1] += (Math.random() - 0.5) * 0.4;
      }
    }
  }
  return positions;
}

// ── AI Neural Network — layered nodes + axon trails ──────────────────────────
function generateAINetwork() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const layers = [3, 6, 8, 6, 3];
  const totalNodes = layers.reduce((s, n) => s + n, 0);
  const nodeParticles = Math.floor((PARTICLE_COUNT * 0.55) / totalNodes);
  const axonCount = PARTICLE_COUNT - totalNodes * nodeParticles;

  let idx = 0;

  // Place node clusters
  layers.forEach((nodes, li) => {
    const xPos = (li - (layers.length - 1) / 2) * 1.8;
    for (let n = 0; n < nodes; n++) {
      const yPos = (n - (nodes - 1) / 2) * 0.9;
      for (let p = 0; p < nodeParticles && idx < PARTICLE_COUNT; p++) {
        const i3 = idx * 3;
        const spread = 0.12;
        positions[i3]     = xPos + (Math.random() - 0.5) * spread;
        positions[i3 + 1] = yPos + (Math.random() - 0.5) * spread;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.1;
        idx++;
      }
    }
  });

  // Fill the rest as axon trails between nodes of adjacent layers
  while (idx < PARTICLE_COUNT) {
    const i3 = idx * 3;
    const l1 = Math.floor(Math.random() * (layers.length - 1));
    const l2 = l1 + 1;
    const n1 = Math.floor(Math.random() * layers[l1]);
    const n2 = Math.floor(Math.random() * layers[l2]);
    const x1 = (l1 - (layers.length - 1) / 2) * 1.8;
    const y1 = (n1 - (layers[l1] - 1) / 2) * 0.9;
    const x2 = (l2 - (layers.length - 1) / 2) * 1.8;
    const y2 = (n2 - (layers[l2] - 1) / 2) * 0.9;
    const lerp = Math.random();
    positions[i3]     = x1 + (x2 - x1) * lerp + (Math.random() - 0.5) * 0.04;
    positions[i3 + 1] = y1 + (y2 - y1) * lerp + (Math.random() - 0.5) * 0.04;
    positions[i3 + 2] = (Math.random() - 0.5) * 0.08;
    idx++;
  }

  return positions;
}

// ── Neural brain (hero / default) ────────────────────────────────────────────
function generateNeuralBrain() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 2.2 + 0.5 * Math.sin(phi * 3) * Math.cos(theta * 2);
    positions[i3]     = r * Math.sin(phi) * Math.cos(theta) * 1.2;
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.85;
    positions[i3 + 2] = r * Math.cos(phi) * 0.95;
    if (i % 8 === 0) {
      const sp = 3.5;
      positions[i3]     += (Math.random() - 0.5) * sp;
      positions[i3 + 1] += (Math.random() - 0.5) * sp;
      positions[i3 + 2] += (Math.random() - 0.5) * sp;
    }
  }
  return positions;
}

// ── Knowledge graph (projects) ────────────────────────────────────────────────
function generateKnowledgeGraph() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const nodeCount = 14;
  const centers = [];
  for (let n = 0; n < nodeCount; n++) {
    const angle = (n / nodeCount) * Math.PI * 2;
    const radius = 1.4 + Math.random() * 1.0;
    centers.push({
      x: Math.cos(angle) * radius,
      y: (Math.random() - 0.5) * 2.5,
      z: Math.sin(angle) * radius,
    });
  }
  const perNode = Math.floor(PARTICLE_COUNT / nodeCount);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const id = Math.min(Math.floor(i / perNode), nodeCount - 1);
    const c  = centers[id];
    const sp = 0.4;
    positions[i3]     = c.x + (Math.random() - 0.5) * sp;
    positions[i3 + 1] = c.y + (Math.random() - 0.5) * sp;
    positions[i3 + 2] = c.z + (Math.random() - 0.5) * sp;
  }
  return positions;
}

// scroll section → shape mapping
const SHAPES = [generateNeuralBrain, generatePythonLogo, generateAINetwork, generateKnowledgeGraph];

// ── Colours per section ────────────────────────────────────────────────────────
const SECTION_COLORS = [
  new THREE.Color('#00f5ff'), // hero  – cyan
  new THREE.Color('#f7c948'), // exp   – Python yellow
  new THREE.Color('#8b5cf6'), // proj  – AI purple
  new THREE.Color('#00ff88'), // skills – green
];

export default function ParticleSystem({ scrollSection, particleEffect }) {
  const meshRef     = useRef();
  const materialRef = useRef();
  const posRef      = useRef(null);
  const tlRef       = useRef(null);

  // Allocate geometry once
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const ini = generateNeuralBrain();
    pos.set(ini);
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    posRef.current = pos;
    return geo;
  }, []);

  // Point material
  const material = useMemo(() => {
    const mat = new THREE.PointsMaterial({
      size: 0.025,
      color: SECTION_COLORS[0],
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = mat;
    return mat;
  }, []);

  // Morph on scroll section change
  useEffect(() => {
    if (tlRef.current) tlRef.current.kill();

    const target  = SHAPES[scrollSection]?.() ?? generateNeuralBrain();
    const current = posRef.current;
    const tween   = { t: 0 };
    const start   = new Float32Array(current);

    const tl = gsap.timeline();
    tl.to(tween, {
      t: 1,
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        const pos = geometry.attributes.position.array;
        for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
          pos[i] = start[i] + (target[i] - start[i]) * tween.t;
        }
        geometry.attributes.position.needsUpdate = true;
        current.set(pos);
      },
    });
    tlRef.current = tl;

    const c = SECTION_COLORS[scrollSection] ?? SECTION_COLORS[0];
    gsap.to(materialRef.current?.color ?? {}, {
      r: c.r, g: c.g, b: c.b,
      duration: 1.2, ease: 'power2.inOut',
    });
  }, [scrollSection, geometry]);

  // Special particle effects from chatbot
  useEffect(() => {
    if (!materialRef.current) return;
    if (particleEffect === 'python') {
      gsap.to(materialRef.current.color, { r: 0.97, g: 0.79, b: 0.28, duration: 0.5 });
      gsap.to(materialRef.current, {
        opacity: 1, size: 0.045, duration: 0.4,
        onComplete: () => gsap.to(materialRef.current, { opacity: 0.8, size: 0.025, duration: 1.2, delay: 1.5 }),
      });
    } else if (particleEffect === 'rag' || particleEffect === 'llm') {
      gsap.to(materialRef.current, {
        opacity: 1, duration: 0.3, yoyo: true, repeat: 5, ease: 'power1.inOut',
        onComplete: () => { if (materialRef.current) materialRef.current.opacity = 0.8; },
      });
      gsap.to(materialRef.current.color, {
        r: 0.55, g: 0.36, b: 0.96, duration: 0.5,
        onComplete: () => {
          const c = SECTION_COLORS[scrollSection] ?? SECTION_COLORS[0];
          gsap.to(materialRef.current.color, { r: c.r, g: c.g, b: c.b, duration: 2, delay: 2 });
        },
      });
    }
  }, [particleEffect, scrollSection]);

  // Rotation + oscillation
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.045 + scrollSection * 0.5;
    meshRef.current.rotation.x = Math.sin(t * 0.18) * 0.07;
    meshRef.current.position.y = Math.sin(t * 0.28) * 0.12;
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}
