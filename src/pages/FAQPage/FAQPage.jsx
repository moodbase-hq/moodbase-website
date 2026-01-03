import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './FAQPage.module.css'

const FAQPage = () => {
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
          <h1>Häufig gestellte Fragen (FAQ)</h1>
          <p>Diese Seite befindet sich noch im Aufbau.</p>
          <p>Wir arbeiten daran, hier bald Antworten auf häufig gestellte Fragen zur Nutzung von Moodbase bereitzustellen.</p>
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

export default FAQPage