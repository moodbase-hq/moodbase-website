// src/context/ThemeContext.jsx
import React, { createContext, useContext } from 'react';
import { theme } from '../styles/theme';

// Create the context
const ThemeContext = createContext(theme);

// Provider component
export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};