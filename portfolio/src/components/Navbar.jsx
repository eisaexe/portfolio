import { useState, useEffect, useCallback } from 'react';

const links = [
  { label: 'Work',     href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
];

import heroImg from '../assets/hero.png';

// Sun icon
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

// Moon icon
function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
    </svg>
  );
}

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: '1.2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
        opacity: scrolled ? 1 : 0.9,
        width: 'calc(100% - 2rem)',
        maxWidth: 780,
      }}
    >
      <div
        className="nav-pill"
        style={{
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
          justifyContent: 'space-between',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', flexShrink: 0 }}>
          <div className="nav-avatar-ring">
            <div className="nav-avatar-inner">
              <img 
                src={heroImg} 
                alt="ME" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
              <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <span className="nav-avatar-initials">ME</span>
              </div>
            </div>
          </div>
          <span className="nav-brand-text">M. Eisa</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links-desktop">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {/* Dark/Light toggle */}
          <button
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            <div className="theme-toggle-track" style={{ background: darkMode ? 'rgba(0,238,255,0.15)' : 'rgba(245,158,11,0.15)' }}>
              <div className="theme-toggle-thumb" style={{ transform: darkMode ? 'translateX(0)' : 'translateX(22px)' }}>
                {darkMode ? <MoonIcon /> : <SunIcon />}
              </div>
            </div>
          </button>

          {/* Hire Me CTA – hidden on mobile */}
          <a href="#contact" className="nav-cta-btn">Hire Me</a>

          {/* Hamburger – mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Menu"
          >
            <span className={`ham-bar ${menuOpen ? 'open1' : ''}`} />
            <span className={`ham-bar ${menuOpen ? 'open2' : ''}`} />
            <span className={`ham-bar ${menuOpen ? 'open3' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(({ label, href }) => (
          <a key={label} href={href} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#contact" className="mobile-menu-cta" onClick={() => setMenuOpen(false)}>Hire Me →</a>
      </div>
    </nav>
  );
}
