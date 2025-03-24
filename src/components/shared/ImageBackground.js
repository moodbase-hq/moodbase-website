// src/components/shared/ImageBackground.jsx
import React from 'react';
import { motion } from 'framer-motion';

/**
 * ImageBackground Component - Replacement for BackgroundBlob and CirclePattern
 *
 * @param {Object} props
 * @param {string} props.imagePath - Path to the image in shared/assets folder
 * @param {string} props.width - Width of the image
 * @param {string} props.height - Height of the image
 * @param {string} props.className - Additional CSS classes for positioning
 * @param {number} props.opacity - Opacity value (0-1)
 * @param {number} props.delay - Animation delay in seconds
 * @param {string} props.altText - Alt text for accessibility
 * @param {boolean} props.isCircle - Whether this is a circle pattern (changes animation)
 */
const ImageBackground = ({
  imagePath,
  width = "400px",
  height = "400px",
  className = "",
  opacity = 1,
  delay = 0,
  altText = "Background decoration",
  isCircle = false
}) => {
  // Different animation variants based on whether it's a blob or circle
  const animationVariant = isCircle ? {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: opacity, scale: 1 }
  } : {
    hidden: { opacity: 0 },
    visible: { opacity: opacity }
  };

  return (
    <motion.div
      className={`absolute z-0 pointer-events-none ${className}`}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 1.2,
        delay: delay,
        ease: "easeOut"
      }}
      variants={animationVariant}
      style={{
        width,
        height,
        // Using background image as fallback just in case
        backgroundImage: `url(${imagePath})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <img
        src={imagePath}
        alt={altText}
        className="w-full h-full object-contain"
        style={{ opacity: opacity }}
      />
    </motion.div>
  );
};

export default ImageBackground;