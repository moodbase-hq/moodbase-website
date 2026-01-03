import React from 'react'
import RatingsSection from '../RatingsSection/RatingsSection'
import styles from './OfferingDetail.module.css'

const OfferingDetail = ({ offering, onBack }) => {
  if (!offering) return null;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onBack} className={styles.backButton}>
            ← Zurück zur Suche
          </button>
          <h1 className={styles.title}>{offering.name}</h1>
          <div className={styles.provider}>{offering.provider_name}</div>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Angebotsinformationen</h2>
            <div className={styles.grid}>
              {offering.service_type && (
                <div className={styles.field}>
                  <span className={styles.label}>Angebotstyp:</span>
                  <span className={styles.value}>{offering.service_type}</span>
                </div>
              )}

              {offering.primary_location_type && (
                <div className={styles.field}>
                  <span className={styles.label}>Modalität:</span>
                  <span className={styles.value}>{offering.primary_location_type}</span>
                </div>
              )}

              {offering.cost && (
                <div className={styles.field}>
                  <span className={styles.label}>Kosten:</span>
                  <span className={styles.value}>{offering.cost}</span>
                </div>
              )}

              {offering.address && (
                <div className={styles.field}>
                  <span className={styles.label}>Adresse:</span>
                  <span className={styles.value}>{offering.address}</span>
                </div>
              )}

              {(offering.opening_hours || offering.availability_times) && (
                <div className={styles.field}>
                  <span className={styles.label}>Öffnungszeiten:</span>
                  <span className={styles.value}>{offering.opening_hours || offering.availability_times}</span>
                </div>
              )}
            </div>
          </div>

          {offering.description && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Beschreibung</h2>
              <p className={styles.description}>{offering.description}</p>
            </div>
          )}

          {offering.languages && offering.languages.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Verfügbare Sprachen</h2>
              <div className={styles.tagList}>
                {offering.languages.map((lang, index) => (
                  <span key={index} className={styles.tag}>{lang}</span>
                ))}
              </div>
            </div>
          )}

          {(offering.accessibility || offering.public_transport) && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Barrierefreiheit & Anfahrt</h2>
              <div className={styles.accessibilityInfo}>
                {offering.accessibility && (
                  <div className={styles.accessibilityItem}>
                    <span className={styles.label}>Barrierefreiheit:</span>
                    <span className={styles.value}>{offering.accessibility}</span>
                  </div>
                )}
                {offering.public_transport && (
                  <div className={styles.accessibilityItem}>
                    <span className={styles.label}>ÖPNV:</span>
                    <span className={styles.value}>{offering.public_transport}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {(offering.phone || offering.email || offering.website) && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Kontakt</h2>
              <div className={styles.contactInfo}>
                {offering.phone && (
                  <div className={styles.contactItem}>
                    <span className={styles.label}>Telefon:</span>
                    <a href={`tel:${offering.phone}`} className={styles.contactLink}>
                      {offering.phone}
                    </a>
                  </div>
                )}

                {offering.email && (
                  <div className={styles.contactItem}>
                    <span className={styles.label}>E-Mail:</span>
                    <a href={`mailto:${offering.email}`} className={styles.contactLink}>
                      {offering.email}
                    </a>
                  </div>
                )}

                {offering.website && (
                  <div className={styles.contactItem}>
                    <span className={styles.label}>Website:</span>
                    <a
                      href={offering.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      {offering.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ratings Section */}
          <RatingsSection
            offeringId={offering.id}
            userRatings={offering.userRatings}
            platformRatings={offering.platformRatings}
            showSubmissionForm={true}
          />

          {/* Data Timestamps */}
          {(offering.created_at || offering.updated_at) && (
            <div className={styles.metaSection}>
              <div className={styles.metaInfo}>
                {offering.created_at && (
                  <span>Erstellt: {formatDate(offering.created_at)}</span>
                )}
                {offering.updated_at && (
                  <span>Aktualisiert: {formatDate(offering.updated_at)}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OfferingDetail