-- Ratings System Database Schema
-- This migration creates the tables needed for the dual rating system
-- Run with: psql -d moodbase -f database/migrations/001_create_rating_tables.sql

-- ============================================================================
-- 1. USER RATINGS STAGING TABLE
-- Stores unverified user-submitted ratings for review
-- ============================================================================

CREATE TABLE user_ratings_staging (
    id SERIAL PRIMARY KEY,
    offering_id INTEGER NOT NULL, -- References offerings(id) in main DB
    user_id UUID NOT NULL, -- Anonymous user identifier (generated client-side)
    
    -- Rating scores (1.0 - 5.0)
    overall_rating DECIMAL(2,1) CHECK (overall_rating BETWEEN 1.0 AND 5.0) NOT NULL,
    access_rating DECIMAL(2,1) CHECK (access_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Zugang
    treatment_rating DECIMAL(2,1) CHECK (treatment_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Umgang  
    helpful_rating DECIMAL(2,1) CHECK (helpful_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Hilfreich
    effectiveness_rating DECIMAL(2,1) CHECK (effectiveness_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Wirksamkeit
    
    -- Optional user comment
    comment TEXT,
    
    -- Metadata for fraud detection and verification
    submitted_at TIMESTAMP DEFAULT NOW() NOT NULL,
    ip_address INET,
    user_agent TEXT,
    
    -- Verification status
    reviewed BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT NULL, -- NULL = pending, TRUE = approved, FALSE = rejected
    reviewed_at TIMESTAMP,
    reviewed_by VARCHAR(100),
    rejection_reason TEXT
);

-- Indexes for efficient querying
CREATE INDEX idx_user_ratings_staging_offering_id ON user_ratings_staging(offering_id);
CREATE INDEX idx_user_ratings_staging_submitted_at ON user_ratings_staging(submitted_at);
CREATE INDEX idx_user_ratings_staging_user_id ON user_ratings_staging(user_id);
CREATE INDEX idx_user_ratings_staging_pending ON user_ratings_staging(reviewed) WHERE reviewed = FALSE;

-- ============================================================================
-- 2. USER RATINGS TABLE
-- Stores verified user ratings that are displayed publicly
-- ============================================================================

CREATE TABLE user_ratings (
    id SERIAL PRIMARY KEY,
    offering_id INTEGER NOT NULL, -- References offerings(id) in main DB
    user_id UUID NOT NULL, -- Anonymous user identifier
    
    -- Rating scores (1.0 - 5.0)
    overall_rating DECIMAL(2,1) CHECK (overall_rating BETWEEN 1.0 AND 5.0) NOT NULL,
    access_rating DECIMAL(2,1) CHECK (access_rating BETWEEN 1.0 AND 5.0) NOT NULL,
    treatment_rating DECIMAL(2,1) CHECK (treatment_rating BETWEEN 1.0 AND 5.0) NOT NULL,
    helpful_rating DECIMAL(2,1) CHECK (helpful_rating BETWEEN 1.0 AND 5.0) NOT NULL,
    effectiveness_rating DECIMAL(2,1) CHECK (effectiveness_rating BETWEEN 1.0 AND 5.0) NOT NULL,
    
    -- Optional user comment (sanitized)
    comment TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    verified_at TIMESTAMP DEFAULT NOW() NOT NULL,
    
    -- Prevent duplicate ratings from same user for same offering
    UNIQUE(offering_id, user_id)
);

-- Indexes for efficient aggregation queries
CREATE INDEX idx_user_ratings_offering_id ON user_ratings(offering_id);
CREATE INDEX idx_user_ratings_created_at ON user_ratings(created_at);
CREATE INDEX idx_user_ratings_overall_rating ON user_ratings(overall_rating);

-- ============================================================================
-- 3. PLATFORM RATINGS TABLE  
-- Stores Moodbase expert assessments of offerings
-- ============================================================================

CREATE TABLE platform_ratings (
    id SERIAL PRIMARY KEY,
    offering_id INTEGER NOT NULL UNIQUE, -- One rating per offering
    
    -- Overall calculated rating
    overall_rating DECIMAL(2,1) CHECK (overall_rating BETWEEN 1.0 AND 5.0) NOT NULL,
    
    -- Art des Angebots (30% weight)
    diversity_rating DECIMAL(2,1) CHECK (diversity_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Diversitätssensibilität (15%)
    accessibility_rating DECIMAL(2,1) CHECK (accessibility_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Barriere-Armut (15%)
    
    -- Qualität der Beratung & Zertifizierung (50% weight)
    qualification_rating DECIMAL(2,1) CHECK (qualification_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Qualifikation (16%)
    feedback_rating DECIMAL(2,1) CHECK (feedback_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Feedbackmöglichkeiten (10%)
    protection_rating DECIMAL(2,1) CHECK (protection_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Kinderschutz (14%)
    privacy_rating DECIMAL(2,1) CHECK (privacy_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Datenschutz (10%)
    
    -- Wirkanalyse (20% weight)
    scientific_rating DECIMAL(2,1) CHECK (scientific_rating BETWEEN 1.0 AND 5.0) NOT NULL, -- Wissenschaftliche Basis (20%)
    
    -- Assessment metadata
    assessed_by VARCHAR(100) NOT NULL DEFAULT 'Moodbase Team',
    assessed_at TIMESTAMP DEFAULT NOW() NOT NULL,
    last_updated TIMESTAMP DEFAULT NOW() NOT NULL,
    notes TEXT,
    
    -- Version tracking for rating updates
    version INTEGER DEFAULT 1 NOT NULL
);

-- Index for efficient lookups
CREATE INDEX idx_platform_ratings_offering_id ON platform_ratings(offering_id);
CREATE INDEX idx_platform_ratings_assessed_at ON platform_ratings(assessed_at);
CREATE INDEX idx_platform_ratings_overall_rating ON platform_ratings(overall_rating);

-- ============================================================================
-- 4. RATING AGGREGATIONS VIEW
-- Pre-calculated view for efficient frontend queries
-- ============================================================================

CREATE VIEW rating_aggregations AS
SELECT 
    offering_id,
    
    -- User ratings aggregation
    COUNT(ur.id) as user_rating_count,
    ROUND(AVG(ur.overall_rating), 1) as user_overall_avg,
    ROUND(AVG(ur.access_rating), 1) as user_access_avg,
    ROUND(AVG(ur.treatment_rating), 1) as user_treatment_avg,
    ROUND(AVG(ur.helpful_rating), 1) as user_helpful_avg,
    ROUND(AVG(ur.effectiveness_rating), 1) as user_effectiveness_avg,
    
    -- Platform ratings (direct from platform_ratings table)
    pr.overall_rating as platform_overall,
    pr.diversity_rating as platform_diversity,
    pr.accessibility_rating as platform_accessibility,
    pr.qualification_rating as platform_qualification,
    pr.feedback_rating as platform_feedback,
    pr.protection_rating as platform_protection,
    pr.privacy_rating as platform_privacy,
    pr.scientific_rating as platform_scientific,
    pr.assessed_by as platform_assessed_by,
    pr.assessed_at as platform_assessed_at,
    pr.notes as platform_notes
    
FROM platform_ratings pr
LEFT JOIN user_ratings ur ON pr.offering_id = ur.offering_id
GROUP BY 
    pr.offering_id,
    pr.overall_rating,
    pr.diversity_rating,
    pr.accessibility_rating,
    pr.qualification_rating,
    pr.feedback_rating,
    pr.protection_rating,
    pr.privacy_rating,
    pr.scientific_rating,
    pr.assessed_by,
    pr.assessed_at,
    pr.notes;

-- ============================================================================
-- 5. FUNCTIONS FOR RATING CALCULATIONS
-- ============================================================================

-- Function to calculate platform overall rating from subcriteria
CREATE OR REPLACE FUNCTION calculate_platform_overall_rating(
    diversity_score DECIMAL,
    accessibility_score DECIMAL,
    qualification_score DECIMAL,
    feedback_score DECIMAL,
    protection_score DECIMAL,
    privacy_score DECIMAL,
    scientific_score DECIMAL
) RETURNS DECIMAL(2,1) AS $$
DECLARE
    offer_type_score DECIMAL;
    quality_score DECIMAL;
    impact_score DECIMAL;
    overall_score DECIMAL;
BEGIN
    -- Art des Angebots (30%): Average of diversity (15%) + accessibility (15%)
    offer_type_score := (diversity_score + accessibility_score) / 2.0;
    
    -- Qualität der Beratung (50%): Weighted average
    -- qualification (16%) + feedback (10%) + protection (14%) + privacy (10%) = 50%
    -- Convert to proportional weights: 16/50, 10/50, 14/50, 10/50
    quality_score := (
        qualification_score * 0.32 + -- 16/50
        feedback_score * 0.20 +      -- 10/50  
        protection_score * 0.28 +    -- 14/50
        privacy_score * 0.20         -- 10/50
    );
    
    -- Wirkanalyse (20%): Scientific basis only
    impact_score := scientific_score;
    
    -- Overall weighted average: 30% + 50% + 20%
    overall_score := (
        offer_type_score * 0.30 +
        quality_score * 0.50 +
        impact_score * 0.20
    );
    
    -- Round to 1 decimal place
    RETURN ROUND(overall_score, 1);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================================
-- 6. TRIGGERS FOR AUTOMATIC OVERALL RATING CALCULATION
-- ============================================================================

-- Trigger function to automatically calculate overall rating when platform ratings are inserted/updated
CREATE OR REPLACE FUNCTION update_platform_overall_rating()
RETURNS TRIGGER AS $$
BEGIN
    NEW.overall_rating := calculate_platform_overall_rating(
        NEW.diversity_rating,
        NEW.accessibility_rating,
        NEW.qualification_rating,
        NEW.feedback_rating,
        NEW.protection_rating,
        NEW.privacy_rating,
        NEW.scientific_rating
    );
    
    NEW.last_updated := NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to platform_ratings table
CREATE TRIGGER trigger_platform_rating_calculation
    BEFORE INSERT OR UPDATE ON platform_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_platform_overall_rating();

-- ============================================================================
-- 7. SAMPLE DATA FOR TESTING
-- ============================================================================

-- Insert sample platform ratings
INSERT INTO platform_ratings (
    offering_id, diversity_rating, accessibility_rating,
    qualification_rating, feedback_rating, protection_rating, privacy_rating,
    scientific_rating, assessed_by, notes
) VALUES 
(1, 4.2, 4.0, 4.5, 3.8, 4.2, 4.4, 4.0, 'Moodbase Team', 'Etablierte Beratungsstelle mit erfahrenem Personal und guter Ausstattung.'),
(2, 4.1, 4.5, 4.6, 4.2, 4.0, 4.3, 4.4, 'Moodbase Team', 'Innovativer Ansatz für digitale Suchtproblematik mit wissenschaftlicher Fundierung.'),
(3, 4.3, 3.8, 4.9, 4.5, 4.7, 4.8, 4.7, 'Moodbase Team', 'Hochqualifizierte Privatpraxis mit exzellenten Behandlungsmethoden.');

-- Insert sample user ratings
INSERT INTO user_ratings (
    offering_id, user_id, overall_rating, access_rating, treatment_rating, helpful_rating, effectiveness_rating, comment
) VALUES 
(1, 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4.2, 4.1, 4.5, 4.0, 4.3, 'Sehr hilfsreich und verständnisvoll. Das Team hat mir wirklich geholfen.'),
(1, 'b2c3d4e5-f6a7-8901-bcde-f23456789012', 4.0, 3.8, 4.2, 3.9, 4.1, 'Lange Wartezeit, aber die Beratung war dann sehr gut.'),
(2, 'c3d4e5f6-a7b8-9012-cdef-345678901234', 4.6, 4.8, 4.7, 4.5, 4.4, 'Endlich jemand der sich mit digitaler Sucht auskennt!');

-- ============================================================================
-- End of migration
-- ============================================================================