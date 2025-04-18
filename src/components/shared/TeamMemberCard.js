// src/components/shared/TeamMemberCard.js
import React from 'react';

const TeamMemberCard = ({ name, role, description, imageSrc }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-white/20">
      {imageSrc ? (
        <img src={imageSrc} alt={name} className="h-64 w-full object-cover bg-gray-200/70" />
      ) : (
        <div className="h-64 bg-gray-200/70"></div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{name}</h3>
        <p className="text-primary font-medium mb-4">{role}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;