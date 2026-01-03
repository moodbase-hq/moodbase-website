import React from 'react'
import PageRenderer from './PageRenderer'
import aboutData from '../data/pages/about.json'

const About = () => {
  return <PageRenderer pageData={aboutData} />
}

export default About