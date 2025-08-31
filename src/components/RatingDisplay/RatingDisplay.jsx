import React from 'react'
import styles from './RatingDisplay.module.css'

const RatingDisplay = ({ 
  rating, 
  maxRating = 5, 
  size = 'medium', 
  showValue = true, 
  showCount = false, 
  count = null,
  interactive = false,
  onRatingChange = null 
}) => {
  const handleStarClick = (starValue) => {
    if (interactive && onRatingChange) {
      onRatingChange(starValue)
    }
  }

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 1; i <= maxRating; i++) {
      let starClass = styles.star
      
      if (i <= fullStars) {
        starClass += ` ${styles.starFull}`
      } else if (i === fullStars + 1 && hasHalfStar) {
        starClass += ` ${styles.starHalf}`
      } else {
        starClass += ` ${styles.starEmpty}`
      }
      
      if (size === 'small') starClass += ` ${styles.starSmall}`
      if (size === 'large') starClass += ` ${styles.starLarge}`
      if (interactive) starClass += ` ${styles.starInteractive}`
      
      stars.push(
        <span
          key={i}
          className={starClass}
          onClick={() => handleStarClick(i)}
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          onKeyDown={(e) => {
            if (interactive && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              handleStarClick(i)
            }
          }}
        >
          ★
        </span>
      )
    }
    
    return stars
  }

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.stars}>
        {renderStars()}
      </div>
      
      {showValue && (
        <span className={`${styles.ratingValue} ${styles[`ratingValue${size.charAt(0).toUpperCase() + size.slice(1)}`]}`}>
          {rating?.toFixed(1) || '0.0'}/5
        </span>
      )}
      
      {showCount && count !== null && (
        <span className={`${styles.ratingCount} ${styles[`ratingCount${size.charAt(0).toUpperCase() + size.slice(1)}`]}`}>
          ({count} {count === 1 ? 'Bewertung' : 'Bewertungen'})
        </span>
      )}
    </div>
  )
}

export default RatingDisplay