// src/components/shared/FooterWithCurve.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';

const FooterWithCurve = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent text-white py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo192.png" alt="moodbase logo" className="h-10 w-10" />
              <span className="text-2xl font-bold ml-2 hidden">moodbase</span>
            </Link>
            <p className="text-sm text-white/80 mb-6">
              Wir verbinden junge Menschen mit den richtigen Angeboten für psychosoziale Unterstützung.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Über Uns</span>
                </Link>
              </li>
              <li>
                <Link to="/database" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Datenbank</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link to="/kooperationen" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Kooperationen</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Unterstützen</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Ressourcen</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ressourcen/techsupport" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Ratgeber</span>
                </Link>
              </li>
              <li>
                <Link to="/ressourcen/hilfeorganisationen" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Selbsthilfe</span>
                </Link>
              </li>
              <li>
                <Link to="/ressourcen/faq" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links and contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Rechtliches & Kontakt</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/rechtliches/impressum" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Impressum</span>
                </Link>
              </li>
              <li>
                <Link to="/rechtliches/datenschutz" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Datenschutz</span>
                </Link>
              </li>
              <li>
                <Link to="/rechtliches/nutzungsbedingungen" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Nutzungsbedingungen</span>
                </Link>
              </li>
            </ul>
            <div className="text-white/80">
              <p className="flex items-center mb-2">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@moodbase.de" className="hover:text-white">info@moodbase.de</a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <p className="text-white/70 text-center text-sm">
            © {currentYear} moodbase. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterWithCurve;