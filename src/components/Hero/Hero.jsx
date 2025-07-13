import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const Hero = ({ 
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta, 
  heroImage, 
  primaryCtaLink = "/database",
  secondaryCtaLink = "/blog",
  hasSecondaryButton = true,
  onPrimaryClick, 
  onSecondaryClick 
}) => (
  <section className={styles.hero}>
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.buttons}>
        <Link to={primaryCtaLink} className={styles.primaryBtn} onClick={onPrimaryClick}>
          {primaryCta}
        </Link>
        {hasSecondaryButton && secondaryCta && (
          <Link to={secondaryCtaLink} className={styles.secondaryBtn} onClick={onSecondaryClick}>
            {secondaryCta}
          </Link>
        )}
      </div>
      {heroImage && (
        <div className={styles.heroImage}>
          <img src={heroImage} alt="Menschen im Gespräch" />
        </div>
      )}
    </div>
  </section>
)

export default Hero