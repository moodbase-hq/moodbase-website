// src/pages/BlogPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import Button from '../components/shared/Button';
import { useTheme } from '../context/ThemeContext';
import BackgroundBlob from '../components/shared/BackgroundBlob';
import CirclePattern from '../components/shared/CirclePatterns';
import FooterWithCurve from '../components/shared/FooterWithCurve';
import { motion } from 'framer-motion';
import theme from '../styles/theme';

// Wave Divider component for curved transitions
const WaveDivider = ({ position = 'bottom', color = '#FFFFFF', previousColor = '#EDF2FB', className = '' }) => {
  // Use different curves based on position
  if (position === 'bottom') {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} style={{ display: 'block', lineHeight: 0 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-auto block"
          style={{ display: 'block', verticalAlign: 'bottom' }}
        >
          <path
            fill={color}
            d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,80C672,85,768,139,864,154.7C960,171,1056,149,1152,122.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    );
  } else {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} style={{ display: 'block', lineHeight: 0 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-auto block"
          style={{ display: 'block', verticalAlign: 'top' }}
        >
          <path
            fill={color}
            d="M0,320L48,304C96,288,192,256,288,245.3C384,235,480,245,576,229.3C672,213,768,171,864,165.3C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
    );
  }
};

// Dummy blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Wie man Angst im Alltag bewältigt',
    excerpt: 'Praktische Tipps und Übungen, um mit Angstgefühlen im täglichen Leben umzugehen und langfristige Strategien zu entwickeln.',
    author: 'Dr. Maria König',
    date: '12. März 2025',
    category: 'Selbsthilfe',
    image: '/api/placeholder/800/500',
    readTime: '8 Min.'
  },
  {
    id: 2,
    title: 'Die Bedeutung von Schlaf für die psychische Gesundheit',
    excerpt: 'Warum guter Schlaf essentiell für unsere psychische Gesundheit ist und wie Sie Ihre Schlafqualität verbessern können.',
    author: 'Dr. Thomas Weber',
    date: '8. März 2025',
    category: 'Wohlbefinden',
    image: '/api/placeholder/800/500',
    readTime: '6 Min.'
  },
  {
    id: 3,
    title: 'Achtsamkeit im digitalen Zeitalter',
    excerpt: 'Wie Sie trotz der digitalen Reizüberflutung Achtsamkeit praktizieren und Ihre psychische Gesundheit schützen können.',
    author: 'Anna Schmidt',
    date: '1. März 2025',
    category: 'Achtsamkeit',
    image: '/api/placeholder/800/500',
    readTime: '10 Min.'
  },
  {
    id: 4,
    title: 'Burnout erkennen und vorbeugen',
    excerpt: 'Die Warnsignale eines Burnouts und effektive Strategien, um ihm vorzubeugen, bevor es zu spät ist.',
    author: 'Dr. Julia Becker',
    date: '24. Februar 2025',
    category: 'Arbeitsgesundheit',
    image: '/api/placeholder/800/500',
    readTime: '7 Min.'
  },
  {
    id: 5,
    title: 'Die Rolle der Ernährung für die psychische Gesundheit',
    excerpt: 'Wie unsere Ernährung unsere Stimmung und unser psychisches Wohlbefinden beeinflusst und welche Nahrungsmittel besonders förderlich sind.',
    author: 'Dr. Michael Schneider',
    date: '18. Februar 2025',
    category: 'Ernährung',
    image: '/api/placeholder/800/500',
    readTime: '9 Min.'
  },
  {
    id: 6,
    title: 'Soziale Verbindungen pflegen in einer isolierten Welt',
    excerpt: 'Warum soziale Verbindungen für unsere psychische Gesundheit so wichtig sind und wie wir sie in einer zunehmend isolierten Gesellschaft pflegen können.',
    author: 'Prof. Sarah Müller',
    date: '10. Februar 2025',
    category: 'Soziale Gesundheit',
    image: '/api/placeholder/800/500',
    readTime: '8 Min.'
  },
];

// Category filters
const categories = ['Alle', 'Selbsthilfe', 'Wohlbefinden', 'Achtsamkeit', 'Arbeitsgesundheit', 'Ernährung', 'Soziale Gesundheit'];

