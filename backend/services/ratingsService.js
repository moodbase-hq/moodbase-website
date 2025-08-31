/**
 * Ratings Service - Database Access Layer
 * 
 * This service provides clean database access functions for the ratings system.
 * It integrates with your existing database connection and follows your patterns.
 */

// Import your existing database connection
import { query } from '../db.js';

/**
 * User Ratings Functions
 */

/**
 * Get aggregated user ratings for a specific offering
 * @param {number} offeringId - The ID of the offering
 * @returns {Promise<Object|null>} User ratings data or null if not found
 */
async function getUserRatingsForOffering(offeringId) {
  try {
    // Check if rating_aggregations view exists
    const viewExistsQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.views 
        WHERE table_name = 'rating_aggregations'
      );
    `;
    
    const { rows: viewCheck } = await query(viewExistsQuery);
    
    let userRatings;
    
    if (viewCheck[0].exists) {
      // Use the aggregation view if it exists
      const sql = `
        SELECT 
          offering_id,
          user_rating_count,
          user_overall_avg,
          user_access_avg,
          user_treatment_avg,
          user_helpful_avg,
          user_effectiveness_avg
        FROM rating_aggregations 
        WHERE offering_id = $1
      `;
      
      const { rows } = await query(sql, [offeringId]);
      userRatings = rows[0] || null;
    } else {
      // Fall back to manual aggregation
      const sql = `
        SELECT 
          COUNT(*) as user_rating_count,
          ROUND(AVG(overall_rating), 1) as user_overall_avg,
          ROUND(AVG(access_rating), 1) as user_access_avg,
          ROUND(AVG(treatment_rating), 1) as user_treatment_avg,
          ROUND(AVG(helpful_rating), 1) as user_helpful_avg,
          ROUND(AVG(effectiveness_rating), 1) as user_effectiveness_avg
        FROM user_ratings 
        WHERE offering_id = $1
      `;
      
      const { rows } = await query(sql, [offeringId]);
      userRatings = rows[0];
    }
    
    if (!userRatings || userRatings.user_rating_count === 0) {
      return null;
    }
    
    // Get recent comments
    const commentsData = await getUserCommentsForOffering(offeringId, 3);
    
    return {
      overall: parseFloat(userRatings.user_overall_avg) || 0,
      access: parseFloat(userRatings.user_access_avg) || 0,
      treatment: parseFloat(userRatings.user_treatment_avg) || 0,
      helpful: parseFloat(userRatings.user_helpful_avg) || 0,
      effectiveness: parseFloat(userRatings.user_effectiveness_avg) || 0,
      reviewCount: parseInt(userRatings.user_rating_count) || 0,
      comments: commentsData
    };
    
  } catch (error) {
    console.error('Error fetching user ratings:', error);
    
    // If tables don't exist yet, return null instead of throwing
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.log('User ratings tables not created yet');
      return null;
    }
    
    throw new Error('Failed to fetch user ratings');
  }
}

/**
 * Get recent user comments for an offering
 * @param {number} offeringId - The ID of the offering
 * @param {number} limit - Maximum number of comments to return
 * @returns {Promise<Array>} Array of comment objects
 */
async function getUserCommentsForOffering(offeringId, limit = 5) {
  try {
    const sql = `
      SELECT 
        comment,
        created_at
      FROM user_ratings 
      WHERE offering_id = $1 
        AND comment IS NOT NULL 
        AND comment != ''
      ORDER BY created_at DESC 
      LIMIT $2
    `;
    
    const { rows } = await query(sql, [offeringId, limit]);
    
    return rows.map(row => ({
      text: row.comment,
      date: row.created_at
    }));
    
  } catch (error) {
    console.error('Error fetching user comments:', error);
    return [];
  }
}

/**
 * Platform Ratings Functions
 */

/**
 * Get platform ratings for a specific offering
 * @param {number} offeringId - The ID of the offering
 * @returns {Promise<Object|null>} Platform ratings data or null if not found
 */
async function getPlatformRatingsForOffering(offeringId) {
  try {
    const sql = `
      SELECT 
        overall_rating,
        diversity_rating,
        accessibility_rating,
        qualification_rating,
        feedback_rating,
        protection_rating,
        privacy_rating,
        scientific_rating,
        assessed_by,
        assessed_at,
        notes
      FROM platform_ratings 
      WHERE offering_id = $1
    `;
    
    const { rows } = await query(sql, [offeringId]);
    
    if (rows.length === 0) {
      return null;
    }
    
    const rating = rows[0];
    
    return {
      overall: parseFloat(rating.overall_rating),
      offerType: {
        diversity: parseFloat(rating.diversity_rating),
        accessibility: parseFloat(rating.accessibility_rating)
      },
      quality: {
        qualification: parseFloat(rating.qualification_rating),
        feedback: parseFloat(rating.feedback_rating),
        protection: parseFloat(rating.protection_rating),
        privacy: parseFloat(rating.privacy_rating)
      },
      impact: {
        scientific: parseFloat(rating.scientific_rating)
      },
      assessedBy: rating.assessed_by,
      assessedAt: rating.assessed_at,
      notes: rating.notes
    };
    
  } catch (error) {
    console.error('Error fetching platform ratings:', error);
    
    // If table doesn't exist yet, return null instead of throwing
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.log('Platform ratings table not created yet');
      return null;
    }
    
    throw new Error('Failed to fetch platform ratings');
  }
}

/**
 * Rating Submission Functions
 */

/**
 * Submit a new user rating to the staging table
 * @param {Object} ratingData - The rating data to submit
 * @returns {Promise<Object>} Result object with success status and ID
 */
async function submitUserRating(ratingData) {
  try {
    // Validate required fields
    const required = ['offeringId', 'userId', 'overall', 'access', 'treatment', 'helpful', 'effectiveness'];
    for (const field of required) {
      if (!ratingData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Validate rating values are between 1-5
    const ratings = ['overall', 'access', 'treatment', 'helpful', 'effectiveness'];
    for (const rating of ratings) {
      const value = parseFloat(ratingData[rating]);
      if (isNaN(value) || value < 1.0 || value > 5.0) {
        throw new Error(`Invalid ${rating} rating: must be between 1.0 and 5.0`);
      }
    }
    
    // Table already exists from migration - no need to create
    
    // Check for duplicate submission (same user, same offering)
    const duplicateCheck = `
      SELECT id FROM user_ratings_staging 
      WHERE offering_id = $1 AND user_id = $2 AND reviewed = FALSE
    `;
    
    const { rows: duplicates } = await query(duplicateCheck, [ratingData.offeringId, ratingData.userId]);
    
    if (duplicates.length > 0) {
      throw new Error('You have already submitted a rating for this offering');
    }
    
    // Insert into staging table
    const sql = `
      INSERT INTO user_ratings_staging (
        offering_id, user_id, overall_rating, access_rating, 
        treatment_rating, helpful_rating, effectiveness_rating,
        comment, ip_address, user_agent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `;
    
    const params = [
      ratingData.offeringId,
      ratingData.userId,
      parseFloat(ratingData.overall),
      parseFloat(ratingData.access),
      parseFloat(ratingData.treatment),
      parseFloat(ratingData.helpful),
      parseFloat(ratingData.effectiveness),
      ratingData.comment || null,
      ratingData.ipAddress || null,
      ratingData.userAgent || null
    ];
    
    const { rows } = await query(sql, params);
    
    return {
      success: true,
      id: rows[0].id,
      message: 'Rating submitted successfully and is pending review'
    };
    
  } catch (error) {
    console.error('Error submitting user rating:', error);
    throw new Error(error.message || 'Failed to submit rating');
  }
}

/**
 * Bulk Ratings Functions
 */

/**
 * Get ratings summary for multiple offerings (used in search results)
 * @param {number[]} offeringIds - Array of offering IDs
 * @returns {Promise<Object>} Object with offering IDs as keys and rating summaries as values
 */
async function getRatingsSummaryForOfferings(offeringIds) {
  try {
    if (!offeringIds || offeringIds.length === 0) {
      return {};
    }
    
    // Create placeholder string for IN clause ($1, $2, $3, ...)
    const placeholders = offeringIds.map((_, index) => `$${index + 1}`).join(', ');
    
    // Try to use aggregation view first
    const viewExistsQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.views 
        WHERE table_name = 'rating_aggregations'
      );
    `;
    
    const { rows: viewCheck } = await query(viewExistsQuery);
    
    let summary = {};
    
    if (viewCheck[0].exists) {
      // Use aggregation view
      const sql = `
        SELECT 
          offering_id,
          user_overall_avg,
          platform_overall
        FROM rating_aggregations 
        WHERE offering_id IN (${placeholders})
      `;
      
      const { rows } = await query(sql, offeringIds);
      
      rows.forEach(row => {
        summary[row.offering_id] = {
          user: parseFloat(row.user_overall_avg) || null,
          platform: parseFloat(row.platform_overall) || null
        };
      });
    } else {
      // Manual aggregation from both tables
      
      // Get user ratings
      const userRatingsSql = `
        SELECT 
          offering_id,
          ROUND(AVG(overall_rating), 1) as avg_rating
        FROM user_ratings 
        WHERE offering_id IN (${placeholders})
        GROUP BY offering_id
      `;
      
      try {
        const { rows: userRows } = await query(userRatingsSql, offeringIds);
        userRows.forEach(row => {
          if (!summary[row.offering_id]) summary[row.offering_id] = {};
          summary[row.offering_id].user = parseFloat(row.avg_rating);
        });
      } catch (error) {
        console.log('User ratings table might not exist yet');
      }
      
      // Get platform ratings
      const platformRatingsSql = `
        SELECT 
          offering_id,
          overall_rating
        FROM platform_ratings 
        WHERE offering_id IN (${placeholders})
      `;
      
      try {
        const { rows: platformRows } = await query(platformRatingsSql, offeringIds);
        platformRows.forEach(row => {
          if (!summary[row.offering_id]) summary[row.offering_id] = {};
          summary[row.offering_id].platform = parseFloat(row.overall_rating);
        });
      } catch (error) {
        console.log('Platform ratings table might not exist yet');
      }
    }
    
    return summary;
    
  } catch (error) {
    console.error('Error fetching ratings summary:', error);
    return {}; // Return empty object instead of throwing
  }
}

