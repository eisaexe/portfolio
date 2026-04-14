import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { resumeData } from '../data/resumeData';

gsap.registerPlugin(ScrollTrigger);

const TYPE_META = {
  enterprise: { icon: '⬡', color: '#00eeff', border: 'rgba(0,238,255,0.2)',  bg: 'rgba(0,238,255,0.05)',  label: 'Enterprise AI' },
  analytics:  { icon: '◈', color: '#7c5cfc', border: 'rgba(124,92,252,0.2)', bg: 'rgba(124,92,252,0.05)', label: 'Analytics' },
  generative: { icon: '◇', color: '#00ffaa', border: 'rgba(0,255,170,0.2)',  bg: 'rgba(0,255,170,0.05)',  label: 'Generative AI' },
};

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-header > *', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });

      // Cards stagger up
      gsap.fromTo('.proj-card', {
        opacity: 0,
        y: 70,
        scale: 0.96,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-grid', start: 'top 78%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      {/* Ambient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 45% at 80% 40%, rgba(0,255,170,0.06) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1100, width: '100%', position: 'relative' }}>

        {/* Header */}
        <div className="proj-header" style={{ marginBottom: '4rem', maxWidth: 640 }}>
          <span className="section-eyebrow" style={{ display: 'flex', marginBottom: '1rem' }}>
            Knowledge Graph · Section 03
          </span>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Featured <span className="g-all">Projects</span>
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.75 }}>
            Real-world AI systems — each card is a node in the particle knowledge graph above.
          </p>
        </div>

        {/* Grid */}
        <div
          className="proj-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}
        >
          {resumeData.projects.map((project) => {
            const meta = TYPE_META[project.type];
            return (
              <div
                key={project.name}
                className="proj-card glass card-hover"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', opacity: 0, borderColor: meta.border }}
              >
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: 44, height: 44,
                      borderRadius: '0.875rem',
                      background: meta.bg,
                      border: `1px solid ${meta.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.3rem', color: meta.color,
                    }}
                  >
                    {meta.icon}
                  </div>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em',
                    padding: '0.3rem 0.8rem', borderRadius: 999,
                    background: meta.bg, border: `1px solid ${meta.border}`,
                    color: meta.color, fontFamily: 'Space Grotesk, sans-serif',
                    textTransform: 'uppercase',
                  }}>
                    {meta.label}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#fff',
                  marginBottom: '0.75rem',
                  lineHeight: 1.35,
                }}>
                  {project.name}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.83rem', color: '#64748b', lineHeight: 1.7, marginBottom: '1.25rem', flex: 1 }}>
                  {project.description}
                </p>

                {/* Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {project.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: meta.color, fontSize: '0.7rem' }}>✓</span>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech chips */}
                <div style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
                }}>
                  {project.tech.map(t => (
                    <span key={t} style={{
                      fontSize: '0.7rem',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#64748b',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
