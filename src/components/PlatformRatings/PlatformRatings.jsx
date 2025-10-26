import React from 'react'
import RatingDisplay from '../RatingDisplay/RatingDisplay'
import styles from './PlatformRatings.module.css'

const PlatformRatings = ({ platformRatings }) => {
  // Handle missing or loading ratings
  if (!platformRatings) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Moodbase-Bewertung</h3>
          <div className={styles.loading}>Bewertung wird geladen...</div>
        </div>
      </div>
    )
  }

  const {
    overall = 0,
    offerType = {},
    quality = {},
    impact = {},
    assessedBy = 'Moodbase Team',
    assessedAt = null,
    notes = ''
  } = platformRatings

  const categories = [
    {
      title: 'Art des Angebots',
      weight: '30%',
      subcriteria: [
        {
          label: 'Diversitätssensibilität',
          value: offerType.diversity || 0,
          weight: '15%'
        },
        {
          label: 'Barriere-Armut',
          value: offerType.accessibility || 0,
          weight: '15%'
        }
      ]
    },
    {
      title: 'Qualität der Beratung & Zertifizierung',
      weight: '50%',
      subcriteria: [
        {
          label: 'Qualifikation der Beratenden',
          value: quality.qualification || 0,
          weight: '16%'
        },
        {
          label: 'Feedbackmöglichkeiten',
          value: quality.feedback || 0,
          weight: '10%'
        },
        {
          label: 'Kinderschutzkonzept & erweitertes Führungszeugnis',
          value: quality.protection || 0,
          weight: '14%'
        },
        {
          label: 'Datenschutz & Transparenz',
          value: quality.privacy || 0,
          weight: '10%'
        }
      ]
    },
    {
      title: 'Wirkanalyse',
      weight: '20%',
      subcriteria: [
        {
          label: 'Wissenschaftliche Basis',
          value: impact.scientific || 0,
          weight: '20%'
        }
      ]
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Moodbase-Bewertung</h3>
        <div className={styles.overallRating}>
          <RatingDisplay 
            rating={overall} 
            size="large" 
            showValue={true}
            showCount={false}
          />
        </div>
        <div className={styles.assessor}>
          Bewertet von {assessedBy}
          {assessedAt && (
            <span className={styles.assessmentDate}>
              {' am '}{new Date(assessedAt).toLocaleDateString('de-DE')}
            </span>
          )}
        </div>
      </div>

      <div className={styles.categories}>
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={styles.category}>
            <div className={styles.categoryHeader}>
              <h4 className={styles.categoryTitle}>
                {category.title}
                <span className={styles.categoryWeight}>({category.weight})</span>
              </h4>
            </div>
            
            <div className={styles.subcriteria}>
              {category.subcriteria.map((criterion, criterionIndex) => (
                <div key={criterionIndex} className={styles.subcriterion}>
                  <div className={styles.subcriterionInfo}>
                    <span className={styles.subcriterionLabel}>
                      {criterion.label}
                    </span>
                    <span className={styles.subcriterionWeight}>
                      ({criterion.weight})
                    </span>
                  </div>
                  <div className={styles.subcriterionRating}>
                    <RatingDisplay 
                      rating={criterion.value} 
                      size="medium" 
                      showValue={true}
                      showCount={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {notes && (
        <div className={styles.notes}>
          <h4 className={styles.notesTitle}>Bewertungsnotizen</h4>
          <p className={styles.notesText}>{notes}</p>
        </div>
      )}

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Diese Bewertung basiert auf standardisierten Kriterien und wird regelmäßig überprüft.
        </p>
      </div>
    </div>
  )
}

export default PlatformRatings