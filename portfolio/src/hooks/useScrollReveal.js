import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates children of the container ref on scroll.
 * @param {object} options
 * @param {string} options.selector   - CSS selector for children to animate
 * @param {object} options.from       - gsap 'from' vars
 * @param {object} options.to         - gsap 'to' vars
 * @param {boolean} options.stagger   - whether to stagger children
 * @param {string} options.start      - ScrollTrigger start
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const {
        selector = '.reveal',
        from = { opacity: 0, y: 50 },
        to = { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        stagger = 0.12,
        start = 'top 85%',
      } = options;

      const targets = ref.current.querySelectorAll(selector);

      gsap.fromTo(targets, from, {
        ...to,
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Single element reveal
 */
export function useFadeIn(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          once: true,
        },
      }
    );
  }, []);

  return ref;
}

/**
 * Clip-path reveal animation (cinematic wipe)
 */
export function useClipReveal() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, []);

  return ref;
}
