import React from 'react'
import styles from './Pagination.module.css'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) => {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className={styles.pagination}>
      <div className={styles.info}>
        {startItem}-{endItem} von {totalItems} Ergebnissen
      </div>
      
      <div className={styles.controls}>
        <button
          className={`${styles.pageButton} ${styles.prevNext}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Vorherige
        </button>

        <div className={styles.pageNumbers}>
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className={styles.dots}>…</span>
              ) : (
                <button
                  className={`${styles.pageButton} ${
                    page === currentPage ? styles.active : ''
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          className={`${styles.pageButton} ${styles.prevNext}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Nächste →
        </button>
      </div>
    </div>
  )
}

export default Pagination