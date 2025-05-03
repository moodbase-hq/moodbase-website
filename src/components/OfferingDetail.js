// src/pages/OfferingDetail.jsx
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, Phone, Mail, Globe, Clock, MapPin, AlertCircle, MessageCircle } from 'lucide-react';
import axios from 'axios';
import Layout from '../components/shared/Layout';
import Button from '../components/shared/Button';
import { useTheme } from '../context/ThemeContext';
import { useParams, useNavigate } from 'react-router-dom';

// API client setup
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Rating component with clickable stars
const StarRating = ({ rating, setRating, disabled = false }) => {
  const renderStar = (index) => {
    const filled = index <= rating;
    return (
      <button
        key={index}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setRating(index)}
        className={`${disabled ? 'cursor-default' : 'cursor-pointer'} focus:outline-none transition-colors`}
        aria-label={`Rate ${index} out of 5`}
      >
        <Star
          className={`h-7 w-7 ${
            filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          } ${!disabled && 'hover:text-yellow-500'}`}
        />
      </button>
    );
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(renderStar)}
    </div>
  );
};

// Component for displaying a rating bar with a filled percentage
const RatingBar = ({ rating, category }) => {
  const theme = useTheme();

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-600">{category}</span>
        <span className="text-sm font-medium text-gray-600">{rating.toFixed(1)}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full"
          style={{ width: `${(rating / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

// Sample testimonials to display randomly - these could be moved to the database later
const sampleTestimonials = [
  {
    id: 1,
    text: "Die Beratung hat mir in einer schwierigen Zeit sehr geholfen. Das Team war sehr einfühlsam und professionell.",
    author: "Anonym, 34"
  },
  {
    id: 2,
    text: "Nach meinem ersten Termin habe ich mich deutlich besser gefühlt. Die Atmosphäre war angenehm und ich fühlte mich verstanden.",
    author: "Maria K."
  },
  {
    id: 3,
    text: "Ich war skeptisch, ob mir eine Beratung helfen könnte, aber nach ein paar Sitzungen habe ich deutliche Fortschritte gesehen.",
    author: "Thomas, 42"
  },
  {
    id: 4,
    text: "Besonders gut fand ich die praktischen Tipps, die ich direkt in meinen Alltag einbauen konnte. Sehr empfehlenswert!",
    author: "S. Müller"
  },
  {
    id: 5,
    text: "Die flexible Terminvergabe hat mir sehr geholfen, die Beratung trotz meines vollen Zeitplans wahrzunehmen.",
    author: "Anonym"
  }
];

// Default category mapping
const defaultCategories = {
  "Freundlichkeit": 0,
  "Verfügbarkeit": 0,
  "Fachliche Kompetenz": 0,
  "Preis-Leistungs-Verhältnis": 0
};

// Map database category names to UI friendly names
const categoryMapping = {
  "Verfügbarkeit": "Verfügbarkeit",
  "Freundlichkeit": "Freundlichkeit",
  "Professionalität": "Fachliche Kompetenz",
  "Atmosphäre": "Atmosphäre",
  "Preis-Leistung": "Preis-Leistungs-Verhältnis",
  "Datenschutz": "Datenschutz",
  "Vertraulichkeit": "Vertraulichkeit",
  "Nachbetreuung": "Nachbetreuung",
  "Gruppendynamik": "Gruppendynamik"
};

const OfferingDetail = ({ offering: propOffering, onBack }) => {
  const theme = useTheme();
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [offering, setOffering] = useState(propOffering);
  const [ratings, setRatings] = useState({...defaultCategories});
  const [comment, setComment] = useState("");
  const [randomTestimonial, setRandomTestimonial] = useState(null);
  const [ratingsData, setRatingsData] = useState(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [loading, setLoading] = useState(!propOffering);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  // Fetch offering data if not provided as prop
  useEffect(() => {
    // If offering is passed as prop, use it
    if (propOffering) {
      setOffering(propOffering);
      return;
    }

    // Otherwise, fetch from API using ID from URL params
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/offerings/${params.id}`);
        setOffering(response.data);
        setError(null);
      } catch (error) {
        setError('Could not load the offering details. Please try again later.');
        console.error('Error loading offering:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [propOffering, params.id]);

  // Initialize ratings and testimonial
  useEffect(() => {
    if (!offering) return;

    // Initialize ratings
    setRatings({ ...defaultCategories });

    // Select a random testimonial
    const randomIndex = Math.floor(Math.random() * sampleTestimonials.length);
    setRandomTestimonial(sampleTestimonials[randomIndex]);

    // Process ratings data from the database
    if (offering.detailedInfo?.ratings) {
      const dbRatings = offering.detailedInfo.ratings;

      // Process ratings categories
      const processedCategories = {};
      if (dbRatings.categories) {
        Object.entries(dbRatings.categories).forEach(([key, value]) => {
          const displayName = categoryMapping[key] || key; // Use mapping or default to DB name
          processedCategories[displayName] = value;
        });
      }

      setRatingsData({
        ratings: [], // We don't have individual ratings from the DB yet
        averages: processedCategories,
        overallRating: dbRatings.overallRating.toFixed(1),
        count: 1 // Placeholder - would come from DB in a real implementation
      });
    }
  }, [offering]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // Handle rating submission
  const handleSubmitRating = async () => {
    // Check if any ratings are still at 0
    const hasZeroRating = Object.values(ratings).some(rating => rating === 0);

    if (hasZeroRating) {
      alert("Bitte bewerten Sie alle Kategorien.");
      return;
    }

    try {
      // Convert UI category names back to database format if needed
      const dbCategories = {};
      Object.entries(ratings).forEach(([key, value]) => {
        // Find original DB category name
        const dbKey = Object.keys(categoryMapping).find(
          dbName => categoryMapping[dbName] === key
        ) || key;
        dbCategories[dbKey] = value;
      });

      // Create new rating object
      const newRating = {
        userId: 1, // For demo purposes - would be the actual user's ID in a real app
        entryId: offering.id,
        overall: Object.values(ratings).reduce((sum, val) => sum + val, 0) / Object.keys(ratings).length,
        categories: dbCategories,
        comment: comment
      };

      // In a real application, this would be an API call to save the rating
      console.log("Submitting new rating:", newRating);
      // Use this in production:
      // await api.post('/ratings', newRating);

      // Update UI to show new rating
      // For demo purposes, we'll calculate the new averages locally
      const oldAverages = ratingsData?.averages || {};
      const oldCount = ratingsData?.count || 0;

      // Calculate new averages
      const newAverages = { ...oldAverages };

      Object.entries(ratings).forEach(([category, value]) => {
        // If this category already exists, update its average
        if (newAverages[category] !== undefined) {
          newAverages[category] = ((newAverages[category] * oldCount) + value) / (oldCount + 1);
        } else {
          // Otherwise add this new category
          newAverages[category] = value;
        }
      });

      // Calculate new overall
      const newOverall = Object.values(newAverages).reduce((sum, val) => sum + val, 0) / Object.keys(newAverages).length;

      // Update ratings data
      setRatingsData({
        ratings: [], // We don't have individual ratings
        averages: newAverages,
        overallRating: newOverall.toFixed(1),
        count: oldCount + 1
      });

      // Reset form and show success message
      setRatingSubmitted(true);
      setShowRatingForm(false);
      setRatings({ ...defaultCategories });
      setComment("");

      // Hide success message after 3 seconds
      setTimeout(() => setRatingSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Es gab einen Fehler beim Speichern Ihrer Bewertung. Bitte versuchen Sie es später erneut.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Zurück zur Übersicht
          </Button>

          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-10"></div>
            <div className="h-40 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-60 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Safety check for missing data
  if (error || !offering) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Zurück zur Übersicht
          </Button>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-500 mb-4">Fehler beim Laden der Daten</h1>
            <p className="text-gray-600 mb-4">{error || 'Die Detailinformationen konnten nicht geladen werden.'}</p>
            <Button
              onClick={handleBack}
              variant="primary"
            >
              Zurück zur Übersicht
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle case where detailed info might be missing
  const detailedInfo = offering.detailedInfo || {
    description: "Keine detaillierte Beschreibung verfügbar.",
    address: offering.address || offering.location || "Adresse nicht angegeben",
    contactInfo: {
      phone: offering.contactInfo?.phone || "Nicht angegeben",
      email: offering.contactInfo?.email || "Nicht angegeben",
      website: offering.contactInfo?.website || "Nicht angegeben"
    },
    openingHours: "Nicht angegeben",
    services: offering.type ? [offering.type] : ["Keine Angaben"],
    insurance: offering.costs || "Keine Angaben",
    approach: "Keine Angaben"
  };

  // Extract coordinates for potential map display
const hasCoordinates = offering.latitude &&
                     offering.longitude &&
                     !isNaN(parseFloat(offering.latitude)) &&
                     !isNaN(parseFloat(offering.longitude));
  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Button
          onClick={handleBack}
          variant="outline"
          className="flex items-center mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Zurück zur Übersicht
        </Button>

        {ratingSubmitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
            <Star className="h-5 w-5 mr-2 text-green-600" />
            Vielen Dank für Ihre Bewertung! Sie wurde erfolgreich gespeichert.
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-cta-gradient px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{offering.name}</h1>
            <p className="text-xl opacity-90">{offering.provider}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              {offering.status && (
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  offering.status === 'Verfügbar' 
                    ? 'bg-green-100 text-green-800' 
                    : offering.status === 'Warteliste'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  {offering.status}
                </div>
              )}

              {ratingsData && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Star className="h-4 w-4 mr-1 fill-blue-800" />
                  {ratingsData.overallRating} ({ratingsData.count} {ratingsData.count === 1 ? 'Bewertung' : 'Bewertungen'})
                </div>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Left Column - Info */}
            <div>
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Über uns</h2>
                <p className="text-gray-600 mb-6">{detailedInfo.description}</p>

                {/* Contact Information */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <div>{offering.address || detailedInfo.address}</div>
                      {hasCoordinates && (
                      <div className="text-sm text-gray-500 mt-1">
                        Koordinaten: {parseFloat(offering.latitude).toFixed(4)}, {parseFloat(offering.longitude).toFixed(4)}
                        </div>
                      )}
                    </div>
                  </div>

                  {detailedInfo.contactInfo?.phone && detailedInfo.contactInfo.phone !== "Nicht angegeben" && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-2 text-primary" />
                      {detailedInfo.contactInfo.phone}
                    </div>
                  )}

                  {detailedInfo.contactInfo?.email && detailedInfo.contactInfo.email !== "Nicht angegeben" && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      {detailedInfo.contactInfo.email}
                    </div>
                  )}

                  {detailedInfo.contactInfo?.website && detailedInfo.contactInfo.website !== "Nicht angegeben" && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-5 w-5 mr-2 text-primary" />
                      {detailedInfo.contactInfo.website}
                    </div>
                  )}

                  {detailedInfo.openingHours && detailedInfo.openingHours !== "Nicht angegeben" && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      {detailedInfo.openingHours}
                    </div>
                  )}
                </div>

                {/* Languages */}
                {offering.languages && offering.languages.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Sprachen</h3>
                    <div className="flex flex-wrap gap-2">
                      {offering.languages.map((language, index) => (
                        <span
                          key={index}
                          className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Angebote</h3>
                  <div className="flex flex-wrap gap-2">
                    {(detailedInfo.services || [offering.type]).map((service, index) => (
                      <span
                        key={index}
                        className="bg-tertiary/20 text-tertiary px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Insurance Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Kostenübernahme</h3>
                  <p className="text-gray-600">{detailedInfo.insurance}</p>
                </div>

                {/* Testimonial Box */}
                {randomTestimonial && (
                  <div className="mt-6 p-4 bg-secondary/5 rounded-lg">
                    <div className="flex items-start">
                      <MessageCircle className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700 italic mb-2">"{randomTestimonial.text}"</p>
                        <p className="text-sm text-gray-500">— {randomTestimonial.author}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Ratings */}
            <div>
              {ratingsData ? (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <div className="flex items-center mb-6">
                    <Star className="h-8 w-8 text-yellow-400 fill-yellow-400 mr-2" />
                    <div>
                      <div className="text-3xl font-bold">
                        {ratingsData.overallRating}
                      </div>
                      <div className="text-gray-500">Gesamtbewertung ({ratingsData.count} {ratingsData.count === 1 ? 'Bewertung' : 'Bewertungen'})</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(ratingsData.averages).map(([category, rating]) => (
                      <RatingBar key={category} category={category} rating={rating} />
                    ))}
                  </div>

                  {!showRatingForm && (
                    <button
                      onClick={() => setShowRatingForm(true)}
                      className="mt-6 w-full py-2 px-4 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Bewertung abgeben
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                  <h3 className="text-xl font-semibold mb-3">Informationen</h3>

                  <div className="space-y-4">
                    {offering.type && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Art des Angebots</span>
                        <span className="font-medium">{offering.type}</span>
                      </div>
                    )}

                    {offering.availability && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Verfügbarkeit</span>
                        <span className="font-medium">{offering.availability}</span>
                      </div>
                    )}

                    {offering.costs && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Kosten</span>
                        <span className="font-medium">{offering.costs}</span>
                      </div>
                    )}

                    {offering.lastUpdated && (
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Letztes Update</span>
                        <span className="font-medium">{new Date(offering.lastUpdated).toLocaleDateString('de-DE')}</span>
                      </div>
                    )}
                  </div>

                  {!showRatingForm && (
                    <button
                      onClick={() => setShowRatingForm(true)}
                      className="mt-6 w-full py-2 px-4 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Erste Bewertung abgeben
                    </button>
                  )}
                </div>
              )}

              {/* Rating Form */}
              {showRatingForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-secondary/30">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Star className="h-5 w-5 text-secondary mr-2" />
                    Bewertung abgeben
                  </h3>

                  <div className="space-y-5">
                    {Object.keys(defaultCategories).map((category) => (
                      <div key={category} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{category}</label>
                        <StarRating
                          rating={ratings[category]}
                          setRating={(value) => setRatings({...ratings, [category]: value})}
                        />
                      </div>
                    ))}

                    <div className="space-y-2">
                      <label htmlFor="comment" className="text-sm font-medium text-gray-700">Kommentar (optional)</label>
                      <textarea
                        id="comment"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        placeholder="Teilen Sie Ihre Erfahrungen..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleSubmitRating}
                        className="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Bewertung senden
                      </button>
                      <button
                        onClick={() => setShowRatingForm(false)}
                        className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info Box */}
              {detailedInfo.approach && detailedInfo.approach !== "Keine Angaben" && (
                <div className="bg-primary/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Unser Ansatz</h3>
                  <p className="text-gray-600">{detailedInfo.approach}</p>
                </div>
              )}

              {/* Demo notice */}
              <div className="bg-secondary/10 p-4 rounded-lg mt-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-gray-800">
                    <strong>Hinweis:</strong> Dies ist eine Demo-Version. Die gezeigten Angebote und Bewertungen dienen nur zur Veranschaulichung und repräsentieren keine realen Dienste.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-wrap gap-3">
              {detailedInfo.contactInfo?.phone && detailedInfo.contactInfo.phone !== "Nicht angegeben" && (
                <Button
                  href={`tel:${detailedInfo.contactInfo.phone}`}
                  variant="primary"
                  className="flex items-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Anrufen
                </Button>
              )}

              {detailedInfo.contactInfo?.email && detailedInfo.contactInfo.email !== "Nicht angegeben" && (
                <Button
                  href={`mailto:${detailedInfo.contactInfo.email}`}
                  variant="outline"
                  className="flex items-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  E-Mail senden
                </Button>
              )}

              {detailedInfo.contactInfo?.website && detailedInfo.contactInfo.website !== "Nicht angegeben" && (
                <Button
                  href={detailedInfo.contactInfo.website.startsWith('http') ? detailedInfo.contactInfo.website : `https://${detailedInfo.contactInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="flex items-center"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Website besuchen
                </Button>
              )}

              {!showRatingForm && (
                <Button
                  onClick={() => setShowRatingForm(true)}
                  variant="outline"
                  className="flex items-center ml-auto"
                >
                  <Star className="mr-2 h-4 w-4" />
                  Bewertung abgeben
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default OfferingDetail;