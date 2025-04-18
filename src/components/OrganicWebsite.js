// src/components/OrganicWebsite.jsx
import React from 'react';
import styles from './OrganicWebsite.module.css';
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

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Shared Header */}
      <Header />

      {/* SVG Decorations - Using absolute positioning with overflow visible */}
      <div className={styles.backgroundContainer}>
        {/* MUCH BIGGER SVGs with repetition, specific colors, and animations */}

        {/* Blob1 instances - Floating animation */}
        <img src={Blob1} alt="Background Blob 1" className={`${styles['blob1-1']} ${styles.blob} w-full h-full`} />
        <img src={Blob1} alt="Background Blob 2" className={`${styles['blob1-2']} ${styles.blob} w-full h-full`} />
        <img src={Blob1} alt="Background Blob 3" className={`${styles['blob1-3']} ${styles.blob} w-full h-full`} />
        
        {/* CircleGroup instances - DARK BLUE with pulsing animation */}
        <img src={CircleGroup} alt="Circle Group 1" className={`${styles['circleGroup-1']} ${styles.blob} ${styles.darkBlue} w-full h-full`} />
        <img src={CircleGroup} alt="Circle Group 2" className={`${styles['circleGroup-2']} ${styles.blob} ${styles.darkBlue} w-full h-full`} />
        <img src={CircleGroup} alt="Circle Group 3" className={`${styles['circleGroup-3']} ${styles.blob} ${styles.darkBlue} w-full h-full`} />

        {/* OutlinedBlob instances - Rotating animation */}
        <img src={OutlinedBlob} alt="Outlined Blob 1" className={`${styles['outlinedBlob-1']} ${styles.blob} w-full h-full`} />
        <img src={OutlinedBlob} alt="Outlined Blob 2" className={`${styles['outlinedBlob-2']} ${styles.blob} w-full h-full`} />

        {/* CloudBlob instances - BURGUNDY with mixed animations */}
        <img src={CloudBlob} alt="Cloud Blob 1" className={`${styles['cloudBlob-1']} ${styles.blob} ${styles.burgundy} w-full h-full`} />
        <img src={CloudBlob} alt="Cloud Blob 2" className={`${styles['cloudBlob-2']} ${styles.blob} ${styles.burgundy} w-full h-full`} />
        <img src={CloudBlob} alt="Cloud Blob 3" className={`${styles['cloudBlob-3']} ${styles.blob} ${styles.burgundy} w-full h-full`} />
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

      {/* Moodbase Process Section */}
      <section className="relative py-16 bg-transparent">
        <div className="container mx-auto px-4 relative z-10">
          {/* Title with animated icons */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#A13E4B]">
              <span className="inline-flex items-center">
                <span className="mr-2">So funktioniert Moodbase</span>
                {/* Animated Icons */}
                <Search size={32} className="text-[#A13E4B] animate-icon-title" />
                <Database size={32} className="text-[#A13E4B] animate-icon-title" />
                <Users size={32} className="text-[#A13E4B] animate-icon-title" />
              </span>
            </h2>
          </div>
          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="step">
              <Search size={48} className="text-[#A13E4B] mb-4" />
              <h3 className="text-xl font-bold mb-2">1. Bedürfnisse klären</h3>
              <p>Finde heraus, welche Art von Unterstützung du suchst.</p>
            </div>
            {/* Step 2 */}
            <div className="step">
              <Database size={48} className="text-[#A13E4B] mb-4" />
              <h3 className="text-xl font-bold mb-2">2. Passende Angebote finden</h3>
              <p>Entdecke Angebote, die zu deinen Bedürfnissen passen.</p>
            </div>
            {/* Step 3 */}
            <div className="step">
              <Users size={48} className="text-[#A13E4B] mb-4" />
              <h3 className="text-xl font-bold mb-2">3. Vernetzen und Teilen</h3>
              <p>Tritt in Kontakt, teile Erfahrungen und unterstütze andere.</p>
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
      <div className={`relative z-10 `}>
        <WaveDivider position="bottom" color={'#2F5EA8'} />
      </div>

      {/* Footer - Keep the blue background */}
      <section style={{ backgroundColor: '#2F5EA8' }} className="relative z-10">
        <Footer />
      </section>
    </div>
  );
};

export default OrganicWebsite;