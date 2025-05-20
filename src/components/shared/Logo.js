// src/components/shared/Logo.jsx
import React from 'react';

// This component ensures the logo is displayed consistently throughout the site
const Logo = ({ size = 'medium' }) => {
  // Predefined sizes for consistent usage
  const sizes = {
    small: { width: 24, height: 24 },
    medium: { width: 32, height: 32 },
    large: { width: 48, height: 48 }
  };

  const dimensions = sizes[size] || sizes.medium;

  return (
    // Fallback approach that works in most situations
    <div className="flex items-center">
      {/* Primary approach: use img with built-in fallback */}
      <img
        src="/logo192.png"
        alt="moodbase logo"
        width={dimensions.width}
        height={dimensions.height}
        className="mr-3"
        // Fallback image in case the main one fails to load
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/favicon.ico';
        }}
      />

      {/* Brand name */}
      <span className="text-xl md:text-2xl font-bold text-black">moodbase</span>
    </div>
  );
};

export default Logo;