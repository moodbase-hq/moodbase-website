import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Website from './components/Website';
import DatabasePage from './components/DatabasePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Website />} />
        <Route path="/database" element={<DatabasePage />} />
      </Routes>
    </Router>
  );
};

export default App;