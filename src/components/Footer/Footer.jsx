import React from 'react'
import styles from './Footer.module.css'

const Footer = ({ logo, columns, plantDecoration }) => (
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
                    <a href={item.href} className={styles.columnLink}>
                      {item.text}
                    </a>
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