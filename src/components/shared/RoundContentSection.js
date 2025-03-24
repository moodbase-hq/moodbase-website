// src/components/shared/RoundContentSection.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const RoundContentSection = ({
  title,
  description,
  children,
  icon,
  delay = 0.2
}) => {
  const theme = useTheme();

  return (
    <motion.div
      className="relative my-12 mx-auto max-w-3xl px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay }}
    >
      {/* Actual content card */}
      <div className="bg-[#F1EBDF] rounded-2xl p-8 shadow-md">
        {title && (
          <h2 className="text-2xl font-bold mb-4 text-[#A13E4B]">
            {title}
          </h2>
        )}

        {description && (
          <p className="text-gray-700 mb-2">{description}</p>
        )}

        {children}

        {/* Icon at the bottom (if provided) */}
        {icon && (
          <div className="flex justify-center mt-6">
            {icon}
          </div>
        )}
      </div>

      {/* Truly round shape positioned behind for visual effect */}
      <div
        className="absolute -z-10 rounded-full bg-[#F1EBDF]/50"
        style={{
          width: '40px',
          height: '40px',
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />
    </motion.div>
  );
};

export default RoundContentSection;