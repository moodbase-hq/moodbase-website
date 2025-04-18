// src/components/shared/SectionHeader.js
import React from 'react';

const SectionHeader = ({ title, description, backgroundColor, children, actionButton }) => {
  const sectionStyle = {
    backgroundColor: backgroundColor || 'transparent',
  };

  return (
    <section className="relative" style={sectionStyle}>
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Flex container for title, description, and action button */}
        <div className="flex justify-between items-center flex-wrap mb-8 relative">
          {/* Title and description in a single div */}
          <div className="flex-grow mr-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            {description && (
              <p className="text-gray-800">{description}</p>
            )}
          </div>

          {/* Render the action button if provided */}
          {actionButton && (
            <div className="mt-4 md:mt-0 relative z-20">
              {actionButton}
            </div>
          )}
        </div>
        {/* Render any custom content (children) */}
        {children && (
            <div>
            {children}
            </div>
        )}
        </div>
    </section>
  );
};

export default SectionHeader;