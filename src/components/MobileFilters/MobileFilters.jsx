import { useState } from 'react';
import styles from './MobileFilters.module.css';

const MobileFilters = ({ filters, onFilterChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (filterKey, optionValue, isChecked) => {
    const filter = filters.find(f => f.key === filterKey);
    let newValue = [...filter.value];
    
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
    if (filter.value.length === 0) return "Alle";
    if (filter.value.length === 1) {
      const option = filter.options.find(opt => opt.value === filter.value[0]);
      return option ? option.label : "Alle";
    }
    return `${filter.value.length} ausgewählt`;
  };

  const handleReset = () => {
    onReset();
    setExpandedFilters({});
    setIsOpen(false);
  };

  const activeFiltersCount = filters.reduce((count, filter) => count + filter.value.length, 0);

  const getSelectedFilters = () => {
    const selected = [];
    filters.forEach(filter => {
      filter.value.forEach(value => {
        const option = filter.options.find(opt => opt.value === value);
        if (option) {
          selected.push({
            filterKey: filter.key,
            filterLabel: filter.label,
            optionValue: value,
            optionLabel: option.label
          });
        }
      });
    });
    return selected;
  };

  const removePill = (filterKey, optionValue) => {
    const filter = filters.find(f => f.key === filterKey);
    const newValue = filter.value.filter(val => val !== optionValue);
    onFilterChange(filterKey, newValue);
  };

  return (
    <div className={styles.mobileFilters}>
      {/* Filter Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={toggleFilters}
        aria-expanded={isOpen}
        aria-controls="mobile-filters"
      >
        <span className={styles.toggleText}>
          Filter
          {activeFiltersCount > 0 && (
            <span className={styles.activeCount}>({activeFiltersCount})</span>
          )}
        </span>
        <svg 
          className={`${styles.toggleIcon} ${isOpen ? styles.toggleIconOpen : ''}`}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {/* Filter Pills - only show when collapsed and filters are active */}
      {!isOpen && activeFiltersCount > 0 && (
        <div className={styles.filterPills}>
          {getSelectedFilters().map((pill, index) => (
            <div key={`${pill.filterKey}-${pill.optionValue}`} className={styles.pill}>
              <span className={styles.pillText}>
                {pill.filterLabel}: {pill.optionLabel}
              </span>
              <button
                className={styles.pillRemove}
                onClick={() => removePill(pill.filterKey, pill.optionValue)}
                aria-label={`Remove ${pill.optionLabel} filter`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Collapsible Filter Content */}
      <div 
        id="mobile-filters"
        className={`${styles.filterContent} ${isOpen ? styles.filterContentOpen : ''}`}
      >
        <div className={styles.filterGrid}>
          {filters.map((filter) => (
            <div key={filter.key} className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                {filter.label}
              </label>
              
              {/* Compact Filter Display */}
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
                  {filter.options.map((option) => {
                    const isChecked = option.value === 'alle' 
                      ? filter.value.length === 0 
                      : filter.value.includes(option.value);
                    
                    return (
                      <label key={option.value} className={styles.checkboxLabel}>
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
        </div>
        
        <div className={styles.filterActions}>
          <button 
            className={styles.resetButton}
            onClick={handleReset}
          >
            Filter zurücksetzen
          </button>
          <button 
            className={styles.applyButton}
            onClick={() => setIsOpen(false)}
          >
            Anwenden
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;