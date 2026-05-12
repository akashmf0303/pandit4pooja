import React from 'react';

const Logo = ({ size = 32, showText = true, isLight = false }) => {
  const color = isLight ? '#FFFFFF' : 'var(--color-accent-primary)';
  const textColor = isLight ? '#FFFFFF' : 'var(--color-accent-secondary)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sacred Flame / Diya Inspiration */}
        <path 
          d="M50 15C50 15 35 35 35 55C35 63.2843 41.7157 70 50 70C58.2843 70 65 63.2843 65 55C65 35 50 15 50 15Z" 
          fill={color} 
          fillOpacity="0.8"
        />
        <path 
          d="M50 30C50 30 42 45 42 55C42 59.4183 45.5817 63 50 63C54.4183 63 58 59.4183 58 55C58 45 50 30 50 30Z" 
          fill={isLight ? 'rgba(255,255,255,0.9)' : '#C9A227'} 
        />
        {/* Diya Base */}
        <path 
          d="M25 65C25 65 40 85 50 85C60 85 75 65 75 65C75 65 65 75 50 75C35 75 25 65 25 65Z" 
          fill={color}
        />
        {/* Subtle Om/Symmetry Dots */}
        <circle cx="50" cy="90" r="3" fill={color} />
      </svg>
      {showText && (
        <div style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: `${size * 0.8}px`, 
          fontWeight: 700, 
          color: textColor,
          letterSpacing: '0.5px'
        }}>
          Panditt<span style={{ color: color }}>4</span>Pooja
        </div>
      )}
    </div>
  );
};

export default Logo;
