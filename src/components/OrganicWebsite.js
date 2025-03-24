// src/components/OrganicWebsite.jsx
import React from 'react';
import Header from './shared/Header';
import Footer from './shared/FooterWithCurve';
import BackgroundBlob from './shared/BackgroundBlob';
import CirclePattern from './shared/CirclePatterns';
import RoundContentSection from './shared/RoundContentSection';
import { Search, Database, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Simple straightforward SVG curves
const WaveDivider = ({ position = 'bottom', color = '#E8D5C4', previousColor = '#D9B1B1', className = '' }) => {
  // Use different curves based on position
  if (position === 'bottom') {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
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
      <div className={`relative w-full overflow-hidden ${className}`}>
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
  const pinkBackground = '#D9B1B1';
  const sandBackground = '#E8D5C4';
  const blueBackground = '#2F5EA8';

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Shared Header */}
      <Header />

      {/* Hero Section - Pink */}
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

        {/* Red circle pattern in top left */}
        <div className="absolute top-20 left-20 z-10 pointer-events-none">
          <CirclePattern
            size="medium"
            color="#A13E4B"
            delay={0.2}
            opacity={0.7}
          />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl">
            <p className="text-lg text-black mb-12 leading-relaxed">
              Moodbase ist eine intelligente Plattform, die junge Menschen mit den besten psychosozialen Unterstützungsangeboten in Deutschland verbindet - unabhängig vom sozioökonomischen Status.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                to="/database"
                className="bg-[#A13E4B] hover:bg-[#8A3540] text-white py-3 px-8 rounded-full transition-colors inline-block"
              >
                Jetzt Suchen
              </Link>
              <Link
                to="/blog"
                className="bg-white/30 backdrop-blur-sm text-black hover:bg-white/40 py-3 px-8 rounded-full transition-colors inline-block"
              >
                Zum Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Blue Circle Pattern on Right */}
        <div className="absolute right-0 bottom-32 z-10 pointer-events-none">
          <CirclePattern
            size="large"
            color="#99BEFA"
            className=""
          />
        </div>

        {/* Wave divider to sand section */}
        <WaveDivider position="bottom" color={sandBackground} previousColor={pinkBackground} />
      </section>

      {/* Main Content - Sand */}
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

        {/* Bigger circle patterns */}
        <div className="absolute top-60 right-[5%] z-10 pointer-events-none">
          <CirclePattern
            size="large"
            color="#99BEFA"
            delay={0.5}
          />
        </div>

        <div className="absolute bottom-80 left-[2%] z-10 pointer-events-none">
          <CirclePattern
            size="large"
            color="#A13E4B"
            delay={0.8}
            opacity={0.7}
          />
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Title section */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl font-bold text-[#333333]"
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

        {/* Wave divider to pink mission section */}
        <WaveDivider position="bottom" color={pinkBackground} previousColor={sandBackground} />
      </section>

      {/* Mission Section - Pink */}
      <section className="relative" style={{ backgroundColor: pinkBackground }}>
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Werde Teil unserer Mission</h2>
            <p className="text-xl mb-8">
              Unterstützen Sie uns dabei, psychische Gesundheit zugänglicher zu machen und
              Menschen mit den richtigen Ressourcen zu verbinden.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/support"
                className="bg-[#A13E4B] hover:bg-[#8A3540] text-white py-3 px-8 rounded-full transition-colors"
              >
                Jetzt unterstützen
              </a>
              <a
                href="/contact"
                className="bg-white/30 backdrop-blur-sm text-[#333333] hover:bg-white/40 py-3 px-8 rounded-full transition-colors"
              >
                Kontakt aufnehmen
              </a>
            </div>
          </motion.div>
        </div>

        {/* Wave divider to sand buffer section */}
        <WaveDivider position="bottom" color={sandBackground} previousColor={pinkBackground} />
      </section>

      {/* Sand buffer section */}
      <section style={{ backgroundColor: sandBackground }} className="relative">
        <div className="py-16"></div>

        {/* Wave divider to footer */}
        <WaveDivider position="bottom" color={blueBackground} previousColor={sandBackground} />
      </section>

      {/* Footer */}
      <section style={{ backgroundColor: blueBackground }}>
        <Footer />
      </section>
    </div>
  );
};

export default OrganicWebsite;