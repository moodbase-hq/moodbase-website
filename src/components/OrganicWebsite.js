// src/components/OrganicWebsite.jsx
import React from 'react';
import Header from './shared/Header';
import Footer from './shared/FooterWithCurve';
import RoundContentSection from './shared/RoundContentSection';
import { Search, Database, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import SVG assets directly
import Blob1 from './shared/assets/1.svg';
import CircleGroup from './shared/assets/2.svg';
import OutlinedBlob from './shared/assets/3.svg';
import CloudBlob from './shared/assets/4.svg';

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

const OrganicWebsite = () => {
  // Color definitions
  const blueBackground = '#2F5EA8'; // Blue for footer section
  const darkBlue = '#2F5EA8';      // Dark blue for CircleGroup SVGs
  const burgundy = '#A13E4B';      // Burgundy for CloudBlob SVGs

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Shared Header */}
      <Header />

      {/* SVG Decorations - Using absolute positioning with overflow visible */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {/* MUCH BIGGER SVGs with repetition, specific colors, and animations */}

        {/* Blob1 instances - Floating animation */}
        <AnimatedSvg
          src={Blob1}
          alt="Background Blob 1"
          width="2400px"
          height="2400px"
          className="left-[-500px] top-[-300px]"
          style={{ opacity: 0.7 }}
          delay={0}
          animationType="float"
        />

        <AnimatedSvg
          src={Blob1}
          alt="Background Blob 2"
          width="2000px"
          height="2000px"
          className="right-[-400px] top-[800px]"
          style={{ opacity: 0.6 }}
          delay={1.2}
          animationType="float"
        />

        <AnimatedSvg
          src={Blob1}
          alt="Background Blob 3"
          width="2800px"
          height="2800px"
          className="left-[-600px] bottom-[-400px]"
          style={{ opacity: 0.5 }}
          delay={0.7}
          animationType="pulse"
        />

        {/* CircleGroup instances - DARK BLUE with pulsing animation */}
        <AnimatedSvg
          src={CircleGroup}
          alt="Circle Group 1"
          width="1900px"
          height="1900px"
          className="right-[-300px] top-[50px]"
          style={{
            opacity: 0.9,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={0.3}
          animationType="pulse"
        />

        <AnimatedSvg
          src={CircleGroup}
          alt="Circle Group 2"
          width="1800px"
          height="1800px"
          className="left-[100px] top-[500px]"
          style={{
            opacity: 0.8,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={1.5}
          animationType="rotate"
        />

        <AnimatedSvg
          src={CircleGroup}
          alt="Circle Group 3"
          width="1000px"
          height="1000px"
          className="right-[200px] bottom-[100px]"
          style={{
            opacity: 0.7,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={0.9}
          animationType="pulse"
        />

        {/* OutlinedBlob instances - Rotating animation */}
        <AnimatedSvg
          src={OutlinedBlob}
          alt="Outlined Blob 1"
          width="3000px"
          height="3000px"
          className="left-[200px] top-[200px]"
          style={{ opacity: 0.7 }}
          delay={0.4}
          animationType="rotate"
        />

        <AnimatedSvg
          src={OutlinedBlob}
          alt="Outlined Blob 2"
          width="2200px"
          height="2200px"
          className="right-[-500px] top-[1200px]"
          style={{ opacity: 0.6 }}
          delay={1.1}
          animationType="float"
        />

        {/* CloudBlob instances - BURGUNDY with mixed animations */}
        <AnimatedSvg
          src={CloudBlob}
          alt="Cloud Blob 1"
          width="3000px"
          height="3000px"
          className="right-[-300px] top-[400px]"
          style={{
            opacity: 0.8,
            filter: `brightness(0) saturate(100%) invert(28%) sepia(9%) saturate(4661%) hue-rotate(314deg) brightness(93%) contrast(89%)`
          }}
          delay={0.6}
          animationType="pulse"
        />

        <AnimatedSvg
          src={CloudBlob}
          alt="Cloud Blob 2"
          width="2000px"
          height="2000px"
          className="left-[-300px] top-[1100px]"
          style={{
            opacity: 0.7,
            filter: `brightness(0) saturate(100%) invert(28%) sepia(9%) saturate(4661%) hue-rotate(314deg) brightness(93%) contrast(89%)`
          }}
          delay={1.0}
          animationType="float"
        />

        <AnimatedSvg
          src={CloudBlob}
          alt="Cloud Blob 3"
          width="2500px"
          height="2500px"
          className="right-[100px] bottom-[-400px]"
          style={{
            opacity: 0.6,
            filter: `brightness(0) saturate(100%) invert(28%) sepia(9%) saturate(4661%) hue-rotate(314deg) brightness(93%) contrast(89%)`
          }}
          delay={0.2}
          animationType="rotate"
        />
      </div>

      {/* Hero Section - Now transparent */}
      <section className="relative pt-20 bg-transparent">
        {/* Hero Content */}
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#A13E4B] mb-6">
              Ich brauche hilfe, aber wo soll ich sie finden?
            </h1>
            <p className="text-lg text-black mb-12 leading-relaxed">
              Moodbase ist eine intelligente Plattform, die junge Menschen mit den besten psychosozialen Unterstützungsangeboten in Deutschland verbindet - unabhängig vom sozioökonomischen Status.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                to="/database"
                className="bg-[#A13E4B] hover:bg-[#8A3540] text-white py-3 px-8 rounded-full transition-colors inline-block relative z-20"
              >
                Jetzt Suchen
              </Link>
              <Link
                to="/blog"
                className="bg-white/30 backdrop-blur-sm text-black hover:bg-white/40 py-3 px-8 rounded-full transition-colors inline-block relative z-20"
              >
                Zum Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Now transparent */}
      <section className="relative py-16 bg-transparent">
        <div className="container mx-auto px-4 relative z-10">
          {/* Title section */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl font-bold text-[#A13E4B]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Junge Menschen stärken
            </motion.h2>
          </div>

          {/* Round sections */}
          <div className="mb-16">
            <RoundContentSection
              title="Wir verstehen deine Bedürfnisse"
              description="Es kann schwierig sein, die richtige Unterstützung für psychische Gesundheit zu finden. Wir wissen, wie frustrierend und entmutigend dieser Prozess sein kann."
              icon={<Search size={42} className="text-[#A13E4B] opacity-80" />}
            />

            <RoundContentSection
              title="Umfangreiche Datenbank"
              description="Unsere kuratierte Datenbank enthält eine Vielzahl von Ressourcen, Therapeuten, Selbsthilfegruppen und Beratungsstellen für verschiedene Bedürfnisse."
              icon={<Database size={42} className="text-[#A13E4B] opacity-80" />}
              delay={0.4}
            />

            <RoundContentSection
              title="Persönliche Betreuung"
              description="Wir begleiten dich auf deinem Weg zu besserer psychischer Gesundheit mit praktischen Tipps, Ressourcen und einem verständnisvollen Ansatz."
              icon={<Users size={42} className="text-[#A13E4B] opacity-80" />}
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Mission Section - Now transparent */}
      <section className="relative py-16 bg-transparent">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-[#A13E4B]">Werde Teil unserer Mission</h2>
            <p className="text-xl mb-8 text-[#333333]">
              Unterstützen Sie uns dabei, psychische Gesundheit zugänglicher zu machen und
              Menschen mit den richtigen Ressourcen zu verbinden.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/support"
                className="bg-[#A13E4B] hover:bg-[#8A3540] text-white py-3 px-8 rounded-full transition-colors relative z-20"
              >
                Jetzt unterstützen
              </a>
              <a
                href="/contact"
                className="bg-white/30 backdrop-blur-sm text-[#333333] hover:bg-white/40 py-3 px-8 rounded-full transition-colors relative z-20"
              >
                Kontakt aufnehmen
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transition to footer */}
      <div className="relative z-10">
        <WaveDivider position="bottom" color={blueBackground} />
      </div>

      {/* Footer - Keep the blue background */}
      <section style={{ backgroundColor: blueBackground }} className="relative z-10">
        <Footer />
      </section>
    </div>
  );
};

export default OrganicWebsite;