import React from 'react'
import ResultCard from './ResultCard'
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
  return (
    <section className={styles.section}>
      <div className={styles.container}>
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
      </div>
    </section>
  )
}

export default SearchResults