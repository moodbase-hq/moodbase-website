// src/components/shared/SearchBar.js
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ placeholder = 'Search...', value, onChange }) => {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 pl-12 text-lg rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 backdrop-blur-sm"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
    </div>
  );
};

export default SearchBar;