// src/pages/legal/ImpressumPage.jsx
import React from 'react';
import Layout from '../components/shared/Layout';
import { motion } from 'framer-motion';
import FooterWithCurve from '../components/shared/FooterWithCurve';
import styles from './GetInvolvedPage.module.css'; // Reuse existing CSS

// Import SVG assets
import Blob1 from '../components/shared/assets/1.svg';
import CircleGroup from '../components/shared/assets/2.svg';
import OutlinedBlob from '../components/shared/assets/3.svg';
import CloudBlob from '../components/shared/assets/4.svg';

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

const ImpressumPage = () => {
  const primaryColor = "#2F5EA8"; // Blue

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* SVG Decorations */}
      <div className={styles.svgBackgroundContainer}>
        {/* Blob1 instances - Floating animation */}
        <img src={Blob1} alt="" className={`${styles.svgBlob} ${styles['blob1-1']}`} />
        <img src={Blob1} alt="" className={`${styles.svgBlob} ${styles['blob1-2']}`} />
        <img src={Blob1} alt="" className={`${styles.svgBlob} ${styles['blob1-3']}`} />

        {/* CircleGroup instances - BLUE with pulsing animation */}
        <img src={CircleGroup} alt="" className={`${styles.svgBlob} ${styles['circleGroup-1']}`} />
        <img src={CircleGroup} alt="" className={`${styles.svgBlob} ${styles['circleGroup-2']}`} />

        {/* OutlinedBlob instances - Rotating animation */}
        <img src={OutlinedBlob} alt="" className={`${styles.svgBlob} ${styles['outlinedBlob-1']}`} />
        <img src={OutlinedBlob} alt="" className={`${styles.svgBlob} ${styles['outlinedBlob-2']}`} />

        {/* CloudBlob instances - mixed animations with different colors */}
        <img src={CloudBlob} alt="" className={`${styles.svgBlob} ${styles['cloudBlob-1']}`} />
        <img src={CloudBlob} alt="" className={`${styles.svgBlob} ${styles['cloudBlob-2']}`} />
        <img src={CloudBlob} alt="" className={`${styles.svgBlob} ${styles['cloudBlob-3']}`} />
        <img src={CloudBlob} alt="" className={`${styles.svgBlob} ${styles['cloudBlob-4']}`} />
      </div>

      <Layout>
        {/* Header Section */}
        <section className="relative pt-20 bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Impressum
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-12 relative z-10">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Angaben gemäß § 5 TMG</h2>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Kontakt</h3>
                <p className="text-gray-700 mb-1">moodbase</p>
                <p className="text-gray-700 mb-1">Musterstraße 123</p>
                <p className="text-gray-700 mb-1">12345 Musterstadt</p>
                <p className="text-gray-700 mb-1">Deutschland</p>
                <p className="text-gray-700 mb-4">E-Mail: info@moodbase.de</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Vertretungsberechtigte</h3>
                <p className="text-gray-700 mb-1">Max Mustermann</p>
                <p className="text-gray-700 mb-1">Anna Schmidt</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Umsatzsteuer-ID</h3>
                <p className="text-gray-700 mb-1">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                <p className="text-gray-700 mb-1">DE123456789</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
                <p className="text-gray-700 mb-1">Max Mustermann</p>
                <p className="text-gray-700 mb-1">Musterstraße 123</p>
                <p className="text-gray-700 mb-1">12345 Musterstadt</p>
                <p className="text-gray-700 mb-1">Deutschland</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Hinweis</h3>
                <p className="text-gray-700">Die hier dargestellten Inhalte dienen als Platzhalter für ein vollständiges Impressum. Bitte fügen Sie die tatsächlichen Daten entsprechend den rechtlichen Anforderungen ein.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>

      {/* Transition to footer */}
      <div className="relative z-10 mt-16">
        <WaveDivider position="bottom" color={primaryColor} />
      </div>

      {/* Footer */}
      <section style={{ backgroundColor: primaryColor }} className="relative z-10">
        <FooterWithCurve />
      </section>
    </div>
  );
};

export default ImpressumPage;