// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Website from './components/Website';
import BlogPage from './components/BlogPage';
import ArticlePage from './components/ArticlePage';
import DatabasePage from './components/DatabasePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Website />} />
        <Route path="/blog" element={
          <Layout>
            <BlogPage />
          </Layout>
        } />
        <Route path="/blog/:id" element={
          <Layout>
            <ArticlePage />
          </Layout>
        } />
        <Route path="/database" element={
          <Layout>
            <DatabasePage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;