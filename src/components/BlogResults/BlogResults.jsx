import React from 'react'
import BlogCard from './BlogCard'
import Pagination from '../Pagination/Pagination'
import styles from './BlogResults.module.css'

const BlogResults = ({ 
  blogPosts = [], 
  resultCount = 0, 
  currentPage = 1, 
  totalPages = 1, 
  itemsPerPage = 6,
  onPageChange 
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.count}>
            {resultCount} {resultCount === 1 ? 'Artikel gefunden' : 'Artikel gefunden'}
          </p>
        </div>
        
        <div className={styles.results}>
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>Keine Artikel gefunden. Versuche andere Suchbegriffe oder Filter.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={resultCount}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </section>
  )
}

export default BlogResults