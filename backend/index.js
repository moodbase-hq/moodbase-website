import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the root directory
dotenv.config({ path: join(__dirname, '..', '.env') });

// Import database connection
import { pool, query } from './db.js';

// Import ratings service
import * as ratingsService from './services/ratingsService.js';

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Trust proxy for rate limiting and IP detection
app.set('trust proxy', 1);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    uptime: process.uptime() 
  });
});

// IMPORTANT: Search routes MUST come before parameterized routes
// Otherwise /:id will catch /search as an ID parameter

// Search providers - BEFORE /api/providers/:id
app.get('/api/providers/search', async (req, res) => {
  try {
    const { term } = req.query;

    if (!term || term.trim() === '') {
      return res.redirect('/api/providers');
    }

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

    const { rows } = await query(sql, [`%${term}%`]);
    res.json(rows);
  } catch (error) {
    console.error('Error searching providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search offerings - BEFORE /api/offerings/:id
app.get('/api/offerings/search', async (req, res) => {
  try {
    const { term, serviceType, location, language } = req.query;
    let params = [];
    let conditions = [];
    let paramIndex = 1;

    // Build base query
    let sql = `
      SELECT 
        o.id, o.name, o.description, o.service_type, o.address,
        o.location_types, o.primary_location_type, o.availability_times, o.cost,
        p.id as provider_id, p.name as provider_name
      FROM 
        offerings o
      JOIN 
        providers p ON o.provider_id = p.id
    `;

    // Add optional language join if language parameter exists and language table exists
    let languageTableExists = false;
    if (language) {
      try {
        const checkLanguageTableSql = `
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = 'offering_languages'
          );
        `;

        const checkResult = await query(checkLanguageTableSql);
        languageTableExists = checkResult.rows[0].exists;

        if (languageTableExists) {
          sql += `
            JOIN offering_languages ol ON o.id = ol.offering_id
            JOIN languages l ON ol.language_id = l.id
          `;
          conditions.push(`l.name ILIKE $${paramIndex}`);
          params.push(`%${language}%`);
          paramIndex++;
        }
      } catch (error) {
        console.log('Language tables might not exist yet:', error.message);
      }
    }

    // Add search term condition if provided
    if (term && term.trim() !== '') {
      // Split search terms by whitespace to support multi-term search
      const searchTerms = term.trim().split(/\s+/).filter(t => t.length > 0);

      // Each term must match somewhere in the searchable fields (AND logic)
      searchTerms.forEach(searchTerm => {
        // Check if this specific term is a postal code (5 digits)
        const isPostalCode = /^\d{5}$/.test(searchTerm);

        if (isPostalCode) {
          // For postal codes, prioritize address search
          conditions.push(`o.address ILIKE $${paramIndex}`);
          params.push(`%${searchTerm}%`);
        } else {
          // For general search terms, search all fields
          conditions.push(`(
            o.name ILIKE $${paramIndex} OR
            o.description ILIKE $${paramIndex} OR
            o.service_type ILIKE $${paramIndex} OR
            o.address ILIKE $${paramIndex} OR
            p.name ILIKE $${paramIndex}
          )`);
          params.push(`%${searchTerm}%`);
        }
        paramIndex++;
      });
    }

    // Add service type filter if provided
    if (serviceType) {
      conditions.push(`o.service_type ILIKE $${paramIndex}`);
      params.push(`%${serviceType}%`);
      paramIndex++;
    }

    // Add location filter if provided
    if (location) {
      conditions.push(`(
        o.address ILIKE $${paramIndex} OR
        o.primary_location_type ILIKE $${paramIndex}
      )`);
      params.push(`%${location}%`);
      paramIndex++;
    }

    // Add WHERE clause if we have conditions
    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    // Add ORDER BY
    sql += ` ORDER BY o.name ASC`;

    // If no filters are applied, just get all offerings
    if (conditions.length === 0) {
      return res.redirect('/api/offerings');
    }

    const { rows } = await query(sql, params);
    
    // Enhance results with ratings if available
    if (rows.length > 0) {
      const offeringIds = rows.map(row => row.id);
      
      try {
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
    console.error('Error searching offerings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Map data endpoint - Added logging for debugging
app.get('/api/map', async (req, res) => {
  console.log('Map endpoint accessed');

  try {
    // Corrected query that joins with entry_locations table
    const sql = `
      SELECT 
        o.id, 
        o.name, 
        o.service_type, 
        o.address, 
        o.primary_location_type,
        p.id as provider_id, 
        p.name as provider_name,
        el.longitude, 
        el.latitude,
        el.location as location_name
      FROM 
        offerings o
      JOIN 
        providers p ON o.provider_id = p.id
      LEFT JOIN 
        entry_locations el ON o.id = el.entry_id
      WHERE 
        el.longitude IS NOT NULL 
        AND el.latitude IS NOT NULL
        AND el.longitude != 0 
        AND el.latitude != 0
      ORDER BY o.name
    `;

    const { rows } = await query(sql);
    console.log(`Map data: found ${rows.length} items with coordinates`);

    // Log a sample of the data for debugging
    if (rows.length > 0) {
      console.log('Sample map data:', JSON.stringify(rows[0], null, 2));
    }

    res.json(rows);

  } catch (error) {
    console.error('Error fetching map data:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });

    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Languages endpoint
app.get('/api/languages', async (req, res) => {
  try {
    // Check if languages table exists
    const checkTableSql = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'languages'
      );
    `;

    const tableExists = await query(checkTableSql);

    if (!tableExists.rows[0].exists) {
      // Return empty array if the table doesn't exist yet
      return res.json([]);
    }

    const sql = `
      SELECT id, name
      FROM languages
      ORDER BY name ASC
    `;

    const { rows } = await query(sql);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all providers
app.get('/api/providers', async (req, res) => {
  try {
    const sql = `
      SELECT 
        id, name, description, address, phone, email, website, 
        main_focus, founding_year, legal_status
      FROM 
        providers
      ORDER BY 
        name ASC
    `;

    const { rows } = await query(sql);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get provider by ID - AFTER search route
app.get('/api/providers/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const providerSql = `
      SELECT 
        id, name, description, address, phone, email, website, 
        main_focus, founding_year, legal_status, external_id, source_url,
        created_at, updated_at
      FROM 
        providers
      WHERE 
        id = $1
    `;

    const providerResult = await query(providerSql, [id]);

    if (providerResult.rows.length === 0) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const provider = providerResult.rows[0];

    // Get offerings for this provider
    const offeringsSql = `
      SELECT 
        id, name, description, service_type, address, 
        location_types, primary_location_type, 
        availability_times, cost
      FROM 
        offerings
      WHERE 
        provider_id = $1
      ORDER BY
        name ASC
    `;

    const offeringsResult = await query(offeringsSql, [id]);
    provider.offerings = offeringsResult.rows;

    res.json(provider);
  } catch (error) {
    console.error('Error fetching provider:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all offerings
app.get('/api/offerings', async (req, res) => {
  try {
    const sql = `
      SELECT 
        o.id, o.name, o.description, o.service_type, o.address,
        o.location_types, o.primary_location_type, o.availability_times, o.cost,
        p.id as provider_id, p.name as provider_name
      FROM 
        offerings o
      JOIN 
        providers p ON o.provider_id = p.id
      ORDER BY 
        o.name ASC
    `;

    const { rows } = await query(sql);
    
    // Enhance results with ratings if available
    if (rows.length > 0) {
      const offeringIds = rows.map(row => row.id);
      
      try {
        const ratingsSummary = await ratingsService.getRatingsSummaryForOfferings(offeringIds);
        
        // Add ratings to each result
        rows.forEach(row => {
          if (ratingsSummary[row.id]) {
            row.ratings = ratingsSummary[row.id];
          }
        });
      } catch (ratingsError) {
        console.warn('Failed to fetch ratings for offerings:', ratingsError);
        // Continue without ratings - don't fail the entire request
      }
    }
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching offerings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get offering by ID - AFTER search route
app.get('/api/offerings/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const offeringSql = `
      SELECT 
        o.id, o.name, o.description, o.service_type, o.address,
        o.location_types, o.primary_location_type, o.phone, o.email, o.website,
        o.opening_hours, o.availability_times, o.cost, o.external_id, o.source_url,
        o.created_at, o.updated_at,
        p.id as provider_id, p.name as provider_name, p.description as provider_description
      FROM 
        offerings o
      JOIN 
        providers p ON o.provider_id = p.id
      WHERE 
        o.id = $1
    `;

    const offeringResult = await query(offeringSql, [id]);

    if (offeringResult.rows.length === 0) {
      return res.status(404).json({ error: 'Offering not found' });
    }

    const offering = offeringResult.rows[0];

    // Get new ratings system data
    try {
      const userRatings = await ratingsService.getUserRatingsForOffering(parseInt(id));
      const platformRatings = await ratingsService.getPlatformRatingsForOffering(parseInt(id));
      
      if (userRatings) {
        offering.userRatings = userRatings;
      }
      
      if (platformRatings) {
        offering.platformRatings = platformRatings;
      }
    } catch (ratingsError) {
      console.warn('Failed to fetch ratings for offering:', ratingsError);
      // Continue without ratings - don't fail the entire request
    }

    // Legacy code removed - using new dual rating system above

    res.json(offering);
  } catch (error) {
    console.error('Error fetching offering:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================================
// RATINGS API ENDPOINTS
// ============================================================================

/**
 * GET /api/ratings/user/:offeringId
 * Get aggregated user ratings for a specific offering
 */
app.get('/api/ratings/user/:offeringId', async (req, res) => {
  try {
    const { offeringId } = req.params;
    
    // Validate offering ID
    const offeringIdNum = parseInt(offeringId);
    if (!offeringIdNum || offeringIdNum <= 0) {
      return res.status(400).json({
        error: 'Invalid offering ID. Must be a positive integer.',
        code: 'INVALID_OFFERING_ID'
      });
    }

    const userRatings = await ratingsService.getUserRatingsForOffering(offeringIdNum);
    
    if (!userRatings) {
      return res.status(404).json({
        error: 'No user ratings found for this offering',
        code: 'RATINGS_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: userRatings
    });

  } catch (error) {
    console.error('Error fetching user ratings:', error);
    res.status(500).json({
      error: 'Failed to fetch user ratings',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
});

/**
 * GET /api/ratings/platform/:offeringId
 * Get platform ratings for a specific offering
 */
app.get('/api/ratings/platform/:offeringId', async (req, res) => {
  try {
    const { offeringId } = req.params;
    
    // Validate offering ID
    const offeringIdNum = parseInt(offeringId);
    if (!offeringIdNum || offeringIdNum <= 0) {
      return res.status(400).json({
        error: 'Invalid offering ID. Must be a positive integer.',
        code: 'INVALID_OFFERING_ID'
      });
    }

    const platformRatings = await ratingsService.getPlatformRatingsForOffering(offeringIdNum);
    
    if (!platformRatings) {
      return res.status(404).json({
        error: 'No platform ratings found for this offering',
        code: 'RATINGS_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: platformRatings
    });

  } catch (error) {
    console.error('Error fetching platform ratings:', error);
    res.status(500).json({
      error: 'Failed to fetch platform ratings',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
});

/**
 * POST /api/ratings/submit
 * Submit a new user rating to the staging table
 */
app.post('/api/ratings/submit', async (req, res) => {
  try {
    const {
      offeringId,
      userId,
      overall,
      access,
      treatment, 
      helpful,
      effectiveness,
      comment
    } = req.body;

    // Validate required fields
    if (!offeringId || !overall || !access || !treatment || !helpful || !effectiveness) {
      return res.status(400).json({
        error: 'Missing required rating fields',
        code: 'MISSING_REQUIRED_FIELDS',
        required: ['offeringId', 'overall', 'access', 'treatment', 'helpful', 'effectiveness']
      });
    }

    // Validate offering ID
    const offeringIdNum = parseInt(offeringId);
    if (!offeringIdNum || offeringIdNum <= 0) {
      return res.status(400).json({
        error: 'Invalid offering ID. Must be a positive integer.',
        code: 'INVALID_OFFERING_ID'
      });
    }

    // Generate or validate user ID
    let validUserId = userId;
    if (!validUserId) {
      validUserId = uuidv4(); // Generate new UUID if not provided
    } else if (!validateUuid(validUserId)) {
      return res.status(400).json({
        error: 'Invalid user ID. Must be a valid UUID.',
        code: 'INVALID_USER_ID'
      });
    }

    // Validate rating values
    const ratingFields = { overall, access, treatment, helpful, effectiveness };
    for (const [field, value] of Object.entries(ratingFields)) {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 1.0 || numValue > 5.0) {
        return res.status(400).json({
          error: `Invalid ${field} rating. Must be between 1.0 and 5.0.`,
          code: 'INVALID_RATING_VALUE'
        });
      }
    }

    // Validate comment length if provided
    if (comment && comment.length > 1000) {
      return res.status(400).json({
        error: 'Comment too long. Maximum 1000 characters.',
        code: 'COMMENT_TOO_LONG'
      });
    }

    // Prepare rating data
    const ratingData = {
      offeringId: offeringIdNum,
      userId: validUserId,
      overall: parseFloat(overall),
      access: parseFloat(access),
      treatment: parseFloat(treatment),
      helpful: parseFloat(helpful),
      effectiveness: parseFloat(effectiveness),
      comment: comment ? comment.trim() : null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    const result = await ratingsService.submitUserRating(ratingData);

    res.status(201).json({
      success: true,
      data: result,
      userId: validUserId // Return the user ID (generated or validated)
    });

  } catch (error) {
    console.error('Error submitting rating:', error);
    
    // Handle specific error types
    if (error.message.includes('already submitted')) {
      return res.status(409).json({
        error: error.message,
        code: 'DUPLICATE_SUBMISSION'
      });
    }
    
    if (error.message.includes('Invalid') || error.message.includes('Missing')) {
      return res.status(400).json({
        error: error.message,
        code: 'VALIDATION_ERROR'
      });
    }

    res.status(500).json({
      error: 'Failed to submit rating',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
});

/**
 * GET /api/ratings/summary
 * Get ratings summary for multiple offerings (bulk fetch)
 * Query parameter: ?offeringIds=1,2,3,4,5
 */
app.get('/api/ratings/summary', async (req, res) => {
  try {
    const { offeringIds } = req.query;
    
    if (!offeringIds) {
      return res.status(400).json({
        error: 'Missing offeringIds query parameter',
        code: 'MISSING_OFFERING_IDS'
      });
    }

    // Parse and validate offering IDs
    const idsArray = offeringIds.split(',').map(id => parseInt(id.trim())).filter(id => id > 0);
    
    if (idsArray.length === 0) {
      return res.status(400).json({
        error: 'No valid offering IDs provided',
        code: 'INVALID_OFFERING_IDS'
      });
    }

    // Limit to maximum 50 offerings per request
    if (idsArray.length > 50) {
      return res.status(400).json({
        error: 'Too many offering IDs. Maximum 50 allowed per request.',
        code: 'TOO_MANY_OFFERING_IDS'
      });
    }

    const summary = await ratingsService.getRatingsSummaryForOfferings(idsArray);

    res.json({
      success: true,
      data: summary,
      count: Object.keys(summary).length
    });

  } catch (error) {
    console.error('Error fetching ratings summary:', error);
    res.status(500).json({
      error: 'Failed to fetch ratings summary',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
});

/**
 * Admin Routes for rating management
 * TODO: Add proper admin authentication
 */

/**
 * GET /api/admin/ratings/pending
 * Get pending user ratings for admin review
 */
app.get('/api/admin/ratings/pending', async (req, res) => {
  try {
    // TODO: Add admin authentication check
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Admin access required' });
    // }

    const { limit = 50, offset = 0 } = req.query;
    
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);
    
    if (limitNum > 100) {
      return res.status(400).json({
        error: 'Limit cannot exceed 100',
        code: 'LIMIT_TOO_HIGH'
      });
    }

    const pendingRatings = await ratingsService.getPendingUserRatings(limitNum, offsetNum);

    res.json({
      success: true,
      data: pendingRatings,
      count: pendingRatings.length,
      pagination: {
        limit: limitNum,
        offset: offsetNum
      }
    });

  } catch (error) {
    console.error('Error fetching pending ratings:', error);
    res.status(500).json({
      error: 'Failed to fetch pending ratings',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
});

/**
 * POST /api/admin/ratings/review
 * Approve or reject a pending rating
 */
app.post('/api/admin/ratings/review', async (req, res) => {
  try {
    // TODO: Add admin authentication check
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Admin access required' });
    // }

    const { stagingId, approved, reviewedBy, rejectionReason } = req.body;

    // Validate required fields
    if (!stagingId || approved === undefined || !reviewedBy) {
      return res.status(400).json({
        error: 'Missing required fields: stagingId, approved, reviewedBy',
        code: 'MISSING_REQUIRED_FIELDS'
      });
    }

    // Validate staging ID
    const stagingIdNum = parseInt(stagingId);
    if (!stagingIdNum || stagingIdNum <= 0) {
      return res.status(400).json({
        error: 'Invalid staging ID',
        code: 'INVALID_STAGING_ID'
      });
    }

    // If rejecting, require rejection reason
    if (!approved && !rejectionReason) {
      return res.status(400).json({
        error: 'Rejection reason is required when rejecting a rating',
        code: 'MISSING_REJECTION_REASON'
      });
    }

    const result = await ratingsService.reviewUserRating(
      stagingIdNum,
      Boolean(approved),
      reviewedBy.toString(),
      rejectionReason || null
    );

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error reviewing rating:', error);
    res.status(500).json({
      error: 'Failed to review rating',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
});

// Legacy ratings endpoint (keep for backwards compatibility)
app.post('/api/ratings', async (req, res) => {
  const client = await pool.connect();

  try {
    const { userId, offeringId, overallRating, categoryRatings, comment } = req.body;

    if (!offeringId || !overallRating || !categoryRatings) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await client.query('BEGIN');

    // Check if ratings table exists
    const checkTableSql = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'ratings'
      );
    `;

    const tableExists = await client.query(checkTableSql);

    if (!tableExists.rows[0].exists) {
      // Create ratings table if it doesn't exist
      const createRatingsTableSql = `
        CREATE TABLE IF NOT EXISTS ratings (
          id SERIAL PRIMARY KEY,
          offering_id INTEGER REFERENCES offerings(id),
          user_id INTEGER DEFAULT 1,
          overall_rating FLOAT NOT NULL,
          comment TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS rating_categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS category_ratings (
          id SERIAL PRIMARY KEY,
          rating_id INTEGER REFERENCES ratings(id),
          category_id INTEGER REFERENCES rating_categories(id),
          score FLOAT NOT NULL
        );
      `;

      await client.query(createRatingsTableSql);
    }

    // Insert the overall rating
    const ratingSql = `
      INSERT INTO ratings (offering_id, user_id, overall_rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;

    const ratingResult = await client.query(ratingSql, [offeringId, userId || 1, overallRating, comment]);
    const ratingId = ratingResult.rows[0].id;

    // Insert category ratings
    for (const [categoryName, score] of Object.entries(categoryRatings)) {
      // Get category ID (or create if doesn't exist)
      const categoryCheckSql = `
        INSERT INTO rating_categories (name)
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING
      `;
      await client.query(categoryCheckSql, [categoryName]);

      const categoryIdSql = `SELECT id FROM rating_categories WHERE name = $1`;
      const categoryIdResult = await client.query(categoryIdSql, [categoryName]);
      const categoryId = categoryIdResult.rows[0].id;

      // Insert category rating
      const categoryRatingSql = `
        INSERT INTO category_ratings (rating_id, category_id, score)
        VALUES ($1, $2, $3)
      `;
      await client.query(categoryRatingSql, [ratingId, categoryId, score]);
    }

    await client.query('COMMIT');
    res.status(201).json({ success: true, ratingId });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error submitting rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Add a test endpoint for debugging
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit!');
  res.json({ message: 'Test endpoint working', timestamp: new Date() });
});

app.get('/api/debug-db', async (req, res) => {
  try {
    const result1 = await query('SELECT COUNT(*) FROM offerings');
    const result2 = await query("SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'entry_locations'");

    res.json({
      offerings_count: result1.rows[0].count,
      entry_locations_exists: result2.rows[0].count > 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📊 Ratings API available at http://localhost:${port}/api/ratings`);
  console.log(`🏥 Health check: http://localhost:${port}/api/health`);
});

export default app;