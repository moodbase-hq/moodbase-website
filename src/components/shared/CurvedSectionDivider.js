// src/components/shared/CurvedSectionDivider.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const CurvedSectionDivider = ({ direction = 'down', color, height = 100, className = '' }) => {
  const theme = useTheme();
  const fillColor = color || theme.colors.background1;

  // Different curve paths based on direction
  const paths = {
    down: 'M0,0 C300,100 900,0 1440,80 L1440,100 L0,100 Z',
    up: 'M0,100 C600,0 900,80 1440,20 L1440,100 L0,100 Z',
    wave: 'M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,80 1400,30 1440,50 L1440,100 L0,100 Z'
  };

  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1440 100"
        className="w-full h-full"
      >
        <path
          d={paths[direction] || paths.down}
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default CurvedSectionDivider;