import React from 'react';
import './PageTransitionCurtain.css';

const COLUMNS_COUNT = 8;

export default function PageTransitionCurtain({ status, projectName }) {
  if (status === 'idle') return null;

  return (
    <div className={`transition-curtain-overlay ${status}`}>
      <div className="curtain-columns-container">
        {[...Array(COLUMNS_COUNT)].map((_, i) => (
          <div
            key={i}
            className="curtain-column-strip"
            style={{ animationDelay: `${i * 0.055}s` }}
          />
        ))}
      </div>

      <div className="curtain-badge-wrapper">
        {projectName && (
          <span className="curtain-badge-title">{projectName}</span>
        )}
      </div>
    </div>
  );
}
