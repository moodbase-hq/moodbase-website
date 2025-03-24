// src/pages/BlogPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import Button from '../components/shared/Button';
import { useTheme } from '../context/ThemeContext';
import FooterWithCurve from '../components/shared/FooterWithCurve';
import { motion } from 'framer-motion';
import theme from '../styles/theme';

// Import SVG assets directly
import Blob1 from '../components/shared/assets/1.svg';
import CircleGroup from '../components/shared/assets/2.svg';
import OutlinedBlob from '../components/shared/assets/3.svg';
import CloudBlob from '../components/shared/assets/4.svg';

// Animated SVG Component with hover effect
const AnimatedSvg = ({
  src,
  width,
  height,
  className,
  alt = "Decorative element",
  style = {},
  delay = 0,
  animationType = "float" // Options: "float", "pulse", "rotate"
}) => {
  // Define different animation variants
  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 8 + Math.random() * 4, // Random duration between 8-12s
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay: delay
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [style.opacity || 0.7, (style.opacity || 0.7) + 0.1, style.opacity || 0.7],
    transition: {
      duration: 6 + Math.random() * 3, // Random duration between 6-9s
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay: delay
    }
  };

  const rotateAnimation = {
    rotate: [0, 3, 0, -3, 0],
    transition: {
      duration: 12 + Math.random() * 5, // Random duration between 12-17s
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay: delay
    }
  };

  // Choose animation based on type
  let animation = {};
  switch (animationType) {
    case "float":
      animation = floatAnimation;
      break;
    case "pulse":
      animation = pulseAnimation;
      break;
    case "rotate":
      animation = rotateAnimation;
      break;
    default:
      animation = floatAnimation;
  }

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width, height, zIndex: 0, ...style }}
      initial={{ opacity: 0 }}
      animate={{ opacity: style.opacity || 0.7 }}
      transition={{ duration: 1.5, delay: delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        animate={animation}
      />
    </motion.div>
  );
};

// Wave Divider component
const WaveDivider = ({ position = 'bottom', color = '#2F5EA8', className = '' }) => {
  // Use different curves based on position
  if (position === 'bottom') {
    return (
      <div className={`relative w-full overflow-hidden pointer-events-none ${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-auto block"
          style={{ marginBottom: '-5px', display: 'block' }} // Fix for seams
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
      <div className={`relative w-full overflow-hidden pointer-events-none ${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-auto block"
          style={{ marginTop: '-5px', display: 'block' }} // Fix for seams
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

  // Color definitions
  const blueBackground = '#2F5EA8'; // Blue for footer section
  const darkBlue = '#2F5EA8';      // Dark blue for CircleGroup SVGs
  const burgundy = '#A13E4B';      // Burgundy for CloudBlob SVGs

  // Filter posts by category
  const filteredPosts = activeCategory === 'Alle'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* SVG Decorations - Using absolute positioning with overflow visible */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {/* BIGGER SVGs with different positioning for Blog page */}

        {/* Right top blob - diagonal opposite from homepage */}
        <AnimatedSvg
          src={Blob1}
          alt="Background Blob 1"
          width="2200px"
          height="2200px"
          className="right-[-800px] top-[-500px]"
          style={{ opacity: 0.7 }}
          delay={0.1}
          animationType="float"
        />

        {/* Left middle circle group */}
        <AnimatedSvg
          src={CircleGroup}
          alt="Circle Group 1"
          width="1800px"
          height="1800px"
          className="left-[-600px] top-[300px]"
          style={{
            opacity: 0.8,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={0.2}
          animationType="pulse"
        />

        {/* Right middle outlined blob */}
        <AnimatedSvg
          src={OutlinedBlob}
          alt="Outlined Blob 1"
          width="2500px"
          height="2500px"
          className="right-[-600px] top-[600px]"
          style={{ opacity: 0.6 }}
          delay={0.4}
          animationType="rotate"
        />

        {/* Bottom center cloud blob */}
        <AnimatedSvg
          src={CloudBlob}
          alt="Cloud Blob 1"
          width="2300px"
          height="2300px"
          className="left-[30%] bottom-[-800px]"
          style={{
            opacity: 0.7,
            filter: `brightness(0) saturate(100%) invert(28%) sepia(9%) saturate(4661%) hue-rotate(314deg) brightness(93%) contrast(89%)`
          }}
          delay={0.3}
          animationType="float"
        />

        {/* Bottom left blob */}
        <AnimatedSvg
          src={Blob1}
          alt="Background Blob 2"
          width="1800px"
          height="1800px"
          className="left-[-600px] bottom-[-400px]"
          style={{ opacity: 0.5 }}
          delay={0.5}
          animationType="pulse"
        />

        {/* Near the blog posts, a circle group */}
        <AnimatedSvg
          src={CircleGroup}
          alt="Circle Group 2"
          width="900px"
          height="900px"
          className="right-[-200px] top-[900px]"
          style={{
            opacity: 0.6,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={0.6}
          animationType="rotate"
        />
      </div>

      {/* Use Layout's Header but not its footer */}
      <Layout>
        {/* Hero Section - Now transparent */}
        <section className="relative pt-20 bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
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
        </section>

        {/* Blog Posts Grid - Now transparent */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
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
        </section>

        {/* Newsletter Section - Now transparent with contrasting card */}
        <section className="relative bg-transparent py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-xl mx-auto text-center bg-[#2F5EA8]/90 backdrop-blur-md rounded-2xl p-8 shadow-xl relative z-10"
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
        </section>

        {/* Transition to footer */}
        <div className="relative z-10 mt-8">
          <WaveDivider position="bottom" color={blueBackground} />
        </div>
      </Layout>

      {/* Footer - Keep the blue background */}
      <section style={{ backgroundColor: blueBackground }} className="relative z-10">
        <FooterWithCurve />
      </section>
    </div>
  );
};

export default BlogPage;