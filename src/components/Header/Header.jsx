import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
//import MobileNavigation from '../MobileNavigation/MobileNavigation'
import styles from './Header.module.css'

const Header = ({ navigation, logo, ctaText, onCtaClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoGroup}>
          {/* Dark Mode Toggle */}
          <button
            className={styles.themeToggle}
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/" className={styles.logo}>{logo}</Link>
        </div>

        {/* Desktop Navigation */}
        <ul className={styles.navList}>
          {navigation.map((item, index) => (
            <li key={index} className={styles.navItem}>
              {item.href.startsWith('/') ? (
                <Link to={item.href} className={styles.navLink}>
                  {item.text}
                </Link>
              ) : (
                <a href={item.href} className={styles.navLink}>
                  {item.text}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Button to="/database" text={ctaText}></Button>

        {/* Mobile Navigation */}
        {/* <MobileNavigation
          navigation={navigation}
          ctaText={ctaText}
          ctaLink="/database"
          isOpen={isMobileMenuOpen}
          onToggle={setIsMobileMenuOpen}
        /> */}
      </nav>
    </header>
  );
}

export default Header