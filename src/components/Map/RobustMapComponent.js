import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWFtb29kYmFzZSIsImEiOiJjbThsbmZ6dnoxOXU0MmpzNWgxZWV1bjVkIn0.YvAZEJOvsyjcxPRG0H_bMw';

const RobustMapComponent = () => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const initializedRef = useRef(false);

  // Initialize map only once
  useEffect(() => {
    // Use a ref to track initialization to prevent double initialization
    if (initializedRef.current) return;

    console.log("Starting map initialization...");

    // Guard clause - make sure the container exists
    if (!mapContainer.current) {
      console.error("Map container ref is null!");
      return;
    }

    // Set the initialization flag
    initializedRef.current = true;

    try {
      console.log("Creating new mapbox instance");

      // Create a basic map
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [13.3777, 52.5163], // Berlin
        zoom: 10,
        preserveDrawingBuffer: true // Important for some browsers
      });

      // Add load handler
      mapInstance.current.on('load', () => {
        console.log("Map loaded successfully!");
        setMapLoaded(true);

        // Add a sample marker
        const marker = new mapboxgl.Marker({
          color: "#B23A48"
        })
          .setLngLat([13.3777, 52.5163])
          .addTo(mapInstance.current);

        console.log("Sample marker added at Berlin center");

        // Add a popup to the marker
        marker.setPopup(
          new mapboxgl.Popup()
            .setHTML("<h3>Berlin</h3><p>This is a test marker</p>")
        );
      });

      // Add error handler
      mapInstance.current.on('error', (error) => {
        console.error("Mapbox error:", error);
      });
    } catch (error) {
      console.error("Error during map initialization:", error);
      initializedRef.current = false; // Reset flag to allow retry
    }

    // Return cleanup function
    return () => {
      console.log("Cleanup function called");
      if (mapInstance.current) {
        console.log("Removing map instance");
        mapInstance.current.remove();
        mapInstance.current = null;
        initializedRef.current = false;
      }
    };
  }, []); // Empty dependency array - run once on mount

  return (
    <div className="map-wrapper" style={{
      width: '100%',
      height: '500px',
      position: 'relative',
      border: '2px solid red' // Visible border to check container
    }}>
      {/* Static container div - never recreate this */}
      <div
        ref={mapContainer}
        className="map-container"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#f0f0f0' // Background color to show container exists
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
          padding: '10px 20px',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 10
        }}>
          <p>Loading map...</p>
        </div>
      )}

      {/* Debug info */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '5px 10px',
        borderRadius: '3px',
        zIndex: 10,
        fontSize: '12px',
        pointerEvents: 'none'
      }}>
        Map Status: {mapLoaded ? 'Loaded ✓' : 'Loading...'}
      </div>
    </div>
  );
};

export default RobustMapComponent;