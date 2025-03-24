// src/components/shared/BackgroundBlob.jsx
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundBlob = ({
  className = "",
  color = "#D9B1B1",
  width = "600px",
  height = "600px",
  delay = 0,
  blur = "60px",
  opacity = 0.2
}) => {
  return (
    <motion.div
      className={`absolute -z-5 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: opacity, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: delay,
        ease: "easeOut"
      }}
      style={{
        backgroundColor: color,
        width: width,
        height: height,
        filter: `blur(${blur})`,
        borderRadius: '64% 36% 47% 53% / 57% 44% 56% 43%', // Organic blob shape
      }}
    />
  );
};

export default BackgroundBlob;