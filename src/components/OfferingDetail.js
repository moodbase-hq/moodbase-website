// src/pages/OfferingDetail.jsx
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, Phone, Mail, Globe, Clock, MapPin, AlertCircle, MessageCircle } from 'lucide-react';
import Layout from '../components/shared/Layout';
import Button from '../components/shared/Button';
import { useTheme } from '../context/ThemeContext';

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

// Sample testimonials to display randomly
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

// Mock ratings for offerings
const mockRatings = {
  1: [
    { id: 101, offerId: 1, categories: { "Freundlichkeit": 4.5, "Verfügbarkeit": 4.0, "Fachliche Kompetenz": 4.8, "Preis-Leistungs-Verhältnis": 4.2 }, comment: "Sehr freundliches Team", date: "2024-01-10" },
    { id: 102, offerId: 1, categories: { "Freundlichkeit": 5.0, "Verfügbarkeit": 3.5, "Fachliche Kompetenz": 4.5, "Preis-Leistungs-Verhältnis": 5.0 }, comment: "Hat mir in einer schweren Zeit geholfen", date: "2024-01-18" }
  ],
  2: [
    { id: 201, offerId: 2, categories: { "Freundlichkeit": 4.2, "Verfügbarkeit": 3.0, "Fachliche Kompetenz": 4.8, "Preis-Leistungs-Verhältnis": 3.5 }, comment: "Gute Beratung, etwas lange Wartezeit", date: "2024-01-15" }
  ],
  10: [
    { id: 1001, offerId: 10, categories: { "Freundlichkeit": 5.0, "Verfügbarkeit": 4.5, "Fachliche Kompetenz": 4.7, "Preis-Leistungs-Verhältnis": 5.0 }, comment: "Hervorragende Unterstützung", date: "2024-01-20" },
    { id: 1002, offerId: 10, categories: { "Freundlichkeit": 4.8, "Verfügbarkeit": 4.0, "Fachliche Kompetenz": 5.0, "Preis-Leistungs-Verhältnis": 4.5 }, comment: "Fühle mich verstanden und gut aufgehoben", date: "2024-01-26" }
  ]
};

const OfferingDetail = ({ offering, onBack }) => {
  const theme = useTheme();
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [ratings, setRatings] = useState({});
  const [comment, setComment] = useState("");
  const [randomTestimonial, setRandomTestimonial] = useState(null);
  const [ratingsData, setRatingsData] = useState(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Initialize category ratings
  const defaultCategories = {
    "Freundlichkeit": 0,
    "Verfügbarkeit": 0,
    "Fachliche Kompetenz": 0,
    "Preis-Leistungs-Verhältnis": 0
  };

  useEffect(() => {
    // Initialize ratings
    setRatings({ ...defaultCategories });

    // Select a random testimonial
    const randomIndex = Math.floor(Math.random() * sampleTestimonials.length);
    setRandomTestimonial(sampleTestimonials[randomIndex]);

    // Load ratings for this offering
    if (offering) {
      const offeringRatings = mockRatings[offering.id] || [];

      if (offeringRatings.length > 0) {
        // Calculate average ratings
        const calculatedRatings = { ...defaultCategories };
        let totalOverall = 0;

        // Sum up all category ratings
        offeringRatings.forEach(rating => {
          Object.keys(rating.categories).forEach(category => {
            calculatedRatings[category] = (calculatedRatings[category] || 0) + rating.categories[category];
          });
        });

        // Calculate averages
        Object.keys(calculatedRatings).forEach(category => {
          calculatedRatings[category] = calculatedRatings[category] / offeringRatings.length;
          totalOverall += calculatedRatings[category];
        });

        // Calculate overall average
        const overallAverage = totalOverall / Object.keys(calculatedRatings).length;

        setRatingsData({
          ratings: offeringRatings,
          averages: calculatedRatings,
          overallRating: overallAverage.toFixed(1),
          count: offeringRatings.length
        });
      }
    }
  }, [offering]);

  // Handle rating submission
  const handleSubmitRating = () => {
    // Check if any ratings are still at 0
    const hasZeroRating = Object.values(ratings).some(rating => rating === 0);

    if (hasZeroRating) {
      alert("Bitte bewerten Sie alle Kategorien.");
      return;
    }

    // Create new rating object
    const newRating = {
      id: Date.now(), // Generate a unique ID
      offerId: offering.id,
      categories: { ...ratings },
      comment: comment,
      date: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };

    // In a real application, this would be an API call to save the rating
    console.log("Submitting new rating:", newRating);

    // Update local ratings data
    const updatedRatings = ratingsData ? [...ratingsData.ratings, newRating] : [newRating];

    // Calculate new averages
    const calculatedRatings = { ...defaultCategories };
    let totalOverall = 0;

    updatedRatings.forEach(rating => {
      Object.keys(rating.categories).forEach(category => {
        calculatedRatings[category] = (calculatedRatings[category] || 0) + rating.categories[category];
      });
    });

    Object.keys(calculatedRatings).forEach(category => {
      calculatedRatings[category] = calculatedRatings[category] / updatedRatings.length;
      totalOverall += calculatedRatings[category];
    });

    const overallAverage = totalOverall / Object.keys(calculatedRatings).length;

    // Update state
    setRatingsData({
      ratings: updatedRatings,
      averages: calculatedRatings,
      overallRating: overallAverage.toFixed(1),
      count: updatedRatings.length
    });

    // Reset form and show success message
    setRatingSubmitted(true);
    setShowRatingForm(false);
    setRatings({ ...defaultCategories });
    setComment("");

    // Hide success message after 3 seconds
    setTimeout(() => setRatingSubmitted(false), 3000);
  };

  // Safety check for missing data
  if (!offering) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Zurück zur Übersicht
          </Button>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-500 mb-4">Fehler beim Laden der Daten</h1>
            <p className="text-gray-600 mb-4">Die Detailinformationen konnten nicht geladen werden.</p>
            <Button
              onClick={onBack}
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
  const hasCoordinates = offering.coordinates &&
                        offering.coordinates.latitude &&
                        offering.coordinates.longitude;

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Button
          onClick={onBack}
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
                      <div>{detailedInfo.address}</div>
                      {hasCoordinates && (
                        <div className="text-sm text-gray-500 mt-1">
                          Koordinaten: {offering.coordinates.latitude.toFixed(4)}, {offering.coordinates.longitude.toFixed(4)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2 text-primary" />
                    {detailedInfo.contactInfo.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    {detailedInfo.contactInfo.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    {detailedInfo.contactInfo.website}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    {detailedInfo.openingHours}
                  </div>
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
                    {detailedInfo.services.map((service, index) => (
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
                        <span className="font-medium">{offering.lastUpdated}</span>
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
              {detailedInfo.approach && (
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