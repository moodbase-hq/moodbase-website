// src/pages/DatabasePage.jsx
import React, { useState, useEffect } from 'react';
import { Search, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/shared/Header';
import CirclePattern from '../components/shared/CirclePatterns';
import BackgroundBlob from '../components/shared/BackgroundBlob';
import FooterWithCurve from '../components/shared/FooterWithCurve';
import OfferingDetail from './OfferingDetail';
import databaseData from '../data/database.json';
import AIAssistant from '../components/AIAssistant'; // Make sure path is correct
import theme from '../styles/theme';

// Wave Divider component for curved transitions
const WaveDivider = ({ position = 'bottom', color = '#FFFFFF', previousColor = '#EDF2FB', className = '' }) => {
  // Use different curves based on position
  if (position === 'bottom') {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} style={{ display: 'block', lineHeight: 0 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-auto block"
          style={{ display: 'block', verticalAlign: 'bottom' }}
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
      <div className={`relative w-full overflow-hidden ${className}`} style={{ display: 'block', lineHeight: 0 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-auto block"
          style={{ display: 'block', verticalAlign: 'top' }}
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

const DatabasePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);

  // Color definitions (matching landing page)
  const pinkBackground = theme.colors.background1;    // D9B1B1 - Pink background
  const sandBackground = theme.colors.background2;    // E8CEB0 - Sand background
  const blueBackground = theme.colors.tertiary;       // 99BEFA - Light blue

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

  const toggleAssistant = () => {
    console.log("Toggling assistant, current state:", showAssistant);
    setShowAssistant(!showAssistant);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section - Pink Background */}
      <section className="relative pt-20" style={{ backgroundColor: pinkBackground }}>
        {/* Background blobs */}
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

        {/* Red circle pattern in top left */}
        <div className="absolute top-20 left-20 z-10 pointer-events-none">
          <CirclePattern
            size="medium"
            color="#A13E4B"
            delay={0.2}
            opacity={0.7}
          />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center flex-wrap mb-8">
            <div className="flex-grow mr-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Psychosoziale Angebote</h1>
              <p className="text-gray-800">
                Nutzen Sie die Suchfunktion oder lassen Sie sich von unserem KI-Assistenten beraten.
              </p>
            </div>

            {/* Map View Button - using HTML a tag instead of Link */}
            <a
              href="/maps"
              className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-full inline-flex items-center mt-4 md:mt-0"
              style={{
                backgroundColor: theme.colors.primary,
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = theme.colors.primaryHover}
              onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.primary}
            >
              <Map className="mr-2" size={18} />
              Kartenansicht
            </a>
          </div>

          {/* Search Bar and AI Assistant */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Angebote durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 text-lg rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
            </div>

            {/* AI Assistant toggle button - pure HTML */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleAssistant();
              }}
              className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-full inline-flex items-center justify-center min-w-[200px]"
              style={{
                backgroundColor: theme.colors.primary,
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = theme.colors.primaryHover}
              onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.primary}
            >
              {showAssistant ? 'Zur Suche' : 'KI-Assistent öffnen'}
            </a>
          </div>
        </div>

        {/* Wave divider to sand section */}
        <WaveDivider position="bottom" color={sandBackground} previousColor={pinkBackground} />
      </section>

      {/* Main Content - Sand Background */}
      <section className="relative" style={{ backgroundColor: sandBackground }}>
        {/* Background Blobs */}
        <BackgroundBlob
          color={pinkBackground}
          width="800px"
          height="800px"
          className="top-[-200px] right-[-200px]"
          opacity={0.3}
          blur="60px"
        />

        <BackgroundBlob
          color={pinkBackground}
          width="700px"
          height="700px"
          className="top-[400px] left-[-200px]"
          opacity={0.25}
          blur="50px"
          delay={0.3}
        />

        {/* Circle patterns */}
        <div className="absolute left-0 bottom-20 z-10 pointer-events-none">
          <CirclePattern
            size="large"
            color="#A13E4B"
            delay={0.3}
            opacity={0.5}
          />
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Main Content Area */}
          <div>
            {showAssistant ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <AIAssistant
                  servicesData={data}
                  onRecommendation={(service) => {
                    setShowAssistant(false);
                    if (service) {
                      handleRowClick(service.id);
                    }
                  }}
                />
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                {isLoading ? (
                  <div className="p-4 text-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full max-w-md"></div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="p-4 text-center text-primary">
                    <p>{error}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50/70">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Angebot</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Anbieter</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ort</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Verfügbarkeit</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Kosten</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sprachen</th>
                        </tr>
                      </thead>
                      <tbody className="bg-transparent divide-y divide-gray-200">
                        {filteredData.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                              Keine Angebote gefunden.
                            </td>
                          </tr>
                        ) : (
                          filteredData.map((item) => (
                            <tr
                              key={item.id}
                              className="hover:bg-white/40 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRowClick(item.id);
                                  }}
                                  className="text-primary hover:text-primaryHover font-medium cursor-pointer"
                                  style={{
                                    color: theme.colors.primary,
                                    textDecoration: 'none'
                                  }}
                                  onMouseOver={(e) => e.target.style.color = theme.colors.primaryHover}
                                  onMouseOut={(e) => e.target.style.color = theme.colors.primary}
                                >
                                  {item.name}
                                </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.provider}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.location}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                                      style={{
                                        backgroundColor: 'rgba(161, 62, 75, 0.1)',
                                        color: theme.colors.primary
                                      }}>
                                  {item.availability}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.costs}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-wrap gap-1">
                                  {item.languages && item.languages.map((lang, index) => (
                                    <span key={index} className="px-2 py-1 text-xs rounded-full"
                                        style={{
                                          backgroundColor: 'rgba(47, 94, 168, 0.1)',
                                          color: theme.colors.secondary
                                        }}>
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
        </div>

        {/* Wave divider to blue section */}
        <WaveDivider position="bottom" color={blueBackground} previousColor={sandBackground} />
      </section>

      {/* Info Section - Blue Background */}
      <section className="relative" style={{ backgroundColor: blueBackground }}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/90 mb-1 text-lg">
              Benötigen Sie Hilfe bei der Suche? Unser KI-Assistent hilft Ihnen dabei, das passende Angebot zu finden.
            </p>
            <p className="text-white/70 text-sm">
              Hinweis: Dies ist eine Demo-Version. Die angezeigten Angebote dienen nur zur Veranschaulichung.
            </p>
          </div>
        </div>

        {/* Wave divider to sand buffer section */}
        <WaveDivider position="bottom" color={sandBackground} previousColor={blueBackground} />
      </section>

      {/* Sand buffer section */}
      <section style={{ backgroundColor: sandBackground }} className="relative">
        <div className="py-16"></div>
      </section>

      {/* Footer */}
      <FooterWithCurve />
    </div>
  );
};

export default DatabasePage;