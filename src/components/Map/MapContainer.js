import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import offersData from '../../content/database_coordinates.json';
import './MapContainer.css';

const MapContainer = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    availability: '',
    costs: '',
    languages: []
  });

  // Load data on component mount
  useEffect(() => {
    // In a real app, you might fetch this from an API
    setOffers(offersData.offers);
    setFilteredOffers(offersData.offers);
  }, []);

  // Extract unique values for filter dropdowns
  const getUniqueValues = (field) => {
    const values = new Set(offers.map(offer => offer[field]));
    return Array.from(values).filter(Boolean).sort();
  };

  const uniqueTypes = getUniqueValues('type');
  const uniqueLocations = getUniqueValues('location');

  // Get all unique languages across all offers
  const uniqueLanguages = Array.from(
    new Set(offers.flatMap(offer => offer.languages || []))
  ).sort();

  // Update filters
  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };

  // Toggle language filter
  const toggleLanguageFilter = (language) => {
    const updatedLanguages = filters.languages.includes(language)
      ? filters.languages.filter(lang => lang !== language)
      : [...filters.languages, language];

    setFilters({
      ...filters,
      languages: updatedLanguages
    });
  };

  // Apply filters
  useEffect(() => {
    let result = offers;

    if (filters.location) {
      result = result.filter(offer =>
        offer.location.includes(filters.location)
      );
    }

    if (filters.type) {
      result = result.filter(offer =>
        offer.type === filters.type
      );
    }

    if (filters.costs) {
      result = result.filter(offer =>
        offer.costs.includes(filters.costs)
      );
    }

    if (filters.languages.length > 0) {
      result = result.filter(offer =>
        filters.languages.every(language =>
          offer.languages && offer.languages.includes(language)
        )
      );
    }

    setFilteredOffers(result);
  }, [filters, offers]);

  // Handle marker click
  const handleMarkerClick = (offer) => {
    console.log('Selected offer:', offer);
    // You could scroll to details, open a modal, etc.
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      location: '',
      type: '',
      availability: '',
      costs: '',
      languages: []
    });
  };

  return (
    <div className="map-container-wrapper">
      <div className="filter-panel">
        <h2>Filter</h2>

        <div className="filter-group">
          <label>Standort:</label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">Alle Standorte</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Typ:</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">Alle Typen</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sprachen:</label>
          <div className="language-checkboxes">
            {uniqueLanguages.map(language => (
              <div key={language} className="language-checkbox">
                <input
                  type="checkbox"
                  id={`lang-${language}`}
                  checked={filters.languages.includes(language)}
                  onChange={() => toggleLanguageFilter(language)}
                />
                <label htmlFor={`lang-${language}`}>{language}</label>
              </div>
            ))}
          </div>
        </div>

        <button className="clear-filters-btn" onClick={clearFilters}>
          Filter zurücksetzen
        </button>

        <div className="results-count">
          {filteredOffers.length} Angebote gefunden
        </div>
      </div>

      <div className="map-and-list">
        <div className="map-wrapper">
          <h2>Kartenansicht</h2>
          <MapComponent
            data={filteredOffers}
            onMarkerClick={handleMarkerClick}
          />
        </div>

        <div className="list-wrapper">
          <h2>Angebotsliste</h2>
          <div className="offers-list">
            {filteredOffers.map(offer => (
              <div key={offer.id} className="offer-card">
                <h3>{offer.name}</h3>
                <p className="provider">{offer.provider}</p>
                <p className="location">
                  <strong>Standort:</strong> {offer.location}
                </p>
                <p className="availability">
                  <strong>Verfügbarkeit:</strong> {offer.availability}
                </p>
                <p className="costs">
                  <strong>Kosten:</strong> {offer.costs}
                </p>
                <div className="languages">
                  <strong>Sprachen:</strong>
                  <div className="language-tags">
                    {offer.languages.map(lang => (
                      <span key={lang} className="language-tag">{lang}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;