/**
 * Admin Functions (for rating management)
 */

/**
 * Get pending user ratings for admin review
 * @param {number} [limit=50] - Maximum number of ratings to return
 * @param {number} [offset=0] - Number of ratings to skip
 * @returns {Promise<Array>} Array of pending ratings
 */
async function getPendingUserRatings(limit = 50, offset = 0) {
  try {
    const sql = `
      SELECT 
        id, offering_id, user_id, overall_rating, access_rating,
        treatment_rating, helpful_rating, effectiveness_rating,
        comment, submitted_at, ip_address
      FROM user_ratings_staging 
      WHERE reviewed = FALSE
      ORDER BY submitted_at ASC
      LIMIT $1 OFFSET $2
    `;
    
    const { rows } = await query(sql, [limit, offset]);
    return rows;
    
  } catch (error) {
    console.error('Error fetching pending ratings:', error);
    
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      return []; // Return empty array if table doesn't exist
    }
    
    throw new Error('Failed to fetch pending ratings');
  }
}

/**
 * Approve or reject a user rating
 * @param {number} stagingId - ID of the rating in staging table
 * @param {boolean} approved - Whether to approve (true) or reject (false)
 * @param {string} reviewedBy - Name/ID of the reviewer
 * @param {string} [rejectionReason] - Reason for rejection (if approved=false)
 * @returns {Promise<Object>} Result object
 */
