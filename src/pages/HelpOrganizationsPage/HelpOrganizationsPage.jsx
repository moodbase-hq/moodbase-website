import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './HelpOrganizationsPage.module.css'

const HelpOrganizationsPage = () => {
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
          <h1>Hilforganisationen</h1>
          <p>Diese Seite befindet sich noch im Aufbau.</p>
          <p>Wir arbeiten daran, hier bald eine Übersicht wichtiger Hilfsorganisationen und Notfallkontakte bereitzustellen.</p>
          <hr />
          <p>
            Zurück zur <a href="/">Startseite</a> oder durchsuche unsere <a href="/database">Datenbank</a>.
          </p>
        </div>
      </main>
      <Footer {...footerProps} />
    </div>
  )
}

export default HelpOrganizationsPage