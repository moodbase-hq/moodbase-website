import React from 'react'
import styles from './Contact.module.css'

const Contact = ({ 
  title = "Unser Team",
  team = [],
  valuesTitle = "Unsere Werte", 
  values = [],
  ctaTitle = "Werde Teil unserer Mission",
  ctaSubtitle = "Unterstütze uns dabei, psychische Gesundheit zugänglicher zu machen und Menschen mit den richtigen Ressourcen zu verbinden.",
  primaryCtaText = "Jetzt unterstützen",
  secondaryCtaText = "Kontakt aufnehmen",
  onPrimaryClick,
  onSecondaryClick
}) => (
  <section className={styles.section}>
    <div className={styles.container}>
      
      {/* Team Section */}
      {team.length > 0 && (
        <div className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                {member.image && (
                  <div className={styles.memberImage}>
                    <img src={member.image} alt={member.name} />
                  </div>
                )}
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberDescription}>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Values Section */}
      {values.length > 0 && (
        <div className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>{valuesTitle}</h2>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                {value.icon && (
                  <div className={styles.valueIcon}>
                    {value.icon}
                  </div>
                )}
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>{ctaTitle}</h2>
          <p className={styles.ctaSubtitle}>{ctaSubtitle}</p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryCta} onClick={onPrimaryClick}>
              {primaryCtaText}
            </button>
            <button className={styles.secondaryCta} onClick={onSecondaryClick}>
              {secondaryCtaText}
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
)

export default Contact