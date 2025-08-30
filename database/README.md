# Database Schema for Ratings System

This directory contains the database schema and migrations for the Moodbase ratings system.

## Overview

The ratings system uses a dual approach:
- **User Ratings**: Community-driven ratings with 4 criteria plus overall score
- **Platform Ratings**: Expert assessments by Moodbase team with weighted categories

## Database Tables

### 1. `user_ratings_staging`
Stores unverified user-submitted ratings for review.

**Purpose**: Prevents spam and allows moderation before ratings go live.

**Key Fields**:
- `offering_id`: Links to main offerings table
- `user_id`: Anonymous UUID for user identification
- Rating criteria: `access_rating`, `treatment_rating`, `helpful_rating`, `effectiveness_rating`
- Moderation fields: `reviewed`, `approved`, `reviewed_by`

### 2. `user_ratings` 
Verified user ratings displayed publicly.

**Purpose**: Clean, verified ratings for public display.

**Key Features**:
- Unique constraint prevents duplicate ratings per user/offering
- Same rating criteria as staging table
- Includes verification timestamps

### 3. `platform_ratings`
Moodbase expert assessments using weighted criteria.

**Purpose**: Professional quality assessment with standardized methodology.

**Rating Categories**:
- **Art des Angebots (30%)**: `diversity_rating` (15%), `accessibility_rating` (15%)
- **Qualität der Beratung (50%)**: `qualification_rating` (16%), `feedback_rating` (10%), `protection_rating` (14%), `privacy_rating` (10%)
- **Wirkanalyse (20%)**: `scientific_rating` (20%)

### 4. `rating_aggregations` (View)
Pre-calculated aggregations for efficient frontend queries.

**Purpose**: Avoid expensive real-time calculations on every API call.

## Running Migrations

### Prerequisites
- PostgreSQL database
- Appropriate database credentials
- Existing `offerings` table (referenced by `offering_id`)

### Execute Migration

```bash
# Connect to your database and run the migration
psql -d moodbase_db -U your_username -f database/migrations/001_create_rating_tables.sql
```

### Verify Installation

```sql
-- Check tables were created
\dt

-- Check sample data
SELECT * FROM platform_ratings LIMIT 3;
SELECT * FROM user_ratings LIMIT 3;

-- Test aggregation view
SELECT * FROM rating_aggregations LIMIT 3;
```

## API Integration

The database is designed to work with these API endpoints:

- `GET /api/ratings/user/:offeringId` - Fetch user ratings
- `GET /api/ratings/platform/:offeringId` - Fetch platform ratings  
- `POST /api/ratings/submit` - Submit new user rating (to staging)
- `GET /api/ratings/summary?offeringIds=1,2,3` - Bulk fetch for search results

## Rating Calculation

### User Ratings
- Simple averages of all verified ratings for an offering
- Calculated in real-time or via the `rating_aggregations` view

### Platform Ratings  
- Uses weighted formula with automatic calculation via database trigger
- Overall score = (Art×0.3) + (Qualität×0.5) + (Wirkanalyse×0.2)
- Updates automatically when individual scores change

## Data Flow

### User Rating Submission
1. User submits rating → `user_ratings_staging`
2. Admin reviews → sets `reviewed=true`, `approved=true/false`  
3. If approved → copy to `user_ratings`
4. Frontend displays only verified ratings from `user_ratings`

### Platform Rating Management
1. Expert assessment → direct insert to `platform_ratings`
2. Trigger calculates overall score automatically
3. Frontend displays immediately (no approval needed)

## Security Considerations

- Anonymous user IDs prevent personal identification
- IP address logging for fraud detection  
- Staging table prevents spam from reaching public display
- Input validation via CHECK constraints
- Unique constraints prevent duplicate submissions

## Performance

- Indexes on frequently queried fields (`offering_id`, rating scores)
- Aggregation view reduces real-time calculation overhead
- Efficient bulk queries for search result pages

## Sample Queries

### Get all ratings for an offering
```sql
SELECT * FROM rating_aggregations WHERE offering_id = 1;
```

### Get user ratings summary for multiple offerings
```sql
SELECT 
    offering_id,
    user_rating_count,
    user_overall_avg,
    platform_overall
FROM rating_aggregations 
WHERE offering_id IN (1,2,3,4,5);
```

### Find highly rated offerings
```sql
SELECT offering_id, platform_overall, user_overall_avg
FROM rating_aggregations 
WHERE platform_overall >= 4.0 
ORDER BY platform_overall DESC;
```