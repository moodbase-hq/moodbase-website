import React, { useState } from 'react';
import styles from './RatingSubmissionForm.module.css';
import RatingDisplay from '../RatingDisplay/RatingDisplay';
import { apiService } from '../../services/apiService';

const RatingSubmissionForm = ({ offeringId, onSubmissionSuccess, onCancel }) => {
  const [ratings, setRatings] = useState({
    overall: 0,
    access: 0,
    treatment: 0,
    helpful: 0,
    effectiveness: 0
  });
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
      description: 'Hast du etwas verstanden oder gelernt?'
    },
    {
      key: 'effectiveness',
      label: 'Wirksamkeit',
      description: 'Hat es dir wirklich geholfen?'
    }
  ];

  const handleRatingChange = (criterion, value) => {
    setRatings(prev => ({
      ...prev,
      [criterion]: value
    }));
    setError('');
  };

  const validateForm = () => {
    const requiredRatings = ['overall', 'access', 'treatment', 'helpful', 'effectiveness'];
    
    for (const rating of requiredRatings) {
      if (!ratings[rating] || ratings[rating] < 1) {
        return `Bitte bewerte alle Kriterien (mindestens 1 Stern).`;
      }
    }
    
    if (comment.length > 1000) {
      return 'Der Kommentar darf maximal 1000 Zeichen lang sein.';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const ratingData = {
        offeringId,
        overall: ratings.overall,
        access: ratings.access,
        treatment: ratings.treatment,
        helpful: ratings.helpful,
        effectiveness: ratings.effectiveness,
        comment: comment.trim() || null
      };

      const result = await apiService.submitRating(ratingData);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          if (onSubmissionSuccess) {
            onSubmissionSuccess(result);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError('Fehler beim Senden der Bewertung. Bitte versuche es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <h3>Vielen Dank für deine Bewertung!</h3>
          <p>Deine Bewertung wird geprüft und dann veröffentlicht.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Bewertung abgeben</h3>
        <p>Teile deine Erfahrung mit anderen und hilf ihnen bei der Entscheidung.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Overall Rating */}
        <div className={styles.ratingGroup}>
          <label className={styles.ratingLabel}>
            <span className={styles.labelText}>Gesamtbewertung</span>
            <span className={styles.labelDescription}>Wie bewertest du das Angebot insgesamt?</span>
          </label>
          <RatingDisplay
            rating={ratings.overall}
            size="large"
            interactive={true}
            onRatingChange={(value) => handleRatingChange('overall', value)}
            showValue={true}
          />
        </div>

        {/* Individual Criteria */}
        <div className={styles.criteriaSection}>
          <h4>Bewerte die einzelnen Aspekte:</h4>
          {criteria.map(criterion => (
            <div key={criterion.key} className={styles.ratingGroup}>
              <label className={styles.ratingLabel}>
                <span className={styles.labelText}>{criterion.label}</span>
                <span className={styles.labelDescription}>{criterion.description}</span>
              </label>
              <RatingDisplay
                rating={ratings[criterion.key]}
                size="medium"
                interactive={true}
                onRatingChange={(value) => handleRatingChange(criterion.key, value)}
                showValue={true}
              />
            </div>
          ))}
        </div>

        {/* Comment Section */}
        <div className={styles.commentSection}>
          <label htmlFor="comment" className={styles.commentLabel}>
            <span className={styles.labelText}>Kommentar (optional)</span>
            <span className={styles.labelDescription}>
              Teile weitere Details zu deiner Erfahrung mit
            </span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Beschreibe deine Erfahrung mit diesem Angebot..."
            className={styles.commentTextarea}
            rows={4}
            maxLength={1000}
          />
          <div className={styles.characterCount}>
            {comment.length}/1000 Zeichen
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Form Actions */}
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wird gesendet...' : 'Bewertung abgeben'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RatingSubmissionForm;