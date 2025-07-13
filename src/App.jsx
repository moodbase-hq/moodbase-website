import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Database from './pages/Database'
import About from './pages/About'
import Support from './pages/Support'
import Blog from './pages/Blog'
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
        </Routes>
      </div>
    </Router>
  )
}

export default App