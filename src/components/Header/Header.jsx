import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MobileNavigation from '../MobileNavigation/MobileNavigation'
import styles from './Header.module.css'

const Header = ({ navigation, logo, ctaText, onCtaClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>{logo}</Link>
        
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
        <Link to="/database" className={styles.cta}>
          {ctaText}
        </Link>

        {/* Mobile Navigation */}
        <MobileNavigation
          navigation={navigation}
          ctaText={ctaText}
          ctaLink="/database"
          isOpen={isMobileMenuOpen}
          onToggle={setIsMobileMenuOpen}
        />
      </nav>
    </header>
  );
}

export default Header