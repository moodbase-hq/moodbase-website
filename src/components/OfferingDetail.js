import React from 'react';
import { Star, ChevronLeft, Phone, Mail, Globe, Clock, MapPin } from 'lucide-react';

const RatingBar = ({ rating, category }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-600">{category}</span>
      <span className="text-sm font-medium text-gray-600">{rating}/5</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-pink-500 h-2 rounded-full"
        style={{ width: `${(rating / 5) * 100}%` }}
      />
    </div>
  </div>
);

const OfferingDetail = ({ offering, onBack }) => {
  const { detailedInfo } = offering;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-pink-500"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Zurück zur Übersicht
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{offering.name}</h1>
            <p className="text-xl opacity-90">{offering.provider}</p>
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
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-pink-500" />
                    {detailedInfo.address}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2 text-pink-500" />
                    {detailedInfo.contactInfo.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-2 text-pink-500" />
                    {detailedInfo.contactInfo.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="h-5 w-5 mr-2 text-pink-500" />
                    {detailedInfo.contactInfo.website}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 text-pink-500" />
                    {detailedInfo.openingHours}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Angebote</h3>
                  <div className="flex flex-wrap gap-2">
                    {detailedInfo.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
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
              <div className="bg-white p-6 rounded-lg">
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
                  {Object.entries(detailedInfo.ratings.categories).map(([category, rating]) => (
                    <RatingBar key={category} category={category} rating={rating} />
                  ))}
                </div>
              </div>

              {/* Additional Info Box */}
              <div className="bg-pink-50 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold mb-3">Unser Ansatz</h3>
                <p className="text-gray-600">{detailedInfo.approach}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfferingDetail;