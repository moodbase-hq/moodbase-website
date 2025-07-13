import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './MarkdownContent.module.css'

const MarkdownContent = ({ title, subtitle, content, metadata }) => (
  <main className={styles.main}>
    <div className={styles.container}>
      <header className={styles.header}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {metadata && (
          <div className={styles.metadata}>
            {metadata.author && (
              <span className={styles.metaItem}>Von {metadata.author}</span>
            )}
            {metadata.lastUpdated && (
              <span className={styles.metaItem}>
                Aktualisiert am {new Date(metadata.lastUpdated).toLocaleDateString('de-DE')}
              </span>
            )}
          </div>
        )}
      </header>
      
      <article className={styles.content}>
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className={styles.h1} {...props} />,
            h2: ({node, ...props}) => <h2 className={styles.h2} {...props} />,
            h3: ({node, ...props}) => <h3 className={styles.h3} {...props} />,
            h4: ({node, ...props}) => <h4 className={styles.h4} {...props} />,
            h5: ({node, ...props}) => <h5 className={styles.h5} {...props} />,
            h6: ({node, ...props}) => <h6 className={styles.h6} {...props} />,
            p: ({node, ...props}) => <p className={styles.paragraph} {...props} />,
            ul: ({node, ...props}) => <ul className={styles.unorderedList} {...props} />,
            ol: ({node, ...props}) => <ol className={styles.orderedList} {...props} />,
            li: ({node, ...props}) => <li className={styles.listItem} {...props} />,
            a: ({node, ...props}) => <a className={styles.link} {...props} />,
            blockquote: ({node, ...props}) => <blockquote className={styles.blockquote} {...props} />,
            code: ({node, inline, ...props}) => 
              inline 
                ? <code className={styles.inlineCode} {...props} />
                : <code className={styles.codeBlock} {...props} />,
            pre: ({node, ...props}) => <pre className={styles.preBlock} {...props} />,
            img: ({node, ...props}) => <img className={styles.image} {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  </main>
)

export default MarkdownContent