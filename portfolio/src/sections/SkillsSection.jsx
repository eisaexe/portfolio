import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { resumeData } from '../data/resumeData';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  { label: 'Languages',     items: resumeData.skills.languages,  color: '#00eeff', bg: 'rgba(0,238,255,0.07)',  border: 'rgba(0,238,255,0.2)' },
  { label: 'AI / ML',       items: resumeData.skills.ai_ml,      color: '#7c5cfc', bg: 'rgba(124,92,252,0.07)', border: 'rgba(124,92,252,0.2)' },
  { label: 'Frameworks',    items: resumeData.skills.frameworks,  color: '#00ffaa', bg: 'rgba(0,255,170,0.07)',  border: 'rgba(0,255,170,0.2)' },
  { label: 'Cloud & Tools', items: [...resumeData.skills.cloud, ...resumeData.skills.tools], color: '#f59e0b', bg: 'rgba(245,158,11,0.07)', border: 'rgba(245,158,11,0.2)' },
  { label: 'Protocols',     items: resumeData.skills.protocols,  color: '#f472b6', bg: 'rgba(244,114,182,0.07)', border: 'rgba(244,114,182,0.2)' },
];

const bars = [
  { label: 'Python / Scripting', pct: 95, color: '#00eeff' },
  { label: 'LLM Integration',    pct: 92, color: '#7c5cfc' },
  { label: 'RAG & Embeddings',   pct: 90, color: '#00ffaa' },
  { label: 'API Development',    pct: 85, color: '#f59e0b' },
  { label: 'ML / Data Science',  pct: 80, color: '#f472b6' },
  { label: 'Cloud (AWS)',         pct: 65, color: '#38bdf8' },
];

// Issuer badge icons
const ISSUER_ICONS = {
  'Udemy':                  '🎓',
  'Amazon Web Services':    '☁️',
  'Great Learning':         '📊',
};

