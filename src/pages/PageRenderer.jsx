import React from 'react'
import { COMPONENT_REGISTRY } from '../utils/componentRegistry'

const PageRenderer = ({ pageData }) => {
  if (!pageData || !pageData.components) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: 'var(--color-foreground-primary)'
      }}>
        Page not found
      </div>
    )
  }

  return (
    <div className="page">
      {pageData.components.map((componentConfig, index) => {
        const Component = COMPONENT_REGISTRY[componentConfig.type]

        if (!Component) {
          console.warn(`Component type "${componentConfig.type}" not found in registry`)
          return (
            <div key={index} style={{ 
              padding: '1rem', 
              backgroundColor: '#ffebee', 
              color: '#c62828',
              margin: '1rem'
            }}>
              Unknown component: {componentConfig.type}
            </div>
          )
        }

        return <Component key={index} {...componentConfig.props} />
      })}
    </div>
  )
}

export default PageRenderer