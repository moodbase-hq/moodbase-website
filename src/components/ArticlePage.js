// ArticlePage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import articlesData from '../content/articles.json';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const foundArticle = articlesData.articles.find(a => a.id === parseInt(id));
    setArticle(foundArticle);
  }, [id]);

  if (!article) {
    return (
      <div className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Artikel nicht gefunden</h1>
          <Link 
            to="/blog" 
            className="inline-flex items-center text-[#B23A48] hover:text-[#998878] transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-12">
      {/* Article Header */}
      <header className="mb-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-[#B23A48] hover:text-[#998878] mb-8 transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Zurück zur Übersicht
          </Link>

          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-8"
          />
          
          <div className="flex gap-2 mb-6">
            {article.tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-[#B23A48]/10 text-[#B23A48] rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-500">
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{article.author}</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4">
        <div className="prose prose-lg max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-600 mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* Related Articles or Call to Action */}
      <div className="max-w-4xl mx-auto px-4 mt-12 pt-12 border-t border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Weitere Artikel entdecken</h2>
          <Link 
            to="/blog" 
            className="inline-flex items-center text-[#B23A48] hover:text-[#998878] transition-colors duration-300"
          >
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;