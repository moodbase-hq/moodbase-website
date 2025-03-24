// src/components/Website.jsx
import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import Header from './shared/Header';
import Hero from './shared/Hero';
import About from './shared/About';
import CTA from './shared/CTA';
import Footer from './shared/Footer';
import heroData from '../content/hero.json';
import aboutData from '../content/about.json';
import ctaData from '../content/cta.json';
import footerData from '../content/footer.json';
import { theme } from '../styles/theme';

const Website = () => {
  return (
    <ThemeProvider>
      <div
        className="min-h-screen flex flex-col overflow-hidden bg-main-gradient"
      >
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <Hero heroData={heroData} />

        {/* About Section */}
        <About aboutData={aboutData} />

        {/* CTA Section */}
        <CTA ctaData={ctaData} />

        {/* Footer */}
        <Footer footerData={footerData} />
      </div>
    </ThemeProvider>
  );
};

export default Website;