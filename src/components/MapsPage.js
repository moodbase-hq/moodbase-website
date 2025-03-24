import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MapComponent from '../components/Map/MapComponent';
import OfferingDetail from './OfferingDetail';
import databaseData from '../content/database_coordinates.json';

const MapsPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [mapView, setMapView] = useState(true);
  const dataProcessedRef = useRef(false);

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
    <main className="pt-32 pb-20">
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
              className="w-full px-4 py-3 pl-12 text-lg rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B23A48] focus:border-transparent bg-white/80"
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
            <div className="p-4 border-b border-gray-200 bg-gray-50">
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
            <div className="p-4 border-b border-gray-200 bg-gray-50">
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
  );
};

export default MapsPage;