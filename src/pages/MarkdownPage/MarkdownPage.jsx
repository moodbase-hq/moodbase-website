import React from 'react'
import Header from '../../components/Header/Header'
import MarkdownContent from '../../components/MarkdownContent/MarkdownContent'
import Footer from '../../components/Footer/Footer'

const MarkdownPage = ({ 
  headerProps, 
  title, 
  subtitle, 
  content, 
  metadata, 
  footerProps 
}) => (
  <div className="markdown-page">
    <Header {...headerProps} />
    <MarkdownContent 
      title={title}
      subtitle={subtitle}
      content={content}
      metadata={metadata}
    />
    <Footer {...footerProps} />
  </div>
)

export default MarkdownPage