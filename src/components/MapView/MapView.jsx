import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN } from '../../config/mapbox';
import PlaceModal from '../PlaceModal/PlaceModal';
import ResultCard from '../SearchResults/ResultCard';
import Pagination from '../Pagination/Pagination';
import styles from './MapView.module.css';

// Set Mapbox access token
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

// Default center of Germany
const DEFAULT_CENTER = [10.4515, 51.1657];
const DEFAULT_ZOOM = 5.5;

// City coordinates for zoom-on-filter feature
const CITY_COORDINATES = {
  'Berlin': { center: [13.405, 52.52], zoom: 10 },
  'München': { center: [11.582, 48.1351], zoom: 11 },
  'Hamburg': { center: [9.9937, 53.5511], zoom: 11 },
  'Köln': { center: [6.9603, 50.9375], zoom: 11 },
  'Frankfurt': { center: [8.6821, 50.1109], zoom: 11 },
  'Frankfurt am Main': { center: [8.6821, 50.1109], zoom: 11 },
  'Stuttgart': { center: [9.1829, 48.7758], zoom: 11 },
  'Düsseldorf': { center: [6.7735, 51.2277], zoom: 11 },
  'Leipzig': { center: [12.3731, 51.3397], zoom: 11 },
  'Dortmund': { center: [7.4653, 51.5136], zoom: 11 },
  'Essen': { center: [7.0116, 51.4556], zoom: 11 },
  'Bremen': { center: [8.8017, 53.0793], zoom: 11 },
  'Dresden': { center: [13.7373, 51.0504], zoom: 11 },
  'Hannover': { center: [9.7320, 52.3759], zoom: 11 },
  'Nürnberg': { center: [11.0819, 49.4521], zoom: 11 },
  'Duisburg': { center: [6.7624, 51.4344], zoom: 11 },
  'Bochum': { center: [7.2162, 51.4818], zoom: 11 },
  'Wuppertal': { center: [7.1833, 51.2562], zoom: 11 },
  'Bielefeld': { center: [8.5324, 52.0302], zoom: 11 },
  'Bonn': { center: [7.0982, 50.7374], zoom: 11 },
  'Münster': { center: [7.6261, 51.9607], zoom: 11 },
  'Karlsruhe': { center: [8.4037, 49.0069], zoom: 11 },
  'Mannheim': { center: [8.4660, 49.4875], zoom: 11 },
  'Augsburg': { center: [10.8978, 48.3705], zoom: 11 },
  'Wiesbaden': { center: [8.2397, 50.0826], zoom: 11 },
  'Gelsenkirchen': { center: [7.0857, 51.5177], zoom: 11 },
  'Mönchengladbach': { center: [6.4428, 51.1805], zoom: 11 },
  'Braunschweig': { center: [10.5268, 52.2689], zoom: 11 },
  'Kiel': { center: [10.1227, 54.3233], zoom: 11 },
  'Chemnitz': { center: [12.9252, 50.8278], zoom: 11 },
  'Aachen': { center: [6.0838, 50.7753], zoom: 11 },
  'Halle': { center: [11.9695, 51.4828], zoom: 11 },
  'Magdeburg': { center: [11.6276, 52.1205], zoom: 11 },
  'Freiburg': { center: [7.8494, 47.9990], zoom: 11 },
  'Krefeld': { center: [6.5623, 51.3388], zoom: 11 },
  'Lübeck': { center: [10.6865, 53.8655], zoom: 11 },
  'Mainz': { center: [8.2473, 49.9929], zoom: 11 },
  'Erfurt': { center: [11.0299, 50.9787], zoom: 11 },
  'Rostock': { center: [12.0991, 54.0924], zoom: 11 },
  'Kassel': { center: [9.4797, 51.3127], zoom: 11 },
  'Potsdam': { center: [13.0645, 52.3906], zoom: 11 },
  'Saarbrücken': { center: [6.9969, 49.2402], zoom: 11 },
  'Oldenburg': { center: [8.2146, 53.1435], zoom: 11 },
  'Regensburg': { center: [12.1016, 49.0134], zoom: 11 },
  'Osnabrück': { center: [8.0472, 52.2799], zoom: 11 },
  'Heidelberg': { center: [8.6724, 49.3988], zoom: 12 },
  'Darmstadt': { center: [8.6512, 49.8728], zoom: 11 },
  'Würzburg': { center: [9.9537, 49.7913], zoom: 11 },
  'Göttingen': { center: [9.9354, 51.5413], zoom: 11 },
  'Ulm': { center: [9.9876, 48.4011], zoom: 11 },
  'Wolfsburg': { center: [10.7865, 52.4227], zoom: 11 },
  'Ingolstadt': { center: [11.4250, 48.7665], zoom: 11 },
};

