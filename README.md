# Moodbase Website Redesign

A modern, component-driven React website for psychosocial support services with JSON-based content management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see the application.

## 📋 Project Overview

This project implements a complete redesign of the Moodbase website with a focus on:

- **Component-driven architecture** - Modular, reusable React components
- **JSON-driven content** - Pages defined through JSON configuration files
- **Modern styling** - CSS Modules with centralized design tokens
- **Full functionality** - Working search, filtering, and pagination
- **Responsive design** - Mobile-first approach with proper breakpoints

## 🏗️ Architecture

### Core Technologies
- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **React Router** for client-side routing
- **CSS Modules** for scoped component styling
- **React Markdown** for dynamic content rendering

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Header/
│   ├── Hero/
│   ├── SearchHero/
│   ├── HowItWorks/
│   ├── Filters/
│   ├── SearchResults/
│   ├── Footer/
│   ├── MarkdownContent/
│   ├── Pagination/
│   └── Navigation/
├── pages/              # Page components and layouts
│   ├── HomePage/
│   ├── DatabasePage/
│   ├── MarkdownPage/
│   ├── Home.jsx
│   ├── Database.jsx
│   ├── About.jsx
│   └── PageRenderer.jsx
├── styles/             # Global styles and design tokens
│   ├── designTokens.js
│   ├── globals.css
│   └── utilities.css
├── data/               # JSON configuration and sample data
│   ├── pages/
│   ├── filters.json
│   └── sampleResults.json
├── utils/              # Utility functions and configurations
│   └── componentRegistry.js
└── App.jsx             # Main application component
```

## 🎨 Design System

The project implements a comprehensive design system based on the provided style guide:

### Colors
- **Primary**: `#383838` (Dark gray text)
- **Background**: `#F5ECE5` (Warm beige)
- **Emphasis**: `#A13E4B` (Deep red)
- **Border**: `#3C3732` (Dark brown)

### Typography
- **Font Family**: Inter (fallback for Inclusive Sans)
- **Scale**: 12px - 48px with consistent ratios
- **Weights**: Normal (400) to Bold (700)

### Spacing
- **Consistent scale**: 8px - 64px increments
- **Responsive breakpoints**: Mobile (768px), Tablet (1024px), Desktop (1200px)

## ✨ Features Implemented

### 🏠 Homepage
- Hero section with call-to-action buttons
- "How It Works" process explanation
- Responsive navigation header
- Multi-column footer

### 🔍 Database/Search Page
- Real-time search functionality
- Multi-filter system (Type, Location, Modality, Language)
- Pagination with proper navigation
- Result cards with service details
- Responsive two-column layout

### 📄 Markdown Pages
- Dynamic content rendering from markdown
- Support for all markdown elements
- Styled components (headings, lists, links, code)
- Metadata display (author, last updated)
- Responsive typography

### 🧭 Navigation
- React Router implementation
- Active link highlighting
- Seamless page transitions
- Proper header navigation integration

## 🔧 Component Features

### Search & Filtering
- **Real-time filtering**: Results update as you type and change filters
- **Multi-criteria search**: Filter by service type, location, modality, and language
- **Reset functionality**: Clear all filters with one click
- **State management**: Maintains search state across interactions

### Pagination
- **Smart pagination**: Only shows when needed (>5 results)
- **Ellipsis handling**: Proper page number display for large result sets
- **Responsive design**: Adapts layout for mobile devices
- **Result counters**: Shows current range and total results

### Markdown Rendering
- **Full markdown support**: Headers, paragraphs, lists, links, images, code
- **Syntax highlighting**: Styled code blocks and inline code
- **Responsive images**: Automatic image sizing and centering
- **Custom styling**: All elements styled to match design system

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first approach**: Optimized for small screens
- **Flexible layouts**: Grid and flexbox for dynamic content
- **Touch-friendly**: Proper button sizes and spacing
- **Navigation adaptation**: Mobile menu considerations

## 🚀 Performance Optimizations

- **CSS Modules**: Automatic style optimization and purging
- **Component splitting**: Modular architecture for better code splitting
- **Efficient state management**: Minimal re-renders with proper React patterns
- **Image optimization**: Responsive images with proper alt text

## 🎯 Next Steps

The current implementation provides a solid foundation. Potential enhancements:

1. **Backend Integration**
   - Connect to real API endpoints
   - User authentication system
   - Content management system integration

2. **Advanced Features**
   - Service detail pages
   - User favorites/bookmarking
   - Advanced search filters
   - Map integration

3. **Performance**
   - Image lazy loading
   - Code splitting optimization
   - SEO improvements
   - Analytics integration

4. **Testing**
   - Unit tests for components
   - Integration tests for user flows
   - E2E testing with Cypress

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Dependencies

- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **react-router-dom**: ^6.8.1
- **react-markdown**: ^9.0.1
- **vite**: ^5.0.8

## 📄 License

This project is part of the Moodbase platform for mental health support services.