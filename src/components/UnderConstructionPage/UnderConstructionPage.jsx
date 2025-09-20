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
      <Footer />
    </div>
  )
}

export default UnderConstructionPage