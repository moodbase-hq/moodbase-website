import React from 'react'
import PageRenderer from './PageRenderer'
import blogData from '../data/pages/blog.json'

const Blog = () => {
  return <PageRenderer pageData={blogData} />
}

export default Blog