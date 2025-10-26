import React, { useState } from 'react'
import styles from './RatingSubmissionForm.module.css'
import RatingDisplay from '../RatingDisplay/RatingDisplay'

const RatingSubmissionForm = ({ offeringId, onSubmissionSuccess, onCancel }) => {
  const [ratings, setRatings] = useState({
    overall: 0,
    access: 0,
    treatment: 0,
    helpful: 0,
    effectiveness: 0
  })
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const criteria = [
    {
      key: 'access',
      label: 'Zugang',
      description: 'War es leicht, reinzukommen?'
    },
    {
      key: 'treatment',
      label: 'Umgang',
      description: 'Wurdest du ernst genommen?'
    },
    {
      key: 'helpful',
      label: 'Hilfreich',
      description: 'Hat es dir geholfen?'
    },
    {
      key: 'effectiveness',
      label: 'Wirksamkeit',
      description: 'War es wirksam?'
    }
  ]

  const handleRatingChange = (criteriaKey, value) => {
    setRatings(prev => ({
      ...prev,
      [criteriaKey]: value
    }))
  }

  const calculateOverallRating = () => {
    const { access, treatment, helpful, effectiveness } = ratings
    return Math.round((access + treatment + helpful + effectiveness) / 4 * 10) / 10
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Update overall rating
      const finalRatings = {
        ...ratings,
        overall: calculateOverallRating()
      }

      // Call the ratings API
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/ratings/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offeringId: parseInt(offeringId),
          overall: finalRatings.overall,
          access: finalRatings.access,
          treatment: finalRatings.treatment,
          helpful: finalRatings.helpful,
          effectiveness: finalRatings.effectiveness,
          comment: comment.trim() || null
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit rating')
      }

      const result = await response.json()
      console.log('Rating submitted successfully:', result)

      if (onSubmissionSuccess) {
        onSubmissionSuccess({
          message: 'Rating submitted successfully',
          ratings: finalRatings
        })
      }
    } catch (error) {
      setError('Fehler beim Senden der Bewertung. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return ratings.access > 0 && ratings.treatment > 0 && 
           ratings.helpful > 0 && ratings.effectiveness > 0
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>Bewertung abgeben</h3>
          <button 
            type="button" 
            className={styles.closeButton}
            onClick={onCancel}
            aria-label="Schließen"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.criteriaSection}>
            <h4 className={styles.sectionTitle}>Bewerten Sie diese Kriterien:</h4>
            
            {criteria.map(criteria => (
              <div key={criteria.key} className={styles.criteriaItem}>
                <div className={styles.criteriaInfo}>
                  <label className={styles.criteriaLabel}>{criteria.label}</label>
                  <span className={styles.criteriaDescription}>{criteria.description}</span>
                </div>
                <RatingDisplay
                  rating={ratings[criteria.key]}
                  interactive={true}
                  onRatingChange={(value) => handleRatingChange(criteria.key, value)}
                  size="large"
                  showValue={true}
                />
              </div>
            ))}
          </div>

          <div className={styles.overallSection}>
            <div className={styles.overallLabel}>Gesamtbewertung:</div>
            <RatingDisplay
              rating={calculateOverallRating()}
              interactive={false}
              size="large"
              showValue={true}
            />
          </div>

          <div className={styles.commentSection}>
            <label htmlFor="comment" className={styles.commentLabel}>
              Kommentar (optional)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.commentTextarea}
              rows={4}
              maxLength={1000}
              placeholder="Teilen Sie Ihre Erfahrungen..."
            />
            <div className={styles.characterCount}>
              {comment.length}/1000 Zeichen
            </div>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? 'Wird gesendet...' : 'Bewertung senden'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RatingSubmissionForm