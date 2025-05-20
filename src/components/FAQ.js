// src/pages/FAQPage.jsx
import React, { useState } from 'react';
import Layout from '../components/shared/Layout';
import { motion } from 'framer-motion';
import FooterWithCurve from '../components/shared/FooterWithCurve';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
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
// src/pages/FAQPage.jsx (continued)
            fill={color}
            d="M0,320L48,304C96,288,192,256,288,245.3C384,235,480,245,576,229.3C672,213,768,171,864,165.3C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
    );
  }
};

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        {isOpen ? (
          <ChevronUp className="text-[#2F5EA8]" size={20} />
        ) : (
          <ChevronDown className="text-[#2F5EA8]" size={20} />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 pr-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Was ist moodbase?",
      answer: "moodbase ist eine Plattform, die junge Menschen mit psychosozialen Unterstützungsangeboten in Deutschland verbindet. Wir möchten den Zugang zu Hilfsangeboten vereinfachen, unabhängig vom der Herkunft. dafür nutzen wir viel technik und viel Herz."
    },
    {
      question: "Wie kann ich Hilfsangebote finden?",
      answer: "Auf der Datenbank-Seite kannst du nach verschiedenen Kriterien suchen, wie z.B. Ort, Art der Unterstützung oder spezifische Themen. Die Ergebnisse werden übersichtlich angezeigt und bieten alle wichtigen Informationen zu den jeweiligen Angeboten. Du kannst auch mit dem KI-Assistenten sprechen und er berät sich dann, er hat auch Zugang zur Datenbank."
    },
    {
      question: "Sind die Angebote kostenlos?",
      answer: "moodbase selbst ist komplett kostenfrei. Die Kosten für die aufgelisteten Angebote variieren je nach Anbieter. Bei jedem Angebot findest du Informationen zu eventuellen Kosten oder Versicherungsleistungen."
    },
    {
      question: "Wie werden die Angebote ausgewählt?",
      answer: "Wir achten bei der Auswahl der Angebote auf Qualität, Seriosität und Zugänglichkeit. Alle Anbieter werden vor der Aufnahme in unsere Datenbank sorgfältig geprüft."
    },
    {
      question: "Kann ich moodbase auch als Organisation nutzen?",
      answer: "Ja, als Hilfsorganisation können Sie Ihre Angebote in unsere Datenbank eintragen lassen. Besuchen Sie dazu unsere Seite 'Für Hilfeorganisationen' und füllen Sie das Kontaktformular aus."
    },
    {
      question: "Wie kann ich moodbase unterstützen?",
      answer: "Es gibt verschiedene Möglichkeiten, uns zu unterstützen: durch Spenden, die Teilnahme an unserer Crowdfunding-Kampagne, eine regelmäßige Unterstützung über Steady oder durch Feedback und Verbreitung unserer Arbeit."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
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
                Häufig gestellte Fragen
              </motion.h1>
              <motion.p
                className="text-lg text-gray-700 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Du hast eine Frage? Vielleicht findest du hier schon die passende Antwort. Wenn nicht, schreib uns einfach. Wir helfen dir gerne weiter.
              </motion.p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-12 relative z-10">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-8">
                <div className="rounded-full bg-[#2F5EA8]/10 p-3 mr-4">
                  <HelpCircle size={32} className="text-[#2F5EA8]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
              </div>

              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-12 relative z-10">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">Haben Sie weitere Fragen?</h2>
              <p className="text-gray-600 text-center mb-6">
                Wenn Sie Ihre Frage hier nicht finden, können Sie uns gerne direkt kontaktieren.
              </p>
              <div className="text-center">
                <a
                  href="/support"
                  className="bg-[#2F5EA8] hover:bg-[#254a85] text-white py-3 px-8 rounded-full transition-colors inline-block"
                >
                  Kontakt aufnehmen
                </a>
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

export default FAQPage;