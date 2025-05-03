// src/pages/DatabasePage.jsx
import React, { useState, useEffect } from 'react';
import { Search, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/shared/Header';
import FooterWithCurve from '../components/shared/FooterWithCurve';
import OfferingDetail from './OfferingDetail';
import AIAssistant from '../components/AIAssistant';
import theme from '../styles/theme';
import { motion } from 'framer-motion';

// Import SVG assets directly
import Blob1 from '../components/shared/assets/1.svg';
import CircleGroup from '../components/shared/assets/2.svg';
import OutlinedBlob from '../components/shared/assets/3.svg';
import CloudBlob from '../components/shared/assets/4.svg';

// API client setup
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Animated SVG Component with hover effect
const AnimatedSvg = ({
  src,
  width,
  height,
  className,
  alt = "Decorative element",
  style = {},
  delay = 0,
  animationType = "float" // Options: "float", "pulse", "rotate"
}) => {
  // Define different animation variants
  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 8 + Math.random() * 4, // Random duration between 8-12s
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay: delay
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [style.opacity || 0.7, (style.opacity || 0.7) + 0.1, style.opacity || 0.7],
    transition: {
      duration: 6 + Math.random() * 3, // Random duration between 6-9s
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay: delay
    }
  };

  const rotateAnimation = {
    rotate: [0, 3, 0, -3, 0],
    transition: {
      duration: 12 + Math.random() * 5, // Random duration between 12-17s
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay: delay
    }
  };

  // Choose animation based on type
  let animation = {};
  switch (animationType) {
    case "float":
      animation = floatAnimation;
      break;
    case "pulse":
      animation = pulseAnimation;
      break;
    case "rotate":
      animation = rotateAnimation;
      break;
    default:
      animation = floatAnimation;
  }

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width, height, zIndex: 0, ...style }}
      initial={{ opacity: 0 }}
      animate={{ opacity: style.opacity || 0.7 }}
      transition={{ duration: 1.5, delay: delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        animate={animation}
      />
    </motion.div>
  );
};

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
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);

  // Color definitions
  const blueBackground = '#2F5EA8'; // Blue for footer section
  const darkBlue = '#2F5EA8';      // Dark blue for CircleGroup SVGs
  const burgundy = '#A13E4B';      // Burgundy for CloudBlob SVGs

  // Fetch all offerings from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/offerings');
        setData(response.data);
        setFilteredData(response.data);
        setError(null);
      } catch (error) {
        setError('Could not load the data. Please try again later.');
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search functionality
  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.trim() === '') {
        setFilteredData(data);
        return;
      }

      try {
        const response = await api.get(`/offerings/search?term=${encodeURIComponent(searchTerm)}`);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Search error:', error);
        // Fall back to client-side filtering in case of API error
        const filtered = data.filter(item =>
          Object.values(item).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setFilteredData(filtered);
      }
    };

    // Debounce search to avoid too many API calls
    const timerId = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm, data]);

  const handleRowClick = async (id) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/offerings/${id}`);
      setSelectedOffer(response.data);
    } catch (error) {
      console.error('Error loading offering details:', error);
      // Fallback to the local data if API fails
      const offer = data.find(item => item.id === id);
      setSelectedOffer(offer);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* SVG Decorations - Using absolute positioning with overflow visible */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {/* MUCH BIGGER SVGs with unique database page arrangement */}

        {/* Center left very large blob */}
        <AnimatedSvg
          src={Blob1}
          alt="Center Blob"
          width="2600px"
          height="2600px"
          className="left-[-1200px] top-[300px]"
          style={{ opacity: 0.6 }}
          delay={0.2}
          animationType="float"
        />

        {/* Top right dark blue circle group */}
        <AnimatedSvg
          src={CircleGroup}
          alt="Top Circle Group"
          width="2000px"
          height="2000px"
          className="right-[-800px] top-[-400px]"
          style={{
            opacity: 0.8,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={0.3}
          animationType="rotate"
        />

        {/* Middle right outlined blob */}
        <AnimatedSvg
          src={OutlinedBlob}
          alt="Middle Outlined Blob"
          width="2200px"
          height="2200px"
          className="right-[-800px] top-[600px]"
          style={{ opacity: 0.5 }}
          delay={0.1}
          animationType="float"
        />

        {/* Table area cloud blob - burgundy */}
        <AnimatedSvg
          src={CloudBlob}
          alt="Bottom Cloud Blob"
          width="1800px"
          height="1800px"
          className="left-[30%] top-[900px]"
          style={{
            opacity: 0.6,
            filter: `brightness(0) saturate(100%) invert(28%) sepia(9%) saturate(4661%) hue-rotate(314deg) brightness(93%) contrast(89%)`
          }}
          delay={0.4}
          animationType="pulse"
        />

        {/* Bottom right circle group - dark blue */}
        <AnimatedSvg
          src={CircleGroup}
          alt="Bottom Circle Group"
          width="1600px"
          height="1600px"
          className="right-[-400px] bottom-[-400px]"
          style={{
            opacity: 0.7,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={0.5}
          animationType="pulse"
        />

        {/* Bottom left cloud blob */}
        <AnimatedSvg
          src={CloudBlob}
          alt="Left Cloud Blob"
          width="1400px"
          height="1400px"
          className="left-[-400px] bottom-[-300px]"
          style={{ opacity: 0.5 }}
          delay={0.2}
          animationType="rotate"
        />
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section - Now transparent */}
      <section className="relative pt-20 bg-transparent">
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex justify-between items-center flex-wrap mb-8 relative">
            <div className="flex-grow mr-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Psychosoziale Angebote</h1>
              <p className="text-gray-800">
                Nutzen Sie die Suchfunktion oder lassen Sie sich von unserem KI-Assistenten beraten.
              </p>
            </div>

            {/* Map View Button - Add z-index and relative positioning */}
            <Link
              to="/maps"
              className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-full inline-flex items-center mt-4 md:mt-0 relative z-20"
            >
              <Map className="mr-2" size={18} />
              Kartenansicht
            </Link>
          </div>

          {/* Search Bar and AI Assistant - Add z-index */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 relative z-20">
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
          <div className="relative z-20">
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
                                <button
                                  onClick={() => handleRowClick(item.id)}
                                  className="text-primary hover:text-primaryHover font-medium cursor-pointer"
                                >
                                  {item.name}
                                </button>
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
      </section>

      {/* Info Section - Blue card on transparent background */}
      <section className="relative bg-transparent py-12">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center bg-[#2F5EA8]/90 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <p className="text-white/90 mb-1 text-lg">
              Benötigen Sie Hilfe bei der Suche? Unser KI-Assistent hilft Ihnen dabei, das passende Angebot zu finden.
            </p>
            <p className="text-white/70 text-sm">
              Hinweis: Dies ist eine Demo-Version. Die angezeigten Angebote dienen nur zur Veranschaulichung.
            </p>
          </div>
        </div>
      </section>

      {/* Transition to footer */}
      <div className="relative z-10 mt-12">
        <WaveDivider position="bottom" color={blueBackground} />
      </div>

      {/* Footer */}
      <section style={{ backgroundColor: blueBackground }} className="relative z-10">
        <FooterWithCurve />
      </section>
    </div>
  );
};

export default DatabasePage;