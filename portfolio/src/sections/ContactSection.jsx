import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TO_EMAIL = 'mdeisakangod@gmail.com';

const contacts = [
  {
    icon: '📧',
    label: 'Email',
    value: 'mdeisakangod@gmail.com',
    color: '#00eeff',
    href: 'mailto:mdeisakangod@gmail.com',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/eisaexe',
    color: '#7c5cfc',
    href: 'https://linkedin.com/in/eisaexe',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/eisaexe',
    color: '#00ffaa',
    href: 'https://github.com/eisaexe',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Bangalore, India',
    color: '#f59e0b',
    href: 'https://maps.google.com/?q=Bangalore,India',
  },
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const msgRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ct-header > *', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      gsap.fromTo('.ct-contact', { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-cols', start: 'top 78%', once: true },
      });
      gsap.fromTo('.ct-form', { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-cols', start: 'top 78%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current?.value || '';
    const from = emailRef.current?.value || '';
    const subject = subjectRef.current?.value || '';
    const body = msgRef.current?.value || '';

    // Compose mailto — opens their default email client addressed to mdeisakangod@gmail.com
    const mailto = `mailto:${TO_EMAIL}`
      + `?subject=${encodeURIComponent(`[Portfolio] ${subject} — from ${name}`)}`
      + `&body=${encodeURIComponent(
        `Hi Mohammed,\n\n${body}\n\n---\nFrom: ${name}\nEmail: ${from}`
      )}`;

    window.location.href = mailto;

    // Button feedback
    const btn = btnRef.current;
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = '✓ Opening email client…';
    btn.style.background = 'linear-gradient(135deg,#00ffaa,#00cc77)';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = 'linear-gradient(135deg,#00eeff,#7c5cfc)';
      e.target.reset();
    }, 3000);
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--card-bg)',
    border: '1px solid var(--card-border)',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.85rem',
    color: 'var(--text)',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s',
  };

  const focusIn = e => (e.target.style.borderColor = 'rgba(0,238,255,0.4)');
  const focusOut = e => (e.target.style.borderColor = 'var(--card-border)');

  return (
    <section id="contact" className="section" ref={sectionRef}>
      {/* Ambient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(124,92,252,0.07) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1040, width: '100%', position: 'relative' }}>

        {/* Header */}
        <div className="ct-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-eyebrow" style={{ justifyContent: 'center', display: 'flex', marginBottom: '1rem' }}>
            Get In Touch
          </span>
          <h2 className="section-title">
            Let's <span className="g-purple">Connect</span>
          </h2>
          <p style={{ marginTop: '1rem', fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: 440, margin: '1rem auto 0' }}>
            Open to AI engineering roles, collaborations, and conversations about LLMs.
          </p>
        </div>

        {/* Columns */}
        <div className="ct-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '2rem', alignItems: 'start' }}>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {contacts.map(({ icon, label, value, color, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="ct-contact glass card-hover"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  opacity: 0,
                  borderColor: `${color}22`,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${color}55`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${color}22`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${color}22`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '0.75rem', flexShrink: 0,
                  background: `${color}12`, border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                  <p style={{ fontSize: '0.85rem', color, marginTop: '0.1rem', fontWeight: 500 }}>{value}</p>
                </div>
                {/* Arrow indicator */}
                <div style={{ marginLeft: 'auto', color: `${color}66`, fontSize: '0.9rem' }}>→</div>
              </a>
            ))}

            {/* Available chip */}
            <div className="ct-contact glass" style={{
              padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem',
              opacity: 0, borderColor: 'rgba(0,255,170,0.2)',
            }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ffaa', boxShadow: '0 0 10px #00ffaa' }} />
                <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid #00ffaa44', animation: 'ring-glow 2s ease-in-out infinite' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#00ffaa' }}>Available for Opportunities</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.15rem' }}>Open to full-time AI Engineer roles</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            className="ct-form glass"
            onSubmit={handleSubmit}
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0 }}
          >
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cyan)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.25rem' }}>
              Send a Message
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                ref={nameRef}
                type="text"
                placeholder="Your Name"
                required
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
              />
              <input
                ref={emailRef}
                type="email"
                placeholder="Your Email"
                required
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
              />
            </div>

            <input
              ref={subjectRef}
              type="text"
              placeholder="Subject"
              required
              style={inputStyle}
              onFocus={focusIn}
              onBlur={focusOut}
            />

            <textarea
              ref={msgRef}
              rows={5}
              placeholder="Your message…"
              required
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={focusIn}
              onBlur={focusOut}
            />

            <button
              ref={btnRef}
              type="submit"
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '0.875rem',
                background: 'linear-gradient(135deg,#00eeff,#7c5cfc)',
                color: '#05070f',
                fontWeight: 700,
                fontSize: '0.88rem',
                fontFamily: 'Space Grotesk, sans-serif',
                transition: 'all 0.3s',
                boxShadow: '0 0 24px rgba(0,238,255,0.2)',
                cursor: 'pointer',
                border: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,238,255,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(0,238,255,0.2)';
              }}
            >
              Send Message →
            </button>
            <p style={{ fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'center' }}>
              Will open your email client to send to mdeisakangod@gmail.com
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
