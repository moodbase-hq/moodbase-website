import React, { useState } from 'react'
import ResultCard from './ResultCard'
import MapView from '../MapView/MapView'
import Pagination from '../Pagination/Pagination'
import styles from './SearchResults.module.css'

const SearchResults = ({ 
  results, 
  resultCount, 
  currentPage, 
  totalPages, 
  itemsPerPage, 
  onPageChange,
  onDetailsClick
}) => {
  const [viewMode, setViewMode] = useState('cards')

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.count}>{resultCount} Angebote gefunden</span>
          
          {/* View Toggle */}
          <div className={styles.viewToggle}>
            <button 
              onClick={() => setViewMode('cards')}
              className={`${styles.toggleButton} ${viewMode === 'cards' ? styles.active : ''}`}
            >
              <svg className={styles.toggleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
              </svg>
              <span className={styles.toggleText}>Karten</span>
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`${styles.toggleButton} ${viewMode === 'map' ? styles.active : ''}`}
            >
              <svg className={styles.toggleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className={styles.toggleText}>Karte</span>
            </button>
          </div>
        </div>
        
        {viewMode === 'cards' ? (
          <>
            <div className={styles.results}>
              {results.map((result, index) => (
                <ResultCard 
                  key={result.id || index} 
                  result={result} 
                  onDetailsClick={onDetailsClick}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={resultCount}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
              />
            )}
          </>
        ) : (
          <MapView 
            results={results} 
            onDetailsClick={onDetailsClick}
          />
        )}
      </div>
    </section>
  )
}

export default SearchResults