import React, { useState, useEffect } from 'react';
import styles from './PlaceModal.module.css';

const PlaceModal = ({ placeId, isOpen, onClose, onOfferingClick }) => {
  const [placeData, setPlaceData] = useState(null);
  const [offerings, setOfferings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch place details and offerings when modal opens
  useEffect(() => {
    if (isOpen && placeId) {
      fetchPlaceData();
    }
  }, [isOpen, placeId]);

  const fetchPlaceData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      // Fetch place details
      const placeResponse = await fetch(`${apiUrl}/api/places/${placeId}`);
      if (!placeResponse.ok) {
        throw new Error('Failed to fetch place details');
      }
      const place = await placeResponse.json();
      setPlaceData(place);

      // Fetch offerings at this place
      const offeringsResponse = await fetch(`${apiUrl}/api/places/${placeId}/offerings`);
      if (!offeringsResponse.ok) {
        throw new Error('Failed to fetch offerings');
      }
      const offeringsData = await offeringsResponse.json();
      setOfferings(offeringsData);

    } catch (err) {
      console.error('Error fetching place data:', err);
      setError('Fehler beim Laden der Standortdaten');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOfferingClick = (offeringId) => {
    onOfferingClick(offeringId);
    onClose(); // Close modal after selecting offering
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {placeData?.name || 'Standort Details'}
          </h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {isLoading && (
            <div className={styles.loading}>
              <p>Lade Standortdaten...</p>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          )}

          {placeData && !isLoading && (
            <>
              <div className={styles.placeInfo}>
                <div className={styles.placeDetails}>
                  <p className={styles.placeAddress}>
                    {placeData.address}
                    {placeData.city && `, ${placeData.city}`}
                    {placeData.zipcode && ` ${placeData.zipcode}`}
                  </p>
                  {placeData.description && (
                    <p className={styles.placeDescription}>{placeData.description}</p>
                  )}
                </div>
              </div>

              <div className={styles.offeringsSection}>
                <h4 className={styles.offeringsTitle}>
                  Angebote an diesem Standort ({offerings.length})
                </h4>
                
                {offerings.length === 0 ? (
                  <div className={styles.noOfferings}>
                    <p>Keine Angebote an diesem Standort gefunden.</p>
                  </div>
                ) : (
                  <div className={styles.offeringsList}>
                    {offerings.map((offering) => (
                      <div 
                        key={offering.id} 
                        className={styles.offeringCard}
                        onClick={() => handleOfferingClick(offering.id)}
                      >
                        <div className={styles.offeringHeader}>
                          <h5 className={styles.offeringName}>{offering.name}</h5>
                          {offering.service_type && (
                            <span className={styles.serviceType}>{offering.service_type}</span>
                          )}
                        </div>
                        
                        {offering.description && (
                          <p className={styles.offeringDescription}>
                            {offering.description.length > 120 
                              ? `${offering.description.substring(0, 120)}...`
                              : offering.description
                            }
                          </p>
                        )}

                        <div className={styles.offeringMeta}>
                          {offering.primary_location_type && (
                            <span className={styles.locationType}>
                              {offering.primary_location_type}
                            </span>
                          )}
                          {offering.cost && (
                            <span className={styles.cost}>{offering.cost}</span>
                          )}
                        </div>

                        <div className={styles.offeringActions}>
                          <span className={styles.detailsLink}>Details anzeigen →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;