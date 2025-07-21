import React from 'react'
import styles from './ResultCard.module.css'

const ResultCard = ({ result, onDetailsClick }) => {
  // Map API fields to display format
  const title = result.name || result.title;
  const organization = result.provider_name || result.provider || result.organization;
  const location = result.address || result.location;
  const languages = result.languages || ['Deutsch'];
  const serviceType = result.service_type || result.type;
  const modality = result.primary_location_type || 'Vor Ort';
  const themes = result.themes || result.topics || result.themen;

  // Helper function to truncate address for display
  const getDisplayLocation = (address) => {
    if (!address) return '';
    // Extract city from full address
    const parts = address.split(',');
    if (parts.length > 1) {
      const cityPart = parts[parts.length - 1].trim();
      const cityMatch = cityPart.match(/\d{5}\s+(.+)/) || cityPart.match(/(.+)/);
      return cityMatch ? cityMatch[1] || cityMatch[0] : address;
    }
    return address;
  };

  return (
    <div className={styles.resultCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardOrg}>{organization}</div>
        </div>
        <div className={styles.cardLocation}>{getDisplayLocation(location)}</div>
      </div>

      <div className={styles.cardDivider}></div>

      <div className={styles.cardTags}>
        <div className={styles.tagGroup}>
          <span className={styles.tagLabel}>SPRACHEN</span>
          <div className={styles.tagList}>
            {languages.map((lang, index) => (
              <span key={index} className={styles.tag}>{lang}</span>
            ))}
          </div>
        </div>

        {modality && (
          <div className={styles.tagGroup}>
            <span className={styles.tagLabel}>MODALITÄT</span>
            <div className={styles.tagList}>
              <span className={styles.tag}>{modality}</span>
            </div>
          </div>
        )}

        {serviceType && (
          <div className={styles.tagGroup}>
            <span className={styles.tagLabel}>BERATUNGSTYP</span>
            <div className={styles.tagList}>
              <span className={styles.tag}>{serviceType}</span>
            </div>
          </div>
        )}

        <div className={styles.tagGroup}>
          <span className={styles.tagLabel}>THEMEN</span>
          <div className={styles.tagList}>
            {themes && themes.length > 0 ? (
              themes.map((theme, index) => (
                <span key={index} className={styles.tag}>{theme}</span>
              ))
            ) : (
              <span className={styles.tag}>Keine Themen angegeben</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.cardActions}>
        <button 
          className={styles.detailsButton}
          onClick={() => onDetailsClick && onDetailsClick(result.id)}
        >
          Details anzeigen
        </button>
      </div>
    </div>
  );
}

export default ResultCard