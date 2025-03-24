import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWFtb29kYmFzZSIsImEiOiJjbThsbmZ6dnoxOXU0MmpzNWgxZWV1bjVkIn0.YvAZEJOvsyjcxPRG0H_bMw';

const SimpleMapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Initialize map with no markers - just get the map to load first
  useEffect(() => {
    console.log("Initializing simple map");

    // Exit if map already exists
    if (map.current) return;

    try {
      console.log("Creating map with container:", mapContainer.current);

      // Create a basic map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [13.3777, 52.5163], // Berlin
        zoom: 10
      });

      // Add a simple marker to test
      map.current.on('load', () => {
        console.log("Map loaded, adding test marker");

        // Add a simple marker at the center
        new mapboxgl.Marker()
          .setLngLat([13.3777, 52.5163])
          .addTo(map.current);

        console.log("Test marker added");
      });

      // Log any errors
      map.current.on('error', error => {
        console.error("Mapbox error:", error);
      });
    } catch (error) {
      console.error("Error creating map:", error);
    }

    // Cleanup
    return () => {
      if (map.current) {
        console.log("Removing map");
        map.current.remove();
      }
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '500px',
      position: 'relative',
      border: '2px solid red' // Visible border to check container
    }}>
      <div
        ref={mapContainer}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      />
      {/* Debug info overlay */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'white',
        padding: '5px 10px',
        borderRadius: '3px',
        zIndex: 10,
        fontSize: '12px'
      }}>
        Map Debug - Check Console (F12)
      </div>
    </div>
  );
};

export default SimpleMapComponent;