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

  // View state - map-first design
  const [viewMode, setViewMode] = useState('map') // 'map' or 'list'
  const [filtersCollapsed, setFiltersCollapsed] = useState(true)

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState([])

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
          const term = searchTerm.toLowerCase()
          filtered = filtered.filter(item => 
            item.name?.toLowerCase().includes(term) ||
            item.provider_name?.toLowerCase().includes(term) ||
            item.address?.toLowerCase().includes(term) ||
            item.service_type?.toLowerCase().includes(term)
          )
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
  }, [searchTerm, filters, allData])

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

  // New map-first handlers
  const handleViewModeToggle = () => {
    setViewMode(prev => prev === 'map' ? 'list' : 'map')
  }

  const handleFiltersToggle = () => {
    setFiltersCollapsed(prev => !prev)
  }

  const handlePlaceClick = (placeId) => {
    // For now, we'll show all offerings at that place
    // Later we can create a dedicated PlaceDetail page
    console.log('Place clicked:', placeId)
    
    // Filter results to show only offerings at this place
    const placeOfferings = allData.filter(offering => 
      offering.place_id === placeId
    )
    
    if (placeOfferings.length > 0) {
      setFilteredData(placeOfferings)
      setViewMode('list') // Switch to list view to show results
      setCurrentPage(1)
    }
  }

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
        searchPlaceholder="Angebote durchsuchen"
        onSearch={handleSearch}
      />
      
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {/* New Map-First Layout */}
      <div className={styles.mapFirstContainer}>
        {/* Compact Controls Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.leftControls}>
            <button
              className={`${styles.viewToggle} ${viewMode === 'map' ? styles.active : ''}`}
              onClick={handleViewModeToggle}
            >
              🗺️ Kartenansicht
            </button>
            <button
              className={`${styles.viewToggle} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={handleViewModeToggle}
            >
              📋 Listenansicht
            </button>
          </div>
          <div className={styles.rightControls}>
            <button
              className={`${styles.filtersToggle} ${!filtersCollapsed ? styles.active : ''}`}
              onClick={handleFiltersToggle}
            >
              🔍 Filter {!filtersCollapsed ? 'ausblenden' : 'anzeigen'}
            </button>
            <div className={styles.resultCount}>
              {totalItems} Ergebnisse
            </div>
          </div>
        </div>

        {/* Collapsible Filters */}
        {!filtersCollapsed && (
          <div className={styles.collapsibleFilters}>
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          {viewMode === 'map' ? (
            <div className={styles.mapViewContainer}>
              <MapView
                results={filteredData}
                onDetailsClick={handleDetailsClick}
                onPlaceClick={handlePlaceClick}
              />
            </div>
          ) : (
            <div className={styles.listViewContainer}>
              {isLoading ? (
                <div className={styles.loading}>
                  <p>Laden...</p>
                </div>
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
          )}
        </div>

        {/* Quick Results Summary (always visible in map mode) */}
        {viewMode === 'map' && filteredData.length > 0 && (
          <div className={styles.quickResults}>
            <h3 className={styles.quickResultsTitle}>
              Gefundene Angebote ({totalItems})
            </h3>
            <div className={styles.quickResultsList}>
              {currentResults.slice(0, 5).map((result, index) => (
                <div
                  key={result.id || index}
                  className={styles.quickResultItem}
                  onClick={() => handleDetailsClick(result.id)}
                >
                  <div className={styles.quickResultTitle}>{result.name}</div>
                  <div className={styles.quickResultProvider}>
                    {result.provider_name}
                  </div>
                  <div className={styles.quickResultLocation}>
                    {result.place_city || result.city || 'Online'}
                  </div>
                </div>
              ))}
              {totalItems > 5 && (
                <button
                  className={styles.showAllResults}
                  onClick={() => setViewMode('list')}
                >
                  Alle {totalItems} Angebote anzeigen →
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer {...footerProps} />
    </div>
  )
}

export default DatabasePage