// src/pages/AboutPage.jsx
import React from 'react';
import Layout from '../components/shared/Layout';
import { motion } from 'framer-motion';
import FooterWithCurve from '../components/shared/FooterWithCurve';
import Button from '../components/shared/Button';
import './AboutPage.css';


const AboutPage = () => {
  const blueBackground = '#2F5EA8'; // Blue for footer section

  return (
    <div className="relative min-h-screen bg-transparent">
        <Layout>

        {/* Top left blob */}
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
                  href="/support"
                  variant="primary"
                  className="rounded-full"
                >
                  Jetzt unterstützen
                </Button>
                <Button
                  href="/contact"
                  className="bg-white/30 backdrop-blur-sm text-gray-800 hover:bg-white/40 transition-colors rounded-full"
                >
                  Kontakt aufnehmen
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>

      {/* Footer - Keep the blue background */}
      <section style={{ backgroundColor: blueBackground }} className="relative z-10">
        <FooterWithCurve />
      </section>
    </div>
  );
};

export default AboutPage;