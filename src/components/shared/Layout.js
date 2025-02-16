// components/shared/Layout.jsx
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      {/* Base background color matching the hero section */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-100 to-blue-50 z-0" />

      {/* Content wrapper */}
      <div className="relative z-10">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;