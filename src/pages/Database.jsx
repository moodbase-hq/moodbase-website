import React, { useState } from 'react'
import DatabasePage from './DatabasePage/DatabasePage'
import filtersData from '../data/filters.json'
import sampleResults from '../data/sampleResults.json'

const Database = () => {
  const [filters, setFilters] = useState(filtersData)
  const [results, setResults] = useState(sampleResults)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentResultPage, setCurrentResultPage] = useState(1)
  const itemsPerPage = 5

  // Filter and search functionality
  const filteredResults = results.filter(result => {
    // Apply search term filter
    if (searchTerm && !result.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !result.organization.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Apply active filters
    for (const filter of filters) {
      if (filter.value !== 'alle') {
        if (filter.key === 'type' && result.type !== filter.value) return false
        if (filter.key === 'location' && result.location.toLowerCase() !== filter.value) return false
        if (filter.key === 'modality' && result.modality !== filter.value) return false
        if (filter.key === 'language' && !result.languages.some(lang => 
          lang.toLowerCase() === filter.value)) return false
      }
    }
    return true
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage)
  const startIndex = (currentResultPage - 1) * itemsPerPage
  const paginatedResults = filteredResults.slice(startIndex, startIndex + itemsPerPage)

  const handleSearch = (term) => {
    setSearchTerm(term)
    setCurrentResultPage(1) // Reset to first page on new search
  }

  const handleFilterChange = (key, value) => {
    setFilters(prevFilters => 
      prevFilters.map(filter => 
        filter.key === key ? { ...filter, value } : filter
      )
    )
    setCurrentResultPage(1) // Reset to first page on filter change
  }

  const handleResetFilters = () => {
    setFilters(filtersData) // Reset to original state
    setSearchTerm('')
    setCurrentResultPage(1) // Reset to first page
  }

  const handlePageChange = (page) => {
    setCurrentResultPage(page)
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <DatabasePage
      filters={filters}
      results={paginatedResults}
      resultCount={filteredResults.length}
      currentPage={currentResultPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      onSearch={handleSearch}
      onFilterChange={handleFilterChange}
      onResetFilters={handleResetFilters}
      onPageChange={handlePageChange}
    />
  )
}

export default Database