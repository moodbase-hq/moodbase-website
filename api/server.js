/**
 * Express Server with Ratings API
 * 
 * Example server setup showing how to integrate the ratings API routes.
 * This demonstrates the complete server structure with middleware and routing.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Import route handlers
const ratingsRoutes = require('./routes/ratings');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Compression and parsing middleware
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Trust proxy for rate limiting and IP detection
app.set('trust proxy', 1);

// Global rate limiting
const globalRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200, // 200 requests per minute per IP
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'GLOBAL_RATE_LIMIT'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalRateLimit);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/ratings', ratingsRoutes);

// Example: Integration with existing providers search
// (showing how ratings could be integrated with your existing API)
app.get('/api/providers/search', async (req, res) => {
  try {
    const { term } = req.query;

    if (!term || term.trim() === '') {
      return res.redirect('/api/providers');
    }

    // Your existing provider search logic here
    const sql = `
      SELECT 
        id, name, description, address, phone, email, website, 
        main_focus, founding_year, legal_status
      FROM 
        providers
      WHERE 
        name ILIKE $1 OR
        description ILIKE $1 OR
        main_focus ILIKE $1 OR
        address ILIKE $1
      ORDER BY 
        name ASC
    `;

    // const { rows } = await query(sql, [`%${term}%`]);
    
    // Mock data for example
    const rows = [
      {
        id: 1,
        name: "Allgemeine Sozialberatung in einem Bezirk von Berlin",
        description: "Comprehensive social counseling services",
        address: "Berlin, Germany",
        phone: "+49 30 12345678",
        email: "info@example.org",
        website: "https://example.org"
      }
    ];

    // Enhance results with ratings if available
    if (rows.length > 0) {
      const offeringIds = rows.map(row => row.id);
      
      try {
        // Import ratings service here to avoid circular dependencies
        const ratingsService = require('./services/ratingsService');
        const ratingsSummary = await ratingsService.getRatingsSummaryForOfferings(offeringIds);
        
        // Add ratings to each result
        rows.forEach(row => {
          if (ratingsSummary[row.id]) {
            row.ratings = ratingsSummary[row.id];
          }
        });
      } catch (ratingsError) {
        console.warn('Failed to fetch ratings for search results:', ratingsError);
        // Continue without ratings - don't fail the entire request
      }
    }

    res.json(rows);
  } catch (error) {
    console.error('Error searching providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    code: 'ENDPOINT_NOT_FOUND',
    path: req.path
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  // Don't expose error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(error.status || 500).json({
    error: isDevelopment ? error.message : 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
    ...(isDevelopment && { stack: error.stack })
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Ratings API available at http://localhost:${PORT}/api/ratings`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

module.exports = app;