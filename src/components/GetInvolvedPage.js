// src/pages/GetInvolvedPage.jsx
import React, { useState } from "react";
import Layout from "../components/shared/Layout";
import Button from "../components/shared/Button";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import getInvolvedData from "../content/getinvolved.json";
import FooterWithCurve from "../components/shared/FooterWithCurve";
import "./GetInvolvedPage.css";

// Import or create the component here
import AnimatedBackgroundBlob from "../components/shared/AnimatedBackgroundBlob";

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

const SupportOption = ({ item, delay = 0 }) => {
  const theme = useTheme();

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
        <p className="text-gray-600 mb-6">{item.description}</p>
        <Button
          href={item.link}
          variant="primary"
        >
          {item.cta}
        </Button>
      </div>
    </motion.div>
  );
};

const DonateSection = ({ data }) => {
  const theme = useTheme();

  return (
    <section id={data.id} className="relative bg-transparent py-16">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          {data.title}
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {data.description}
        </motion.p>

        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-4 text-gray-900">Bankverbindung</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Kontoinhaber:</span> {data.account.name}</p>
            <p><span className="font-medium">IBAN:</span> {data.account.iban}</p>
            <p><span className="font-medium">BIC:</span> {data.account.bic}</p>
            <p><span className="font-medium">Verwendungszweck:</span> {data.account.purpose}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const JoinSection = ({ data }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  return (
    <section id={data.id} className="relative bg-transparent py-16">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          {data.title}
        </motion.h2>

        <motion.div
          className="text-lg text-gray-700 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {data.description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-6 text-gray-900">{data.form.title}</h3>

          {isSubmitted ? (
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-green-800 font-medium">Vielen Dank für dein Interesse! Wir melden uns bei dir, sobald die Mitgliedschaft möglich ist.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
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
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
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

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Nachricht (optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                >
                  {data.form.submitText}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const GetInvolvedPage = () => {
  const theme = useTheme();

  // Define colors for blobs
  const primaryColor = "#2F5EA8"; // Blue
  const secondaryColor = "#A13E4B"; // Red
  const tertiaryColor = "#4BAA7A"; // Green
  const accentColor = "#C8A0A0"; // Mauve/Pink

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Background Blobs */}
      {/* Make sure these are visible by setting higher z-index than -1 */}
      <div className="absolute inset-0 overflow-visible" style={{ zIndex: 0 }}>
        {/* Top right blob */}
        <AnimatedBackgroundBlob
          color={primaryColor}
          width="900px"
          height="900px"
          className="right-[-450px] top-[-250px]"
          opacity={0.15}
          blur="90px"
          animationType="rotate"
          delay={0.2}
        />

        {/* Top left blob */}
        <AnimatedBackgroundBlob
          color={accentColor}
          width="700px"
          height="700px"
          className="left-[-350px] top-[150px]"
          opacity={0.2}
          blur="70px"
          animationType="float"
          delay={0.5}
        />

        {/* Middle right blob */}
        <AnimatedBackgroundBlob
          color={tertiaryColor}
          width="600px"
          height="600px"
          className="right-[-200px] top-[35%]"
          opacity={0.2}
          blur="60px"
          animationType="pulse"
          delay={0.7}
        />

        {/* Middle left blob */}
        <AnimatedBackgroundBlob
          color={secondaryColor}
          width="550px"
          height="550px"
          className="left-[-250px] top-[50%]"
          opacity={0.2}
          blur="70px"
          animationType="rotate"
          delay={0.3}
        />

        {/* Bottom right blob */}
        <AnimatedBackgroundBlob
          color={primaryColor}
          width="800px"
          height="800px"
          className="right-[-350px] bottom-[5%]"
          opacity={0.15}
          blur="80px"
          animationType="float"
          delay={0.4}
        />

        {/* Bottom left blob */}
        <AnimatedBackgroundBlob
          color={accentColor}
          width="650px"
          height="650px"
          className="left-[-300px] bottom-[-100px]"
          opacity={0.2}
          blur="65px"
          animationType="pulse"
          delay={0.6}
        />

        {/* Center blob - very subtle */}
        <AnimatedBackgroundBlob
          color="#FFFFFF"
          width="1000px"
          height="1000px"
          className="left-[20%] top-[40%]"
          opacity={0.1}
          blur="120px"
          animationType="pulse"
          delay={0.8}
        />
      </div>

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
                {getInvolvedData.hero.title}
              </motion.h1>
              <motion.p
                className="text-lg text-gray-700 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {getInvolvedData.hero.description}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Introduction - Now transparent */}
        <section className="relative bg-transparent">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.h2
              className="text-3xl font-bold text-center mb-8 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              {getInvolvedData.intro.title}
            </motion.h2>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200 mb-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {getInvolvedData.intro.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4 last:mb-0">{paragraph}</p>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Ways to Support - Now transparent */}
        <section className="relative bg-transparent">
          <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
            <motion.h2
              className="text-3xl font-bold text-center mb-12 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              {getInvolvedData.ways.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {getInvolvedData.ways.items.map((item, index) => (
                <SupportOption
                  key={item.id}
                  item={item}
                  delay={0.2 + (index * 0.1)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Donate Section */}
        <DonateSection data={getInvolvedData.donate} />

        {/* Join Section */}
        <JoinSection data={getInvolvedData.join} />

        {/* CTA Section - Now transparent */}
        <section className="relative bg-transparent">
          <div className="max-w-4xl mx-auto text-center px-4 py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Gemeinsam mehr erreichen</h2>
              <p className="text-xl mb-8 text-gray-700">
                Jede Unterstützung bringt uns einen Schritt näher zu unserem Ziel, die psychosoziale Versorgung für alle zugänglich zu machen.
              </p>
              <Button
                to="/database"
                variant="primary"
                className="px-8 py-3"
              >
                Zur Datenbank
              </Button>
            </motion.div>
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

export default GetInvolvedPage;