// ── Certificate Modal / Lightbox ─────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  const overlayRef = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.7, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }
    );

    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleClose = () => {
    gsap.to(cardRef.current,    { opacity: 0, scale: 0.85, y: 20, duration: 0.25, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        ref={cardRef}
        style={{
          background: 'var(--surface)',
          border: `1px solid ${cert.color}33`,
          borderRadius: '1.5rem',
          maxWidth: 700,
          width: '100%',
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 40px ${cert.color}22`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header bar */}
        <div style={{
          background: `linear-gradient(135deg, ${cert.color}15, transparent)`,
          borderBottom: `1px solid ${cert.color}22`,
          padding: '1.25rem 1.5rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '0.875rem', flexShrink: 0,
            background: `${cert.color}15`, border: `1px solid ${cert.color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
          }}>
            {ISSUER_ICONS[cert.issuer] || '🏆'}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>
              {cert.name}
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {cert.issuer} · {cert.year}
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            ✕
          </button>
        </div>

        {/* Certificate image area */}
        <div style={{ padding: '1.5rem' }}>
          {cert.image ? (
            <img
              src={cert.image}
              alt={`${cert.name} certificate`}
              style={{
                width: '100%',
                borderRadius: '0.875rem',
                border: `1px solid ${cert.color}22`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${cert.color}15`,
              }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}

          {/* Placeholder shown when no image or image fails */}
          <div
            style={{
              display: cert.image ? 'none' : 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem 2rem',
              borderRadius: '0.875rem',
              background: `${cert.color}08`,
              border: `2px dashed ${cert.color}30`,
              gap: '1rem',
            }}
          >
            <div style={{ fontSize: '3rem' }}>{ISSUER_ICONS[cert.issuer] || '🏆'}</div>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', textAlign: 'center' }}>
              {cert.name}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Issued by {cert.issuer} · {cert.year}
            </p>
            <p style={{ fontSize: '0.72rem', color: `${cert.color}88`, textAlign: 'center', marginTop: '0.25rem' }}>
              Upload certificate image to{' '}
              <code style={{ background: `${cert.color}12`, padding: '0.1rem 0.4rem', borderRadius: 4, color: cert.color }}>
                src/assets/
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Cert Card ────────────────────────────────────────────────────────────────
function CertCard({ cert }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);

  const handleClick = () => setOpen(true);

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleClick}
        className="cert-card glass"
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          opacity: 0,
          cursor: 'pointer',
          borderColor: `${cert.color}18`,
          transition: 'transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s, border-color 0.3s',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
          e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4), 0 0 24px ${cert.color}22`;
          e.currentTarget.style.borderColor = `${cert.color}45`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = `${cert.color}18`;
        }}
      >
        {/* Subtle gradient shine */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: `linear-gradient(to right, transparent, ${cert.color}40, transparent)`,
        }} />

        <div style={{
          width: 44, height: 44, borderRadius: '0.875rem', flexShrink: 0,
          background: `${cert.color}10`, border: `1px solid ${cert.color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
        }}>
          {ISSUER_ICONS[cert.issuer] || '🏆'}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)',
            lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {cert.name}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.5rem',
              borderRadius: 999, background: `${cert.color}15`, border: `1px solid ${cert.color}30`,
              color: cert.color, fontFamily: 'Space Grotesk, sans-serif',
            }}>
              {cert.issuer}
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
              · {cert.year}
            </span>
          </div>
        </div>

        {/* View indicator */}
        <div style={{
          fontSize: '0.7rem', color: `${cert.color}80`,
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0,
        }}>
          <span style={{ fontSize: '1rem' }}>↗</span>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>View</span>
        </div>
      </div>

      {open && <CertModal cert={cert} onClose={() => setOpen(false)} />}
    </>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sk-header > *', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      gsap.fromTo('.sk-bar-row', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.sk-bars', start: 'top 78%', once: true },
      });
      document.querySelectorAll('.bar-fill-anim').forEach(el => {
        const target = el.dataset.pct + '%';
        gsap.fromTo(el, { width: '0%' }, {
          width: target, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
      gsap.fromTo('.sk-group', { opacity: 0, y: 40, scale: 0.97 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.sk-groups', start: 'top 78%', once: true },
      });
      gsap.fromTo('.cert-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.certs', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(0,238,255,0.05) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1040, width: '100%', position: 'relative' }}>

        {/* Header */}
        <div className="sk-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-eyebrow" style={{ justifyContent: 'center', display: 'flex', marginBottom: '1rem' }}>
            Technical Arsenal
          </span>
          <h2 className="section-title">
            Skills &amp; <span className="g-cyan">Expertise</span>
          </h2>
        </div>

        {/* Bars + Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '2rem', marginBottom: '2.5rem' }}>

          {/* Proficiency bars */}
          <div className="sk-bars glass" style={{ padding: '2rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c5cfc', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '1.5rem' }}>
              Proficiency
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {bars.map(({ label, pct, color }) => (
                <div key={label} className="sk-bar-row" style={{ opacity: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color, fontFamily: 'Space Grotesk, sans-serif' }}>{pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill bar-fill-anim"
                      data-pct={pct}
                      style={{
                        background: `linear-gradient(to right, ${color}66, ${color})`,
                        boxShadow: `0 0 8px ${color}44`,
                        width: 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge groups */}
          <div className="sk-groups" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {skillGroups.map(({ label, items, color, bg, border }) => (
              <div key={label} className="sk-group glass" style={{ padding: '1.25rem 1.5rem', opacity: 0 }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.75rem' }}>
                  {label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {items.map(item => (
                    <span key={item} className="badge" style={{ color, borderColor: border, background: bg }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
              🏆 Certifications
            </p>
            <span style={{
              fontSize: '0.65rem', padding: '0.15rem 0.6rem', borderRadius: 999,
              background: 'rgba(0,238,255,0.08)', border: '1px solid rgba(0,238,255,0.2)',
              color: 'var(--cyan)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
            }}>
              Click to view certificate
            </span>
          </div>

          <div className="certs" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '0.875rem' }}>
            {resumeData.certifications.map(cert => (
              <CertCard key={cert.name} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
