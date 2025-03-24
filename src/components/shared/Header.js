// src/components/shared/Header.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/"
              className="flex items-center transition-colors duration-300">
              <img
                src="/logo192.png"
                alt="moodbase logo"
                className="h-8 w-8 mr-2"
              />
              <span
                style={{ color: theme.colors.primary }}
                className="text-3xl font-bold">
                moodbase
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about"
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-primary' : 'text-white/90 hover:text-white'
              }`}>
              Über Uns
            </Link>
            <Link to="/blog"
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-[#A13E4B]' : 'text-white/90 hover:text-white'
              }`}>
              Blog
            </Link>
            <Link to="/support"
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-[#A13E4B]' : 'text-white/90 hover:text-white'
              }`}>
              Unterstützen
            </Link>
            <Button to="/database" variant="primary" size="medium">
              Zur Datenbank
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-[#A13E4B]' : 'text-white'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-[#A13E4B]">
                Über Uns
              </Link>
              <Link to="/blog" className="block px-3 py-2 text-gray-600 hover:text-[#A13E4B]">
                Blog
              </Link>
              <Link to="/support" className="block px-3 py-2 text-gray-600 hover:text-[#A13E4B]">
                Unterstützen
              </Link>
              <div className="px-3 py-2">
                <Button to="/database" variant="primary" fullWidth>
                  Zur Datenbank
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;