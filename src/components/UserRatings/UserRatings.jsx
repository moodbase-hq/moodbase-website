import React from 'react'
import RatingDisplay from '../RatingDisplay/RatingDisplay'
import styles from './UserRatings.module.css'

const UserRatings = ({ userRatings, showSubmissionForm = false, onSubmitRating = null }) => {
  // Handle missing or loading ratings
  if (!userRatings) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Nutzerbewertungen</h3>
          <div className={styles.loading}>Bewertungen werden geladen...</div>
        </div>
      </div>
    )
  }

  const {
    overall = 0,
    access = 0,      // Zugang – War es leicht, reinzukommen?
    treatment = 0,   // Umgang – Wurdest du ernst genommen?
    helpful = 0,     // Hilfreich – Hast du etwas verstanden oder gelernt?
    effectiveness = 0, // Wirksamkeit – Hat es dir wirklich geholfen?
    reviewCount = 0,
    comments = []
  } = userRatings

  const criteria = [
    {
      key: 'access',
      label: 'Zugang',
      description: 'War es leicht, reinzukommen?',
      rating: access
    },
    {
      key: 'treatment',
      label: 'Umgang',
      description: 'Wurdest du ernst genommen?',
      rating: treatment
    },
    {
      key: 'helpful',
      label: 'Hilfreich',
      description: 'Hast du etwas verstanden oder gelernt?',
      rating: helpful
    },
    {
      key: 'effectiveness',
      label: 'Wirksamkeit',
      description: 'Hat es dir wirklich geholfen?',
      rating: effectiveness
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Nutzerbewertungen</h3>
        <div className={styles.overallRating}>
          <RatingDisplay 
            rating={overall} 
            size="large" 
            showValue={true}
            showCount={true}
            count={reviewCount}
          />
        </div>
      </div>

      <div className={styles.criteria}>
        {criteria.map((criterion) => (
          <div key={criterion.key} className={styles.criterion}>
            <div className={styles.criterionInfo}>
              <span className={styles.criterionLabel}>{criterion.label}</span>
              <span className={styles.criterionDescription}>{criterion.description}</span>
            </div>
            <div className={styles.criterionRating}>
              <RatingDisplay 
                rating={criterion.rating} 
                size="medium" 
                showValue={true}
                showCount={false}
              />
            </div>
          </div>
        ))}
      </div>

      {comments && comments.length > 0 && (
        <div className={styles.comments}>
          <h4 className={styles.commentsTitle}>Letzte Kommentare</h4>
          <div className={styles.commentsList}>
            {comments.slice(0, 3).map((comment, index) => (
              <div key={index} className={styles.comment}>
                <div className={styles.commentText}>"{comment.text || comment}"</div>
                {comment.date && (
                  <div className={styles.commentDate}>
                    {new Date(comment.date).toLocaleDateString('de-DE')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showSubmissionForm && (
        <div className={styles.submitSection}>
          <button 
            className={styles.submitButton}
            onClick={onSubmitRating}
          >
            + Bewertung abgeben
          </button>
          <p className={styles.submitNote}>
            Deine Bewertung bleibt anonym und wird nach Prüfung veröffentlicht.
          </p>
        </div>
      )}
    </div>
  )
}

export default UserRatings