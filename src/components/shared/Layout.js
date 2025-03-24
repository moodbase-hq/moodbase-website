// src/components/shared/Layout.jsx
import React from 'react';
import Header from './Header';
// DO NOT import any footer component here

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* NO FOOTER HERE - The footer should be included in each page */}
    </div>
  );
};

export default Layout;