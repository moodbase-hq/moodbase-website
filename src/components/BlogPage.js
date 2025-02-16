// BlogPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import articlesData from '../content/articles.json';

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-200">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          {article.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#B23A48]/10 text-[#B23A48] rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{article.title}</h3>
        <p className="text-gray-600 mb-4">{article.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">
              {new Date(article.date).toLocaleDateString()}
            </span>
            <span className="text-gray-500 text-sm">
              {article.author}
            </span>
          </div>
                  <Link
          to={`/blog/${article.id}`}
          className="text-[#B23A48] hover:text-[#9B3240] font-medium transition-colors duration-300"
        >
          Weiterlesen →
        </Link>
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ onSearch, availableTags }) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const handleSearch = () => {
    onSearch({ query, tag: selectedTag });
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Artikel durchsuchen..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B23A48] focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="px-4 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B23A48] focus:border-transparent"
        >
          <option value="">Alle Tags</option>
          {availableTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-[#B23A48] text-white px-8 py-3 rounded-full hover:bg-[#9B3240] transition-colors duration-300"
        >
          Suchen
        </button>
      </div>
    </div>
  );
};

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    setArticles(articlesData.articles);
    const tags = [...new Set(articlesData.articles.flatMap(article => article.tags))];
    setAvailableTags(tags);
  }, []);

  const handleSearch = ({ query, tag }) => {
    const filtered = articles.filter(article => {
      const matchesQuery = article.title.toLowerCase().includes(query.toLowerCase()) ||
                          article.description.toLowerCase().includes(query.toLowerCase());
      const matchesTag = !tag || article.tags.includes(tag);
      return matchesQuery && matchesTag;
    });
    setSearchResults(filtered);
  };

  const displayedArticles = searchResults || articles.filter(article => article.featured);

  return (
    <div className="pt-32 pb-12">
      {/* Hero Section */}
      <section className="relative mb-16">
        <div className="absolute inset-0 bg-gray-400" />
        <div className="absolute inset-0 bg-black/40" /> {/* This adds the dark overlay like in the main page */}
        <div className="relative py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Moodbase Blog</h1>
              <p className="text-xl opacity-90">Artikel und Einblicke damit du dich in der Hilfelandschaft zurecht findest</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-4">
        <SearchBar onSearch={handleSearch} availableTags={availableTags} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {displayedArticles.length === 0 && (
          <div className="text-center text-gray-600 py-12">
            Keine Artikel gefunden.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;