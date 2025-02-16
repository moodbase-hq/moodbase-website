// components/shared/Header.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className={`text-3xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-[#B23A48]' : 'text-[#B23A48]'
            }`}>
              MOODBASE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#about" className={`transition-colors duration-300 ${
              isScrolled ? 'text-gray-600 hover:text-[#B23A48]' : 'text-gray-600 hover:text-[#B23A48]'
            }`}>
              Über Uns
            </Link>
            <Link to="/blog" className={`transition-colors duration-300 ${
              isScrolled ? 'text-gray-600 hover:text-[#B23A48]' : 'text-gray-600 hover:text-[#B23A48]'
            }`}>
              Blog
            </Link>
            <a href="#support" className={`transition-colors duration-300 ${
              isScrolled ? 'text-gray-600 hover:text-[#B23A48]' : 'text-gray-600 hover:text-[#B23A48]'
            }`}>
              Unterstützen
            </a>
            <Link to="/database" className="bg-[#B23A48] text-white px-6 py-2 rounded-full hover:bg-[#9B3240] transition-colors duration-300">
              Zur Datenbank
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-[#B23A48]' : 'text-gray-600 hover:text-[#B23A48]'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/#about" className="block px-3 py-2 text-gray-600 hover:text-[#B23A48]">
                Über Uns
              </Link>
              <Link to="/blog" className="block px-3 py-2 text-gray-600 hover:text-[#B23A48]">
                Blog
              </Link>
              <a href="#support" className="block px-3 py-2 text-gray-600 hover:text-[#B23A48]">
                Unterstützen
              </a>
              <Link to="/database" className="block w-full mt-4 bg-[#B23A48] text-white px-6 py-2 rounded-full hover:bg-[#9B3240] text-center">
                Zur Datenbank
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;