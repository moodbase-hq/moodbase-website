import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Database from './pages/Database'
import About from './pages/About'
import Support from './pages/Support'
import Blog from './pages/Blog'
import UnderConstructionPage from './components/UnderConstructionPage/UnderConstructionPage'
import TechSupportPage from './pages/TechSupportPage/TechSupportPage'
import HelpOrganizationsPage from './pages/HelpOrganizationsPage/HelpOrganizationsPage'
import FAQPage from './pages/FAQPage/FAQPage'
import './styles/globals.css'
import './styles/utilities.css'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/database" element={<Database />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/support" element={<Support />} />
          
          {/* RESSOURCEN pages */}
          <Route path="/tech-support" element={<UnderConstructionPage pageName="Tech Support" />} />
          <Route path="/help-organizations" element={<UnderConstructionPage pageName="Hilforganisationen" />} />
          <Route path="/faq" element={<UnderConstructionPage pageName="FAQ" />} />
          
          {/* Under construction pages */}
          <Route path="/partnerships" element={<UnderConstructionPage pageName="Kooperationen" />} />
          <Route path="/impressum" element={<UnderConstructionPage pageName="Impressum" />} />
          <Route path="/privacy" element={<UnderConstructionPage pageName="Datenschutz" />} />
          <Route path="/terms" element={<UnderConstructionPage pageName="Nutzungsbedingungen" />} />
          <Route path="/instagram" element={<UnderConstructionPage pageName="Instagram" />} />
          <Route path="/tiktok" element={<UnderConstructionPage pageName="TikTok" />} />
          <Route path="/linkedin" element={<UnderConstructionPage pageName="LinkedIn" />} />
          
          {/* Catch-all route for any unmatched paths */}
          <Route path="*" element={<UnderConstructionPage pageName="Diese Seite" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App