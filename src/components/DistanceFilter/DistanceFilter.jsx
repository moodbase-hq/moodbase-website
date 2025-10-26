import React, { useState, useEffect } from 'react';
import styles from './DistanceFilter.module.css';

const DistanceFilter = ({ onDistanceChange, onLocationChange }) => {
  const [distance, setDistance] = useState(25); // Default 25km
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Get user's current location
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation wird von diesem Browser nicht unterstützt');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setIsGettingLocation(false);
        
        // Notify parent component
        if (onLocationChange) {
          onLocationChange(location);
        }
        
        // Also trigger distance change with current distance
        if (onDistanceChange) {
          onDistanceChange(distance, location);
        }
      },
      (error) => {
        let errorMessage = 'Standort konnte nicht ermittelt werden';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Standortzugriff wurde verweigert';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Standortinformationen nicht verfügbar';
            break;
          case error.TIMEOUT:
            errorMessage = 'Zeitüberschreitung beim Abrufen des Standorts';
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Handle distance slider change
  const handleDistanceChange = (e) => {
    const newDistance = parseInt(e.target.value);
    setDistance(newDistance);
    
    if (onDistanceChange && userLocation) {
      onDistanceChange(newDistance, userLocation);
    }
  };

  // Clear location and distance filter
  const clearLocationFilter = () => {
    setUserLocation(null);
    setLocationError(null);
    if (onLocationChange) {
      onLocationChange(null);
    }
    if (onDistanceChange) {
      onDistanceChange(null, null);
    }
  };

  return (
    <div className={styles.distanceFilter}>
      <h3 className={styles.filterTitle}>Umkreissuche</h3>
      
      {!userLocation && !locationError && (
        <div className={styles.locationPrompt}>
          <p className={styles.promptText}>
            Aktivieren Sie die Standortfreigabe für eine Umkreissuche
          </p>
          <button 
            className={styles.locationButton}
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
          >
            {isGettingLocation ? 'Standort wird ermittelt...' : 'Standort freigeben'}
          </button>
        </div>
      )}

      {locationError && (
        <div className={styles.locationError}>
          <p className={styles.errorText}>{locationError}</p>
          <button 
            className={styles.retryButton}
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {userLocation && (
        <div className={styles.distanceControls}>
          <div className={styles.locationStatus}>
            <span className={styles.locationIcon}>📍</span>
            <span className={styles.locationText}>Standort aktiviert</span>
            <button 
              className={styles.clearButton}
              onClick={clearLocationFilter}
              title="Standortfilter deaktivieren"
            >
              ✕
            </button>
          </div>

          <div className={styles.sliderContainer}>
            <label className={styles.sliderLabel}>
              Umkreis: <strong>{distance} km</strong>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={distance}
              onChange={handleDistanceChange}
              className={styles.distanceSlider}
            />
            <div className={styles.sliderLabels}>
              <span className={styles.sliderMin}>5 km</span>
              <span className={styles.sliderMax}>100 km</span>
            </div>
          </div>

          <div className={styles.distanceInfo}>
            <p className={styles.infoText}>
              Zeigt Angebote im Umkreis von {distance} km um Ihren aktuellen Standort
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistanceFilter;