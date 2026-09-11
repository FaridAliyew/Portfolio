import React from 'react';
import './GlassCodeSymbol.css';

export default function GlassCodeSymbol({ progress = 0 }) {
  // progress: 0 (Hero center) -> 1 (Navbar center)
  const p = Math.min(1, Math.max(0, progress));

  // Docked state: true when reaching the navbar
  const isDocked = p > 0.82;

  // Shadow opacity fades out completely to 0 as it docks into navbar (ZERO shadow in navbar)
  const shadowOpacity = isDocked ? 0 : Math.max(0, 0.8 * (1 - p * 1.22));

  // Rim reflection: from bright white crystal on smoke to clean obsidian/dark glass on navbar
  const rimLight = isDocked 
    ? "rgba(24, 24, 27, 0.85)" 
    : "rgba(255, 255, 255, 0.95)";
  
  const rimMid = isDocked
    ? "rgba(63, 63, 70, 0.5)"
    : "rgba(255, 255, 255, 0.45)";

  const rimDark = isDocked
    ? "rgba(24, 24, 27, 0.65)"
    : "rgba(30, 30, 35, 0.6)";

  return (
    <div className={`glass-code-svg-wrapper ${isDocked ? 'docked-no-shadow' : ''}`}>
      <svg 
        viewBox="0 0 200 130" 
        className="glass-code-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dynamic 3D Drop shadow - smoothly fades to ZERO in navbar */}
          <filter id="seamlessGlassShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow 
              dx="0" 
              dy={Math.max(0, 12 * (1 - p))} 
              stdDeviation={Math.max(0, 10 * (1 - p))} 
              floodColor="#000000" 
              floodOpacity={shadowOpacity * 0.75} 
            />
            <feDropShadow 
              dx="0" 
              dy={Math.max(0, 3 * (1 - p))} 
              stdDeviation={Math.max(0, 3.5 * (1 - p))} 
              floodColor="#000000" 
              floodOpacity={shadowOpacity * 0.5} 
            />
          </filter>

          {/* Dynamic Optical Glass Gradient: blends dark and light smoke tones */}
          <linearGradient id="smokeGlassGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDocked ? "#18181b" : "#27272a"} stopOpacity={isDocked ? "0.75" : "0.55"} />
            <stop offset="35%" stopColor={isDocked ? "#27272a" : "#71717a"} stopOpacity={isDocked ? "0.55" : "0.25"} />
            <stop offset="70%" stopColor={isDocked ? "#3f3f46" : "#f4f4f5"} stopOpacity={isDocked ? "0.7" : "0.55"} />
            <stop offset="100%" stopColor={isDocked ? "#18181b" : "#ffffff"} stopOpacity={isDocked ? "0.95" : "0.95"} />
          </linearGradient>

          {/* Inner Refraction Core Gradient */}
          <linearGradient id="innerGlassRefraction" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={isDocked ? "0.35" : "0.75"} />
            <stop offset="50%" stopColor="#ffffff" stopOpacity={isDocked ? "0.1" : "0.25"} />
            <stop offset="100%" stopColor="#000000" stopOpacity={isDocked ? "0.3" : "0.35"} />
          </linearGradient>

          {/* Specular Ridge Highlight */}
          <linearGradient id="specularRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={rimLight} />
            <stop offset="50%" stopColor={rimMid} />
            <stop offset="100%" stopColor={rimDark} />
          </linearGradient>
        </defs>

        {/* 1. Underlying Cast 3D Shadow Layer (Completely hidden/zero opacity when docked in navbar) */}
        {shadowOpacity > 0.01 && (
          <g filter="url(#seamlessGlassShadow)">
            {/* Continuous Left Bracket: < */}
            <path
              d="M 58 28 L 22 65 L 58 102"
              fill="none"
              stroke="#000000"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={shadowOpacity}
            />
            {/* Continuous Slash: / */}
            <path
              d="M 85 108 L 115 22"
              fill="none"
              stroke="#000000"
              strokeWidth="14"
              strokeLinecap="round"
              opacity={shadowOpacity}
            />
            {/* Continuous Right Bracket: > */}
            <path
              d="M 142 28 L 178 65 L 142 102"
              fill="none"
              stroke="#000000"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={shadowOpacity}
            />
          </g>
        )}

        {/* 2. Glass Base Body (Continuous & Unbroken) */}
        <g>
          {/* Left Bracket: < */}
          <path
            d="M 58 28 L 22 65 L 58 102"
            fill="none"
            stroke="url(#smokeGlassGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Slash: / */}
          <path
            d="M 85 108 L 115 22"
            fill="none"
            stroke="url(#smokeGlassGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Right Bracket: > */}
          <path
            d="M 142 28 L 178 65 L 142 102"
            fill="none"
            stroke="url(#smokeGlassGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 3. Inner Glass Core (Translucent Refraction) */}
        <g>
          <path
            d="M 58 28 L 22 65 L 58 102"
            fill="none"
            stroke="url(#innerGlassRefraction)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 85 108 L 115 22"
            fill="none"
            stroke="url(#innerGlassRefraction)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 142 28 L 178 65 L 142 102"
            fill="none"
            stroke="url(#innerGlassRefraction)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 4. Top Continuous Bevel Catch-Light (Specular Highlights) */}
        <g>
          {/* Left Bracket Top Highlight */}
          <path
            d="M 56 27 L 21 64 L 38 82"
            fill="none"
            stroke="url(#specularRimGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Slash Catch Light */}
          <path
            d="M 97 74 L 114 23"
            fill="none"
            stroke="url(#specularRimGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Right Bracket Top Highlight */}
          <path
            d="M 144 27 L 179 64 L 162 82"
            fill="none"
            stroke="url(#specularRimGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
