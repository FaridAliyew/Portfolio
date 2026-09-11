import React, { useEffect, useRef } from 'react';
import './Footer.css';

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/farid-aliyev-56862430b/',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/FaridAliyew',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/4l1yew/',
  },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateThemeByScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startDistance = windowHeight + 550;
      const endDistance = windowHeight + 50;
      const totalRange = startDistance - endDistance;

      const currentOffset = startDistance - rect.top;
      const t = Math.min(1, Math.max(0, currentOffset / totalRange));

      const bgR = Math.round(255 - (255 - 9) * t);
      const bgG = Math.round(255 - (255 - 9) * t);
      const bgB = Math.round(255 - (255 - 11) * t);

      const textR = Math.round(9 + (255 - 9) * t);
      const textG = Math.round(9 + (255 - 9) * t);
      const textB = Math.round(11 + (255 - 11) * t);

      document.documentElement.style.setProperty('--site-bg', `rgb(${bgR}, ${bgG}, ${bgB})`);
      document.documentElement.style.setProperty('--site-text', `rgb(${textR}, ${textG}, ${textB})`);
      document.documentElement.style.setProperty('--theme-t', t.toFixed(3));

      if (t >= 0.5) {
        document.body.classList.add('in-dark-footer');
      } else {
        document.body.classList.remove('in-dark-footer');
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateThemeByScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateThemeByScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.body.classList.remove('in-dark-footer');
      document.documentElement.style.removeProperty('--site-bg');
      document.documentElement.style.removeProperty('--site-text');
      document.documentElement.style.removeProperty('--theme-t');
    };
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer ref={footerRef} className="portfolio-footer" id="contact">
      <div className="footer-inner">
        <div className="footer-main-grid">
          <div className="footer-left-col">
            <p className="footer-intro-message">
              Feel free to get in touch for any inquiries, collaboration opportunities, or job offers!
            </p>

            <div className="footer-brand-statement">
              <span className="footer-brand-firstname">Farid</span>
              <span className="footer-brand-lastname">Aliyev</span>
            </div>

            <div className="footer-socials-row">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <span className="social-name">{social.name}</span>
                  <span className="social-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-right-col">
            <div className="footer-status-card">
              <div className="status-indicator">
                <span className="status-dot" />
                <span className="status-text">Available for new opportunities</span>
              </div>
              <p className="status-subtext">
                Based in Baku • Open to remote & on-site positions worldwide.
              </p>
            </div>

            <button onClick={scrollToTop} className="footer-back-to-top-btn" aria-label="Back to top">
              <span>Back to top</span>
              <span className="btn-arrow">↑</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Farid Aliyev. All rights reserved.
          </p>
          <p className="footer-tagline">
            Designed & Developed with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
