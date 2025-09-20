import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './UnderConstructionPage.module.css'

const UnderConstructionPage = ({ pageName = "Diese Seite" }) => {
  // Header navigation data
  const headerProps = {
    logo: "moodbase",
    navigation: [
      { text: "Über uns", href: "/about" },
      { text: "Datenbank", href: "/database" },
      { text: "Blog", href: "/blog" },
      { text: "Unterstützen", href: "/support" }
    ],
    ctaText: "Hilfe finden"
  }

  // Footer data
  const footerProps = {
    logo: "moodbase",
    plantDecoration: "/images/decorations/plant-decoration.png",
    columns: [
      {
        title: "MOODBASE",
        items: [
          { text: "Über uns", href: "/about" },
          { text: "Datenbank", href: "/database" },
          { text: "Blog", href: "/blog" },
          { text: "Unterstützen", href: "/support" }
        ]
      },
      {
        title: "RESSOURCEN",
        items: [
          { text: "Tech Support", href: "/tech-support" },
          { text: "Hilforganisationen", href: "/help-organizations" },
          { text: "FAQ", href: "/faq" }
        ]
      },
      {
        title: "RECHTLICHES & KONTAKT",
        items: [
          { text: "Impressum", href: "/impressum" },
          { text: "Datenschutz", href: "/privacy" },
          { text: "Nutzungsbedingungen", href: "/terms" },
          { text: "info@moodbase.de", href: "mailto:info@moodbase.de" }
        ]
      },
      {
        title: "SOCIAL MEDIA",
        items: [
          { text: "Instagram", href: "/instagram" },
          { text: "TikTok", href: "/tiktok" },
          { text: "LinkedIn", href: "/linkedin" }
        ]
      }
    ]
  }

  return (
    <div className={styles.page}>
      <Header {...headerProps} />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.icon}>
              🚧
            </div>
            <h1 className={styles.title}>
              {pageName} befindet sich im Aufbau
            </h1>
            <p className={styles.description}>
              Wir arbeiten hart daran, diese Seite für Sie zu erstellen. 
              Schauen Sie bald wieder vorbei oder besuchen Sie eine unserer anderen Seiten.
            </p>
            <div className={styles.actions}>
              <Link to="/" className={styles.primaryButton}>
                Zur Startseite
              </Link>
              <Link to="/database" className={styles.secondaryButton}>
                Datenbank durchsuchen
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer {...footerProps} />
    </div>
  )
}

export default UnderConstructionPage