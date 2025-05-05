// src/pages/KooperationenPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/shared/Layout";
import FooterWithCurve from "../components/shared/FooterWithCurve";
import Button from "../components/shared/Button";
import { Users, Share2, Heart, Code, MessageSquare, Database } from 'lucide-react';
import styles from "./KooperationenPage.module.css";

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

const CooperationCard = ({ title, description, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      className={`${styles.card} p-6`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center mb-4">
        <div className="rounded-full bg-[#2F5EA8]/10 p-3 mr-4">
          <Icon size={28} className="text-[#2F5EA8]" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const KooperationenPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a server here
    console.log(formData);
    setIsSubmitted(true);
  };

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
        {/* Hero Section */}
        <section className="relative pt-20 bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Gemeinsam mehr erreichen
              </motion.h1>
              <motion.p
                className="text-lg text-gray-700 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Wir glauben an die Kraft der Zusammenarbeit und sind stets offen für Kooperationen, die unsere Vision einer zugänglichen psychosozialen Versorgung für alle unterstützen.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.h2
              className="text-3xl font-bold text-center mb-12 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              So können wir zusammenarbeiten
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <CooperationCard
                title="Partnerprojekte"
                description="Wir kooperieren gerne mit anderen Projekten und Initiativen, die ähnliche Ziele verfolgen. Gemeinsam können wir Ressourcen bündeln und mehr Menschen erreichen."
                icon={Users}
                delay={0.2}
              />

              <CooperationCard
                title="Datenbereitstellung"
                description="Hilfsorganisationen können ihre Angebote auf unserer Plattform veröffentlichen und so mehr Menschen erreichen. Wir unterstützen bei der Integration Ihrer Daten."
                icon={Database}
                delay={0.3}
              />

              <CooperationCard
                title="Software-Entwicklung"
                description="Benötigen Sie Unterstützung bei der Entwicklung digitaler Tools im sozialen Bereich? Wir bieten unsere Expertise in der Entwicklung von KI-Lösungen und Software an."
                icon={Code}
                delay={0.4}
              />

              <CooperationCard
                title="Social Media Kampagnen"
                description="Gemeinsam können wir Kampagnen entwickeln, die Aufmerksamkeit auf wichtige Themen der psychischen Gesundheit lenken und mehr Menschen erreichen."
                icon={Share2}
                delay={0.5}
              />

              <CooperationCard
                title="Gemeinsame Projekte"
                description="Wir entwickeln gerne zusammen mit Ihnen neue Projekte, die Partizipation und Zugänglichkeit fördern. Ihre Ideen sind willkommen!"
                icon={MessageSquare}
                delay={0.6}
              />

              <CooperationCard
                title="Community Support"
                description="Wir praktizieren programmatische Freundlichkeit und Community-Support. Lassen Sie uns gemeinsam eine unterstützende Gemeinschaft aufbauen."
                icon={Heart}
                delay={0.7}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-2xl mx-auto">
              <motion.h2
                className="text-3xl font-bold text-center mb-8 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
              >
                Nehmen Sie Kontakt auf
              </motion.h2>

              <motion.p
                className="text-lg text-gray-700 text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Haben Sie Interesse an einer Kooperation oder benötigen Sie Unterstützung? Kontaktieren Sie uns und wir finden gemeinsam Wege zur Zusammenarbeit.
              </motion.p>

              <motion.div
                className={`${styles.formContainer} p-8 mb-12`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {isSubmitted ? (
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h3 className="text-xl font-bold text-green-800 mb-2">Vielen Dank für Ihre Nachricht!</h3>
                    <p className="text-green-700">Wir werden uns in Kürze bei Ihnen melden, um die Möglichkeiten einer Zusammenarbeit zu besprechen.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={styles.formInput}
                        placeholder="Ihr Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-Mail</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.formInput}
                        placeholder="ihre.email@beispiel.de"
                      />
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-gray-700 font-medium mb-2">Organisation (optional)</label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className={styles.formInput}
                        placeholder="Ihre Organisation oder Projekt"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Ihre Nachricht</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className={styles.formTextarea}
                        placeholder="Beschreiben Sie, wie wir zusammenarbeiten könnten..."
                      ></textarea>
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="large"
                      >
                        Nachricht senden
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 pb-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Unsere Vision teilen</h2>
                <p className="text-xl mb-8 text-gray-700">
                  Wir sind davon überzeugt, dass psychosoziale Versorgung für alle zugänglich sein sollte - unabhängig vom sozioökonomischen Status. Durch Kooperationen können wir gemeinsam mehr Menschen erreichen und unterstützen.
                </p>
                <Button
                  to="/about"
                  variant="primary"
                  className="px-8 py-3"
                >
                  Mehr über uns erfahren
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>

      {/* Transition to footer */}
      <div className="relative z-10">
        <WaveDivider position="bottom" color={primaryColor} />
      </div>

      {/* Footer - Keep the blue background */}
      <section style={{ backgroundColor: primaryColor }} className="relative z-10">
        <FooterWithCurve />
      </section>
    </div>
  );
};

export default KooperationenPage;