// Mapbox styles for light/dark mode
const MAP_STYLES = {
  light: 'mapbox://styles/mapbox/streets-v11',
  dark: 'mapbox://styles/mapbox/dark-v11'
};

const MapView = ({ results, onDetailsClick, selectedCities = [], searchTerm = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    }
    return false;
  });
  const [error, setError] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  
  // Modal state
  const [modalPlaceId, setModalPlaceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state for non-mappable offerings
  const [nonMappablePage, setNonMappablePage] = useState(1);
  const nonMappableItemsPerPage = 12;

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

  // Modal handlers
  const handleOpenModal = (placeId) => {
    setModalPlaceId(placeId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalPlaceId(null);
  };

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          setIsDarkMode(newTheme === 'dark');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Detect city from search term
  const detectCityFromSearch = (term) => {
    if (!term) return null;
    const searchLower = term.toLowerCase().trim();

    // Check if any city name is contained in the search term
    for (const cityName of Object.keys(CITY_COORDINATES)) {
      if (searchLower.includes(cityName.toLowerCase())) {
        return cityName;
      }
    }
    return null;
  };

  // Zoom to selected city when filter or search term changes
  useEffect(() => {
    if (!map.current || isLoading) return;

    // First check if search term contains a city name
    const cityFromSearch = detectCityFromSearch(searchTerm);

    // Combine cities from filter and search
    const allCities = [...(selectedCities || [])];
    if (cityFromSearch && !allCities.includes(cityFromSearch)) {
      allCities.push(cityFromSearch);
    }

    // If no cities found, reset to default Germany view
    if (allCities.length === 0) {
      map.current.flyTo({
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        duration: 1000
      });
      return;
    }

    // If single city, zoom to it
    if (allCities.length === 1) {
      const cityData = CITY_COORDINATES[allCities[0]];
      if (cityData) {
        map.current.flyTo({
          center: cityData.center,
          zoom: cityData.zoom,
          duration: 1000
        });
      }
    } else {
      // Multiple cities: fit bounds to include all
      const bounds = new mapboxgl.LngLatBounds();
      let hasValidCity = false;

      allCities.forEach(city => {
        const cityData = CITY_COORDINATES[city];
        if (cityData) {
          bounds.extend(cityData.center);
          hasValidCity = true;
        }
      });

      if (hasValidCity && !bounds.isEmpty()) {
        map.current.fitBounds(bounds, {
          padding: 50,
          duration: 1000,
          maxZoom: 12
        });
      }
    }
  }, [selectedCities, searchTerm, isLoading]);

  // Update map style when theme changes
  useEffect(() => {
    if (!map.current) return;

    const newStyle = isDarkMode ? MAP_STYLES.dark : MAP_STYLES.light;

    // Handler to re-add clustering after style loads
    const onStyleLoad = () => {
      const filteredPlaces = getFilteredPlaces();
      if (filteredPlaces.length === 0) return;

      const geoJsonData = {
        type: 'FeatureCollection',
        features: filteredPlaces.map(place => ({
          type: 'Feature',
          properties: {
            place_id: place.place_id,
            place_name: place.place_name || place.name,
            provider_name: place.provider_name,
            address: place.place_address || place.address,
            city: place.city || '',
            offering_count: place.offering_count || 0,
          },
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(place.longitude), parseFloat(place.latitude)]
          }
        })).filter(f => f.geometry.coordinates[0] && f.geometry.coordinates[1])
      };

      // Re-add source and layers
      if (!map.current.getSource('places')) {
        map.current.addSource('places', {
          type: 'geojson',
          data: geoJsonData,
          cluster: true,
          clusterMaxZoom: 12,
          clusterRadius: 50
        });

        map.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'places',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': ['step', ['get', 'point_count'], '#A13E4B', 10, '#8B2C3A', 30, '#7A252E'],
            'circle-radius': ['step', ['get', 'point_count'], 15, 10, 20, 30, 25]
          }
        });

        map.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'places',
          filter: ['has', 'point_count'],
          layout: { 'text-field': '{point_count_abbreviated}', 'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'], 'text-size': 12 },
          paint: { 'text-color': '#ffffff' }
        });

        map.current.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'places',
          filter: ['!', ['has', 'point_count']],
          paint: { 'circle-color': '#A13E4B', 'circle-radius': 8, 'circle-stroke-width': 2, 'circle-stroke-color': '#ffffff' }
        });

        map.current.addLayer({
          id: 'unclustered-point-label',
          type: 'symbol',
          source: 'places',
          filter: ['!', ['has', 'point_count']],
          layout: { 'text-field': ['get', 'offering_count'], 'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'], 'text-size': 10 },
          paint: { 'text-color': '#ffffff' }
        });
      }
    };

    map.current.once('style.load', onStyleLoad);
    map.current.setStyle(newStyle);
  }, [isDarkMode, mapData]);

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

  // Get all places with valid coordinates (show all locations on map)
  const getFilteredPlaces = () => {
    return getMappablePlaces();
  };

  // Calculate map center based on filtered places (only when no city is selected)
  useEffect(() => {
    // Skip automatic centering if we have an active city from search or filter
    const cityFromSearch = detectCityFromSearch(searchTerm);
    const hasActiveCity = cityFromSearch || (selectedCities && selectedCities.length > 0);

    if (hasActiveCity) {
      // Let the city zoom effect handle positioning
      return;
    }

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
  }, [mapData, results, searchTerm, selectedCities]);

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
        // Initialize new map with theme-appropriate style
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: isDarkMode ? MAP_STYLES.dark : MAP_STYLES.light,
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
          setupClustering();
        });
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Could not initialize map. Please check your Mapbox token.');
      }
    } else {
      // Clean up existing markers
      cleanupMarkers();

      // Update map center only if no city is actively selected
      const cityFromSearch = detectCityFromSearch(searchTerm);
      const hasActiveCity = cityFromSearch || (selectedCities && selectedCities.length > 0);

      try {
        // Only auto-center if no city filter/search is active
        if (!hasActiveCity) {
          map.current.setCenter(validCenter);
        }

        // Update clustering if map is already loaded
        if (map.current.loaded()) {
          updateClusterData();
        }
      } catch (err) {
        console.error('Error updating map:', err);
      }
    }

    // Setup Mapbox clustering
    function setupClustering() {
      const filteredPlaces = getFilteredPlaces();
      const geoJsonData = formatPlacesForClustering(filteredPlaces);
      
      // Add data source with clustering
      map.current.addSource('places', {
        type: 'geojson',
        data: geoJsonData,
        cluster: true,
        clusterMaxZoom: 12, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points
      });

      // Add clusters layer
      map.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'places',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#A13E4B', // Color for small clusters
            10,
            '#8B2C3A', // Color for medium clusters
            30,
            '#7A252E'  // Color for large clusters
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            15, // Size for small clusters
            10,
            20, // Size for medium clusters
            30,
            25  // Size for large clusters
          ]
        }
      });

      // Add cluster count labels
      map.current.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'places',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        },
        paint: {
          'text-color': '#ffffff'
        }
      });

      // Add individual places layer (when not clustered)
      map.current.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'places',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#A13E4B',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Add labels for individual places
      map.current.addLayer({
        id: 'unclustered-point-label',
        type: 'symbol',
        source: 'places',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'text-field': ['get', 'offering_count'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 10
        },
        paint: {
          'text-color': '#ffffff'
        }
      });

      // Add click handlers
      setupClusterClickHandlers();
    }

    // Format places data for Mapbox clustering
    function formatPlacesForClustering(places) {
      const features = places.map(place => {
        const location = getLocationData(place);
        
        return {
          type: 'Feature',
          properties: {
            place_id: place.place_id,
            place_name: place.place_name || place.name,
            provider_name: place.provider_name,
            address: place.place_address || place.address,
            city: place.city || '',
            offering_count: place.offering_count || 0,
            service_types: place.service_types || []
          },
          geometry: {
            type: 'Point',
            coordinates: [location.lng, location.lat]
          }
        };
      }).filter(feature => 
        feature.geometry.coordinates[0] && 
        feature.geometry.coordinates[1]
      );

      return {
        type: 'FeatureCollection',
        features
      };
    }

    // Setup click handlers for clusters and individual places
    function setupClusterClickHandlers() {
      // Cluster click - zoom in
      map.current.on('click', 'clusters', (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        
        const clusterId = features[0].properties.cluster_id;
        
        map.current.getSource('places').getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;
            
            map.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
        );
      });

      // Individual place click - open modal instead of calling onPlaceClick
      map.current.on('click', 'unclustered-point', (e) => {
        const place = e.features[0].properties;
        handleOpenModal(place.place_id);
      });

      // Mouse enter/leave for popups
      map.current.on('mouseenter', 'clusters', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      
      map.current.on('mouseleave', 'clusters', () => {
        map.current.getCanvas().style.cursor = '';
      });

      map.current.on('mouseenter', 'unclustered-point', (e) => {
        map.current.getCanvas().style.cursor = 'pointer';
        
        const place = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();
        
        popup.current
          .setLngLat(coordinates)
          .setHTML(`
            <div style="padding: 12px; min-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">${place.place_name || place.provider_name}</h3>
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #333;">${place.provider_name}</p>
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #666;">${place.address}${place.city ? ', ' + place.city : ''}</p>
              <div style="font-size: 12px; color: #444;">
                <strong>${place.offering_count}</strong> Angebot${place.offering_count !== 1 ? 'e' : ''}
              </div>
              <div style="margin-top: 6px; font-size: 11px; color: #999;">Klicken für Details</div>
            </div>
          `)
          .addTo(map.current);
      });

      map.current.on('mouseleave', 'unclustered-point', () => {
        map.current.getCanvas().style.cursor = '';
        if (popup.current) popup.current.remove();
      });
    }

    // Update cluster data when filters change
    function updateClusterData() {
      const filteredPlaces = getFilteredPlaces();
      const geoJsonData = formatPlacesForClustering(filteredPlaces);
      
      if (map.current.getSource('places')) {
        map.current.getSource('places').setData(geoJsonData);
      }
    }

    // Cleanup function
    return () => {
      cleanupMarkers();
    };
  }, [mapData, results, mapCenter, isLoading, searchTerm, selectedCities]);

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

  // Reset non-mappable pagination when results change
  useEffect(() => {
    setNonMappablePage(1);
  }, [results]);

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

  // Calculate pagination for non-mappable offerings
  const nonMappableTotalPages = Math.ceil(nonMappableOfferings.length / nonMappableItemsPerPage);
  const nonMappableStartIndex = (nonMappablePage - 1) * nonMappableItemsPerPage;
  const paginatedNonMappable = nonMappableOfferings.slice(
    nonMappableStartIndex,
    nonMappableStartIndex + nonMappableItemsPerPage
  );

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
      <p className={styles.scrollHint}>Scrollen Sie nach unten, um alle Angebote als Liste zu sehen</p>
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
            {paginatedNonMappable.map((result, index) => (
              <ResultCard
                key={result.id || index}
                result={result}
                onDetailsClick={onDetailsClick}
              />
            ))}
          </div>
          {nonMappableTotalPages > 1 && (
            <Pagination
              currentPage={nonMappablePage}
              totalPages={nonMappableTotalPages}
              totalItems={nonMappableOfferings.length}
              itemsPerPage={nonMappableItemsPerPage}
              onPageChange={setNonMappablePage}
            />
          )}
        </div>
      )}

      {/* Place Modal */}
      <PlaceModal
        placeId={modalPlaceId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOfferingClick={onDetailsClick}
      />
    </div>
  );
};

export default MapView;