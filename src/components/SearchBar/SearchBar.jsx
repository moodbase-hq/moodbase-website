import React, { useState } from 'react'
import styles from './SearchBar.module.css'

const SearchBar = ({ placeholder = "Suchen...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className={styles.searchBarContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Suchen
        </button>
      </form>
    </div>
  )
}

export default SearchBar