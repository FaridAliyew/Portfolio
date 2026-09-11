import React, { useEffect, useState, useRef } from 'react';
import './AboutSection.css';
import me2Img from '../assets/me2.webp';

const BIO_TEXT = "Hi, I'm Farid Aliyev, a frontend developer who enjoys building modern, responsive web applications. I work mainly with HTML, CSS, JavaScript, TypeScript, React, and Next.js. I care about writing clean, consistent code and building fast interfaces that are easy to use.";

export default function AboutSection() {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const words = BIO_TEXT.split(' ');
  const totalWords = words.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = trackRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = trackHeight - windowHeight;
      const currentScroll = Math.max(0, -rect.top);
      const fraction = Math.min(1, Math.max(0, currentScroll / totalScrollableDistance));
      setScrollProgress(fraction);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={trackRef} className="about-scroll-track" id="about">
      <section className="about-sticky-stage">
        <div className="about-bg-wrapper">
          <img src={me2Img} alt="Farid Aliyev Workshop" className="about-bg-image" />
        </div>

        <div className="about-content-box">
          <h2 className="about-heading">ABOUT</h2>

          <p className="about-scrub-paragraph">
            {words.map((word, index) => {
              const startThreshold = index / totalWords;
              const endThreshold = (index + 1) / totalWords;

              let wordAlpha = 0.22;
              if (scrollProgress >= endThreshold) {
                wordAlpha = 1.0;
              } else if (scrollProgress > startThreshold) {
                const subProgress = (scrollProgress - startThreshold) / (endThreshold - startThreshold);
                wordAlpha = 0.22 + 0.78 * subProgress;
              }

              const isSolid = wordAlpha > 0.95;

              return (
                <span
                  key={index}
                  className={`about-scrub-word ${isSolid ? 'solid' : ''}`}
                  style={{ color: isSolid ? '#09090b' : undefined, opacity: wordAlpha }}
                >
                  {word}{' '}
                </span>
              );
            })}
          </p>
        </div>
      </section>
    </div>
  );
}
