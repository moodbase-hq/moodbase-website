import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import OfferingDetail from './OfferingDetail';
import databaseData from '../data/database.json';
import AIAssistant from './AIAssistant';


const DatabasePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);


  useEffect(() => {
    try {
      setIsLoading(true);
      setData(databaseData.offers);
      setFilteredData(databaseData.offers);
      setError(null);
    } catch (error) {
      setError('Could not load the data. Please try again later.');
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const filtered = data.filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleRowClick = (id) => {
    const offer = data.find(item => item.id === id);
    setSelectedOffer(offer);
  };

  if (selectedOffer) {
    return <OfferingDetail offering={selectedOffer} onBack={() => setSelectedOffer(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100">
      {/* Reused Navigation */}
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
              <a href="#/features" className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-pink-500' : 'text-white/90 hover:text-white'
              }`}>
                Funktionen
              </a>
              <a href="#/about" className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-pink-500' : 'text-white/90 hover:text-white'
              }`}>
                Über uns
              </a>
              <a href="#/database" className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300">
                Zur Datenbank
              </a>
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
                <a href="#/features" className="block px-3 py-2 text-gray-600 hover:text-pink-500">
                  Funktionen
                </a>
                <a href="#/about" className="block px-3 py-2 text-gray-600 hover:text-pink-500">
                  Über uns
                </a>
                <a href="#/database" className="block w-full mt-4 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 text-center">
                  Zur Datenbank
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Psychosoziale Angebote</h1>
          <p className="text-gray-600 mb-8">Finden Sie psychosoziale Unterstützung in Ihrer Nähe</p>

          {/* Search Bar and AI Assistant */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Angebote durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 text-lg rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button
              onClick={() => setShowAssistant(!showAssistant)}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 flex items-center justify-center space-x-2 min-w-[200px]"
            >
              <span>{showAssistant ? 'Suche anzeigen' : 'KI-Assistent öffnen'}</span>
            </button>
          </div>

          {showAssistant ? (
            <AIAssistant
              servicesData={data}
              onRecommendation={(service) => {
                setShowAssistant(false);
                if (service) {
                  handleRowClick(service.id);
                }
              }}
            />
          ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full max-w-md"></div>
                </div>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-600">
                <p>{error}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Angebot</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anbieter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ort</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verfügbarkeit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kosten</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sprachen</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          Keine Angebote gefunden.
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleRowClick(item.id)}
                              className="text-pink-600 hover:text-pink-800 font-medium"
                            >
                              {item.name}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.provider}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.status === 'Verfügbar' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.availability}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.costs}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {item.languages.map((lang, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">About Us</h4>
              <p className="text-gray-400">Your company description here</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            © 2024 Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DatabasePage;