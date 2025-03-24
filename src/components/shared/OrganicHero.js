// src/components/shared/OrganicHero.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import CirclePattern from './CirclePatterns';
import BackgroundBlob from './BackgroundBlob';
import Logo from './Logo';

const OrganicHero = () => {
  const theme = useTheme();

  // Pink background color
  const pinkBackground = '#D9B1B1';

  return (
    <section className="relative min-h-screen flex flex-col" style={{ backgroundColor: pinkBackground }}>
      {/* Background blobs for hero section */}
      <BackgroundBlob
        color="#C8A0A0"
        width="650px"
        height="650px"
        className="top-[-200px] right-[-300px]"
        opacity={0.4}
        blur="70px"
      />

      <BackgroundBlob
        color="#C8A0A0"
        width="400px"
        height="400px"
        className="bottom-[100px] left-[-200px]"
        opacity={0.3}
        blur="50px"
        delay={0.3}
      />

      {/* Header */}
      <header className="w-full py-6 px-4 relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo component that handles fallbacks */}
          <Logo size="medium" />

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link to="/about" className="text-white hover:text-white/80 transition-colors">
              Über Uns
            </Link>
            <Link to="/blog" className="text-white hover:text-white/80 transition-colors">
              Blog
            </Link>
            <Link to="/support" className="text-white hover:text-white/80 transition-colors">
              Unterstützen
            </Link>
            <Link to="/database" className="bg-[#A13E4B] text-white px-6 py-2 rounded-full hover:bg-[#8A3540] transition-colors">
              Zur Datenbank
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Content */}
      <div className="container mx-auto px-4 flex-grow flex items-center relative z-10 pt-12">
        <div className="max-w-2xl">
          <p className="text-lg text-black mb-12 leading-relaxed">
            Moodbase ist eine intelligente Plattform, die junge Menschen mit den besten psychosozialen Unterstützungsangeboten in Deutschland verbindet - unabhängig vom sozioökonomischen Status.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/database"
              className="bg-[#A13E4B] hover:bg-[#8A3540] text-white py-3 px-8 rounded-full transition-colors inline-block"
            >
              Jetzt Suchen
            </Link>
            <Link
              to="/blog"
              className="bg-white/30 backdrop-blur-sm text-black hover:bg-white/40 py-3 px-8 rounded-full transition-colors inline-block"
            >
              Zum Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Blue Circle Pattern on Right */}
      <div className="absolute right-0 bottom-32 z-10 pointer-events-none">
        <CirclePattern
          size="large"
          color="#99BEFA"
          className=""
        />
      </div>

      {/* Wave Divider at Bottom */}
      <div className="w-full mt-auto relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full">
          <path fill="#E8D5C4" d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,133.3C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default OrganicHero;