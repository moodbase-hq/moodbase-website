import React from 'react'
import styles from './BlogCard.module.css'

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getFormatIcon = (format) => {
    switch (format) {
      case 'video':
        return '🎥'
      case 'podcast':
        return '🎧'
      case 'infografik':
        return '📊'
      default:
        return '📄'
    }
  }

  return (
    <article className={styles.blogCard}>
      <div className={styles.imageContainer}>
        <img 
          src={post.image} 
          alt={post.title}
          className={styles.image}
        />
        <div className={styles.formatBadge}>
          <span className={styles.formatIcon}>{getFormatIcon(post.format)}</span>
          <span className={styles.readTime}>{post.readTime}</span>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <span className={styles.date}>{formatDate(post.date)}</span>
        </div>
        
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        
        <div className={styles.actions}>
          <button className={styles.readButton}>
            {post.format === 'video' ? 'Video ansehen' : 
             post.format === 'podcast' ? 'Anhören' : 
             'Weiterlesen'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default BlogCard