import { useState, useEffect, useCallback, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import HeroSection from './sections/HeroSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [particleEffect, setParticleEffect] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') !== 'light'
  );

  // Apply theme class to root element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode(m => !m), []);

  const triggerParticleEffect = useCallback((effect) => {
    setParticleEffect(effect);
    setTimeout(() => setParticleEffect(null), 4500);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        {/* Scene manages its own scroll reading internally */}
        <Scene particleEffect={particleEffect} />
      </Suspense>

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <ChatBot onParticleEffect={triggerParticleEffect} />

      <div className="scroll-container">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />

        <footer className="site-footer">
          <p>
            Built with{' '}
            <span style={{ color: 'var(--cyan)' }}>React Three Fiber</span> ·{' '}
            <span style={{ color: 'var(--purple)' }}>Three.js</span> ·{' '}
            <span style={{ color: 'var(--green)' }}>GSAP ScrollTrigger</span>
          </p>
          <p style={{ marginTop: '0.4rem' }}>
            © 2026 <span style={{ color: 'var(--muted)' }}>Mohammed Eisa</span> · AI Engineer
          </p>
        </footer>
      </div>
    </>
  );
}
