import React, { useState } from 'react';
import styles from './DistanceSlider.module.css';

const DistanceSlider = ({ onDistanceChange }) => {
  const [distance, setDistance] = useState(25); // Default 25km

  const handleDistanceChange = (e) => {
    const newDistance = parseInt(e.target.value);
    if (!isNaN(newDistance) && newDistance >= 5 && newDistance <= 100) {
      setDistance(newDistance);
      
      if (onDistanceChange) {
        onDistanceChange(newDistance);
      }
    }
  };

  const handleIncrement = () => {
    const newDistance = Math.min(distance + 5, 100);
    setDistance(newDistance);
    if (onDistanceChange) {
      onDistanceChange(newDistance);
    }
  };

  const handleDecrement = () => {
    const newDistance = Math.max(distance - 5, 5);
    setDistance(newDistance);
    if (onDistanceChange) {
      onDistanceChange(newDistance);
    }
  };


  return (
    <div className={styles.distanceSlider}>
      <label className={styles.filterLabel}>Umkreis</label>
      <div className={styles.numberInputGroup}>
        <button 
          type="button"
          onClick={handleDecrement}
          className={styles.stepButton}
          disabled={distance <= 5}
        >
          −
        </button>
        <input
          type="number"
          min="5"
          max="100"
          step="5"
          value={distance}
          onChange={handleDistanceChange}
          className={styles.numberInput}
        />
        <span className={styles.unit}>km</span>
        <button 
          type="button"
          onClick={handleIncrement}
          className={styles.stepButton}
          disabled={distance >= 100}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default DistanceSlider;