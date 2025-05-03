// src/components/MapsPage.js
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from './shared/Header';
import FooterWithCurve from './shared/FooterWithCurve';
import OfferingDetail from './OfferingDetail'; // Fixed import path

// API client setup
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
// Set your Mapbox access token
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || 'your_mapbox_token';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Default center of Germany
const DEFAULT_CENTER = [10.4515, 51.1657];
const DEFAULT_ZOOM = 5.5;

const MapsPage = () => {
  const [mapData, setMapData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const navigate = useNavigate();

  // Map container ref
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popup = useRef(null);
  const markersRef = useRef([]);

  // Fetch map data from API
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/map');
        setMapData(response.data);
        setError(null);

        // If there are markers, adjust center to middle of all points
        if (response.data && response.data.length > 0) {
          const validMarkers = response.data.filter(item =>
            item.latitude &&
            item.longitude &&
            !isNaN(parseFloat(item.latitude)) &&
            !isNaN(parseFloat(item.longitude))
          );

          if (validMarkers.length > 0) {
            const latitudes = validMarkers.map(item => parseFloat(item.latitude));
            const longitudes = validMarkers.map(item => parseFloat(item.longitude));
            const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
            const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

            // Make sure we have valid coordinates
            if (!isNaN(avgLat) && !isNaN(avgLng)) {
              setMapCenter([avgLng, avgLat]);
            } else {
              // Use default coordinates if calculation fails
              setMapCenter(DEFAULT_CENTER);
            }
          }
        }
      } catch (error) {
        console.error('Error loading map data:', error);
        setError('Could not load the map data. Please try again later.');
        // Use default coordinates on error
        setMapCenter(DEFAULT_CENTER);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapData();
  }, []);

  // Clean up markers to prevent memory leaks
  const cleanupMarkers = () => {
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => {
        if (marker) marker.remove();
      });
      markersRef.current = [];
    }
  };

  // Initialize and update map when data or center changes
  useEffect(() => {
    if (isLoading || error || selectedOffer || !mapContainer.current) return;

    // Ensure valid coordinates
    const validCenter = Array.isArray(mapCenter) &&
                        mapCenter.length === 2 &&
                        !isNaN(mapCenter[0]) &&
                        !isNaN(mapCenter[1]) ?
                        mapCenter : DEFAULT_CENTER;

    if (!map.current) {
      try {
        // Initialize new map
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: validCenter,
          zoom: DEFAULT_ZOOM
        });

        // Add navigation control
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Create popup but don't add to map yet
        popup.current = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        // Setup map load event
        map.current.on('load', () => {
          addMarkers();
        });
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Could not initialize map. Please check your Mapbox token.');
      }
    } else {
      // Clean up existing markers first
      cleanupMarkers();

      // Update map center
      try {
        map.current.setCenter(validCenter);

        // Add markers if map is already loaded
        if (map.current.loaded()) {
          addMarkers();
        }
      } catch (err) {
        console.error('Error updating map:', err);
      }
    }

    // Add markers to map
    function addMarkers() {
      // Clean up existing markers first
      cleanupMarkers();

      // Only proceed if we have map data and the map is initialized
      if (!mapData || !map.current) return;

      // Add markers for each offering with coordinates
      mapData.forEach(item => {
        if (item.latitude && item.longitude) {
          // Parse coordinates and ensure they're valid numbers
          const lat = parseFloat(item.latitude);
          const lng = parseFloat(item.longitude);

          if (isNaN(lat) || isNaN(lng)) return;

          try {
            // Create custom marker element
            const el = document.createElement('div');
            el.className = 'custom-marker';
            el.style.backgroundColor = '#2F5EA8';
            el.style.width = '20px';
            el.style.height = '20px';
            el.style.borderRadius = '50%';
            el.style.border = '2px solid white';
            el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
            el.style.cursor = 'pointer';

            // Create marker instance
            const marker = new mapboxgl.Marker(el)
              .setLngLat([lng, lat])
              .addTo(map.current);

            // Store marker for cleanup
            markersRef.current.push(marker);

            // Add event listeners
            el.addEventListener('mouseenter', () => {
              popup.current
                .setLngLat([lng, lat])
                .setHTML(`
                  <div style="padding: 8px;">
                    <h3 style="font-weight: bold; margin-bottom: 4px;">${item.name}</h3>
                    <p style="margin: 0 0 4px 0;">${item.provider}</p>
                    <p style="margin: 0; color: #666;">${item.location}</p>
                  </div>
                `)
                .addTo(map.current);
            });

            el.addEventListener('mouseleave', () => {
              if (popup.current) popup.current.remove();
            });

            el.addEventListener('click', () => {
              handleMarkerClick(item.id);
            });
          } catch (err) {
            console.error('Error adding marker:', err);
          }
        }
      });
    }

    // Cleanup function to remove map when component unmounts
    return () => {
      cleanupMarkers();

      if (map.current) {
        map.current.off('load');
      }
    };
  }, [mapData, mapCenter, isLoading, error, selectedOffer]);

  const handleMarkerClick = async (id) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/offerings/${id}`);
      setSelectedOffer(response.data);
    } catch (error) {
      console.error('Error loading offering details:', error);
      setError('Could not load the offering details.');
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedOffer) {
    return <OfferingDetail offering={selectedOffer} onBack={() => setSelectedOffer(null)} />;
  }

  // Group locations to organize the list
  const locations = {};
  mapData.forEach(item => {
    // Group by city/region when possible
    const location = item.location ? item.location.split('-')[0] : 'Online/Andere';
    if (!locations[location]) {
      locations[location] = [];
    }
    locations[location].push(item);
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center text-primary hover:text-primaryHover transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Zurück zur Liste</span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">Angebote auf der Karte</h1>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div
              ref={mapContainer}
              className="h-[70vh] w-full"
              style={{
                position: 'relative',
                zIndex: 1
              }}
            />

            <div className="p-4 bg-gray-50">
              <p className="text-sm text-gray-600">
                Nutzen Sie die Karte, um Angebote in Ihrer Nähe zu finden. Klicken Sie auf einen Marker, um Details zu einem Angebot zu sehen.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Angebote ohne Standort</h2>
          {mapData.filter(item => !item.latitude || !item.longitude || isNaN(parseFloat(item.latitude)) || isNaN(parseFloat(item.longitude))).length === 0 ? (
            <p className="text-gray-600">Keine Angebote ohne Standort verfügbar.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {mapData.filter(item => !item.latitude || !item.longitude || isNaN(parseFloat(item.latitude)) || isNaN(parseFloat(item.longitude))).map(item => (
                <li key={item.id} className="py-3">
                  <button
                    onClick={() => handleMarkerClick(item.id)}
                    className="text-left w-full hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <h3 className="font-medium text-primary">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.provider}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.type} • {item.location || "Online"}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <FooterWithCurve />
      </div>
    </div>
  );
};

export default MapsPage;