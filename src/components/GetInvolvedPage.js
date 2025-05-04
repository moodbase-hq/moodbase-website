// src/pages/GetInvolvedPage.jsx
import React, { useState } from "react";
import Layout from "../components/shared/Layout";
import Button from "../components/shared/Button";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import BackgroundBlob from "../components/shared/BackgroundBlob"; // Import BackgroundBlob
import getInvolvedData from "../content/getinvolved.json";
import CurvedFooter from "./shared/FooterWithCurve"; // Import the CurvedFooter
import "./GetInvolvedPage.css";


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

  return (
    <div className="relative min-h-screen bg-transparent">

      {/* SVG Decorations - Using absolute positioning with overflow visible */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
 {/* Background blobs for other sections */}
        <BackgroundBlob
 color="#C8A0A0"
 width="650px"
 height="650px"
 className="top-[10%] right-[-300px]"
 opacity={0.2}
 blur="70px"
        />

        <BackgroundBlob
 color="#C8A0A0"
 width="400px"
 height="400px"
 className="bottom-[5%] left-[-200px]"
 opacity={0.15}
 blur="50px"
 delay={0.3}
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
        <CurvedFooter /> {/* Add the CurvedFooter component here */}
        
    </div>
    
            );
};

export default GetInvolvedPage;