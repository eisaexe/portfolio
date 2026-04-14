import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { resumeData } from '../data/resumeData';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const exp = resumeData.experience[0];
  const edu = resumeData.education[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eye-brow + title
      gsap.fromTo('.exp-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });

      // Cards slide in from sides
      gsap.fromTo('.exp-card-left', { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-cards', start: 'top 80%', once: true },
      });
      gsap.fromTo('.exp-card-right', { opacity: 0, x: 60 }, {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-cards', start: 'top 80%', once: true },
      });

      // Responsibility items stagger
      gsap.fromTo('.resp-item', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.exp-card-left', start: 'top 70%', once: true },
      });

      // Tenure bar fill animation
      gsap.fromTo('.tenure-fill', { width: '0%' }, {
        width: '40%', duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.tenure-fill', start: 'top 90%', once: true },
      });
      gsap.fromTo('.edu-fill', { width: '0%' }, {
        width: '92%', duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.edu-fill', start: 'top 90%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section" ref={sectionRef}>
      {/* Ambient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 40% at 20% 50%, rgba(124,92,252,0.07) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1040, width: '100%', position: 'relative' }}>

        {/* Header */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="section-eyebrow exp-header" style={{ justifyContent: 'center', display: 'flex', marginBottom: '1rem' }}>
            Career Timeline
          </span>
          <h2 className="section-title exp-header">My <span className="g-purple">Journey</span></h2>
        </div>

        {/* Cards */}
        <div className="exp-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.5rem' }}>

          {/* Experience card */}
          <div className="exp-card-left glass card-hover" style={{ padding: '2rem', opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.4rem' }}>
                  ⚡ Work Experience
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#fff', marginBottom: '0.2rem' }}>
                  {exp.role}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--purple)', fontWeight: 600 }}>{exp.company}</p>
              </div>
              <span style={{
                flexShrink: 0,
                fontSize: '0.7rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 999,
                background: 'rgba(124,92,252,0.12)',
                border: '1px solid rgba(124,92,252,0.3)',
                color: '#a78bfa',
                fontFamily: 'Space Grotesk, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                {exp.duration}
              </span>
            </div>

            {/* Meta */}
            <p style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '1.5rem' }}>
              📍 {exp.location} · {exp.period}
            </p>

            {/* Responsibilities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {exp.responsibilities.map((r, i) => (
                <div key={i} className="resp-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', opacity: 0 }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.55rem', color: '#a78bfa', marginTop: 1,
                  }}>▸</span>
                  <span style={{ fontSize: '0.83rem', color: '#94a3b8', lineHeight: 1.6 }}>{r}</span>
                </div>
              ))}
            </div>

            {/* Tenure progress */}
            <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#475569' }}>Jan 2025</span>
                <span style={{ fontSize: '0.7rem', color: '#475569' }}>Present</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill tenure-fill" style={{ background: 'linear-gradient(to right,rgba(124,92,252,0.6),#7c5cfc)', width: 0 }} />
              </div>
            </div>
          </div>

          {/* Education card */}
          <div className="exp-card-right glass card-hover" style={{ padding: '2rem', opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.4rem' }}>
                  🎓 Education
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '0.2rem', lineHeight: 1.3 }}>
                  {edu.degree}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--cyan)', fontWeight: 600 }}>{edu.institution}</p>
              </div>
              <span style={{
                flexShrink: 0,
                fontSize: '0.7rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 999,
                background: 'rgba(0,238,255,0.1)',
                border: '1px solid rgba(0,238,255,0.25)',
                color: '#67e8f9',
                fontFamily: 'Space Grotesk, sans-serif',
              }}>
                {edu.gpa}
              </span>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '1.5rem' }}>
              📍 {edu.location} · {edu.year}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {edu.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(0,238,255,0.1)', border: '1px solid rgba(0,238,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.55rem', color: '#67e8f9', marginTop: 1,
                  }}>▸</span>
                  <span style={{ fontSize: '0.83rem', color: '#94a3b8', lineHeight: 1.6 }}>{h}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#475569' }}>2021</span>
                <span style={{ fontSize: '0.7rem', color: '#475569' }}>2025</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill edu-fill" style={{ background: 'linear-gradient(to right,rgba(0,238,255,0.6),#00eeff)', width: 0 }} />
              </div>
            </div>

            {/* Particle hint chip */}
            <div style={{
              marginTop: '1.5rem',
              padding: '0.6rem 1rem',
              borderRadius: '0.75rem',
              background: 'rgba(124,92,252,0.06)',
              border: '1px solid rgba(124,92,252,0.12)',
              fontSize: '0.72rem',
              color: '#64748b',
              lineHeight: 1.5,
            }}>
              🌌 Particles morphed into a <span style={{ color: '#a78bfa' }}>structured grid</span> representing this timeline
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
