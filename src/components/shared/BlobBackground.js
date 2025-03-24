// src/components/shared/BlobBackground.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const BlobBackground = ({ className = '' }) => {
  const theme = useTheme();

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Large blob top right */}
      <div
        className="absolute -right-[10%] -top-[15%] w-[60%] h-[70%] rounded-[70%] opacity-20"
        style={{ backgroundColor: theme.colors.background2 }}
      />

      {/* Medium blob bottom left */}
      <div
        className="absolute -left-[5%] bottom-[10%] w-[35%] h-[40%] rounded-[60%] opacity-30"
        style={{ backgroundColor: theme.colors.primary }}
      />

      {/* Small dots pattern right side */}
      <div className="absolute right-[15%] top-[40%]">
        <svg width="160" height="200" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="8" fill={theme.colors.tertiary} fillOpacity="0.8" />
          <circle cx="50" cy="15" r="6" fill={theme.colors.tertiary} fillOpacity="0.7" />
          <circle cx="75" cy="30" r="10" fill={theme.colors.tertiary} fillOpacity="0.9" />
          <circle cx="40" cy="50" r="7" fill={theme.colors.tertiary} fillOpacity="0.7" />
          <circle cx="65" cy="60" r="9" fill={theme.colors.tertiary} fillOpacity="0.8" />
          <circle cx="90" cy="45" r="6" fill={theme.colors.tertiary} fillOpacity="0.7" />
          <circle cx="25" cy="80" r="8" fill={theme.colors.tertiary} fillOpacity="0.6" />
          <circle cx="55" cy="90" r="9" fill={theme.colors.tertiary} fillOpacity="0.9" />
          <circle cx="80" cy="75" r="7" fill={theme.colors.tertiary} fillOpacity="0.7" />
          <circle cx="100" cy="80" r="10" fill={theme.colors.tertiary} fillOpacity="0.8" />
          <circle cx="35" cy="110" r="6" fill={theme.colors.tertiary} fillOpacity="0.7" />
          <circle cx="75" cy="120" r="8" fill={theme.colors.tertiary} fillOpacity="0.9" />
          <circle cx="110" cy="110" r="9" fill={theme.colors.tertiary} fillOpacity="0.8" />
          <circle cx="45" cy="140" r="7" fill={theme.colors.tertiary} fillOpacity="0.6" />
          <circle cx="85" cy="150" r="10" fill={theme.colors.tertiary} fillOpacity="0.9" />
          <circle cx="120" cy="135" r="8" fill={theme.colors.tertiary} fillOpacity="0.7" />
        </svg>
      </div>
    </div>
  );
};

export default BlobBackground;