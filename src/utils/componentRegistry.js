// Component imports
import Header from '../components/Header/Header'
import Button from '../components/Button/Button'
import Hero from '../components/Hero/Hero'
import SearchHero from '../components/SearchHero/SearchHero'
import SearchBar from '../components/SearchBar/SearchBar'
import HowItWorks from '../components/HowItWorks/HowItWorks'
import Filters from '../components/Filters/Filters'
//import MobileFilters from '../components/MobileFilters/MobileFilters'
//import MobileNavigation from '../components/MobileNavigation/MobileNavigation'
import SearchResults from '../components/SearchResults/SearchResults'
import BlogResults from '../components/BlogResults/BlogResults'
import Footer from '../components/Footer/Footer'
import MarkdownContent from '../components/MarkdownContent/MarkdownContent'
import Pagination from '../components/Pagination/Pagination'
import Contact from '../components/Contact/Contact'
import OfferingDetail from '../components/OfferingDetail/OfferingDetail'

// Page imports
import HomePage from '../pages/HomePage/HomePage'
import DatabasePage from '../pages/DatabasePage/DatabasePage'
import BlogPage from '../pages/BlogPage/BlogPage'
import MarkdownPage from '../pages/MarkdownPage/MarkdownPage'

// Component Registry
export const COMPONENT_REGISTRY = {
  // Individual Components
  Header,
  Button,
  Hero,
  SearchHero,
  SearchBar,
  HowItWorks,
  Filters,
  //MobileFilters,
  //MobileNavigation,
  SearchResults,
  BlogResults,
  Footer,
  MarkdownContent,
  Pagination,
  Contact,
  OfferingDetail,
  
  // Page Layouts
  HomePage,
  DatabasePage,
  BlogPage,
  MarkdownPage
}

export default COMPONENT_REGISTRY