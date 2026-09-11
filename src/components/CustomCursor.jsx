import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [position, setPosition]       = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered]     = useState(false);
  const [isVisible, setIsVisible]     = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only enable for devices with fine pointer (mouse / trackpad)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;
    setIsPointerDevice(true);

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if target or any parent is clickable
      const target = e.target;
      const isClickable = !!(
        target.closest('a, button, [role="button"], input, select, textarea, .skills-image-box, .detail-image-card, .skills-inspect-btn, .footer-social-link, .nav-link, .detail-back-btn, .detail-next-btn, .footer-back-to-top-btn') ||
        (target && window.getComputedStyle(target).cursor === 'pointer')
      );
      
      setIsHovered(isClickable);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing animation loop
    let animationFrameId;
    const updateCursor = () => {
      // Linear interpolation (lerp) for smooth trailing
      trailRef.current.x += (posRef.current.x - trailRef.current.x) * 0.25;
      trailRef.current.y += (posRef.current.y - trailRef.current.y) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isPointerDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-wrapper ${isVisible ? 'visible' : ''} ${isHovered ? 'hovering' : ''}`}
    >
      {/* Central Cursor Circle */}
      <div className="custom-cursor-core" />

      {/* Thin Wave Rings that emit continuously only when hovering over clickable elements */}
      {isHovered && (
        <div className="cursor-waves-container">
          <div className="cursor-wave wave-1" />
          <div className="cursor-wave wave-2" />
          <div className="cursor-wave wave-3" />
        </div>
      )}
    </div>
  );
}
