import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function PhotoAvatar() {
  const [photo, setPhoto] = useState(() => localStorage.getItem('hero-photo') || null);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('hero-photo', reader.result);
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="hero-avatar-wrap" onClick={() => inputRef.current?.click()} title="Click to upload your photo">
      {/* Spinning orbit rings */}
      {[96, 132, 172].map((sz, i) => (
        <div
          key={i}
          className="orbit-ring"
          style={{
            width: sz, height: sz,
            animationDuration: `${10 + i * 4}s`,
            animationDirection: i % 2 ? 'reverse' : 'normal',
            borderColor: i === 0 ? 'rgba(0,238,255,0.25)' : i === 1 ? 'rgba(124,92,252,0.18)' : 'rgba(0,255,168,0.12)',
          }}
        />
      ))}
      {/* Photo or initials */}
      <div className="hero-avatar-circle">
        {photo ? (
          <img src={photo} alt="Mohammed Eisa" className="hero-avatar-img" />
        ) : (
          <>
            <span className="hero-avatar-initials-text g-all">ME</span>
            <div className="hero-avatar-upload-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>

            </div>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
    </div>
  );
}

const WORDS = ['AI Engineer', 'LLM Developer', 'RAG Specialist', 'ML Engineer'];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef(null);

  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  // GSAP entrance (runs once on mount)
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(h1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, '-=0.3')
      .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .fromTo(
        statsRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.3'
      );
  }, []);

  // Typewriter
  useEffect(() => {
    const word = WORDS[wordIdx];
    if (!deleting && displayed.length < word.length) {
      timerRef.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === word.length) {
      timerRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timerRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setWordIdx(p => (p + 1) % WORDS.length);
    }
    return () => clearTimeout(timerRef.current);
  }, [displayed, deleting, wordIdx]);

  const stats = [
    { label: 'AI Projects', value: '3+' },
    { label: 'Framework', value: 'RAG + MCP' },
    { label: 'Company', value: 'Altimetrik' },
    { label: 'GPA', value: '8.2/10' },
  ];

  return (
    <section id="hero" className="section" ref={heroRef}>
      {/* Radial ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(124,92,252,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 720, width: '100%', textAlign: 'center', position: 'relative' }}>

        {/* Eyebrow */}
        <div ref={eyebrowRef} style={{ opacity: 0 }}>
          <span className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '2rem', display: 'flex' }}>
            My Portfolio
          </span>
        </div>

        {/* Avatar */}
        <div className="float" style={{ display: 'inline-block', marginBottom: '2.5rem' }}>
          <PhotoAvatar />
        </div>

        {/* Heading */}
        <h1
          ref={h1Ref}
          style={{
            opacity: 0,
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '1.2rem',
          }}
        >
          <span className="g-all">Mohammed Eisa</span>
        </h1>

        {/* Typewriter */}
        <div
          ref={subRef}
          style={{
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            marginBottom: '1.5rem',
            height: '2.2rem',
          }}
        >
          <span style={{ color: 'var(--cyan)', fontSize: '1.2rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>
            {displayed}
          </span>
          <span className="cursor" style={{ color: 'var(--cyan)', fontSize: '1.3rem', lineHeight: 1 }}>|</span>
        </div>

        {/* Sub-text */}
        <p
          style={{
            color: '#64748b',
            fontSize: '1rem',
            lineHeight: 1.8,
            maxWidth: 520,
            margin: '0 auto 2.5rem',
          }}
        >
          Building production-grade{' '}
          <span style={{ color: '#94a3b8' }}>LLM applications</span>,{' '}
          <span style={{ color: '#94a3b8' }}>RAG pipelines</span>, and{' '}
          <span style={{ color: '#94a3b8' }}>multi-agent systems</span> at Altimetrik.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ opacity: 0, display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-ghost">Get In Touch</a>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '1.25rem',
            border: '1px solid rgba(255,255,255,0.07)',
            overflow: 'hidden',
          }}
        >
          {stats.map(({ label, value }, i) => (
            <div
              key={label}
              style={{
                flex: '1 1 120px',
                padding: '1.4rem 1rem',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.02)',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div className="stat-value g-cyan">{value}</div>
              <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.3rem', fontFamily: 'Space Grotesk, sans-serif' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.35 }}>
          <span style={{ fontSize: '0.65rem', color: '#475569', letterSpacing: '0.12em', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #00eeff88, transparent)' }} />
        </div>
      </div>
    </section>
  );
}
