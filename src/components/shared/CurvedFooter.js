// src/components/shared/CurvedFooter.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CurvedFooter = () => {
  return (
    <footer className="relative mt-auto">
      {/* Curved top with sand color */}
      <div className="relative w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ marginBottom: "-7px", display: "block" }}
        >
          <path
            fill="#E8D5C4"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,165.3C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Footer content with blue background */}
      <div className="bg-[#2F5EA8] text-white">
        <div className="container mx-auto px-4 py-8">
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
                  <Link to="/" className="text-white/70 hover:text-white transition-colors">
                    Startseite
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                    Über Uns
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-white/70 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/database" className="text-white/70 hover:text-white transition-colors">
                    Datenbank
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Ressourcen</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-white/70 hover:text-white transition-colors">
                    Hilfe & Support
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="text-white/70 hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/providers" className="text-white/70 hover:text-white transition-colors">
                    Für Anbieter
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-white/70 hover:text-white transition-colors">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link to="/imprint" className="text-white/70 hover:text-white transition-colors">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-white/70 hover:text-white transition-colors">
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

      {/* Sand colored bottom section */}
      <div className="bg-[#E8D5C4] h-4"></div>
    </footer>
  );
};

export default CurvedFooter;