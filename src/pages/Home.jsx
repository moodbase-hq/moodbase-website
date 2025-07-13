import React from 'react'
import PageRenderer from './PageRenderer'
import homepageData from '../data/pages/homepage.json'

const Home = () => {
  return <PageRenderer pageData={homepageData} />
}

export default Home