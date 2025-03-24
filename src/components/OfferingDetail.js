// src/pages/OfferingDetail.jsx
import React from 'react';
import { Star, ChevronLeft, Phone, Mail, Globe, Clock, MapPin, AlertCircle } from 'lucide-react';
import Layout from '../components/shared/Layout';
import Button from '../components/shared/Button';
import { useTheme } from '../context/ThemeContext';

const RatingBar = ({ rating, category }) => {
  const theme = useTheme();

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-600">{category}</span>
        <span className="text-sm font-medium text-gray-600">{rating}/5</span>
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

const OfferingDetail = ({ offering, onBack }) => {
  const theme = useTheme();

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
      phone: "Nicht angegeben",
      email: "Nicht angegeben",
      website: "Nicht angegeben"
    },
    openingHours: "Nicht angegeben",
    services: offering.type ? [offering.type] : ["Keine Angaben"],
    insurance: offering.costs || "Keine Angaben",
    approach: "Keine Angaben",
    ratings: {
      overallRating: "N/A",
      categories: {
        "Freundlichkeit": 0,
        "Verfügbarkeit": 0,
        "Fachliche Kompetenz": 0,
        "Preis-Leistungs-Verhältnis": 0
      }
    }
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-cta-gradient px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{offering.name}</h1>
            <p className="text-xl opacity-90">{offering.provider}</p>
            {offering.status && (
              <div className={`inline-flex items-center mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                offering.status === 'Verfügbar' 
                  ? 'bg-green-100 text-green-800' 
                  : offering.status === 'Warteliste'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}>
                {offering.status}
              </div>
            )}
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
              </div>
            </div>

            {/* Right Column - Ratings */}
            <div>
              {detailedInfo.ratings && typeof detailedInfo.ratings.overallRating !== 'undefined' ? (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-6">
                    <Star className="h-8 w-8 text-yellow-400 mr-2" />
                    <div>
                      <div className="text-3xl font-bold">
                        {detailedInfo.ratings.overallRating}
                      </div>
                      <div className="text-gray-500">Gesamtbewertung</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(detailedInfo.ratings.categories || {}).map(([category, rating]) => (
                      <RatingBar key={category} category={category} rating={rating} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
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
                </div>
              )}

              {/* Additional Info Box */}
              {detailedInfo.approach && (
                <div className="bg-primary/10 p-6 rounded-lg mt-6">
                  <h3 className="text-xl font-semibold mb-3">Unser Ansatz</h3>
                  <p className="text-gray-600">{detailedInfo.approach}</p>
                </div>
              )}

              {/* Demo notice */}
              <div className="bg-secondary/10 p-4 rounded-lg mt-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-gray-800">
                    <strong>Hinweis:</strong> Dies ist eine Demo-Version. Die gezeigten Angebote dienen nur zur Veranschaulichung und repräsentieren keine realen Dienste.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-wrap gap-3">
              {offering.contactInfo?.phone && (
                <Button
                  href={`tel:${offering.contactInfo.phone}`}
                  variant="primary"
                  className="flex items-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Anrufen
                </Button>
              )}

              {offering.contactInfo?.email && (
                <Button
                  href={`mailto:${offering.contactInfo.email}`}
                  variant="outline"
                  className="flex items-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  E-Mail senden
                </Button>
              )}

              {offering.contactInfo?.website && (
                <Button
                  href={offering.contactInfo.website}
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