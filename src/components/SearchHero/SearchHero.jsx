import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import styles from './SearchHero.module.css'

const SearchHero = ({ title, searchPlaceholder, onSearch }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.searchContainer}>
          <SearchBar
            placeholder={searchPlaceholder}
            onSearch={onSearch}
          />
        </div>
      </div>
    </section>
  )
}

export default SearchHero