const BlogPage = () => {
  const themeContext = useTheme();
  const [activeCategory, setActiveCategory] = useState('Alle');

  // Color definitions (matching landing page)
  const pinkBackground = theme.colors.background1;    // D9B1B1 - Pink background
  const sandBackground = theme.colors.background2;    // E8CEB0 - Sand background
  const blueBackground = theme.colors.tertiary;       // 99BEFA - Light blue

  // Filter posts by category
  const filteredPosts = activeCategory === 'Alle'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Use Layout's Header but not its footer */}
      <Layout>
        {/* Hero Section - Pink Background */}
        <section className="relative pt-20" style={{ backgroundColor: pinkBackground }}>
          {/* Background blobs */}
          <BackgroundBlob
            color="#C8A0A0"
            width="650px"
            height="650px"
            className="top-[-200px] right-[-300px]"
            opacity={0.4}
            blur="70px"
          />

          <BackgroundBlob
            color="#C8A0A0"
            width="400px"
            height="400px"
            className="bottom-[100px] left-[-200px]"
            opacity={0.3}
            blur="50px"
            delay={0.3}
          />

          {/* Circle pattern in top right */}
          <div className="absolute top-20 right-20 z-10 pointer-events-none">
            <CirclePattern
              size="medium"
              color="#99BEFA"
              delay={0.2}
              opacity={0.7}
            />
          </div>

          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Unser Blog
              </motion.h1>
              <motion.p
                className="text-lg text-gray-700 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Aktuelle Informationen, Tipps und Forschung rund um psychische Gesundheit,
                Wohlbefinden und Selbstfürsorge.
              </motion.p>

              {/* Category filters in hero section */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                      activeCategory === category 
                        ? 'bg-primary text-white' 
                        : 'bg-white/30 backdrop-blur-sm text-gray-800 hover:bg-white/40'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Wave divider to sand section */}
          <WaveDivider position="bottom" color={sandBackground} previousColor={pinkBackground} />
        </section>

        {/* Blog Posts Grid - Sand Background */}
        <section className="relative" style={{ backgroundColor: sandBackground }}>
          {/* Background Blobs */}
          <BackgroundBlob
            color={pinkBackground}
            width="800px"
            height="800px"
            className="top-[-200px] right-[-200px]"
            opacity={0.3}
            blur="60px"
          />

          <BackgroundBlob
            color={pinkBackground}
            width="700px"
            height="700px"
            className="top-[400px] left-[-200px]"
            opacity={0.25}
            blur="50px"
            delay={0.3}
          />

          {/* Circle pattern */}
          <div className="absolute bottom-20 left-10 z-10 pointer-events-none">
            <CirclePattern
              size="large"
              color="#A13E4B"
              delay={0.3}
              opacity={0.5}
            />
          </div>

          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link to={`/blog/${post.id}`} className="block">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              backgroundColor: 'rgba(161, 62, 75, 0.1)',
                              color: theme.colors.primary
                            }}>
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-600">{post.readTime}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="block">
                      <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <span className="text-sm text-gray-700 font-medium">{post.author}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Wave divider to blue section */}
          <WaveDivider position="bottom" color={blueBackground} previousColor={sandBackground} />
        </section>

        {/* Newsletter Section - Blue Background */}
        <section className="relative" style={{ backgroundColor: blueBackground }}>
          <div className="container mx-auto px-4 py-16">
            <motion.div
              className="max-w-xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Bleiben Sie informiert</h2>
              <p className="text-white/80 mb-8">
                Abonnieren Sie unseren Newsletter und erhalten Sie die neuesten Artikel
                und Tipps direkt in Ihr Postfach.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="email"
                  placeholder="Ihre E-Mail-Adresse"
                  className="flex-grow px-4 py-3 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm text-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: theme.colors.primary,
                    transition: theme.transitions.default
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = theme.colors.primaryHover}
                  onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.primary}
                >
                  Abonnieren
                </button>
              </form>
              <p className="text-xs text-white/60">
                Wir respektieren Ihre Privatsphäre. Sie können den Newsletter jederzeit abbestellen.
              </p>
            </motion.div>
          </div>

          {/* Wave divider to sand buffer section */}
          <WaveDivider position="bottom" color={sandBackground} previousColor={blueBackground} />
        </section>

        {/* Sand buffer section */}
        <section style={{ backgroundColor: sandBackground }} className="relative">
          <div className="py-16"></div>
        </section>
      </Layout>

      {/* Footer */}
      <FooterWithCurve />
    </div>
  );
};

export default BlogPage;