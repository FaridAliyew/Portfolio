import React, { useEffect } from 'react';
import './ProjectDetailPage.css';

export default function ProjectDetailPage({ project, onBack, onNextProject }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return null;

  return (
    <div className="project-detail-page">
      <nav className="detail-top-nav">
        <button onClick={onBack} className="detail-back-btn" aria-label="Back to projects">
          <span className="back-arrow">←</span>
          <span>Back to Projects</span>
        </button>

        <span className="detail-category-badge">{project.tag}</span>
      </nav>

      <main className="detail-main-container">
        <header className="detail-header-block">
          <span className="detail-tag-subtitle">{project.tag}</span>
          <h1 className="detail-hero-title">{project.title}</h1>

          <div className="detail-tech-chips">
            {project.tech.map((t, idx) => (
              <span key={idx} className="detail-chip">{t}</span>
            ))}
          </div>
        </header>

        <section className="detail-media-section">
          <div 
            className="detail-image-card"
            onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
            title="Click to visit live website"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="detail-hero-image" 
            />
            <div className="detail-image-hover-badge">
              <span>Visit Live Website ↗</span>
            </div>
          </div>
        </section>

        <section className="detail-info-grid">
          <div className="detail-info-main">
            <h2 className="detail-section-title">Project Overview</h2>
            <p className="detail-paragraph-lead">
              {project.description}
            </p>

            <p className="detail-paragraph-secondary">
              Engineered with meticulous attention to detail, modern frontend architecture, and 
              high-performance web standards. The platform prioritizes seamless responsive adaptations, 
              crisp typography, and fluid user interactions across all screen viewports.
            </p>

            <div className="detail-action-bar">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-launch-btn"
              >
                <span>Launch Live Website</span>
                <span className="btn-arrow-icon">↗</span>
              </a>
            </div>
          </div>

          <aside className="detail-info-sidebar">
            <div className="sidebar-meta-item">
              <span className="meta-item-label">ROLE</span>
              <span className="meta-item-value">Frontend Engineering & UI Design</span>
            </div>

            <div className="sidebar-meta-item">
              <span className="meta-item-label">YEAR</span>
              <span className="meta-item-value">2025</span>
            </div>

            <div className="sidebar-meta-item">
              <span className="meta-item-label">TECHNOLOGY STACK</span>
              <div className="meta-stack-list">
                {project.tech.map((techItem, idx) => (
                  <span key={idx} className="meta-stack-tag">{techItem}</span>
                ))}
              </div>
            </div>

            <div className="sidebar-meta-item">
              <span className="meta-item-label">LIVE URL</span>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="meta-live-link"
              >
                {project.url.replace(/^https?:\/\//, '')}
              </a>
            </div>
          </aside>
        </section>

        <footer className="detail-footer-nav">
          <button onClick={onBack} className="detail-return-btn">
            ← Return to Portfolio
          </button>

          {onNextProject && (
            <button onClick={onNextProject} className="detail-next-btn">
              <span>Next Project</span>
              <span>→</span>
            </button>
          )}
        </footer>
      </main>
    </div>
  );
}
