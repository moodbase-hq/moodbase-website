import React from 'react'
import styles from './HowItWorks.module.css'

const HowItWorks = ({ title, steps }) => (
  <section className={styles.section}>
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.stepLabel}>SCHRITT {index + 1}</div>
            <div className={styles.stepImage}>
              <img src={step.image} alt={step.title} />
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default HowItWorks