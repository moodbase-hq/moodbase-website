// src/components/shared/OfferingsTable.js
import React from 'react';

const OfferingsTable = ({ data, onRowClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50/70">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Angebot</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Anbieter</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ort</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Verfügbarkeit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Kosten</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sprachen</th>
          </tr>
        </thead>
        <tbody className="bg-transparent divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                Keine Angebote gefunden.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-white/40 transition-colors cursor-pointer"
                onClick={() => onRowClick(item.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-primary hover:text-primaryHover font-medium">{item.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.provider}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                    {item.availability}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.costs}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {item.languages && item.languages.map((lang, index) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary">
                        {lang}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OfferingsTable;