// src/components/shared/ValuePropositionCard.js
import React from 'react';

const ValuePropositionCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      {icon && (
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-8 h-8 text-primary">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ValuePropositionCard;