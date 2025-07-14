// API client setup using fetch
const API_URL = import.meta.env.REACT_APP_API_URI || 'http://localhost:3001';

// Sample data for fallback when API is not available
const SAMPLE_DATA = [
  {
    id: 1,
    name: "Allgemeine Sozialberatung in einem Bezirk von Berlin",
    provider_name: "Caritasverband für das Erzbistum Berlin e.v.",
    service_type: "Beratung",
    address: "12345 Berlin, Musterstraße 123",
    cost: "Kostenfrei",
    primary_location_type: "Vor Ort",
    languages: ["Deutsch", "English"],
    description: "Umfassende Sozialberatung für alle Lebenslagen",
    phone: "+49 30 12345678",
    email: "beratung@caritas-berlin.de"
  },
  {
    id: 2,
    name: "Online-Beratung für junge Erwachsene",
    provider_name: "Jugendberatung München",
    service_type: "Online-Beratung",
    address: "80331 München, Beispielweg 456",
    cost: "Kostenfrei",
    primary_location_type: "Online",
    languages: ["Deutsch", "Türkçe"],
    description: "Spezialisierte Beratung für Menschen zwischen 18-25 Jahren"
  },
  {
    id: 3,
    name: "Krisenintervention",
    provider_name: "Psychosoziales Zentrum Hamburg",
    service_type: "Krisenintervention",
    address: "20095 Hamburg, Teststraße 789",
    cost: "Nach Vereinbarung",
    primary_location_type: "Vor Ort",
    languages: ["Deutsch", "English", "Français"],
    description: "Akute Krisenintervention und Stabilisierung"
  }
];

// Helper function for fetch requests
const apiRequest = async (endpoint, options = {}) => {
  // Remove trailing slash from API_URL and leading slash from endpoint to avoid double slashes
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;
  
  console.log('Making API request to:', url);
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    console.error(`API request failed: ${response.status} ${response.statusText}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// API service functions
export const apiService = {
  // Fetch all offerings
  async fetchOfferings() {
    try {
      // Try different possible endpoints like in the old implementation
      let data;
      
      try {
        // First try the standard endpoint
        data = await apiRequest('/api/offerings');
      } catch (error1) {
        console.log('Standard endpoint failed, trying alternatives...');
        
        try {
          // Try without the /api prefix
          data = await apiRequest('/offerings');
        } catch (error2) {
          console.log('Alternative endpoint also failed');
          throw error1; // Throw the original error
        }
      }
      
      console.log('Successfully loaded offerings from API:', data?.length || 'unknown count');
      return data;
    } catch (error) {
      console.error('Error fetching offerings, using sample data:', error);
      // Return sample data as fallback
      return SAMPLE_DATA;
    }
  },

  // Search offerings with filters
  async searchOfferings(params = {}) {
    try {
      // Check if search endpoint exists, fall back to client-side filtering if needed
      const searchParams = new URLSearchParams();
      
      if (params.term) searchParams.append('term', params.term);
      if (params.serviceType) searchParams.append('serviceType', params.serviceType);
      if (params.city) searchParams.append('city', params.city);
      if (params.modality) searchParams.append('modality', params.modality);
      if (params.language) searchParams.append('language', params.language);

      const queryString = searchParams.toString();
      
      let data;
      
      try {
        // Try the standard search endpoint first
        const endpoint = queryString ? `/api/offerings/search?${queryString}` : '/api/offerings';
        data = await apiRequest(endpoint);
      } catch (error1) {
        try {
          // Try alternative search endpoint
          const endpoint = queryString ? `/offerings/search?${queryString}` : '/offerings';
          data = await apiRequest(endpoint);
        } catch (error2) {
          console.log('Search endpoints failed, falling back to fetchOfferings');
          throw error1;
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error searching offerings, using client-side filtering:', error);
      // Fall back to client-side filtering on sample data
      let filtered = [...SAMPLE_DATA];
      
      if (params.term) {
        const term = params.term.toLowerCase();
        filtered = filtered.filter(item => 
          item.name?.toLowerCase().includes(term) ||
          item.provider_name?.toLowerCase().includes(term) ||
          item.address?.toLowerCase().includes(term) ||
          item.service_type?.toLowerCase().includes(term)
        );
      }
      
      if (params.serviceType) {
        filtered = filtered.filter(item => item.service_type === params.serviceType);
      }
      
      if (params.city) {
        filtered = filtered.filter(item => item.address?.includes(params.city));
      }
      
      if (params.modality) {
        filtered = filtered.filter(item => item.primary_location_type === params.modality);
      }
      
      return filtered;
    }
  },

  // Fetch single offering by ID
  async fetchOfferingById(id) {
    try {
      let data;
      
      try {
        // Try standard endpoint first
        data = await apiRequest(`/api/offerings/${id}`);
      } catch (error1) {
        try {
          // Try alternative endpoint
          data = await apiRequest(`/offerings/${id}`);
        } catch (error2) {
          throw error1;
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching offering details, using sample data:', error);
      // Fall back to sample data
      const offering = SAMPLE_DATA.find(item => item.id === parseInt(id));
      if (offering) {
        return offering;
      }
      throw new Error('Offering not found');
    }
  },

  // Fetch available languages
  async fetchLanguages() {
    try {
      let data;
      
      try {
        // Try standard endpoint first
        data = await apiRequest('/api/languages');
      } catch (error1) {
        try {
          // Try alternative endpoint
          data = await apiRequest('/languages');
        } catch (error2) {
          throw error1;
        }
      }
      
      return data.map(lang => lang.name);
    } catch (error) {
      console.log('Languages endpoint not available, using default');
      return ['Deutsch', 'English', 'Türkçe', 'العربية', 'Français'];
    }
  },

  // Extract unique filter options from offerings data
  extractFilterOptions(offerings) {
    const serviceTypes = [...new Set(
      offerings
        .map(item => item.service_type || item.type)
        .filter(Boolean)
    )];

    const modalities = [...new Set(
      offerings
        .map(item => item.primary_location_type)
        .filter(Boolean)
    )];

    const cities = [];
    offerings.forEach(item => {
      if (item.address) {
        // Extract city from address
        const addressParts = item.address.split(',');
        if (addressParts.length > 1) {
          const cityPart = addressParts[addressParts.length - 1].trim();
          const cityMatch = cityPart.match(/\d{5}\s+(.+)/) || cityPart.match(/(.+)/);
          if (cityMatch && cityMatch[1]) {
            cities.push(cityMatch[1].trim());
          }
        }
      }
    });

    const uniqueCities = [...new Set(cities)].filter(city => city.length > 0);

    return {
      serviceTypes,
      modalities,
      cities: uniqueCities
    };
  }
};

export default apiService;