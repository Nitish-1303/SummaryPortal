import React, { useState, useEffect, useRef } from 'react';
import { DogIcon } from './icons/DogIcon';

const DogCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [status, setStatus] = useState<'idle' | 'moving' | 'clicking'>('idle');
  const idleTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setStatus('moving');

      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }

      idleTimeoutRef.current = window.setTimeout(() => {
        setStatus('idle');
      }, 150);
    };

    const handleMouseDown = () => {
      setStatus('clicking');
    };
    
    const handleMouseUp = () => {
      // Revert to moving if mouse is still moving, otherwise idle
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      setStatus('moving');
      idleTimeoutRef.current = window.setTimeout(() => {
        setStatus('idle');
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex: 9999,
        pointerEvents: 'none',
        transition: 'transform 0.1s ease-out',
      }}
    >
      <DogIcon status={status} />
    </div>
  );
};

export default DogCursor;
