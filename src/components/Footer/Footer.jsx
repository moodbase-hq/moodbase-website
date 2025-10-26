import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import footerConfig from '../../data/shared/footerLinks.json'

const Footer = ({ logo = footerConfig.logo, columns = footerConfig.columns, plantDecoration = footerConfig.plantDecoration }) => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.branding}>
          <div className={styles.logo}>{logo}</div>
          {plantDecoration && (
            <div className={styles.plantDecoration}>
              <img src={plantDecoration} alt="" />
            </div>
          )}
        </div>
        <div className={styles.columns}>
          {columns.map((column, index) => (
            <div key={index} className={styles.column}>
              <h4 className={styles.columnTitle}>{column.title}</h4>
              <ul className={styles.columnList}>
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.columnItem}>
                    {item.href.startsWith('mailto:') ? (
                      <a href={item.href} className={styles.columnLink}>
                        {item.text}
                      </a>
                    ) : (
                      <Link to={item.href} className={styles.columnLink} replace>
                        {item.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer