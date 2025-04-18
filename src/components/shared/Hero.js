// src/components/shared/Hero.jsx
// src/components/shared/SectionHeader.jsx
import React from 'react';
import Button from './Button';

const SectionHeader = ({ title, description, backgroundColor, buttons }) => {
  const sectionStyle = {
    backgroundColor: backgroundColor || 'transparent',
  };

  return (
    <section
      className="relative py-20 flex flex-col justify-center"
      style={sectionStyle}
    >
      <div className="container mx-auto px-4 text-center">
        {title && (
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        )}
        {description && (
          <p className="text-lg mb-8 max-w-3xl mx-auto">{description}</p>
        )}

        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {buttons.map((button, index) => (
              <Button
                key={index}
                to={button.to}
                variant={button.variant}
                size="large"
              >
                {button.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionHeader;