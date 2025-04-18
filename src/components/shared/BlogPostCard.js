// src/components/shared/BlogPostCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ id, title, excerpt, author, date, category, image, readTime }) => {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200">
      <Link to={`/blog/${id}`} className="block">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-light text-primary">
            {category}
          </span>
          <span className="text-sm text-gray-600">{readTime}</span>
        </div>
        <Link to={`/blog/${id}`} className="block">
          <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-primary transition-colors duration-300">
            {title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4">
          {excerpt}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{date}</span>
          <span className="text-sm text-gray-700 font-medium">{author}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;