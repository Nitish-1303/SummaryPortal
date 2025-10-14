import React from 'react';

interface DogIconProps extends React.SVGProps<SVGSVGElement> {
  status: 'idle' | 'moving' | 'clicking';
}

export const DogIcon: React.FC<DogIconProps> = ({ status, ...props }) => {
  return (
    <svg 
      viewBox="0 0 40 40" 
      width="40" 
      height="40"
      className={`
        drop-shadow-lg
        transition-transform duration-100
        ${status === 'clicking' ? 'scale-90 -rotate-12' : 'scale-100'}
      `}
      {...props}
    >
      <g className={status === 'moving' ? 'animate-walk-bounce' : ''}>
        {/* Tail */}
        <path 
          d="M 32 18 C 36 16, 38 20, 35 22" 
          fill="none" 
          stroke="#FDBA74" /* orange-300 */
          strokeWidth="2.5" 
          strokeLinecap="round" 
          className={status === 'moving' ? 'animate-wag-tail' : ''}
          style={{ transformOrigin: '32px 18px' }}
        />
        {/* Body */}
        <path 
          d="M 12 28 C 4 28, 4 18, 15 18 L 32 18 C 34 18, 34 22, 30 22 L 18 22 C 16 22, 16 28, 24 28 Z" 
          fill="#F97316" /* orange-500 */
        />
        {/* Head */}
        <circle cx="12" cy="15" r="5" fill="#F97316" />
        {/* Ear */}
        <path d="M 8 12 L 10 9 L 12 11 Z" fill="#FDBA74" />
        {/* Eye */}
        <circle cx="14" cy="14" r="1" fill="#1E293B" />
        {/* Nose */}
        <circle cx="8" cy="16" r="1" fill="#1E293B" />
        {/* Legs */}
        <rect x="18" y="26" width="3" height="6" rx="1.5" fill="#FDBA74" />
        <rect x="25" y="26" width="3" height="6" rx="1.5" fill="#FDBA74" />
      </g>
    </svg>
  );
};
