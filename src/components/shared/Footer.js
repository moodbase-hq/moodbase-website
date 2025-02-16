// components/shared/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Über MOODBASE</h4>
            <p className="text-gray-400">
              MOODBASE ist eine Plattform zur Unterstützung der psychischen Gesundheit.
              Wir bieten Zugang zu Ressourcen und professioneller Hilfe.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-pink-500">
                  Startseite
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-pink-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/database" className="text-gray-400 hover:text-pink-500">
                  Datenbank
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Ressourcen</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-500">
                  Hilfe & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-500">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-500">
                  Für Anbieter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-500">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-500">
                  Impressum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-500">
                  AGB
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          © 2024 MOODBASE. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};

export default Footer;