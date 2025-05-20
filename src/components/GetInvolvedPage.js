// src/pages/GetInvolvedPage.jsx
import React, { useState } from "react";
import Layout from "../components/shared/Layout";
import Button from "../components/shared/Button";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import getInvolvedData from "../content/getinvolved.json";
import FooterWithCurve from "../components/shared/FooterWithCurve";
import styles from "./GetInvolvedPage.module.css";
import { CreditCard, Rocket, Calendar, Heart } from 'lucide-react';

// Import SVG assets directly
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

const FundingOption = ({ title, description, icon: Icon, buttonText, buttonLink, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center mb-4">
        <div className="rounded-full bg-[#A13E4B]/10 p-3 mr-4">
          <Icon size={32} className="text-[#A13E4B]" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <Button
        href={buttonLink}
        variant="primary"
        className="w-full justify-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonText}
      </Button>
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

        {/* Funding Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <FundingOption
            title="Crowdfunding Kampagne"
            description="Unterstütze unsere Anfangsinvestition, um die nötige Infrastruktur aufzubauen. Dein Beitrag hilft uns, moodbase von Grund auf zu entwickeln und allen zugänglich zu machen."
            icon={Rocket}
            buttonText="Zum Crowdfunding"
            buttonLink="https://www.startnext.com/moodbase"
            delay={0.1}
          />

          <FundingOption
            title="Steady Unterstützung"
            description="Werde Teil unserer Community mit einer regelmäßigen Unterstützung. Du erhältst exklusive Einblicke in unseren Entwicklungsprozess, Vlogs und Artikel der Macher hinter moodbase."
            icon={Calendar}
            buttonText="Auf Steady unterstützen"
            buttonLink="https://steadyhq.com/moodbase"
            delay={0.3}
          />
        </div>

        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-[#2F5EA8]/10 p-3 mr-4">
              <CreditCard size={32} className="text-[#2F5EA8]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Direkte Spende per Überweisung</h3>
          </div>
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

const SupportExplainer = () => {
  return (
    <section className="relative bg-transparent py-12">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="rounded-full bg-[#4BAA7A]/10 p-3 mr-4">
              <Heart size={32} className="text-[#4BAA7A]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Warum deine Unterstützung wichtig ist" --> "Gemeinsam für eine zugängliche Zukunft</h3>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">
              moodbase ist ein gemeinnütziges Projekt: und lebt durch Menschen und Teilhabe!
Wenn du unsere Vision teilst, gibt es zwei einfache Wege, sie Wirklichkeit werden zu lassen:
            </p>

            <div className="pl-4 border-l-4 border-[#2F5EA8] bg-blue-50/50 p-4 rounded-r-lg">
              <h4 className="font-bold text-lg text-gray-900 mb-2">Crowdfunding: Die Startfinanzierung</h4>
              <p className="text-gray-700">
unsere Startfinanzierung
Mit unserer Crowdfunding-Kampagne bauen wir die technische Basis von moodbase auf.
Dieser Beitrag hilft uns, die Plattform zu entwickeln, die junge Menschen mit den passenden psychosozialen Angeboten verbindet: niedrigschwellig, datensicher und wirkungsvoll.
Eine einmalige Investition, mit der du viel bewegst.
              </p>
            </div>

            <div className="pl-4 border-l-4 border-[#A13E4B] bg-red-50/50 p-4 rounded-r-lg">
              <h4 className="font-bold text-lg text-gray-900 mb-2">Steady: Langfristige Unterstützung</h4>
              <p className="text-gray-700">
                Über Steady kannst du uns mit regelmäßigen monatlichen Beiträgen unterstützen. Diese Mittel sichern den laufenden Betrieb und ermöglichen es uns, kontinuierlich neue Inhalte zu erstellen und die Plattform zu verbessern.
              </p>
              <p className="text-gray-700 mt-2">
für alle, die langfristig dabei sein wollen
Mit einem monatlichen Beitrag über Steady wird der laufenden Betrieb von moodbase unterstützt.
Dies ermöglicht neue Inhalte, den weiteren Ausbau der Plattform, und damit echten Zugang zu Hilfe für viele junge Menschen.
Als Dankeschön nehmen wir gerne alle Unterstützenden mit auf unsere Reise und geben direkte Einblicke hinter die Kulissen: Vlogs, Artikel und Updates direkt von den Macher*innen von moodbase. Werde Teil an der Idee hinter moodbase.              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GetInvolvedPage = () => {
  const theme = useTheme();

  // Define colors for blobs
  const primaryColor = "#2F5EA8"; // Blue

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* SVG Decorations - Replace the existing AnimatedBackgroundBlob container */}
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

        {/* Support Explainer */}
        <SupportExplainer />

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