// src/pages/AboutPage.jsx
import React from 'react';
import Layout from '../components/shared/Layout';
import Button from '../components/shared/Button';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import FooterWithCurve from '../components/shared/FooterWithCurve';
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

const AboutPage = () => {
  const themeContext = useTheme();

  // Color definitions from theme
  const blueBackground = '#2F5EA8'; // Blue for footer section
  const darkBlue = '#2F5EA8';      // Dark blue for CircleGroup SVGs
  const burgundy = '#A13E4B';      // Burgundy for CloudBlob SVGs

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* SVG Decorations - Using absolute positioning with overflow visible */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {/* BIGGER SVGs with different positioning and animations than the home page */}

        {/* Top left blob */}
        <AnimatedSvg
          src={Blob1}
          alt="Background Blob 1"
          width="2000px"
          height="2000px"
          className="left-[-700px] top-[-400px]"
          style={{ opacity: 0.6 }}
          delay={0.2}
          animationType="float"
        />

        {/* Top right circle group */}
        <AnimatedSvg
          src={CircleGroup}
          alt="Circle Group 1"
          width="1600px"
          height="1600px"
          className="right-[-500px] top-[-200px]"
          style={{
            opacity: 0.8,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={0.5}
          animationType="rotate"
        />

        {/* Middle right cloud blob */}
        <AnimatedSvg
          src={CloudBlob}
          alt="Cloud Blob 1"
          width="1800px"
          height="1800px"
          className="right-[-600px] top-[700px]"
          style={{
            opacity: 0.7,
            filter: `brightness(0) saturate(100%) invert(28%) sepia(9%) saturate(4661%) hue-rotate(314deg) brightness(93%) contrast(89%)`
          }}
          delay={0.3}
          animationType="pulse"
        />

        {/* Middle left outlined blob */}
        <AnimatedSvg
          src={OutlinedBlob}
          alt="Outlined Blob 1"
          width="1700px"
          height="1700px"
          className="left-[-500px] top-[800px]"
          style={{ opacity: 0.6 }}
          delay={0.7}
          animationType="float"
        />

        {/* Bottom left circle group */}
        <AnimatedSvg
          src={CircleGroup}
          alt="Circle Group 2"
          width="1400px"
          height="1400px"
          className="left-[50px] bottom-[0px]"
          style={{
            opacity: 0.7,
            filter: `brightness(0) saturate(100%) invert(21%) sepia(92%) saturate(1069%) hue-rotate(199deg) brightness(94%) contrast(90%)`
          }}
          delay={0.1}
          animationType="pulse"
        />

        {/* Bottom right blob */}
        <AnimatedSvg
          src={Blob1}
          alt="Background Blob 2"
          width="2200px"
          height="2200px"
          className="right-[-800px] bottom-[-700px]"
          style={{ opacity: 0.5 }}
          delay={0.4}
          animationType="rotate"
        />
      </div>

      {/* Layout for header only */}
      <Layout>
        {/* Hero Section - Now transparent */}
        <section className="relative pt-20 bg-transparent">
          {/* Hero Content */}
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Über Uns
              </motion.h1>
              <motion.p
                className="text-lg text-gray-700 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                MOODBASE wurde mit dem Ziel gegründet, psychische Gesundheit zugänglicher zu machen
                und Menschen mit den richtigen Ressourcen zu verbinden.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Mission Section - Now transparent */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Unsere Mission</h2>
                <p className="text-gray-700 mb-4">
                  Wir glauben, dass jeder Mensch Zugang zu qualitativ hochwertiger psychischer
                  Gesundheitsversorgung haben sollte. Unsere Plattform verbindet Hilfesuchende
                  mit geeigneten Ressourcen und Fachleuten.
                </p>
                <p className="text-gray-700 mb-6">
                  Durch den Einsatz von Technologie machen wir den Prozess der Suche nach Unterstützung
                  einfacher, schneller und effektiver.
                </p>
                <Button
                  to="/database"
                  variant="primary"
                  className="rounded-full"
                >
                  Zur Datenbank
                </Button>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 rounded-full blur-3xl opacity-30 bg-gradient-to-r from-primary/20 to-tertiary"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200">
                  <div className="bg-gray-100/70 rounded-xl aspect-[4/3]"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section - Now transparent */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center text-[#A13E4B]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Unser Team
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="h-64 bg-gray-200/70"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Max Mustermann</h3>
                  <p className="text-primary font-medium mb-4">Gründer & CEO</p>
                  <p className="text-gray-600">
                    Mit über 10 Jahren Erfahrung im Gesundheitswesen setzt sich Max für
                    verbesserte psychische Gesundheitsdienste ein.
                  </p>
                </div>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="h-64 bg-gray-200/70"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Anna Schmidt</h3>
                  <p className="text-primary font-medium mb-4">Leiterin der Entwicklung</p>
                  <p className="text-gray-600">
                    Anna ist verantwortlich für unsere technische Infrastruktur und
                    für die Benutzerfreundlichkeit der Plattform.
                  </p>
                </div>
              </motion.div>

              {/* Team Member 3 */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="h-64 bg-gray-200/70"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Thomas Weber</h3>
                  <p className="text-primary font-medium mb-4">Leiter der Forschung</p>
                  <p className="text-gray-600">
                    Dr. Weber bringt umfassende Erfahrung in der Forschung zu psychischer
                    Gesundheit und Therapieansätzen mit.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section - Now transparent */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Unsere Werte
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <motion.div
                className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 text-primary">
                    {/* Icon placeholder */}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Zugänglichkeit</h3>
                <p className="text-gray-600">
                  Wir arbeiten kontinuierlich daran, psychische Gesundheitsversorgung
                  für alle zugänglich zu machen.
                </p>
              </motion.div>

              {/* Value 2 */}
              <motion.div
                className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 text-primary">
                    {/* Icon placeholder */}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Vertrauen</h3>
                <p className="text-gray-600">
                  Wir legen größten Wert auf Vertrauen und Datenschutz bei der
                  Vermittlung von Unterstützung.
                </p>
              </motion.div>

              {/* Value 3 */}
              <motion.div
                className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 text-primary">
                    {/* Icon placeholder */}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Innovation</h3>
                <p className="text-gray-600">
                  Wir nutzen neueste Technologien, um die beste Unterstützung
                  für psychische Gesundheit zu bieten.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section - Now transparent */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Werden Sie Teil unserer Mission</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-800">
                Unterstützen Sie uns dabei, psychische Gesundheit zugänglicher zu machen
                und Menschen mit den richtigen Ressourcen zu verbinden.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  to="/support"
                  variant="primary"
                  className="rounded-full"
                >
                  Jetzt unterstützen
                </Button>
                <Button
                  to="/contact"
                  className="bg-white/30 backdrop-blur-sm text-gray-800 hover:bg-white/40 transition-colors rounded-full"
                >
                  Kontakt aufnehmen
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Transition to footer */}
        <div className="relative z-10 mt-16">
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

export default AboutPage;