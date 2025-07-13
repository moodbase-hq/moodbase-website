import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = ({ navigation, logo, ctaText, onCtaClick }) => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>{logo}</Link>
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
      <Link to="/database" className={styles.cta}>
        {ctaText}
      </Link>
    </nav>
  </header>
)

export default Header