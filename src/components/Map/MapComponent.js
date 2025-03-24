import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from '../../context/ThemeContext';

// Set the Mapbox access token from environment variables
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

const MapComponent = ({ data, onMarkerClick }) => {
  const theme = useTheme();
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [highlightedOffer, setHighlightedOffer] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef({});  // Object to track markers by ID
  const initializedRef = useRef(false); // Prevent double initialization
  const popupClickListenersRef = useRef({}); // Track popup click listeners to prevent duplicates

  // Filter for entries with coordinates
  const validOffers = data?.filter(offer =>
    offer.coordinates && offer.coordinates.latitude && offer.coordinates.longitude
  ) || [];

  // Initial map setup - run once and only once
  useEffect(() => {
    // Check if Mapbox token is available
    if (!mapboxgl.accessToken) {
      console.error("MapComponent: Mapbox token is missing. Please set REACT_APP_MAPBOX_TOKEN environment variable.");
      return;
    }

    // Use initialization flag to prevent duplicate initialization
    if (initializedRef.current) return;
    if (!mapContainer.current) return;

    console.log("MapComponent: Initializing map");
    initializedRef.current = true;

    try {
      // Create new map instance
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [13.3777, 52.5163], // Center on Berlin
        zoom: 10,
        preserveDrawingBuffer: true // Important for some browsers
      });

      // Add navigation controls
      mapInstance.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add event listeners for debugging
      mapInstance.current.on('load', () => {
        console.log("MapComponent: Map loaded successfully");
        setMapLoaded(true);
      });

      mapInstance.current.on('error', (e) => {
        console.error("MapComponent: Mapbox error:", e);
      });
    } catch (error) {
      console.error("MapComponent: Error initializing map:", error);
      initializedRef.current = false; // Reset flag to allow retry
    }

    // Clean up on unmount
    return () => {
      console.log("Cleanup function called in MapComponent");
      // Clean up popup click listeners
      Object.values(popupClickListenersRef.current).forEach(listener => {
        if (listener && listener.element) {
          listener.element.removeEventListener('click', listener.handler);
        }
      });

      // Remove the map
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        initializedRef.current = false;
      }
    };
  }, []); // Empty dependency array - run once on mount

  // Add markers when map is loaded and when data changes
  useEffect(() => {
    if (!mapInstance.current || !mapLoaded || !validOffers.length) return;

    console.log("MapComponent: Adding markers, valid offers:", validOffers.length);

    // Clean up previous popup click listeners
    Object.values(popupClickListenersRef.current).forEach(listener => {
      if (listener && listener.element) {
        listener.element.removeEventListener('click', listener.handler);
      }
    });
    popupClickListenersRef.current = {};

    // Remove any existing markers
    Object.values(markersRef.current).forEach(markerData => {
      if (markerData && markerData.marker) {
        markerData.marker.remove();
      }
    });
    markersRef.current = {};

    // Add markers for each offer with coordinates
    validOffers.forEach(offer => {
      try {
        // Create marker element with inline styles for better compatibility
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png)';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = 'cover';
        el.style.cursor = 'pointer';
        el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

        // Store the original marker reference
        const marker = new mapboxgl.Marker(el)
          .setLngLat([offer.coordinates.longitude, offer.coordinates.latitude])
          .addTo(mapInstance.current);

        // Store marker with related data for later reference
        markersRef.current[offer.id] = {
          marker,
          element: el,
          offer
        };

        // Add click event to the marker element to highlight it
        el.addEventListener('click', () => {
          console.log("Marker clicked:", offer.name);
          setHighlightedOffer(offer);

          // Create popup content
          const popupHTML = `
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="font-weight: bold; color: ${theme.colors.primary}; margin-bottom: 8px; font-size: 16px;">${offer.name}</h3>
              <p style="margin-bottom: 4px; font-size: 14px;"><strong>Anbieter:</strong> ${offer.provider}</p>
              <p style="margin-bottom: 4px; font-size: 14px;"><strong>Verfügbarkeit:</strong> ${offer.availability}</p>
              <p style="margin-bottom: 8px; font-size: 14px;"><strong>Kosten:</strong> ${offer.costs}</p>
              <button 
                id="details-btn-${offer.id}"
                style="background-color: ${theme.colors.primary}; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; width: 100%; font-size: 14px;"
              >
                Details anzeigen
              </button>
            </div>
          `;

          // Create a popup
          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: true,
            maxWidth: '300px'
          })
            .setLngLat([offer.coordinates.longitude, offer.coordinates.latitude])
            .setHTML(popupHTML)
            .addTo(mapInstance.current);

          // Add event listener to the button after popup is added to DOM
          popup.on('open', () => {
            setTimeout(() => {
              const detailsBtn = document.getElementById(`details-btn-${offer.id}`);
              if (detailsBtn) {
                console.log("Found details button for:", offer.name);

                // Remove any existing listener
                if (popupClickListenersRef.current[offer.id]) {
                  const oldListener = popupClickListenersRef.current[offer.id];
                  if (oldListener.element) {
                    oldListener.element.removeEventListener('click', oldListener.handler);
                  }
                }

                // Create and store the new listener
                const clickHandler = () => {
                  console.log("Details button clicked for:", offer.name);
                  setSelectedOffer(offer);
                  if (onMarkerClick) {
                    onMarkerClick(offer);
                  }
                };

                detailsBtn.addEventListener('click', clickHandler);
                popupClickListenersRef.current[offer.id] = {
                  element: detailsBtn,
                  handler: clickHandler
                };
              } else {
                console.warn("Could not find details button for:", offer.name);
              }
            }, 100); // Wait for DOM to update
          });
        });
      } catch (error) {
        console.error(`MapComponent: Error adding marker for offer ${offer.id}:`, error);
      }
    });
  }, [validOffers, mapLoaded, onMarkerClick, theme.colors.primary]);

  // Effect to handle highlighted offer
  useEffect(() => {
    if (!highlightedOffer) return;

    console.log("Highlighting offer:", highlightedOffer.name);

    // Update marker appearance based on highlight state
    Object.entries(markersRef.current).forEach(([id, { marker, element, offer }]) => {
      if (highlightedOffer && offer.id === highlightedOffer.id) {
        // Highlight this marker
        element.style.transform = 'scale(1.4)';
        element.style.zIndex = '10';

        // Center map on this marker with animation
        if (mapInstance.current) {
          mapInstance.current.flyTo({
            center: [offer.coordinates.longitude, offer.coordinates.latitude],
            zoom: 13,
            duration: 1000
          });
        }
      } else {
        // Reset to normal
        element.style.transform = 'scale(1)';
        element.style.zIndex = '1';
      }
    });
  }, [highlightedOffer]);

  // Handle offer click from list view
  const handleOfferClick = (id) => {
    console.log("Offer clicked from list:", id);
    const offer = validOffers.find(o => o.id === id);
    if (offer) {
      setHighlightedOffer(offer);

      // Trigger a click on the marker to show popup
      const markerData = markersRef.current[id];
      if (markerData && markerData.element) {
        markerData.element.click();
      }
    }
  };

  return (
    <div className="map-component" style={{ position: 'relative' }}>
      {/* Error message if no token */}
      {!mapboxgl.accessToken && (
        <div
          className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4"
          style={{ textAlign: 'center' }}
        >
          <p>Mapbox token is missing. Please set the REACT_APP_MAPBOX_TOKEN environment variable.</p>
        </div>
      )}

      {/* Map container */}
      <div
        ref={mapContainer}
        className="map-container"
        style={{
          width: '100%',
          height: '500px',
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #ddd'
        }}
      />

      {/* Loading indicator */}
      {!mapLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '12px 24px',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 10
        }}>
          <p>Karte wird geladen...</p>
        </div>
      )}

      {/* Highlighted offer preview */}
      {highlightedOffer && (
        <div className="highlighted-offer-preview" style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
          zIndex: 5,
          maxWidth: '300px',
          width: '90%'
        }}>
          <h3 style={{ color: theme.colors.primary, marginBottom: '8px', fontSize: '16px' }}>
            {highlightedOffer.name}
          </h3>
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>
            <strong>Anbieter:</strong> {highlightedOffer.provider}
          </p>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            <strong>Ort:</strong> {highlightedOffer.location}
          </p>
          <button
            onClick={() => {
              console.log("Showing details for:", highlightedOffer.name);
              setSelectedOffer(highlightedOffer);
              if (onMarkerClick) onMarkerClick(highlightedOffer);
            }}
            style={{
              backgroundColor: theme.colors.primary,
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px'
            }}
          >
            Alle Details anzeigen
          </button>
        </div>
      )}

      {/* Selected offer details */}
      {selectedOffer && (
        <div className="offer-details" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '500px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          zIndex: 1000
        }}>
          <h2 style={{ color: theme.colors.primary, marginBottom: '12px' }}>{selectedOffer.name}</h2>
          <p><strong>Anbieter:</strong> {selectedOffer.provider}</p>
          <p><strong>Typ:</strong> {selectedOffer.type}</p>
          <p><strong>Adresse:</strong> {selectedOffer.address || selectedOffer.location}</p>
          <p><strong>Verfügbarkeit:</strong> {selectedOffer.availability}</p>
          <p><strong>Sprachen:</strong> {selectedOffer.languages.join(', ')}</p>
          <p><strong>Status:</strong> {selectedOffer.status}</p>
          <p><strong>Kosten:</strong> {selectedOffer.costs}</p>
          <p><strong>Letztes Update:</strong> {selectedOffer.lastUpdated}</p>
          <button
            onClick={() => setSelectedOffer(null)}
            style={{
              backgroundColor: theme.colors.primary,
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Schließen
          </button>
        </div>
      )}
    </div>
  );
};

export default MapComponent;