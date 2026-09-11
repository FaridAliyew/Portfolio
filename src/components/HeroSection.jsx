import React, { useEffect, useState, useRef } from 'react';
import './HeroSection.css';
import meCutoutImg from '../assets/me-cutout.webp';

const TECH_STACK = [
  { id: 0, name: 'Next.js' },
  { id: 1, name: 'TypeScript' },
  { id: 2, name: 'React' },
  { id: 3, name: 'JavaScript' },
];

const ROW1_TEXT = 'FRONTEND DEVELOPER • ';
const ROW2_TEXT = 'NEXT.JS • TYPESCRIPT • REACT • JAVASCRIPT • ';

export default function HeroSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex]     = useState(0);
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect         = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const currentScroll = Math.max(0, -rect.top);

      const techScrollDistance = windowHeight * 3.0;
      const techFraction       = Math.min(1, Math.max(0, currentScroll / techScrollDistance));
      const stage              = Math.min(3, Math.floor(techFraction * 4));
      setActiveIndex(stage);

      const totalStickyDistance = windowHeight * 4.0;
      const totalFraction       = Math.min(1, Math.max(0, currentScroll / totalStickyDistance));
      setScrollFraction(totalFraction);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="hero-scroll-track">
      <section className="hero-sticky-stage">
        <div className="hero-bg-marquee-container">
          <div className="marquee-row row-left-to-right">
            <div className="marquee-track track-ltr">
              {[...Array(6)].map((_, i) => <span key={i} className="marquee-text-item">{ROW1_TEXT}</span>)}
            </div>
            <div className="marquee-track track-ltr" aria-hidden="true">
              {[...Array(6)].map((_, i) => <span key={i} className="marquee-text-item">{ROW1_TEXT}</span>)}
            </div>
          </div>

          <div className="marquee-row row-right-to-left">
            <div className="marquee-track track-rtl">
              {[...Array(4)].map((_, i) => <span key={i} className="marquee-text-item">{ROW2_TEXT}</span>)}
            </div>
            <div className="marquee-track track-rtl" aria-hidden="true">
              {[...Array(4)].map((_, i) => <span key={i} className="marquee-text-item">{ROW2_TEXT}</span>)}
            </div>
          </div>
        </div>

        <div className="hero-portrait-stage">
          <img
            src={meCutoutImg}
            alt="Farid Aliyev"
            className="hero-center-portrait"
            fetchpriority="high"
            decoding="async"
          />
        </div>

        <div className="hero-overlay-content">
          <span className="hero-author-tag">FARID ALIYEV</span>
          <p className="hero-role-title">Frontend Developer</p>

          <div className="hero-tech-display-box">
            {TECH_STACK.map((tech, idx) => {
              const isActive = idx === activeIndex;
              const isPast   = idx < activeIndex;
              let stateClass = 'inactive-upcoming';
              if (isActive) stateClass = 'active';
              else if (isPast) stateClass = 'inactive-past';

              return (
                <div key={tech.id} className={`hero-tech-slot ${stateClass}`}>
                  <span className="hero-tech-name">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`hero-scroll-hint ${scrollFraction > 0.75 ? 'fade-out' : ''}`}>
          <span className="scroll-hint-text">Scroll down</span>
          <div className="scroll-hint-arrow" />
        </div>
      </section>
    </div>
  );
}
