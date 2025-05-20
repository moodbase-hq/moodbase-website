import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, Phone, Mail, Globe, Clock, MapPin, AlertCircle, MessageCircle } from 'lucide-react';
import axios from 'axios';
import Layout from '../components/shared/Layout';
import Button from '../components/shared/Button';
import { useTheme } from '../context/ThemeContext';
import { useParams, useNavigate } from 'react-router-dom';

// API client setup
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Print the API URL for debugging
console.log("API URL in OfferingDetail:", API_URL);

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
  const [provider, setProvider] = useState(null);
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

      // If we have a provider_id, fetch provider details
      if (propOffering.provider_id) {
        fetchProviderDetails(propOffering.provider_id);
      }
      return;
    }

    // Otherwise, fetch from API using ID from URL params
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching offering details for ID: ${params.id} from ${API_URL}/api/offerings/${params.id}`);
        const response = await api.get(`/api/offerings/${params.id}`);
        console.log("Offering data received:", response.data);

        setOffering(response.data);

        // Fetch provider details if available
        if (response.data.provider_id) {
          fetchProviderDetails(response.data.provider_id);
        }

        setError(null);
      } catch (error) {
        console.error('Error loading offering:', error);
        setError('Could not load the offering details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [propOffering, params.id]);

  // Function to fetch provider details
  const fetchProviderDetails = async (providerId) => {
    try {
      console.log(`Fetching provider details for ID: ${providerId}`);
      const response = await api.get(`/api/providers/${providerId}`);
      console.log("Provider data received:", response.data);
      setProvider(response.data);
    } catch (error) {
      console.error('Error loading provider details:', error);
      // We don't set an error state here as the offering details are still usable
    }
  };

  // Initialize ratings and testimonial
  useEffect(() => {
    if (!offering) return;

    // Initialize ratings
    setRatings({ ...defaultCategories });

    // Select a random testimonial
    const randomIndex = Math.floor(Math.random() * sampleTestimonials.length);
    setRandomTestimonial(sampleTestimonials[randomIndex]);

    // Process ratings data from the database
    if (offering.ratings) {
      const dbRatings = offering.ratings;

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

      // Calculate overall rating
      const overallRating = Object.values(ratings).reduce((sum, val) => sum + val, 0) / Object.keys(ratings).length;

      // Create new rating object
      const newRating = {
        userId: 1, // For demo purposes - would be the actual user's ID in a real app
        offeringId: offering.id,
        overallRating: overallRating,
        categoryRatings: dbCategories,
        comment: comment
      };

      console.log("Submitting new rating:", newRating);

      // Make the API call to save the rating
      try {
        await api.post('/api/ratings', newRating);
        console.log("Rating submitted successfully");
      } catch (error) {
        console.error("Error submitting rating to API:", error);
        // Continue with local update even if API call fails
      }

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

  // Extract essential data with fallbacks
  const providerName = offering.provider_name || provider?.name || offering.provider || "Unbekannter Anbieter";
  const description = offering.description || provider?.description || "Keine detaillierte Beschreibung verfügbar.";
  const offeringType = offering.service_type || offering.type || "Nicht spezifiziert";
  const offeringAddress = offering.address || "Adresse nicht angegeben";
  const contactPhone = offering.phone || provider?.phone || null;
  const contactEmail = offering.email || provider?.email || null;
  const contactWebsite = offering.website || provider?.website || null;

  // Format availability for display
  const availability = offering.availability_times || offering.availability || "Nicht angegeben";

  // Format costs for display
  const costs = offering.cost || offering.costs || "Nicht angegeben";

  // Get opening hours
  const openingHours = offering.opening_hours || "Nicht angegeben";

  // Check for coordinates
  const hasCoordinates =
    ((offering.latitude && offering.longitude) ||
    (provider?.latitude && provider?.longitude)) &&
    !isNaN(parseFloat(offering.latitude || provider?.latitude)) &&
    !isNaN(parseFloat(offering.longitude || provider?.longitude));

  // Get coordinates
  const latitude = parseFloat(offering.latitude || provider?.latitude);
  const longitude = parseFloat(offering.longitude || provider?.longitude);

  // Main location type/modality
  const locationType = offering.primary_location_type || "Nicht angegeben";

  // Check for status indicator
  const status = "Verfügbar"; // Default status, could be pulled from database in the future

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {ratingSubmitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
            <Star className="h-5 w-5 mr-2 text-green-600" />
            Vielen Dank für Ihre Bewertung! Sie wurde erfolgreich gespeichert.
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
          {/* Header Section with Back Button moved to top right */}
          <div className="bg-cta-gradient px-6 py-8 text-white relative">
            {/* Back Button positioned in top right */}
            <Button
              onClick={handleBack}
              variant="light"
              className="absolute top-3 right-3 flex items-center"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Zurück
            </Button>

            <h1 className="text-3xl font-bold mb-2">{offering.name}</h1>
            <p className="text-xl opacity-90">{providerName}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {status}
              </div>

              {ratingsData && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Star className="h-4 w-4 mr-1 fill-blue-800" />
                  {ratingsData.overallRating} ({ratingsData.count} {ratingsData.count === 1 ? 'Bewertung' : 'Bewertungen'})
                </div>
              )}

              {/* Modality Badge */}
              {locationType && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {locationType}
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
                <p className="text-gray-600 mb-6">{description}</p>

                {/* Contact Information */}
                <div className="space-y-3 mb-6">
                  {offeringAddress && (
                    <div className="flex items-start text-gray-600">
                      <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                      <div>
                        <div>{offeringAddress}</div>
                        {hasCoordinates && (
                        <div className="text-sm text-gray-500 mt-1">
                          Koordinaten: {latitude.toFixed(4)}, {longitude.toFixed(4)}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {contactPhone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-2 text-primary" />
                      {contactPhone}
                    </div>
                  )}

                  {contactEmail && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      {contactEmail}
                    </div>
                  )}

                  {contactWebsite && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-5 w-5 mr-2 text-primary" />
                      {contactWebsite}
                    </div>
                  )}

                  {openingHours && openingHours !== "Nicht angegeben" && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      {openingHours}
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
                    <span className="bg-tertiary/20 text-tertiary px-3 py-1 rounded-full text-sm">
                      {offeringType}
                    </span>
                  </div>
                </div>

                {/* Insurance Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Kostenübernahme</h3>
                  <p className="text-gray-600">{costs}</p>
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
                    {offeringType && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Art des Angebots</span>
                        <span className="font-medium">{offeringType}</span>
                      </div>
                    )}

                    {availability && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Verfügbarkeit</span>
                        <span className="font-medium">{availability}</span>
                      </div>
                    )}

                    {costs && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Kosten</span>
                        <span className="font-medium">{costs}</span>
                      </div>
                    )}

                    {locationType && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Modalität</span>
                        <span className="font-medium">{locationType}</span>
                      </div>
                    )}

                    {offering.created_at && (
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Erfasst am</span>
                        <span className="font-medium">{new Date(offering.created_at).toLocaleDateString('de-DE')}</span>
                      </div>
                    )}

                    {offering.updated_at && (
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Aktualisiert am</span>
                        <span className="font-medium">{new Date(offering.updated_at).toLocaleDateString('de-DE')}</span>
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

              {/* Provider Info Box */}
              {provider && (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                  <h3 className="text-xl font-semibold mb-3">Über den Anbieter</h3>

                  <div className="space-y-4">
                    {provider.founding_year && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Gründungsjahr</span>
                        <span className="font-medium">{provider.founding_year}</span>
                      </div>
                    )}

                    {provider.legal_status && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Rechtsform</span>
                        <span className="font-medium">{provider.legal_status}</span>
                      </div>
                    )}

                    {provider.main_focus && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Schwerpunkt</span>
                        <span className="font-medium">{provider.main_focus}</span>
                      </div>
                    )}
                  </div>

                  {provider.website && (
                    <a
                      href={provider.website.startsWith('http') ? provider.website : `https://${provider.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-primary hover:text-primary-dark"
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      Website des Anbieters besuchen
                    </a>
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
              {contactPhone && (
                <Button
                  href={`tel:${contactPhone}`}
                  variant="primary"
                  className="flex items-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Anrufen
                </Button>
              )}

              {contactEmail && (
                <Button
                  href={`mailto:${contactEmail}`}
                  variant="outline"
                  className="flex items-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  E-Mail senden
                </Button>
              )}

              {contactWebsite && (
                <Button
                  href={contactWebsite.startsWith('http') ? contactWebsite : `https://${contactWebsite}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="flex items-center"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Website besuchen
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