async function reviewUserRating(stagingId, approved, reviewedBy, rejectionReason = null) {
  try {
    // Start transaction
    await query('BEGIN');
    
    // Update staging record
    const updateStagingSQL = `
      UPDATE user_ratings_staging 
      SET reviewed = TRUE, approved = $1, reviewed_at = NOW(), 
          reviewed_by = $2, rejection_reason = $3
      WHERE id = $4
      RETURNING *
    `;
    
    const { rows } = await query(updateStagingSQL, [approved, reviewedBy, rejectionReason, stagingId]);
    
    if (rows.length === 0) {
      await query('ROLLBACK');
      throw new Error('Staging rating not found');
    }
    
    const stagingRating = rows[0];
    
    // If approved, copy to main ratings table
    if (approved) {
      // Create user_ratings table if it doesn't exist
      const createTableSql = `
        CREATE TABLE IF NOT EXISTS user_ratings (
          id SERIAL PRIMARY KEY,
          offering_id INTEGER NOT NULL,
          user_id UUID NOT NULL,
          overall_rating DECIMAL(2,1) CHECK (overall_rating BETWEEN 1.0 AND 5.0) NOT NULL,
          access_rating DECIMAL(2,1) CHECK (access_rating BETWEEN 1.0 AND 5.0) NOT NULL,
          treatment_rating DECIMAL(2,1) CHECK (treatment_rating BETWEEN 1.0 AND 5.0) NOT NULL,
          helpful_rating DECIMAL(2,1) CHECK (helpful_rating BETWEEN 1.0 AND 5.0) NOT NULL,
          effectiveness_rating DECIMAL(2,1) CHECK (effectiveness_rating BETWEEN 1.0 AND 5.0) NOT NULL,
          comment TEXT,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL,
          verified_at TIMESTAMP DEFAULT NOW() NOT NULL,
          UNIQUE(offering_id, user_id)
        );
      `;
      
      await query(createTableSql);
      
      const insertMainSQL = `
        INSERT INTO user_ratings (
          offering_id, user_id, overall_rating, access_rating,
          treatment_rating, helpful_rating, effectiveness_rating, comment
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (offering_id, user_id) DO NOTHING
      `;
      
      await query(insertMainSQL, [
        stagingRating.offering_id,
        stagingRating.user_id,
        stagingRating.overall_rating,
        stagingRating.access_rating,
        stagingRating.treatment_rating,
        stagingRating.helpful_rating,
        stagingRating.effectiveness_rating,
        stagingRating.comment
      ]);
    }
    
    await query('COMMIT');
    
    return {
      success: true,
      approved,
      message: approved ? 'Rating approved and published' : 'Rating rejected'
    };
    
  } catch (error) {
    await query('ROLLBACK');
    console.error('Error reviewing user rating:', error);
    throw new Error('Failed to review rating');
  }
}

// Export all functions
export {
  // User ratings
  getUserRatingsForOffering,
  getUserCommentsForOffering,
  submitUserRating,
  
  // Platform ratings
  getPlatformRatingsForOffering,
  
  // Bulk operations
  getRatingsSummaryForOfferings,
  
  // Admin functions
  getPendingUserRatings,
  reviewUserRating
};