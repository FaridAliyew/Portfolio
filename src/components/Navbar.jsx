import React from 'react';
import './Navbar.css';

export default function Navbar() {
  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (!element) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(element, { duration: 1.4 });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        <a href="#" onClick={scrollToTop} className="navbar-brand">
          <span className="brand-firstname">Farid</span>
          <span className="brand-lastname">Aliyev</span>
        </a>

        <nav className="navbar-nav">
          <a href="#about"    onClick={(e) => scrollToSection(e, 'about')}    className="nav-link">About</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="nav-link">Project</a>
          <a href="#contact"  onClick={(e) => scrollToSection(e, 'contact')}  className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  );
}
