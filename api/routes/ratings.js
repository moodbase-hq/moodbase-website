/**
 * Ratings API Routes
 * 
 * Express.js routes for the ratings system API endpoints.
 * Handles both user ratings and platform ratings with proper validation.
 * 
 * Routes:
 * - GET /api/ratings/user/:offeringId - Get user ratings for an offering
 * - GET /api/ratings/platform/:offeringId - Get platform ratings for an offering  
 * - POST /api/ratings/submit - Submit new user rating
 * - GET /api/ratings/summary - Get ratings summary for multiple offerings
 * - GET /api/admin/ratings/pending - Get pending ratings for admin review
 * - POST /api/admin/ratings/review - Approve/reject a rating
 */

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { v4: uuidv4, validate: validateUuid } = require('uuid');

// Import the ratings service
const ratingsService = require('../services/ratingsService');

// Rate limiting for rating submissions
const submitRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Maximum 3 submissions per IP per 15 minutes
  message: {
    error: 'Too many rating submissions. Please wait before submitting another rating.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for general API access
const generalRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Maximum 100 requests per IP per minute
  message: {
    error: 'Too many requests. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

// Apply general rate limiting to all routes
router.use(generalRateLimit);

/**
 * GET /api/ratings/user/:offeringId
 * Get aggregated user ratings for a specific offering
 */
router.get('/user/:offeringId', async (req, res) => {
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
router.get('/platform/:offeringId', async (req, res) => {
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
router.post('/submit', submitRateLimit, async (req, res) => {
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
router.get('/summary', async (req, res) => {
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
 * Admin Routes (require authentication)
 * In a real implementation, these would check for admin authentication
 */

/**
 * GET /api/admin/ratings/pending
 * Get pending user ratings for admin review
 */
router.get('/admin/pending', async (req, res) => {
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
router.post('/admin/review', async (req, res) => {
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

// Error handler for this router
router.use((error, req, res, next) => {
  console.error('Ratings API Error:', error);
  
  if (res.headersSent) {
    return next(error);
  }
  
  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

module.exports = router;