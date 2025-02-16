// DatabasePage.jsx
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import OfferingDetail from './OfferingDetail';
import databaseData from '../data/database.json';
import AIAssistant from './AIAssistant';

const DatabasePage = () => {
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
    <main className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Psychosoziale Angebote</h1>
          <p className="text-gray-600 max-w-3xl">
            DEMO! DAS SIND KEINE ECHTEN ANGEBOTE!
            Finden Sie psychosoziale Unterstützung in Ihrer Nähe. Nutzen Sie die Suchfunktion oder
            lassen Sie sich von unserem KI-Assistenten beraten.
          </p>
        </div>

        {/* Search Bar and AI Assistant */}
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
            onClick={() => setShowAssistant(!showAssistant)}
            className="bg-[#B23A48] text-white px-6 py-3 rounded-lg hover:bg-[#9B3240] flex items-center justify-center space-x-2 min-w-[200px] transition-colors duration-300"
          >
            <span>{showAssistant ? 'Suche anzeigen' : 'KI-Assistent öffnen'}</span>
          </button>
        </div>

        {/* Main Content Area */}
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
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full max-w-md"></div>
                </div>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-[#B23A48]">
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
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleRowClick(item.id)}
                              className="text-[#B23A48] hover:text-[#9B3240] font-medium transition-colors duration-300"
                            >
                              {item.name}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.provider}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.availability === 'Verfügbar' 
                                ? 'bg-green-100 text-green-800' 
                                : item.availability === 'Warteliste'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {item.availability}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.costs}</td>
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

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Benötigen Sie Hilfe bei der Suche? Unser KI-Assistent hilft Ihnen dabei,
            das passende Angebot zu finden.
          </p>
          <p className="text-sm text-gray-500">
            Hinweis: Dies ist eine Demo-Version. Die angezeigten Angebote dienen nur zur Veranschaulichung.
          </p>
        </div>
      </div>
    </main>
  );
};

export default DatabasePage;