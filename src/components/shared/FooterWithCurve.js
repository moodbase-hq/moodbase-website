// src/components/shared/FooterWithCurve.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

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