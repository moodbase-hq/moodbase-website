// src/components/shared/CurvedSection.jsx
import React from 'react';

/**
 * A component that creates a section with curved top and/or bottom edges
 * with additional fixes to ensure no visible seams or lines between sections.
 */
const CurvedSection = ({
  children,
  topCurve = false,
  bottomCurve = false,
  backgroundColor = '#D9B1B1',
  topColor = '#E8D5C4',
  bottomColor = '#E8D5C4',
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Top curve if enabled */}
      {topCurve && (
        <div
          className="absolute top-0 left-0 w-full h-20 -translate-y-[99%] overflow-hidden"
          style={{ filter: 'drop-shadow(0px -0.5px 0px rgba(0,0,0,0.0))' }} // Reduces antialiasing at the edge
        >
          <svg
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full h-full"
            style={{ display: 'block' }}
          >
            <path
              d="M0,200 L1440,200 L1440,80 C1360,100 1280,140 1120,160 C960,180 800,130 640,100 C480,70 320,70 160,90 C80,100 40,120 0,140 L0,200 Z"
              fill={backgroundColor}
            />
            {/* Extension that goes over the edge */}
            <path
              d="M0,201 L1440,201 L1440,200 L0,200 L0,201 Z"
              fill={backgroundColor}
            />
          </svg>
        </div>
      )}

      {/* Main content with background color */}
      <div
        style={{ backgroundColor }}
        className="relative z-10 overflow-hidden"
      >
        {children}
      </div>

      {/* Bottom curve if enabled */}
      {bottomCurve && (
        <div
          className="absolute bottom-0 left-0 w-full h-20 translate-y-[99%] overflow-hidden"
          style={{ filter: 'drop-shadow(0px 0.5px 0px rgba(0,0,0,0.0))' }} // Reduces antialiasing at the edge
        >
          <svg
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 w-full h-full"
            style={{ display: 'block' }}
          >
            <path
              d="M0,0 L1440,0 L1440,60 C1360,40 1280,20 1120,40 C960,60 800,100 640,120 C480,140 320,140 160,120 C80,110 40,90 0,60 L0,0 Z"
              fill={backgroundColor}
            />
            {/* Extension that goes over the edge */}
            <path
              d="M0,-1 L1440,-1 L1440,0 L0,0 L0,-1 Z"
              fill={backgroundColor}
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CurvedSection;