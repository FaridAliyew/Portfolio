import React, { useState } from 'react';
import './SkillsSection.css';

import cookieImg    from '../assets/projects/Cookie.webp';
import quoteFlowImg from '../assets/projects/QuoteFlow.webp';
import luxeImg      from '../assets/projects/Luxe.webp';
import girlsCodeImg from '../assets/projects/GirlsCode.webp';
import sabatImg     from '../assets/projects/Sabat.webp';

export const PROJECTS_DATA = [
  {
    id: 'cookie',
    year: 2026,
    title: 'COOKIE',
    url: 'https://cookie-one-orpin.vercel.app',
    image: cookieImg,
    side: 'left',
    tag: 'Web Application • Creative Design',
    description: 'A delightful interactive confectionery and cookie digital showcase designed with playful animations, fluid layouts, and a hyper-responsive frontend architecture.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'quoteflow',
    year: 2026,
    title: 'QUOTEFLOW',
    url: 'https://quoteflow.website',
    image: quoteFlowImg,
    side: 'right',
    tag: 'SaaS Platform • Workflow Automation',
    description: 'A sleek productivity and quotation management workflow system engineered for swift client invoicing, minimal visual clutter, and effortless user operations.',
    tech: ['TypeScript', 'Next.js', 'PostgreSQL', 'Modern UI'],
  },
  {
    id: 'luxe',
    year: 2026,
    title: 'LUXE',
    url: 'https://luxe-three-lilac.vercel.app',
    image: luxeImg,
    side: 'left',
    tag: 'E-Commerce • High Fashion',
    description: 'An ultra-premium luxury portfolio and boutique experience crafted with sophisticated typography, subtle micro-interactions, and high-end editorial polish.',
    tech: ['React', 'CSS Modules', 'Web Performance', 'UI/UX'],
  },
  {
    id: 'girlscode',
    year: 2025,
    title: 'GIRLSCODE',
    url: 'https://girlscode.az',
    image: girlsCodeImg,
    side: 'right',
    tag: 'EdTech Academy • Community Platform',
    description: 'An empowering educational ecosystem that supports women venturing into software engineering through structured bootcamps, mentorships, and rich web resources.',
    tech: ['JavaScript', 'React', 'Responsive Design', 'Accessibility'],
  },
  {
    id: 'sabat',
    year: 2025,
    title: 'SƏBAT',
    url: 'https://sabat.az',
    image: sabatImg,
    side: 'left',
    tag: 'Corporate & Advisory • Digital Identity',
    description: 'A comprehensive corporate digital ecosystem designed to convey stability, trust, and contemporary financial advisory solutions with impeccable digital branding.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Performance Optimization'],
  },
];

export default function SkillsSection({ onSelectProject }) {
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  return (
    <div className="skills-outer-container" id="projects">
      <div className={`skills-sticky-stage ${hoveredProjectId ? 'title-hidden' : ''}`}>
        <h1 className="skills-center-title">PROJECT</h1>
      </div>

      <div className="skills-cards-stream">
        {PROJECTS_DATA.map((project, index) => {
          const isHovered = hoveredProjectId === project.id;
          const isLeft    = project.side === 'left';

          return (
            <div key={project.id} className={`skills-row-item side-${project.side}`}>
              <div className="skills-card-wrapper">
                <div
                  className={`skills-image-box ${isHovered ? 'img-is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => onSelectProject && onSelectProject(project)}
                >
                  <img src={project.image} alt={project.title} className="skills-project-img" loading="lazy" decoding="async" />
                  <div className="skills-img-title-overlay">
                    <span className="skills-overlay-num">0{index + 1}</span>
                    <h3 className="skills-overlay-title">{project.title}</h3>
                    <span className="skills-click-hint">Click to view project</span>
                  </div>
                </div>

                <div
                  className={`skills-description-box desc-side-${isLeft ? 'right' : 'left'} ${isHovered ? 'desc-visible' : ''}`}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  <div className="skills-desc-inner">
                    <div className="skills-desc-tag">{project.tag}</div>
                    <h2 className="skills-desc-project-title">{project.title}</h2>
                    <p className="skills-desc-text">{project.description}</p>
                    <div className="skills-desc-tech-list">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="skills-tech-badge">{t}</span>
                      ))}
                    </div>
                    <button
                      className="skills-inspect-btn"
                      onClick={() => onSelectProject && onSelectProject(project)}
                    >
                      View Details ↗
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
