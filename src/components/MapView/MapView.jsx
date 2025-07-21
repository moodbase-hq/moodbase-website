import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN } from '../../config/mapbox';
import styles from './MapView.module.css';

// Set Mapbox access token
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

// Default center of Germany
const DEFAULT_CENTER = [10.4515, 51.1657];
const DEFAULT_ZOOM = 5.5;

const MapView = ({ results, onDetailsClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);

  // Map container ref
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popup = useRef(null);
  const markersRef = useRef([]);

  // Clean up markers to prevent memory leaks
  const cleanupMarkers = () => {
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => {
        if (marker) marker.remove();
      });
      markersRef.current = [];
    }
  };

  // Extract location data from results
  const getLocationData = (result) => {
    // Try to get coordinates from various possible fields
    const lat = result.latitude || result.lat || result.coordinates?.lat;
    const lng = result.longitude || result.lng || result.coordinates?.lng;
    
    // If coordinates exist, use them
    if (lat && lng) {
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        hasCoordinates: true
      };
    }

    // For now, return null if no coordinates
    // In the future, we could add geocoding here
    return {
      lat: null,
      lng: null,
      hasCoordinates: false
    };
  };

  // Get mappable results
  const getMappableResults = () => {
    if (!results || results.length === 0) return [];
    
    return results.filter(result => {
      const location = getLocationData(result);
      return location.hasCoordinates && 
             !isNaN(location.lat) && 
             !isNaN(location.lng);
    });
  };

  // Get non-mappable results
  const getNonMappableResults = () => {
    if (!results || results.length === 0) return [];
    
    return results.filter(result => {
      const location = getLocationData(result);
      return !location.hasCoordinates;
    });
  };

  // Calculate map center based on results
  useEffect(() => {
    const mappableResults = getMappableResults();
    
    if (mappableResults.length > 0) {
      const locations = mappableResults.map(result => getLocationData(result));
      const latitudes = locations.map(loc => loc.lat);
      const longitudes = locations.map(loc => loc.lng);
      
      const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
      const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
      
      if (!isNaN(avgLat) && !isNaN(avgLng)) {
        setMapCenter([avgLng, avgLat]);
      }
    }
    
    setIsLoading(false);
  }, [results]);

  // Initialize and update map
  useEffect(() => {
    if (isLoading || !mapContainer.current) return;

    // Check if we have a valid Mapbox token
    if (!MAPBOX_TOKEN) {
      console.log('=== MAPBOX TOKEN DEBUG ===');
      console.log('MAPBOX_TOKEN result:', MAPBOX_TOKEN);
      console.log('typeof process:', typeof process);
      console.log('typeof window:', typeof window);
      
      // Try to access process.env directly and log what we find
      try {
        console.log('Direct process access:', typeof process !== 'undefined' ? 'available' : 'not available');
        if (typeof process !== 'undefined') {
          console.log('process.env exists:', !!process.env);
          if (process.env) {
            console.log('process.env keys:', Object.keys(process.env));
            console.log('VITE_MAPBOX_TOKEN value:', import.meta.env.VITE_MAPBOX_TOKEN);
            console.log('VITE_MAPBOX_TOKEN type:', typeof import.meta.env.VITE_MAPBOX_TOKEN);
          }
        }
      } catch (e) {
        console.log('Error accessing process:', e.message);
      }
      
      // Check window methods
      if (typeof window !== 'undefined') {
        console.log('window.process exists:', !!window.process);
        console.log('window.ENV exists:', !!window.ENV);
        console.log('window.VITE_MAPBOX_TOKEN:', window.VITE_MAPBOX_TOKEN);
      }
      
      setError('Mapbox token is not configured. Please add VITE_MAPBOX_TOKEN to your environment variables and restart your development server.');
      return;
    }

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

        // Create popup
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
      // Clean up existing markers
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
      cleanupMarkers();
      
      const mappableResults = getMappableResults();
      
      mappableResults.forEach(result => {
        const location = getLocationData(result);
        
        try {
          // Create custom marker element
          const el = document.createElement('div');
          el.className = styles.customMarker;
          
          // Create marker instance
          const marker = new mapboxgl.Marker(el)
            .setLngLat([location.lng, location.lat])
            .addTo(map.current);
          
          // Store marker for cleanup
          markersRef.current.push(marker);
          
          // Add event listeners
          el.addEventListener('mouseenter', () => {
            const title = result.name || result.title;
            const organization = result.provider_name || result.provider || result.organization;
            const locationText = result.address || result.location || result.entry_location;
            
            popup.current
              .setLngLat([location.lng, location.lat])
              .setHTML(`
                <div style="padding: 8px;">
                  <h3 style="font-weight: bold; margin-bottom: 4px;">${title}</h3>
                  <p style="margin: 0 0 4px 0;">${organization}</p>
                  <p style="margin: 0; color: #666;">${locationText}</p>
                </div>
              `)
              .addTo(map.current);
          });
          
          el.addEventListener('mouseleave', () => {
            if (popup.current) popup.current.remove();
          });
          
          el.addEventListener('click', () => {
            if (onDetailsClick) {
              onDetailsClick(result.id);
            }
          });
        } catch (err) {
          console.error('Error adding marker:', err);
        }
      });
    }

    // Cleanup function
    return () => {
      cleanupMarkers();
    };
  }, [results, mapCenter, isLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupMarkers();
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const mappableResults = getMappableResults();
  const nonMappableResults = getNonMappableResults();

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.mapView}>
      <div className={styles.mapContainer}>
        <div ref={mapContainer} className={styles.map} />
        
        {mappableResults.length === 0 && (
          <div className={styles.noResults}>
            <p>Keine Angebote mit Standortdaten gefunden.</p>
          </div>
        )}
      </div>

      {/* Non-mappable results */}
      {nonMappableResults.length > 0 && (
        <div className={styles.nonMappableResults}>
          <h3 className={styles.nonMappableTitle}>
            Angebote ohne Standortdaten ({nonMappableResults.length})
          </h3>
          <div className={styles.nonMappableList}>
            {nonMappableResults.map((result, index) => {
              const title = result.name || result.title;
              const organization = result.provider_name || result.provider || result.organization;
              const location = result.address || result.location || result.entry_location || "Online";
              const serviceType = result.service_type || result.type;
              
              return (
                <div key={result.id || index} className={styles.nonMappableItem}>
                  <button
                    onClick={() => onDetailsClick && onDetailsClick(result.id)}
                    className={styles.nonMappableButton}
                  >
                    <h4 className={styles.nonMappableItemTitle}>{title}</h4>
                    <p className={styles.nonMappableItemOrg}>{organization}</p>
                    <p className={styles.nonMappableItemDetails}>
                      {serviceType} • {location}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;