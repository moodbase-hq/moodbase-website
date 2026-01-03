import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import SearchHero from '../../components/SearchHero/SearchHero'
import Filters from '../../components/Filters/Filters'
import SearchResults from '../../components/SearchResults/SearchResults'
import MapView from '../../components/MapView/MapView'
import Footer from '../../components/Footer/Footer'
import OfferingDetail from '../../components/OfferingDetail/OfferingDetail'
import apiService from '../../services/apiService'
import styles from './DatabasePage.module.css'

const DatabasePage = () => {
  // State for data and UI
  const [allData, setAllData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOffering, setSelectedOffering] = useState(null)

  // View state - keep existing working toggle
  const [viewMode, setViewMode] = useState('map') // 'map' or 'list'

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState([])
  
  // Distance filter state (radius only - postal code comes from search)
  const [distanceRadius, setDistanceRadius] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Calculate pagination
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentResults = filteredData.slice(startIndex, endIndex)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch offerings data
        const offerings = await apiService.fetchOfferings()
        console.log('Loaded offerings:', offerings.length)
        
        // Extract filter options from data
        const filterOptions = apiService.extractFilterOptions(offerings)
        
        // Create filter configuration
        const filterConfig = [
          {
            key: "serviceType",
            label: "Angebotstyp",
            value: [],
            options: [
              { label: "Alle", value: "alle" },
              ...filterOptions.serviceTypes.map(type => ({
                label: type,
                value: type
              }))
            ]
          },
          {
            key: "city",
            label: "Stadt",
            value: [],
            options: [
              { label: "Alle", value: "alle" },
              ...filterOptions.cities.map(city => ({
                label: city,
                value: city
              }))
            ]
          },
          {
            key: "modality",
            label: "Modalität",
            value: [],
            options: [
              { label: "Alle", value: "alle" },
              ...filterOptions.modalities.map(modality => ({
                label: modality,
                value: modality
              }))
            ]
          },
          {
            key: "themes",
            label: "Themen",
            value: [],
            options: [
              { label: "Alle", value: "alle" },
              { label: "Angst & Depression", value: "angst-depression" },
              { label: "Sucht & Abhängigkeit", value: "sucht-abhaengigkeit" },
              { label: "Trauma & PTBS", value: "trauma-ptbs" },
              { label: "Burnout & Stress", value: "burnout-stress" },
              { label: "Familienberatung", value: "familienberatung" },
              { label: "Jugendliche", value: "jugendliche" },
              { label: "Krisenintervention", value: "krisenintervention" },
              { label: "Gruppentherapie", value: "gruppentherapie" },
              { label: "Online Therapie", value: "online-therapie" },
              { label: "Coaching", value: "coaching" },
              { label: "Soziale Probleme", value: "soziale-probleme" },
              { label: "Digitale Medien", value: "digitale-medien" },
              { label: "Prävention", value: "praevention" },
              { label: "Entwicklungsprobleme", value: "entwicklungsprobleme" },
              { label: "Persönlichkeitsentwicklung", value: "persoenlichkeitsentwicklung" },
              { label: "Rehabilitation", value: "rehabilitation" }
            ]
          }
        ]

        setAllData(offerings)
        setFilteredData(offerings)
        setFilters(filterConfig)
        
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut.')
        
        // Fallback to default filters if API fails
        setFilters([
          {
            key: "serviceType",
            label: "Angebotstyp",
            value: [],
            options: [{ label: "Alle", value: "alle" }]
          },
          {
            key: "city",
            label: "Stadt", 
            value: [],
            options: [{ label: "Alle", value: "alle" }]
          },
          {
            key: "modality",
            label: "Modalität",
            value: [], 
            options: [{ label: "Alle", value: "alle" }]
          },
          {
            key: "themes",
            label: "Themen",
            value: [],
            options: [{ label: "Alle", value: "alle" }]
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Search and filter effect
  useEffect(() => {
    const performSearch = async () => {
      try {
        // Build search parameters
        const searchParams = {}
        
        if (searchTerm.trim()) {
          searchParams.term = searchTerm.trim()
        }
        
        // Add active filters
        filters.forEach(filter => {
          if (filter.value && filter.value.length > 0) {
            if (filter.key === 'serviceType') searchParams.serviceType = filter.value
            if (filter.key === 'city') searchParams.city = filter.value
            if (filter.key === 'modality') searchParams.modality = filter.value
            if (filter.key === 'themes') searchParams.themes = filter.value
          }
        })
        
        // Add distance radius if set (coordinates will come from postal code in search term)
        if (distanceRadius) {
          searchParams.radius = distanceRadius
        }

        // Perform search if we have search criteria, otherwise use all data
        const hasSearchCriteria = Object.keys(searchParams).length > 0
        
        if (hasSearchCriteria) {
          const results = await apiService.searchOfferings(searchParams)
          setFilteredData(results)
        } else {
          setFilteredData(allData)
        }
        
        // Reset to first page when search changes
        setCurrentPage(1)
        
      } catch (err) {
        console.error('Search error:', err)
        // Fall back to client-side filtering
        let filtered = [...allData]
        
        if (searchTerm.trim()) {
          // Helper to normalize German umlauts
          const normalizeUmlauts = (text) => text
            .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')

          // Split search terms to support multi-term search (AND logic)
          const searchTerms = searchTerm.toLowerCase().split(/\s+/).filter(t => t.length > 0)
          filtered = filtered.filter(item => {
            const searchableText = [
              item.name,
              item.provider_name,
              item.address,
              item.service_type,
              item.location_types
            ].filter(Boolean).join(' ').toLowerCase()

            // Also create normalized version for umlaut matching
            const normalizedText = normalizeUmlauts(searchableText)

            // All terms must match somewhere (check both original and normalized)
            return searchTerms.every(term => {
              const normalizedTerm = normalizeUmlauts(term)
              return searchableText.includes(term) ||
                     searchableText.includes(normalizedTerm) ||
                     normalizedText.includes(term) ||
                     normalizedText.includes(normalizedTerm)
            })
          })
        }
        
        // Apply filters
        filters.forEach(filter => {
          if (filter.value && filter.value.length > 0) {
            if (filter.key === 'serviceType') {
              filtered = filtered.filter(item => filter.value.includes(item.service_type))
            }
            if (filter.key === 'city') {
              filtered = filtered.filter(item => filter.value.some(city => item.address?.includes(city)))
            }
            if (filter.key === 'modality') {
              filtered = filtered.filter(item => filter.value.includes(item.primary_location_type))
            }
            if (filter.key === 'themes') {
              filtered = filtered.filter(item => {
                const itemThemes = item.themes || item.topics || item.themen || []
                return filter.value.some(selectedTheme => 
                  itemThemes.some(itemTheme => 
                    itemTheme.toLowerCase().includes(selectedTheme.replace('-', ' ').toLowerCase()) ||
                    selectedTheme.replace('-', ' ').toLowerCase().includes(itemTheme.toLowerCase())
                  )
                )
              })
            }
          }
        })
        
        setFilteredData(filtered)
        setCurrentPage(1)
      }
    }

    // Debounce search
    const timeoutId = setTimeout(performSearch, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, filters, allData, distanceRadius])

  // Event handlers
  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilterChange = (filterKey, newValue) => {
    // Update the filters array directly
    setFilters(prev => prev.map(filter => 
      filter.key === filterKey 
        ? { ...filter, value: newValue }
        : filter
    ))
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setFilters(prev => prev.map(filter => ({ ...filter, value: [] })))
    setDistanceRadius(null)
  }
  
  const handleDistanceChange = (distance) => {
    setDistanceRadius(distance)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleDetailsClick = async (offeringId) => {
    try {
      setIsLoading(true)
      const offering = await apiService.fetchOfferingById(offeringId)
      setSelectedOffering(offering)
    } catch (err) {
      console.error('Error loading offering details:', err)
      // Fallback to local data
      const offering = allData.find(item => item.id === offeringId)
      setSelectedOffering(offering)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToSearch = () => {
    setSelectedOffering(null)
  }

  // Map interaction handlers - removed handlePlaceClick, now handled by modal

  // Show detail view if offering is selected
  if (selectedOffering) {
    return (
      <OfferingDetail 
        offering={selectedOffering} 
        onBack={handleBackToSearch}
      />
    )
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


  return (
    <div className={styles.page}>
      <Header {...headerProps} />
      <SearchHero
        title="Psychosoziale Angebote"
        searchPlaceholder="Angebote durchsuchen..."
        onSearch={handleSearch}
      />
      
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {/* Restored Original Layout with Sidebar */}
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            onDistanceChange={handleDistanceChange}
          />
        </div>
        <div className={styles.main}>
          {/* Results Header with Toggle - Always Visible */}
          <div className={styles.resultsHeader}>
            <span className={styles.resultCount}>{totalItems} Angebote gefunden</span>
            <div className={styles.viewToggleInline}>
              <button
                onClick={() => setViewMode('list')}
                className={`${styles.toggleButton} ${viewMode === 'list' ? styles.active : ''}`}
              >
                <svg className={styles.toggleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                </svg>
                <span className={styles.toggleText}>Register</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`${styles.toggleButton} ${viewMode === 'map' ? styles.active : ''}`}
              >
                <svg className={styles.toggleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className={styles.toggleText}>Map</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.loading}>
              <p>Laden...</p>
            </div>
          ) : viewMode === 'map' ? (
            <MapView
              results={filteredData}
              onDetailsClick={handleDetailsClick}
            />
          ) : (
            <SearchResults
              results={currentResults}
              resultCount={totalItems}
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onDetailsClick={handleDetailsClick}
            />
          )}
        </div>
      </div>

      <Footer {...footerProps} />
    </div>
  )
}

export default DatabasePage