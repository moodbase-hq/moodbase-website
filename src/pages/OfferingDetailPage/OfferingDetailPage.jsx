import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import OfferingDetail from '../../components/OfferingDetail/OfferingDetail'
import apiService from '../../services/apiService'
import styles from './OfferingDetailPage.module.css'

const OfferingDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [offering, setOffering] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadOffering = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await apiService.fetchOfferingById(id)
        setOffering(data)
      } catch (err) {
        console.error('Error loading offering:', err)
        setError('Angebot konnte nicht geladen werden.')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      loadOffering()
    }
  }, [id])

  const handleBack = () => {
    // Go back in history, or to database if no history
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/database')
    }
  }

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
          { text: "Tech Support", href: "#tech-support" },
          { text: "Hilforganisationen", href: "#help-organizations" },
          { text: "FAQ", href: "#faq" }
        ]
      },
      {
        title: "RECHTLICHES & KONTAKT",
        items: [
          { text: "Impressum", href: "#impressum" },
          { text: "Datenschutz", href: "#privacy" },
          { text: "Nutzungsbedingungen", href: "#terms" },
          { text: "info@moodbase.de", href: "mailto:info@moodbase.de" }
        ]
      },
      {
        title: "SOCIAL MEDIA",
        items: [
          { text: "Instagram", href: "#instagram" },
          { text: "TikTok", href: "#tiktok" },
          { text: "LinkedIn", href: "#linkedin" }
        ]
      }
    ]
  }

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header {...headerProps} />
        <div className={styles.loading}>
          <p>Laden...</p>
        </div>
        <Footer {...footerProps} />
      </div>
    )
  }

  if (error || !offering) {
    return (
      <div className={styles.page}>
        <Header {...headerProps} />
        <div className={styles.error}>
          <p>{error || 'Angebot nicht gefunden.'}</p>
          <button onClick={handleBack} className={styles.backButton}>
            Zurück zur Suche
          </button>
        </div>
        <Footer {...footerProps} />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Header {...headerProps} />
      <OfferingDetail offering={offering} onBack={handleBack} />
      <Footer {...footerProps} />
    </div>
  )
}

export default OfferingDetailPage
