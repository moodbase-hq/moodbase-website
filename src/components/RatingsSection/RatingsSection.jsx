import React, { useState, useEffect } from 'react'
import UserRatings from '../UserRatings/UserRatings'
import PlatformRatings from '../PlatformRatings/PlatformRatings'
import RatingSubmissionForm from '../RatingSubmissionForm/RatingSubmissionForm'
import styles from './RatingsSection.module.css'

const RatingsSection = ({ 
  offeringId, 
  userRatings = null, 
  platformRatings = null, 
  showSubmissionForm = true,
  onSubmitRating = null,
  loading = false 
) => {
  const [isLoading, setIsLoading] = useState(loading)
  const [showForm, setShowForm] = useState(false)
  
  // Handle loading state
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  const handleSubmitRating = () => {
    if (onSubmitRating) {
      onSubmitRating(offeringId)
    } else {
      // Show the submission form
      setShowForm(true)
    }
  }

  const handleFormSubmissionSuccess = (result) => {
    setShowForm(false)
    // Optionally refresh ratings data here
    console.log('Rating submitted successfully:', result)
  }

  const handleFormCancel = () => {
    setShowForm(false)
  }

  if (isLoading) {
    return (
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Bewertungen</h2>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingText}>Bewertungen werden geladen...</div>
        </div>
      </div>
    )
  }

  // Handle case where no ratings are available
  if (!userRatings && !platformRatings) {
    return (
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Bewertungen</h2>
        <div className={styles.noRatingsContainer}>
          <div className={styles.noRatingsText}>
            Für dieses Angebot sind noch keine Bewertungen verfügbar.
          </div>
          {showSubmissionForm && (
            <button 
              className={styles.firstRatingButton}
              onClick={handleSubmitRating}
            >
              Erste Bewertung abgeben
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Bewertungen</h2>
      
      <div className={styles.ratingsGrid}>
        <div className={styles.ratingsColumn}>
          <UserRatings 
            userRatings={userRatings}
            showSubmissionForm={showSubmissionForm}
            onSubmitRating={handleSubmitRating}
          />
        </div>
        
        <div className={styles.ratingsColumn}>
          <PlatformRatings 
            platformRatings={platformRatings}
          />
        </div>
      </div>

      {/* Rating Submission Form */}
      {showForm && (
        <RatingSubmissionForm
          offeringId={offeringId}
          onSubmissionSuccess={handleFormSubmissionSuccess}
          onCancel={handleFormCancel}
        />
      )}

      <div className={styles.disclaimer}>
        <p className={styles.disclaimerText}>
          <strong>Nutzerbewertungen</strong> spiegeln persönliche Erfahrungen wider. 
          <strong> Moodbase-Bewertungen</strong> basieren auf objektiven Qualitätskriterien 
          und werden von unserem Expert*innen-Team erstellt.
        </p>
      </div>
    </div>
  )
}

export default RatingsSection