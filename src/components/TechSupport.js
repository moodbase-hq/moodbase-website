// src/pages/SupportPage.jsx
import React, { useState } from 'react';
import Layout from '../components/shared/Layout';
import { motion } from 'framer-motion';
import FooterWithCurve from '../components/shared/FooterWithCurve';
import { MessageSquare, HelpCircle, Mail } from 'lucide-react';
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

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
                Support
              </motion.h1>
              <motion.p
                className="text-lg text-gray-700 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Etwas funktioniert nicht wie erwartet?" Text "Es gibt ein technisches Problem oder eine Frage zur Nutzung von moodbase? Wir sind für da & helfen gerne weiter.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-6">
                  <div className="rounded-full bg-[#2F5EA8]/10 p-3 mr-4">
                    <MessageSquare size={32} className="text-[#2F5EA8]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Kontaktformular</h2>
                </div>

                {isSubmitted ? (
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h3 className="text-xl font-bold text-green-800 mb-2">Vielen Dank für Ihre Nachricht!</h3>
                    <p className="text-green-700">Wir werden uns so schnell wie möglich bei Ihnen melden.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Betreff</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Nachricht</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="bg-[#2F5EA8] hover:bg-[#254a85] text-white py-3 px-8 rounded-full transition-colors"
                      >
                        Nachricht senden
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Additional Contact Info */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center mb-6">
                  <div className="rounded-full bg-[#A13E4B]/10 p-3 mr-4">
                    <HelpCircle size={32} className="text-[#A13E4B]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Weitere Kontaktmöglichkeiten</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="text-[#2F5EA8] mr-3 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium">E-Mail</h3>
                      <p className="text-gray-600">support@moodbase.de</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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

export default SupportPage;