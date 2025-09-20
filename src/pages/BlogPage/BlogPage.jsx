import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import SearchHero from '../../components/SearchHero/SearchHero'
import Filters from '../../components/Filters/Filters'
import BlogResults from '../../components/BlogResults/BlogResults'
import Footer from '../../components/Footer/Footer'
import styles from './BlogPage.module.css'

const BlogPage = ({ 
  filters, 
  blogPosts,
  resultCount,
  currentPage,
  totalPages,
  itemsPerPage,
  onSearch, 
  onFilterChange, 
  onResetFilters,
  onPageChange
}) => {
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

  // Default blog filters
  const defaultFilters = [
    {
      key: "category",
      label: "Kategorie",
      value: [],
      options: [
        { label: "Alle", value: "alle" },
        { label: "Artikel", value: "artikel" },
        { label: "Ratgeber", value: "ratgeber" },
        { label: "News", value: "news" },
        { label: "Persönliche Geschichten", value: "geschichten" }
      ]
    },
    {
      key: "topic",
      label: "Thema",
      value: [],
      options: [
        { label: "Alle", value: "alle" },
        { label: "Depression", value: "depression" },
        { label: "Angst", value: "angst" },
        { label: "Selbstfürsorge", value: "selbstfuersorge" },
        { label: "Stress", value: "stress" },
        { label: "Beziehungen", value: "beziehungen" }
      ]
    },
    {
      key: "format",
      label: "Format",
      value: [],
      options: [
        { label: "Alle", value: "alle" },
        { label: "Artikel", value: "text" },
        { label: "Video", value: "video" },
        { label: "Podcast", value: "podcast" },
        { label: "Infografik", value: "infografik" }
      ]
    }
  ]

  // Default blog posts
  const defaultBlogPosts = [
    {
      id: 1,
      title: "5 Strategien für den Umgang mit Stress im Studium",
      excerpt: "Entdecke bewährte Methoden, um Stress zu reduzieren und dein Wohlbefinden während des Studiums zu verbessern.",
      image: "/images/blog/stress-studium.png",
      category: "Ratgeber",
      topic: "Stress",
      date: "2024-01-15",
      readTime: "5 Min.",
      format: "text"
    },
    {
      id: 2,
      title: "Selbstfürsorge: Warum du dir selbst Priorität geben solltest",
      excerpt: "Lerne, wie du Selbstfürsorge in deinen Alltag integrierst und warum es so wichtig für deine mentale Gesundheit ist.",
      image: "/images/blog/selbstfuersorge.png",
      category: "Artikel",
      topic: "Selbstfürsorge",
      date: "2024-01-12",
      readTime: "7 Min.",
      format: "text"
    },
    {
      id: 3,
      title: "Podcast: Gespräch mit Dr. Sarah Klein über Angststörungen",
      excerpt: "In diesem Podcast spricht Dr. Klein über moderne Ansätze zur Behandlung von Angststörungen.",
      image: "/images/blog/podcast-angst.png",
      category: "Interview",
      topic: "Angst",
      date: "2024-01-10",
      readTime: "45 Min.",
      format: "podcast"
    },
    {
      id: 4,
      title: "Meine Reise aus der Depression: Ein persönlicher Bericht",
      excerpt: "Eine ehrliche und inspirierende Geschichte über den Weg aus der Depression zurück ins Leben.",
      image: "/images/blog/depression-geschichte.png",
      category: "Persönliche Geschichten",
      topic: "Depression",
      date: "2024-01-08",
      readTime: "10 Min.",
      format: "text"
    },
    {
      id: 5,
      title: "Beziehungen stärken: Kommunikation in schwierigen Zeiten",
      excerpt: "Tipps für eine bessere Kommunikation mit Partner, Familie und Freunden während herausfordernder Phasen.",
      image: "/images/blog/beziehungen-kommunikation.png",
      category: "Ratgeber",
      topic: "Beziehungen",
      date: "2024-01-05",
      readTime: "6 Min.",
      format: "text"
    },
    {
      id: 6,
      title: "Video: Atemübungen für akute Angst",
      excerpt: "Lerne einfache Atemtechniken, die dir sofort bei Angstattacken helfen können.",
      image: "/images/blog/atemuebungen-video.png",
      category: "Ratgeber",
      topic: "Angst",
      date: "2024-01-03",
      readTime: "8 Min.",
      format: "video"
    }
  ]

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

  const handleSearch = (searchTerm) => {
    console.log('Blog search:', searchTerm)
    if (onSearch) onSearch(searchTerm)
  }

  const handleFilterChange = (filterKey, value) => {
    console.log('Blog filter change:', filterKey, value)
    if (onFilterChange) onFilterChange(filterKey, value)
  }

  const handleResetFilters = () => {
    console.log('Reset blog filters')
    if (onResetFilters) onResetFilters()
  }

  return (
    <div className={styles.page}>
      <Header {...headerProps} />
      <SearchHero
        title="Blog-Artikel durchsuchen"
        searchPlaceholder="Nach Artikeln, Themen oder Stichwörtern suchen..."
        onSearch={handleSearch}
      />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Filters
            filters={filters || defaultFilters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>
        <div className={styles.main}>
          <BlogResults
            blogPosts={blogPosts || defaultBlogPosts}
            resultCount={resultCount || defaultBlogPosts.length}
            currentPage={currentPage || 1}
            totalPages={totalPages || 1}
            itemsPerPage={itemsPerPage || 6}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Footer {...footerProps} />
    </div>
  )
}

export default BlogPage