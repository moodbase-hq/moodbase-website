import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Website = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100">
      {/* Fixed Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <a href="/" className={`text-3xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-pink-500' : 'text-white'
              }`}>
                MOODBASE
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-pink-500' : 'text-white/90 hover:text-white'
              }`}>
                Funktionen
              </a>
              <a href="#about" className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-pink-500' : 'text-white/90 hover:text-white'
              }`}>
                Über uns
              </a>
              <button className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300">
                Jetzt starten
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`transition-colors duration-300 ${
                  isScrolled ? 'text-gray-500 hover:text-pink-500' : 'text-white'
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
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-pink-500">
                  Funktionen
                </a>
                <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-pink-500">
                  Über uns
                </a>
                <button className="w-full mt-4 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
                  Jetzt starten
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/api/placeholder/1920/1080"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative text-center text-white z-10 max-w-5xl mx-auto px-4 py-32">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Finde die richtige Unterstützung mit Moodbase
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Entdecke maßgeschneiderte psychosoziale Unterstützung in Deutschland, die Jugendliche befähigt und unterstützt, ihre Herausforderungen zu meistern.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-pink-500 text-white px-8 py-4 rounded-full hover:bg-pink-600">
              Jetzt starten
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/30">
              Demo ansehen
            </button>
          </div>
        </div>
      </section>

      {/* Content Grid Below Hero */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-4">KI-gesteuerte Anpassung</h3>
              <p className="text-gray-600 mb-6">Unsere Plattform verwendet fortschrittliche KI, um dich basierend auf deinen spezifischen Bedürfnissen mit den besten psychosozialen Unterstützungsangeboten zu verbinden.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Transparente Qualitätsbewertungen</h3>
              <p className="text-gray-600">Jede Auflistung enthält transparente, nutzergenerierte Bewertungen der Servicequalität, die dir helfen, informierte Entscheidungen zu treffen.</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Inklusiver Zugang</h3>
              <p className="text-gray-600">Moodbase ist so gestaltet, dass es unabhängig vom sozioökonomischen Status oder Hintergrund zugänglich ist und Unterstützung bietet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Jugendliche Ermächtigen</h2>
              <p className="text-gray-600 mb-8">
                Moodbase wurde direkt mit der Beteiligung junger Menschen entwickelt, um sicherzustellen, dass es ihre Bedürfnisse wirklich adressiert und den Zugang zu psychosozialen Ressourcen demokratisiert.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8">
                <div className="bg-gray-100 rounded-xl aspect-[4/3]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Bereit, die passende Unterstützung zu finden?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Schließe dich heute Moodbase an und beginne deinen Weg zu besserer psychischer Gesundheit und Unterstützung.
          </p>
          <button className="bg-white text-pink-500 px-8 py-4 rounded-full hover:bg-white/90">
            Jetzt erkunden
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">MOODBASE</h4>
              <p className="text-gray-400">
                Entdecke die Unterstützung, die du verdienst.
              </p>
            </div>
            {['Produkt', 'Unternehmen', 'Ressourcen'].map((section) => (
              <div key={section}>
                <h4 className="text-xl font-bold mb-4">{section}</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-pink-500">Link 1</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-500">Link 2</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-500">Link 3</a></li>
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            © 2025 Moodbase. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Website;
