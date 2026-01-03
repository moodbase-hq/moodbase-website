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
      <Footer />
    </div>
  )
}

export default HelpOrganizationsPage