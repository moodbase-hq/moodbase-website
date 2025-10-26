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

const MapView = ({ results, onDetailsClick, onPlaceClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapData, setMapData] = useState([]);
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

  // Fetch map data from new places API
  useEffect(() => {
    const fetchMapData = async () => {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/map`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch map data');
        }
        
        const places = await response.json();
        console.log('Map data loaded:', places.length, 'places');
        setMapData(places);
      } catch (error) {
        console.error('Error fetching map data:', error);
        setError('Failed to load map data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapData();
  }, []);

  // Extract location data from places (new structure)
  const getLocationData = (place) => {
    const lat = place.latitude;
    const lng = place.longitude;
    
    // Places should always have coordinates
    if (lat && lng && lat !== 0 && lng !== 0) {
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        hasCoordinates: true
      };
    }

    return {
      lat: null,
      lng: null,
      hasCoordinates: false
    };
  };

  // Get mappable places
  const getMappablePlaces = () => {
    if (!mapData || mapData.length === 0) return [];
    
    return mapData.filter(place => {
      const location = getLocationData(place);
      return location.hasCoordinates && 
             !isNaN(location.lat) && 
             !isNaN(location.lng);
    });
  };

  // Get places that match current search results (if any)
  const getFilteredPlaces = () => {
    const mappablePlaces = getMappablePlaces();
    
    // If no search results, show all places
    if (!results || results.length === 0) {
      return mappablePlaces;
    }
    
    // Filter places based on search results (offerings)
    const resultPlaceIds = new Set();
    results.forEach(result => {
      if (result.place_id) {
        resultPlaceIds.add(result.place_id);
      }
    });
    
    return mappablePlaces.filter(place => 
      resultPlaceIds.size === 0 || resultPlaceIds.has(place.place_id)
    );
  };

  // Calculate map center based on filtered places
  useEffect(() => {
    const filteredPlaces = getFilteredPlaces();
    
    if (filteredPlaces.length > 0) {
      const locations = filteredPlaces.map(place => getLocationData(place));
      const latitudes = locations.map(loc => loc.lat);
      const longitudes = locations.map(loc => loc.lng);
      
      const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
      const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
      
      if (!isNaN(avgLat) && !isNaN(avgLng)) {
        setMapCenter([avgLng, avgLat]);
      }
    }
  }, [mapData, results]);

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

    // Add markers to map (now showing places)
    function addMarkers() {
      cleanupMarkers();
      
      const filteredPlaces = getFilteredPlaces();
      
      filteredPlaces.forEach(place => {
        const location = getLocationData(place);
        
        try {
          // Create custom marker element
          const el = document.createElement('div');
          el.className = styles.customMarker;
          
          // Add offering count badge if there are offerings
          if (place.offering_count > 0) {
            const badge = document.createElement('div');
            badge.className = styles.offeringBadge;
            badge.textContent = place.offering_count;
            el.appendChild(badge);
          }
          
          // Create marker instance
          const marker = new mapboxgl.Marker(el)
            .setLngLat([location.lng, location.lat])
            .addTo(map.current);
          
          // Store marker for cleanup
          markersRef.current.push(marker);
          
          // Add event listeners
          el.addEventListener('mouseenter', () => {
            const placeName = place.place_name || place.name;
            const providerName = place.provider_name;
            const address = place.place_address || place.address;
            const city = place.city || '';
            const offeringCount = place.offering_count || 0;
            const serviceTypes = place.service_types || [];
            
            popup.current
              .setLngLat([location.lng, location.lat])
              .setHTML(`
                <div style="padding: 12px; min-width: 200px;">
                  <h3 style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">${placeName}</h3>
                  <p style="margin: 0 0 4px 0; font-size: 13px; color: #333;">${providerName}</p>
                  <p style="margin: 0 0 6px 0; font-size: 12px; color: #666;">${address}${city ? ', ' + city : ''}</p>
                  <div style="font-size: 12px; color: #444;">
                    <strong>${offeringCount}</strong> Angebot${offeringCount !== 1 ? 'e' : ''}
                    ${serviceTypes.length > 0 ? '<br/>' + serviceTypes.slice(0, 3).join(', ') : ''}
                  </div>
                  <div style="margin-top: 6px; font-size: 11px; color: #999;">Klicken für Details</div>
                </div>
              `)
              .addTo(map.current);
          });
          
          el.addEventListener('mouseleave', () => {
            if (popup.current) popup.current.remove();
          });
          
          el.addEventListener('click', () => {
            if (onPlaceClick) {
              onPlaceClick(place.place_id);
            } else if (onDetailsClick) {
              // Fallback to old interface
              onDetailsClick(place.place_id);
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
  }, [mapData, results, mapCenter, isLoading]);

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

  const filteredPlaces = getFilteredPlaces();
  
  // Get offerings that don't have place coordinates
  const getNonMappableOfferings = () => {
    if (!results || results.length === 0) return [];
    
    return results.filter(result => {
      // If result has place coordinates, it's mappable
      if (result.latitude && result.longitude) return false;
      
      // If result has place_id but we can't find that place in mapData, it's non-mappable
      if (result.place_id) {
        const place = mapData.find(p => p.place_id === result.place_id);
        return !place || !place.latitude || !place.longitude;
      }
      
      // No place info at all
      return true;
    });
  };

  const nonMappableOfferings = getNonMappableOfferings();

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.mapView}>
        <div className={styles.mapContainer}>
          <div className={styles.loading}>
            <p>Karte wird geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapView}>
      <div className={styles.mapContainer}>
        <div ref={mapContainer} className={styles.map} />
        
        {filteredPlaces.length === 0 && !isLoading && (
          <div className={styles.noResults}>
            <p>Keine Standorte mit Koordinaten gefunden.</p>
          </div>
        )}
        
        {/* Map info overlay */}
        {filteredPlaces.length > 0 && (
          <div className={styles.mapInfo}>
            <p>{filteredPlaces.length} Standort{filteredPlaces.length !== 1 ? 'e' : ''} angezeigt</p>
          </div>
        )}
      </div>

      {/* Non-mappable offerings */}
      {nonMappableOfferings.length > 0 && (
        <div className={styles.nonMappableResults}>
          <h3 className={styles.nonMappableTitle}>
            Angebote ohne Standortdaten ({nonMappableOfferings.length})
          </h3>
          <div className={styles.nonMappableList}>
            {nonMappableOfferings.map((result, index) => {
              const title = result.name || result.title;
              const organization = result.provider_name || result.provider || result.organization;
              const location = result.address || result.location || "Online";
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