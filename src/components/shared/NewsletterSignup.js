// src/components/shared/NewsletterSignup.js
import React from 'react';

const NewsletterSignup = ({ title, description, backgroundColor }) => {
  const bgColor = backgroundColor || 'bg-gray-100'; // Default light gray

  return (
    <section className={`py-12 ${bgColor} rounded-lg shadow-md`}>
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-8">{description}</p>
        <form className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Ihre E-Mail-Adresse"
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors"
          >
            Abonnieren
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;