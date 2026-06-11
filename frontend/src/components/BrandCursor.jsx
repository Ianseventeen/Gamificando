import React, { useEffect, useState, useRef } from 'react';
import './BrandCursor.css';

export default function BrandCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [snapElement, setSnapElement] = useState(null);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const delayPos = useRef({ x: 0, y: 0 });
  const speed = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor on desktop
    if (window.innerWidth >= 1024) {
      document.body.style.cursor = 'none';
      setIsVisible(true);
    } else {
      return; // Do not render custom cursor on mobile
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Interactive element detection (snapping & text)
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .choice-card, .level-node, input, textarea, .class-btn');
      if (target) {
        setHovered(true);
        
        // Snapping effect on button/nodes
        if (target.classList.contains('class-btn') || target.classList.contains('level-node') || target.classList.contains('control-btn')) {
          setSnapElement(target);
        } else {
          setSnapElement(null);
        }

        // Custom text inside cursor for main cards
        if (target.classList.contains('rpg-card')) {
          setCursorText('JOGAR');
        } else if (target.classList.contains('serious-card')) {
          setCursorText('VER');
        } else {
          setCursorText('');
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .choice-card, .level-node, input, textarea, .class-btn');
      if (target) {
        setHovered(false);
        setSnapElement(null);
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // Smooth animation loop (lerp + speed distortion)
    let animFrameId;
    const updatePosition = () => {
      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      if (snapElement) {
        const rect = snapElement.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
      }

      // Linear interpolation (lerp)
      const ease = 0.15;
      delayPos.current.x += (targetX - delayPos.current.x) * ease;
      delayPos.current.y += (targetY - delayPos.current.y) * ease;

      // Calculate speed for stretch effect (jelly)
      speed.current.x = targetX - delayPos.current.x;
      speed.current.y = targetY - delayPos.current.y;
      
      const velocity = Math.hypot(speed.current.x, speed.current.y);
      const angle = Math.atan2(speed.current.y, speed.current.x);
      
      const scaleX = Math.min(1 + velocity * 0.003, 1.4);
      const scaleY = Math.max(1 - velocity * 0.003, 0.6);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${delayPos.current.x}px, ${delayPos.current.y}px, 0) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
      }

      animFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animFrameId);
    };
  }, [snapElement]);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor ${hovered ? 'hover' : ''} ${snapElement ? 'snapped' : ''} ${cursorText ? 'has-text' : ''}`}
    >
      {cursorText && <span className="cursor-label">{cursorText}</span>}
    </div>
  );
}
