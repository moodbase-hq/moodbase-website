// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Import components from correct paths
// Check if the components are in /components/ or /pages/ directory and adjust accordingly
import OrganicWebsite from './components/OrganicWebsite';
import BlogPage from './components/BlogPage'; // or './pages/BlogPage'
import ArticlePage from './components/ArticlePage'; // or './pages/ArticlePage'
import DatabasePage from './components/DatabasePage'; // or './pages/DatabasePage'
import MapsPage from './components/MapsPage'; // or './pages/MapsPage'
import AboutPage from './components/AboutPage'; // or './pages/AboutPage'
import GetInvolvedPage from './components/GetInvolvedPage'; // or './pages/GetInvolvedPage'
import KooperationenPage from './components/KooperationenPage'; // or './pages/KooperationenPage'

import './styles/global.css';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Use OrganicWebsite as the landing page */}
          <Route path="/" element={<OrganicWebsite />} />

          {/* All routes without Layout wrapper - pages handle their own layout */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<ArticlePage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<GetInvolvedPage />} />
          <Route path="/kooperationen" element={<KooperationenPage />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;