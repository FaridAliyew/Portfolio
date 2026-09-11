import React, { useState, useEffect } from 'react';
import './PagePreloader.css';

const COLUMNS_COUNT  = 8;
const REVEAL_DURATION = 960;
const MIN_SHOW_TIME   = 800;

export default function PagePreloader() {
  const [status, setStatus] = useState('blocking');

  useEffect(() => {
    if (sessionStorage.getItem('fa_visited')) {
      setStatus('done');
      return;
    }

    const startTime = Date.now();

    const reveal = () => {
      const elapsed   = Date.now() - startTime;
      const remaining = Math.max(0, MIN_SHOW_TIME - elapsed);

      setTimeout(() => {
        setStatus('revealing');
        setTimeout(() => {
          setStatus('done');
          sessionStorage.setItem('fa_visited', '1');
        }, REVEAL_DURATION);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      reveal();
    } else {
      window.addEventListener('load', reveal, { once: true });
    }

    return () => window.removeEventListener('load', reveal);
  }, []);

  useEffect(() => {
    if (status === 'blocking') {
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = '';
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, [status]);

  if (status === 'done') return null;

  return (
    <div className={`preloader-overlay ${status}`} aria-hidden="true">
      <div className="preloader-columns">
        {[...Array(COLUMNS_COUNT)].map((_, i) => (
          <div
            key={i}
            className="preloader-column"
            style={{ animationDelay: `${i * 0.055}s` }}
          />
        ))}
      </div>

      <div className="preloader-badge">
        <span className="preloader-name">FARID ALIYEV</span>
        <div className="preloader-bar-track">
          <div className="preloader-bar-fill" />
        </div>
      </div>
    </div>
  );
}
