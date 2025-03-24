// src/pages/MapsPage.jsx
import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MapComponent from '../components/Map/MapComponent';
import OfferingDetail from './OfferingDetail';
import databaseData from '../content/database_coordinates.json';
import { motion } from 'framer-motion';
import Header from '../components/shared/Header';

// Import SVG assets directly
import Blob1 from '../components/shared/assets/1.svg';
import CircleGroup from '../components/shared/assets/2.svg';
import OutlinedBlob from '../components/shared/assets/3.svg';
import CloudBlob from '../components/shared/assets/4.svg';

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

const MapsPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [mapView, setMapView] = useState(true);
  const dataProcessedRef = useRef(false);

  // Color definitions
  const darkBlue = '#2F5EA8';     // Dark blue for CircleGroup SVGs
  const burgundy = '#A13E4B';     // Burgundy for CloudBlob SVGs

  // Load and enhance data with coordinates
  useEffect(() => {
    // Use a ref to prevent duplicate processing
    if (dataProcessedRef.current) return;
    dataProcessedRef.current = true;

    try {
      setIsLoading(true);
      console.log("MapsPage: Loading and processing data");

      // Enhance data with sample coordinates if missing
      const enhancedData = databaseData.offers.map(offer => {
        // If the offer already has coordinates, use them
        if (offer.coordinates) return offer;

        // Otherwise, add sample coordinates for Berlin-based entries
        if (offer.location.includes('Berlin')) {
          return {
            ...offer,
            address: `Sample Address, ${offer.location}`,
            coordinates: {
              // Random coordinates within Berlin
              latitude: 52.52 + (Math.random() * 0.1 - 0.05),
              longitude: 13.40 + (Math.random() * 0.1 - 0.05)
            }
          };
        }

        // For non-Berlin or online entries
        return {
          ...offer,
          address: offer.location === 'Online' ? 'Digital / Remote' : `Sample Address, ${offer.location}`,
          coordinates: offer.location === 'Online' ? null : {
            // Random coordinates in Germany
            latitude: 51.0 + (Math.random() * 2),
            longitude: 10.0 + (Math.random() * 3)
          }
        };
      });

      console.log("MapsPage: Data processing complete");
      setData(enhancedData);
      setFilteredData(enhancedData);
      setError(null);
    } catch (error) {
      console.error("MapsPage: Error in data loading:", error);
      setError('Could not load the data. Please try again later.');
      dataProcessedRef.current = false; // Allow retry
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search filter effect
  useEffect(() => {
    const filtered = data.filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // Handle marker click
  const handleMarkerClick = (offer) => {
    setSelectedOffer(offer);
  };

  // Toggle between map and list views on mobile
  const toggleView = () => {
    setMapView(!mapView);
  };

  if (selectedOffer) {
    return <OfferingDetail offering={selectedOffer} onBack={() => setSelectedOffer(null)} />;
  }

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Header */}
      <Header />

      {/* SVG Decorations - Using absolute positioning with overflow visible */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {/* MUCH BIGGER SVGs with unique maps page arrangement */}

        {/* Top left large blob - positioned for map layout */}
        <AnimatedSvg
          src={Blob1}
          alt="Background Blob 1"
          width="2200px"
          height="2200px"
          className="left-[-1000px] top-[-400px]"
          style={{ opacity: 0.6 }}
          delay={0.3}
          animationType="pulse"
        />

        {/* Top right circle group - dark blue */}
        <AnimatedSvg
          src={CircleGroup}
          alt="Circle Group 1"
          width="1800px"
          height="1800px"
          className="right-[-700px] top-[-200px]"
          style={{
            opacity: 0.7,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={0.1}
          animationType="rotate"
        />

        {/* Middle right outlined blob */}
        <AnimatedSvg
          src={OutlinedBlob}
          alt="Outlined Blob 1"
          width="1600px"
          height="1600px"
          className="right-[-500px] top-[500px]"
          style={{ opacity: 0.5 }}
          delay={0.4}
          animationType="float"
        />

        {/* Map area cloud blob - burgundy */}
        <AnimatedSvg
          src={CloudBlob}
          alt="Cloud Blob 1"
          width="1400px"
          height="1400px"
          className="left-[20%] top-[600px]"
          style={{
            opacity: 0.4,
            filter: `brightness(0) saturate(100%) invert(28%) sepia(9%) saturate(4661%) hue-rotate(314deg) brightness(93%) contrast(89%)`
          }}
          delay={0.2}
          animationType="pulse"
        />

        {/* Bottom left blob */}
        <AnimatedSvg
          src={Blob1}
          alt="Background Blob 2"
          width="1900px"
          height="1900px"
          className="left-[-800px] bottom-[-600px]"
          style={{ opacity: 0.5 }}
          delay={0.5}
          animationType="float"
        />

        {/* Bottom right circle group - dark blue */}
        <AnimatedSvg
          src={CircleGroup}
          alt="Circle Group 2"
          width="1600px"
          height="1600px"
          className="right-[-600px] bottom-[-400px]"
          style={{
            opacity: 0.6,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={0.7}
          animationType="rotate"
        />
      </div>

      <main className="pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-bold text-gray-900">Angebote auf der Karte</h1>
              <Link
                to="/database"
                className="inline-flex items-center text-[#B23A48] hover:text-[#998878] transition-colors"
              >
                <ArrowLeft className="mr-1" size={16} />
                Zurück zur Datenbank
              </Link>
            </div>
            <p className="text-gray-600 max-w-3xl">
              DEMO! DAS SIND KEINE ECHTEN ANGEBOTE!
              Entdecken Sie psychosoziale Angebote in Ihrer Umgebung auf der Karte oder als Liste.
            </p>
          </div>

          {/* Search Bar and View Toggle */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Angebote durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 text-lg rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B23A48] focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button
              onClick={toggleView}
              className="md:hidden bg-[#B23A48] text-white px-6 py-3 rounded-lg hover:bg-[#998878] flex items-center justify-center space-x-2 transition-colors duration-300"
            >
              <MapPin size={20} />
              <span>{mapView ? 'Liste anzeigen' : 'Karte anzeigen'}</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Map Section - Hidden on mobile when list view is active */}
            <div className={`${!mapView && 'hidden'} lg:block lg:w-2/3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-200 h-[600px]`}>
              <div className="p-4 border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <MapPin size={18} className="mr-2 text-[#B23A48]" />
                  Angebote auf der Karte
                </h2>
              </div>

              <div className="p-4">
                {isLoading ? (
                  <div className="h-[500px] flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full max-w-md"></div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="h-[500px] flex items-center justify-center text-[#B23A48] p-4 text-center">
                    <p>{error}</p>
                  </div>
                ) : (
                  <MapComponent
                    data={filteredData}
                    onMarkerClick={handleMarkerClick}
                  />
                )}
              </div>
            </div>

            {/* List Section - Hidden on mobile when map view is active */}
            <div className={`${mapView && 'hidden'} lg:block lg:w-1/3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-200`}>
              <div className="p-4 border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <MapPin size={18} className="mr-2 text-[#B23A48]" />
                  Gefundene Angebote
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredData.filter(item => item.coordinates).length} Angebote auf der Karte
                </p>
              </div>

              <div className="overflow-y-auto max-h-[540px]">
                {filteredData.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    Keine Angebote gefunden.
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                        <button
                          onClick={() => handleMarkerClick(item)}
                          className="w-full text-left"
                        >
                          <h3 className="font-medium text-[#B23A48] mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">{item.provider}</p>
                          <p className="text-sm text-gray-500 mb-2 flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {item.location}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.languages.map((lang, index) => (
                              <span key={index} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Hinweis: Dies ist eine Demo-Version. Die angezeigten Standorte sind Beispiele und entsprechen nicht den tatsächlichen Adressen.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapsPage;