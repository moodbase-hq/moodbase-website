import React, { useState, useEffect } from 'react';
import styles from './PostalCodeDistanceFilter.module.css';

const PostalCodeDistanceFilter = ({ onDistanceChange }) => {
  const [postalCode, setPostalCode] = useState('');
  const [distance, setDistance] = useState(25); // Default 25km
  const [isValid, setIsValid] = useState(true);
  const [coordinates, setCoordinates] = useState(null);

  // German postal code validation (5 digits)
  const validatePostalCode = (code) => {
    const postalCodeRegex = /^\d{5}$/;
    return postalCodeRegex.test(code.trim());
  };

  // Simple postal code to coordinates lookup (using approximate center points)
  // In a real app, you'd use a proper geocoding service
  const getCoordinatesForPostalCode = (code) => {
    // This is a simplified lookup - in production you'd use a proper geocoding API
    const postalCodeMap = {
      // Berlin area
      '10115': { lat: 52.5200, lng: 13.4050 },
      '10117': { lat: 52.5186, lng: 13.3984 },
      '10119': { lat: 52.5244, lng: 13.4105 },
      '10178': { lat: 52.5200, lng: 13.4050 },
      // Hamburg area
      '20095': { lat: 53.5511, lng: 9.9937 },
      '20099': { lat: 53.5473, lng: 10.0062 },
      '20146': { lat: 53.5685, lng: 9.9410 },
      // Munich area
      '80331': { lat: 48.1351, lng: 11.5820 },
      '80333': { lat: 48.1429, lng: 11.5661 },
      '80335': { lat: 48.1435, lng: 11.5514 },
      // Cologne area
      '50667': { lat: 50.9375, lng: 6.9603 },
      '50674': { lat: 50.9322, lng: 6.9511 },
      '50676': { lat: 50.9406, lng: 6.9599 },
      // Frankfurt area
      '60311': { lat: 50.1109, lng: 8.6821 },
      '60313': { lat: 50.1170, lng: 8.6832 },
      '60314': { lat: 50.1136, lng: 8.6842 }
    };

    if (postalCodeMap[code]) {
      return postalCodeMap[code];
    }

    // For unknown postal codes, try to estimate based on first two digits
    const prefix = code.substring(0, 2);
    const regionMap = {
      '01': { lat: 51.0504, lng: 13.7373 }, // Dresden area
      '10': { lat: 52.5200, lng: 13.4050 }, // Berlin
      '20': { lat: 53.5511, lng: 9.9937 },  // Hamburg
      '30': { lat: 52.3759, lng: 9.7320 },  // Hannover
      '40': { lat: 51.2277, lng: 6.7735 },  // Düsseldorf
      '50': { lat: 50.9375, lng: 6.9603 },  // Cologne
      '60': { lat: 50.1109, lng: 8.6821 },  // Frankfurt
      '70': { lat: 48.7758, lng: 9.1829 },  // Stuttgart
      '80': { lat: 48.1351, lng: 11.5820 }, // Munich
      '90': { lat: 49.4521, lng: 11.0767 }  // Nuremberg
    };

    return regionMap[prefix] || null;
  };

  // Handle postal code input change
  const handlePostalCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 5); // Only digits, max 5
    setPostalCode(value);
    
    if (value.length === 0) {
      setIsValid(true);
      setCoordinates(null);
      // Clear distance filter
      if (onDistanceChange) {
        onDistanceChange(null, null);
      }
      return;
    }

    if (value.length === 5) {
      const valid = validatePostalCode(value);
      setIsValid(valid);
      
      if (valid) {
        const coords = getCoordinatesForPostalCode(value);
        setCoordinates(coords);
        
        // Trigger distance change with current distance and coordinates
        if (onDistanceChange && coords) {
          onDistanceChange(distance, coords);
        }
      } else {
        setCoordinates(null);
        if (onDistanceChange) {
          onDistanceChange(null, null);
        }
      }
    } else {
      setIsValid(true); // Don't show error while typing
      setCoordinates(null);
    }
  };

  // Handle distance slider change
  const handleDistanceChange = (e) => {
    const newDistance = parseInt(e.target.value);
    setDistance(newDistance);
    
    // Only trigger if we have valid coordinates
    if (onDistanceChange && coordinates) {
      onDistanceChange(newDistance, coordinates);
    }
  };

  // Clear all filters
  const clearFilter = () => {
    setPostalCode('');
    setDistance(25);
    setIsValid(true);
    setCoordinates(null);
    if (onDistanceChange) {
      onDistanceChange(null, null);
    }
  };

  return (
    <div className={styles.distanceFilter}>
      <h3 className={styles.filterTitle}>Umkreissuche</h3>
      
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel} htmlFor="postalCode">
          Postleitzahl
        </label>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={handlePostalCodeChange}
            placeholder="12345"
            className={`${styles.postalCodeInput} ${!isValid ? styles.invalid : ''}`}
            maxLength="5"
          />
          {postalCode && (
            <button
              type="button"
              onClick={clearFilter}
              className={styles.clearButton}
              title="Zurücksetzen"
            >
              ✕
            </button>
          )}
        </div>
        {!isValid && (
          <span className={styles.errorText}>
            Bitte geben Sie eine gültige 5-stellige Postleitzahl ein
          </span>
        )}
        {postalCode.length > 0 && postalCode.length < 5 && (
          <span className={styles.helpText}>
            5-stellige Postleitzahl eingeben
          </span>
        )}
      </div>

      {coordinates && (
        <div className={styles.sliderGroup}>
          <label className={styles.sliderLabel}>
            Umkreis: <strong>{distance} km</strong>
          </label>
          <div className={styles.sliderContainer}>
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
          <div className={styles.filterInfo}>
            <p className={styles.infoText}>
              Zeigt Angebote im Umkreis von {distance} km um PLZ {postalCode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostalCodeDistanceFilter;