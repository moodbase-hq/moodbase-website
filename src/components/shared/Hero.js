// src/components/shared/Hero.jsx
import { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

const Hero = ({ heroData }) => {
  const videoRef = useRef(null);
  const theme = useTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="/api/placeholder/1920/1080"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative text-center text-white z-10 max-w-5xl mx-auto px-4 py-32">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">{heroData.title}</h1>
        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">{heroData.description}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            to="/database"
            variant="primary"
            size="large"
          >
            Jetzt Suchen
          </Button>
          <Button
            to="/blog"
            variant="ghost"
            size="large"
          >
            Zum Blog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;