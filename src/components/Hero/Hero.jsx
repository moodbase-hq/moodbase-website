import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
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
        <Button to={primaryCtaLink} text={primaryCta}></Button>
        {hasSecondaryButton && secondaryCta && (
          <Button to={secondaryCtaLink} text={secondaryCta} type='secondary'></Button>
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