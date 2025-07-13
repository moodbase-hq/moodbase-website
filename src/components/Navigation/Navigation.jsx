import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navigation.module.css'

const Navigation = () => {
  const location = useLocation()
  
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className={styles.nav}>
      <Link 
        to="/" 
        className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
      >
        Homepage
      </Link>
      <Link 
        to="/database" 
        className={`${styles.navLink} ${isActive('/database') ? styles.active : ''}`}
      >
        Database Page
      </Link>
      <Link 
        to="/about" 
        className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
      >
        About Page
      </Link>
    </nav>
  )
}

export default Navigation