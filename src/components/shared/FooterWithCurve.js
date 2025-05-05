// src/components/shared/FooterWithCurve.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const WaveDivider = ({ position = 'bottom', color = '#2F5EA8', className = '' }) => {
  // Use different curves based on position
  if (position === 'bottom') {
    return (
      <div className={`relative w-full overflow-hidden pointer-events-none ${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-auto block"
          style={{ marginBottom: '-5px', display: 'block' }} // Fix for seams
        >
          <path
            fill={color}
            d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,80C672,85,768,139,864,154.7C960,171,1056,149,1152,122.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    );
  } else {
    return (
      <div className={`relative w-full overflow-hidden pointer-events-none ${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-auto block"
          style={{ marginTop: '-5px', display: 'block' }} // Fix for seams
        >
          <path
            fill={color}
            d="M0,320L48,304C96,288,192,256,288,245.3C384,235,480,245,576,229.3C672,213,768,171,864,165.3C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
    );
  }
};

const FooterWithCurve = () => {
  const theme = useTheme();

  return (
    <footer className="relative text-white">
      {/* Curved Top Edge */}
      <div className="absolute top-0 left-0 w-full transform -translate-y-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-auto" style={{display: 'block', verticalAlign: 'bottom'}}>
          <path fill="#2F5EA8" d="M0,64L60,80C120,96,240,128,360,128C480,128,600,96,720,85.3C840,75,960,85,1080,90.7C1200,96,1320,96,1380,96L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="bg-[#2F5EA8] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Über MOODBASE</h4>
              <p className="text-white/70">
                MOODBASE ist eine Plattform zur Unterstützung der psychischen Gesundheit.
                Wir bieten Zugang zu Ressourcen und professioneller Hilfe.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-white/70 hover:text-primary transition-colors duration-300">
                    Startseite
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white/70 hover:text-primary transition-colors duration-300">
                    Über Uns
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-white/70 hover:text-primary transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/database" className="text-white/70 hover:text-primary transition-colors duration-300">
                    Datenbank
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Ressourcen</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-white/70 hover:text-primary transition-colors duration-300">
                    Hilfe & Support
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-white/70 hover:text-primary transition-colors duration-300">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/providers" className="text-white/70 hover:text-primary transition-colors duration-300">
                    Für Anbieter
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-white/70 hover:text-primary transition-colors duration-300">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link to="/imprint" className="text-white/70 hover:text-primary transition-colors duration-300">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-white/70 hover:text-primary transition-colors duration-300">
                    AGB
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#254B86] mt-12 pt-8 text-center text-white/70">
            © {new Date().getFullYear()} MOODBASE. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterWithCurve;