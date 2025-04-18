// src/pages/DatabasePage.jsx
import React, { useState, useEffect } from 'react';
import { Map } from 'lucide-react';
import SectionHeader from '../components/shared/SectionHeader';
import FooterWithCurve from '../components/shared/FooterWithCurve';
import SearchBar from '../components/shared/SearchBar';
import OfferingsTable from '../components/shared/OfferingsTable';
import InfoCard from '../components/shared/InfoCard';
import Button from '../components/shared/Button';
import { useTheme } from '../context/ThemeContext';
import OfferingDetail from '../components/shared/OfferingDetail';
import databaseData from '../data/database.json';
import AIAssistant from '../components/shared/AIAssistant';

import './DatabasePage.css';
// Wave Divider component
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

const DatabasePage = () => {
  const themeContext = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);

  // Color definitions
  const blueBackground = '#2F5EA8'; // Blue for footer section
  const burgundy = '#A13E4B';      // Burgundy for CloudBlob SVGs

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

  // Handle recommendations from AI Assistant
  const handleRecommendation = (service) => {
    setShowAssistant(false);
    if (service) {
      handleRowClick(service.id);
    }
  };

  if (selectedOffer) {
    return <OfferingDetail offering={selectedOffer} onBack={() => setSelectedOffer(null)} />;
  }


  const mapViewButton = (
    <Button
      to="/maps"
      variant="primary"
      className="flex items-center mt-4 md:mt-0 relative z-20"> <Map className="mr-2" size={18} />Kartenansicht </Button>
  );

  return (
    <div className="relative min-h-screen bg-transparent ">
      {/* SVG Decorations - Using absolute positioning with overflow visible */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {/* MUCH BIGGER SVGs with unique database page arrangement */}
      </div>
      <section className="relative pt-20 bg-transparent">
        <div className="container mx-auto px-4 py-12 relative z-10">
          <SectionHeader
            title="Psychosoziale Angebote"
            description="Nutzen Sie die Suchfunktion oder lassen Sie sich von unserem KI-Assistenten beraten."
            actionButton={mapViewButton}
          />

          {/* Search Bar and AI Assistant - Add z-index */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 relative z-20">
            <SearchBar
              placeholder="Angebote durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Toggle AI Assistant button - Add z-index */}
            <button
              onClick={() => setShowAssistant(!showAssistant)}
              className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-full transition-colors flex items-center justify-center space-x-2 min-w-[200px] relative z-20"
            >
              <span>{showAssistant ? 'Zur Suche' : 'KI-Assistent öffnen'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content - Now transparent */}
      <section className="relative bg-transparent">
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Main Content Area */}
          <div className="relative z-20 flex flex-col flex-1">
            <div className="flex flex-col flex-1">
              {showAssistant ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                  {/* AIAssistant component with proper props */}
                  <AIAssistant
                    servicesData={data}
                    onRecommendation={handleRecommendation}
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
                    <OfferingsTable data={filteredData} onRowClick={handleRowClick} />
                  )}
                    </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section - Blue card on transparent background */}
      <section className="relative bg-transparent py-12">
        <div className="container mx-auto px-4 relative z-10">
          <InfoCard
            description="Benötigen Sie Hilfe bei der Suche? Unser KI-Assistent hilft Ihnen dabei, das passende Angebot zu finden."
            backgroundColor="rgba(47, 94, 168, 0.9)"
          >
            <p className="text-white/70 text-sm mt-2">
              Hinweis: Dies ist eine Demo-Version. Die angezeigten Angebote dienen nur zur Veranschaulichung.
            </p>
          </InfoCard>
        </div>
      </section>

      {/* Transition to footer */}
      <div className="relative z-10 mt-12">
        <WaveDivider position="bottom" color={blueBackground} />
      </div>
      <section style={{ backgroundColor: blueBackground }} className="relative z-10">
        <FooterWithCurve />
      </section>
    </div>
  );
};