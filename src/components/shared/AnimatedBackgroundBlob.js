// src/components/shared/AnimatedBackgroundBlob.jsx
import React from "react";
import { motion } from "framer-motion";

// This component creates a colorful blob with animation
const AnimatedBackgroundBlob = ({
  color,
  width,
  height,
  className,
  opacity = 0.2,
  blur = "70px",
  delay = 0,
  animationType = "float" // Options: "float", "pulse", "rotate"
}) => {
  // Define different animation variants
  const floatAnimation = {
    y: [0, -20, 0]
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1]
  };

  const rotateAnimation = {
    rotate: [0, 3, 0, -3, 0]
  };

  // Choose animation based on type
  let animation = {};
  switch (animationType) {
    case "float":
      animation = floatAnimation;
      break;
    case "pulse":
      animation = pulseAnimation;
      break;
    case "rotate":
      animation = rotateAnimation;
      break;
    default:
      animation = floatAnimation;
  }

  const animationTransition = {
    duration: 8 + Math.random() * 4, // Random duration between 8-12s
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
    delay: delay
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: opacity,
        ...animation
      }}
      transition={{
        opacity: { duration: 1.5 },
        ...animation,
        ...animationTransition
      }}
    >
      {/* This creates the actual blob */}
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: color,
          filter: `blur(${blur})`,
          opacity: opacity
        }}
      />
    </motion.div>
  );
};

export default AnimatedBackgroundBlob;