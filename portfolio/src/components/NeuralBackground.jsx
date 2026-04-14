import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT   = 140;
const FIELD        = 9.5;    // half-extent of node field in world units
const CONNECT_DIST = 2.3;    // max distance to draw a connecting line
const REPEL_RADIUS = 3.2;    // cursor influence radius
const REPEL_FORCE  = 4.0;    // how hard cursor pushes
const SPRING_K     = 0.032;  // spring constant pulling to origin
const DAMPING      = 0.87;   // velocity damping (lower = floatier)

/* ── Glow sprite texture ────────────────────────────────────────── */
function makeGlowTexture() {
  const sz  = 128;
  const cvs = document.createElement('canvas');
  cvs.width = cvs.height = sz;
  const ctx = cvs.getContext('2d');
  const g   = ctx.createRadialGradient(sz/2, sz/2, 0, sz/2, sz/2, sz/2);
  g.addColorStop(0,    'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  g.addColorStop(0.6,  'rgba(255,255,255,0.3)');
  g.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, sz, sz);
  return new THREE.CanvasTexture(cvs);
}

export default function NeuralBackground({ particleEffect }) {
  const { size } = useThree();

  /* ── Static node data ──────────────────────────────────────── */
  const origins = useMemo(() =>
    Array.from({ length: NODE_COUNT }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * FIELD,
        (Math.random() - 0.5) * FIELD,
        (Math.random() - 0.5) * FIELD * 0.35,
      )
    )
  , []);

  const phases = useMemo(() =>
    Array.from({ length: NODE_COUNT }, () => ({
      px:  Math.random() * Math.PI * 2,
      py:  Math.random() * Math.PI * 2,
      spd: 0.18 + Math.random() * 0.38,
      amp: 0.05 + Math.random() * 0.09,
    }))
  , []);

  /* ── Pre-computed edges (based on origin proximity) ────────── */
  const edges = useMemo(() => {
    const e = [];
    for (let a = 0; a < NODE_COUNT; a++) {
      for (let b = a + 1; b < NODE_COUNT; b++) {
        if (origins[a].distanceTo(origins[b]) < CONNECT_DIST) e.push([a, b]);
      }
    }
    return e;
  }, [origins]);

  /* ── Mutable physics state ─────────────────────────────────── */
  const posArr = useRef(new Float32Array(NODE_COUNT * 3));
  const velArr = useRef(new Float32Array(NODE_COUNT * 3));

  useEffect(() => {
    origins.forEach((o, i) => {
      posArr.current[i*3]   = o.x;
      posArr.current[i*3+1] = o.y;
      posArr.current[i*3+2] = o.z;
    });
  }, [origins]);

  /* ── Geometries ─────────────────────────────────────────────── */
  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(
      new Float32Array(NODE_COUNT * 3), 3
    ));
    return g;
  }, []);

  const linesGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(
      new Float32Array(edges.length * 6), 3
    ));
    return g;
  }, [edges]);

  /* ── Material refs ──────────────────────────────────────────── */
  const pointsMatRef = useRef();
  const linesMatRef  = useRef();
  const groupRef     = useRef();
  const glowTex      = useMemo(() => makeGlowTexture(), []);

  /* ── Input tracking ─────────────────────────────────────────── */
  const mouse  = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      mouse.current.x = (t.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = -(t.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    window.addEventListener('mousemove',  onMove,   { passive: true });
    window.addEventListener('touchmove',  onTouch,  { passive: true });
    window.addEventListener('scroll',     onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('scroll',    onScroll);
    };
  }, []);

  /* ── Color palettes ─────────────────────────────────────────── */
  const cA = useMemo(() => new THREE.Color('#00eeff'), []);
  const cB = useMemo(() => new THREE.Color('#7c5cfc'), []);
  const cC = useMemo(() => new THREE.Color('#00ffaa'), []);
  const curColor = useRef(new THREE.Color('#00eeff'));

  /* ── Main animation loop ─────────────────────────────────────── */
  useFrame(({ clock }) => {
    const t   = clock.getElapsedTime();
    const sp  = scroll.current;
    const mx  = mouse.current.x;
    const my  = mouse.current.y;
    const p   = posArr.current;
    const v   = velArr.current;

    // Project cursor to approximate world space
    const aspect  = size.width / size.height;
    const cursorX = mx * FIELD * 0.55 * aspect;
    const cursorY = my * FIELD * 0.55;

    // ── Physics simulation ────────────────────────────────────
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;

      // Organic drift target (animated origin)
      const ox = origins[i].x + Math.sin(t * phases[i].spd + phases[i].px) * phases[i].amp;
      const oy = origins[i].y + Math.sin(t * phases[i].spd * 0.85 + phases[i].py) * phases[i].amp;
      const oz = origins[i].z;

      // Spring force → animated origin
      v[i3]   += (ox - p[i3])   * SPRING_K;
      v[i3+1] += (oy - p[i3+1]) * SPRING_K;
      v[i3+2] += (oz - p[i3+2]) * SPRING_K * 0.3;

      // Cursor repulsion (XY plane)
      const dx   = p[i3]   - cursorX;
      const dy   = p[i3+1] - cursorY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < REPEL_RADIUS && dist > 0.001) {
        const strength = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
        // Smooth falloff
        const falloff = strength * strength * 0.016;
        v[i3]   += (dx / dist) * falloff;
        v[i3+1] += (dy / dist) * falloff;
        // Slight outward Z burst for depth effect
        v[i3+2] += falloff * 0.3;
      }

      // Damping + integrate
      v[i3]   *= DAMPING;
      v[i3+1] *= DAMPING;
      v[i3+2] *= DAMPING;
      p[i3]   += v[i3];
      p[i3+1] += v[i3+1];
      p[i3+2] += v[i3+2];
    }

    // ── Update points ─────────────────────────────────────────
    pointsGeo.attributes.position.array.set(p);
    pointsGeo.attributes.position.needsUpdate = true;

    // ── Update lines ──────────────────────────────────────────
    const lp = linesGeo.attributes.position.array;
    edges.forEach(([a, b], i) => {
      const o = i * 6;
      lp[o]   = p[a*3];   lp[o+1] = p[a*3+1]; lp[o+2] = p[a*3+2];
      lp[o+3] = p[b*3];   lp[o+4] = p[b*3+1]; lp[o+5] = p[b*3+2];
    });
    linesGeo.attributes.position.needsUpdate = true;

    // ── Color: scroll-driven cyan → purple → green ────────────
    const seg    = Math.min(sp * 2, 2);
    const target = seg < 1
      ? cA.clone().lerp(cB, seg)
      : cB.clone().lerp(cC, seg - 1);
    curColor.current.lerp(target, 0.025);
    const c = curColor.current;

    if (pointsMatRef.current) {
      pointsMatRef.current.color.set(c);
      // Subtle size pulse
      pointsMatRef.current.size = 0.16 + Math.sin(t * 0.8) * 0.015;
    }
    if (linesMatRef.current) {
      linesMatRef.current.color.set(c);
    }

    // ── Group: mouse-tilt + scroll parallax ──────────────────
    if (groupRef.current) {
      const targetRotY = mx * 0.18;
      const targetRotX = -my * 0.12 + sp * 0.3;
      const targetPosY = -sp * 3.0;

      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
      groupRef.current.position.y += (targetPosY - groupRef.current.position.y) * 0.05;
      // Slow auto-rotation
      groupRef.current.rotation.z = Math.sin(t * 0.05) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing nodes */}
      <points geometry={pointsGeo}>
        <pointsMaterial
          ref={pointsMatRef}
          alphaMap={glowTex}
          size={0.18}
          color="#00eeff"
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          alphaTest={0.005}
          vertexColors={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial
          ref={linesMatRef}
          color="#00eeff"
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
