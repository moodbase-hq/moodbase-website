import React, { useState } from 'react'
import MobileFilters from '../MobileFilters/MobileFilters'
import DistanceSlider from '../DistanceSlider/DistanceSlider'
import styles from './Filters.module.css'

const Filters = ({ filters, onFilterChange, onReset, onDistanceChange }) => {
  const [expandedFilters, setExpandedFilters] = useState({});

  const handleCheckboxChange = (filterKey, optionValue, isChecked) => {
    const filter = filters.find(f => f.key === filterKey);
    const currentValue = Array.isArray(filter.value) ? filter.value : (filter.value ? [filter.value] : []);
    let newValue = [...currentValue];
    
    if (optionValue === 'alle') {
      newValue = isChecked ? [] : [];
    } else {
      if (isChecked) {
        newValue = [...newValue, optionValue];
      } else {
        newValue = newValue.filter(val => val !== optionValue);
      }
    }
    
    onFilterChange(filterKey, newValue);
  };

  const toggleFilterExpansion = (filterKey) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const getDisplayText = (filter) => {
    const valueArray = Array.isArray(filter.value) ? filter.value : (filter.value ? [filter.value] : []);
    if (valueArray.length === 0) return "Alle";
    if (valueArray.length === 1) {
      const option = filter.options.find(opt => opt.value === valueArray[0]);
      return option ? option.label : "Alle";
    }
    return `${valueArray.length} ausgewählt`;
  };

  return (
    <>
      {/* Mobile Filters */}
      <MobileFilters 
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
      
      {/* Desktop Filters */}
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>Filter</h2>
        
        {/* Distance Filter - only show when onDistanceChange is provided */}
        {onDistanceChange && (
          <DistanceSlider
            onDistanceChange={onDistanceChange}
          />
        )}
        
        {filters.map((filter, index) => (
          <div key={index} className={styles.filterGroup}>
            <label className={styles.filterLabel}>{filter.label}</label>
            
            {/* Collapsed Filter Display */}
            <div 
              className={`${styles.filterSelect} ${expandedFilters[filter.key] ? styles.filterSelectExpanded : ''}`}
              onClick={() => toggleFilterExpansion(filter.key)}
            >
              <span className={styles.filterDisplayText}>
                {getDisplayText(filter)}
              </span>
              <svg 
                className={`${styles.filterIcon} ${expandedFilters[filter.key] ? styles.filterIconExpanded : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
            
            {/* Expanded Checkbox Group */}
            {expandedFilters[filter.key] && (
              <div className={styles.checkboxGroup}>
                {filter.options.map((option, optionIndex) => {
                  const valueArray = Array.isArray(filter.value) ? filter.value : (filter.value ? [filter.value] : []);
                  const isChecked = option.value === 'alle' 
                    ? valueArray.length === 0 
                    : valueArray.includes(option.value);
                  
                  return (
                    <label key={optionIndex} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isChecked}
                        onChange={(e) => handleCheckboxChange(filter.key, option.value, e.target.checked)}
                      />
                      <span className={styles.checkboxText}>{option.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        <button className={styles.resetButton} onClick={onReset}>
          Filter zurücksetzen
        </button>
      </aside>
    </>
  );
}

export default Filters