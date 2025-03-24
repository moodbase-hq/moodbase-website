// src/components/shared/CirclePatterns.jsx
import React from 'react';
import { motion } from 'framer-motion';

const CirclePattern = ({ className = '', size = 'medium', color = '#99BEFA', delay = 0 }) => {
  // Size configurations with more circles for larger patterns
  const sizes = {
    small: {
      width: 80,
      height: 100,
      circles: [
        { cx: 15, cy: 15, r: 4 },
        { cx: 30, cy: 10, r: 3 },
        { cx: 20, cy: 30, r: 5 },
        { cx: 40, cy: 25, r: 3 },
        { cx: 28, cy: 45, r: 4 },
      ]
    },
    medium: {
      width: 180,
      height: 200,
      circles: [
        { cx: 20, cy: 20, r: 8 },
        { cx: 45, cy: 15, r: 6 },
        { cx: 70, cy: 25, r: 9 },
        { cx: 30, cy: 45, r: 7 },
        { cx: 55, cy: 50, r: 8 },
        { cx: 80, cy: 40, r: 6 },
        { cx: 25, cy: 70, r: 7 },
        { cx: 50, cy: 75, r: 8 },
        { cx: 75, cy: 65, r: 6 },
        { cx: 35, cy: 95, r: 9 },
        { cx: 60, cy: 100, r: 7 },
        { cx: 85, cy: 90, r: 8 },
        { cx: 100, cy: 110, r: 6 },
        { cx: 120, cy: 80, r: 7 },
        { cx: 140, cy: 100, r: 8 },
      ]
    },
    large: {
      width: 300,
      height: 350,
      circles: [
        { cx: 40, cy: 40, r: 10 },
        { cx: 80, cy: 30, r: 8 },
        { cx: 120, cy: 45, r: 12 },
        { cx: 50, cy: 80, r: 9 },
        { cx: 90, cy: 90, r: 11 },
        { cx: 130, cy: 75, r: 8 },
        { cx: 45, cy: 120, r: 10 },
        { cx: 85, cy: 130, r: 12 },
        { cx: 125, cy: 115, r: 9 },
        { cx: 55, cy: 160, r: 13 },
        { cx: 95, cy: 170, r: 10 },
        { cx: 135, cy: 155, r: 12 },
        { cx: 60, cy: 200, r: 9 },
        { cx: 100, cy: 210, r: 13 },
        { cx: 140, cy: 195, r: 10 },
        { cx: 180, cy: 175, r: 8 },
        { cx: 210, cy: 140, r: 12 },
        { cx: 230, cy: 100, r: 9 },
        { cx: 200, cy: 60, r: 11 },
        { cx: 160, cy: 40, r: 8 },
        { cx: 190, cy: 210, r: 10 },
        { cx: 160, cy: 240, r: 9 },
        { cx: 220, cy: 230, r: 7 },
        { cx: 250, cy: 190, r: 8 },
        { cx: 240, cy: 150, r: 11 },
      ]
    }
  };

  const config = sizes[size] || sizes.medium;

  // Random opacity for each circle to create more natural look
  const getRandomOpacity = () => {
    return 0.6 + Math.random() * 0.4; // Between 0.6 and 1.0
  };

  return (
    <div className={`pointer-events-none ${className}`}>
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {config.circles.map((circle, index) => (
          <motion.circle
            key={index}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: getRandomOpacity(),
              scale: 1
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.5,
              delay: delay + (index * 0.03)
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default CirclePattern;