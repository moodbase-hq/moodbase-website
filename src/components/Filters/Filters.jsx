import React from 'react'
//import MobileFilters from '../MobileFilters/MobileFilters'
import styles from './Filters.module.css'

const Filters = ({ filters, onFilterChange, onReset }) => (
  <>
    {/* Mobile Filters
    <MobileFilters 
      filters={filters}
      onFilterChange={onFilterChange}
      onReset={onReset}
    /> */}
    
    {/* Desktop Filters */}
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Filter</h2>
      {filters.map((filter, index) => (
        <div key={index} className={styles.filterGroup}>
          <label className={styles.filterLabel}>{filter.label}</label>
          <select
            className={styles.filterSelect}
            value={filter.value}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
          >
            {filter.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button className={styles.resetButton} onClick={onReset}>
        Filter zurücksetzen
      </button>
    </aside>
  </>
)

export default Filters