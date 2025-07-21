import { useState, useEffect } from 'react';
import styles from './MobileNavigation.module.css';

const MobileNavigation = ({ navigation, ctaText, ctaLink, isOpen, onToggle }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onToggle(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={() => onToggle(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => onToggle(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <nav className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerContent}>
          <ul className={styles.navList}>
            {navigation.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <a 
                  href={item.href} 
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
          
          {ctaText && ctaLink && (
            <a 
              href={ctaLink} 
              className={styles.cta}
              onClick={handleLinkClick}
            >
              {ctaText}
            </a>
          )}
        </div>
      </nav>
    </>
  );
};

export default MobileNavigation;