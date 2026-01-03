# Ratings API Documentation

This directory contains the backend API for the Moodbase ratings system. The API provides endpoints for managing both user ratings and platform ratings with proper validation, rate limiting, and error handling.

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database with ratings tables installed
- Environment variables configured

### Installation

```bash
# Install dependencies
npm install express cors helmet compression express-rate-limit uuid

# Set up database (run the migration first)
psql -d moodbase_db -f database/migrations/001_create_rating_tables.sql

# Start the server
node api/server.js
```

### Environment Variables

Create a `.env` file in your project root:

```env
# Server configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database configuration
DATABASE_URL=postgresql://username:password@localhost:5432/moodbase_db

# Security (optional)
JWT_SECRET=your-jwt-secret-for-admin-auth
```

## API Endpoints

### User Ratings

#### Get User Ratings for an Offering
```http
GET /api/ratings/user/:offeringId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overall": 4.2,
    "access": 4.1,
    "treatment": 4.5,
    "helpful": 4.0,
    "effectiveness": 4.3,
    "reviewCount": 28,
    "comments": [
      {
        "text": "Very helpful service",
        "date": "2024-02-15T10:30:00Z"
      }
    ]
  }
}
```

#### Submit User Rating
```http
POST /api/ratings/submit
Content-Type: application/json

{
  "offeringId": 123,
  "userId": "optional-uuid",
  "overall": 4.5,
  "access": 4.0,
  "treatment": 5.0,
  "helpful": 4.5,
  "effectiveness": 4.0,
  "comment": "Very helpful and professional service"
}
```

**Rate Limited:** 3 submissions per 15 minutes per IP

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "id": 456,
    "message": "Rating submitted successfully and is pending review"
  },
  "userId": "generated-or-provided-uuid"
}
```

### Platform Ratings

#### Get Platform Ratings for an Offering
```http
GET /api/ratings/platform/:offeringId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overall": 4.1,
    "offerType": {
      "diversity": 4.2,
      "accessibility": 4.0
    },
    "quality": {
      "qualification": 4.5,
      "feedback": 3.8,
      "protection": 4.2,
      "privacy": 4.4
    },
    "impact": {
      "scientific": 4.0
    },
    "assessedBy": "Moodbase Team",
    "assessedAt": "2024-01-15T00:00:00.000Z",
    "notes": "Established counseling service with experienced staff"
  }
}
```

### Bulk Operations

#### Get Ratings Summary for Multiple Offerings
```http
GET /api/ratings/summary?offeringIds=1,2,3,4,5
```

**Response:**
```json
{
  "success": true,
  "data": {
    "1": {
      "user": 4.2,
      "platform": 4.1
    },
    "2": {
      "user": 4.6,
      "platform": 4.3
    },
    "3": {
      "user": null,
      "platform": 4.1
    }
  },
  "count": 3
}
```

### Admin Endpoints

#### Get Pending Ratings for Review
```http
GET /api/admin/ratings/pending?limit=50&offset=0
```

#### Review a Pending Rating
```http
POST /api/admin/ratings/review
Content-Type: application/json

{
  "stagingId": 123,
  "approved": true,
  "reviewedBy": "admin-username",
  "rejectionReason": "Spam content" // only if approved=false
}
```

## Rate Limiting

- **General API**: 100 requests per minute per IP
- **Rating Submission**: 3 submissions per 15 minutes per IP
- **Global**: 200 requests per minute per IP

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

- `INVALID_OFFERING_ID` - Invalid or missing offering ID
- `INVALID_RATING_VALUE` - Rating value not between 1.0-5.0
- `DUPLICATE_SUBMISSION` - User already submitted rating for this offering
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `VALIDATION_ERROR` - Invalid input data
- `RATINGS_NOT_FOUND` - No ratings found for offering
- `INTERNAL_SERVER_ERROR` - Server error

## Integration Examples

### Frontend Integration
```javascript
// Fetch ratings for an offering
const response = await fetch('/api/ratings/user/123');
const { data } = await response.json();

// Submit a rating
const rating = {
  offeringId: 123,
  overall: 4.5,
  access: 4.0,
  treatment: 5.0,
  helpful: 4.5,
  effectiveness: 4.0,
  comment: "Great service!"
};

const submitResponse = await fetch('/api/ratings/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(rating)
});
```

### Search Results Enhancement
```javascript
// Get ratings for search results
const offeringIds = searchResults.map(r => r.id);
const ratingsResponse = await fetch(`/api/ratings/summary?offeringIds=${offeringIds.join(',')}`);
const { data: ratings } = await ratingsResponse.json();

// Add ratings to search results
searchResults.forEach(result => {
  if (ratings[result.id]) {
    result.ratings = ratings[result.id];
  }
});
```

## Database Connection

Update the database connection in `services/ratingsService.js`:

```javascript
// Replace the mock query function with your actual database connection
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const query = async (text, params) => {
  return pool.query(text, params);
};
```

## Security Features

- **Rate Limiting**: Prevents abuse and spam
- **Input Validation**: Validates all inputs and sanitizes data
- **SQL Injection Protection**: Uses parameterized queries
- **CORS Protection**: Configurable CORS settings
- **Helmet Security**: Security headers for production
- **IP Logging**: Tracks submissions for fraud detection

## Monitoring

### Health Check
```http
GET /health
```

Returns server status and uptime information.

### Logging

The API logs all errors and important events. In production, integrate with your logging service (e.g., Winston, Logstash).

## Deployment

### Production Considerations

1. **Database Connection Pool**: Configure connection pooling
2. **Environment Variables**: Set production environment variables
3. **SSL/HTTPS**: Enable HTTPS in production
4. **Admin Authentication**: Implement proper admin authentication for admin endpoints
5. **Monitoring**: Set up application monitoring and alerts

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "api/server.js"]
```

## Testing

### Manual Testing with curl

```bash
# Test user ratings endpoint
curl "http://localhost:3001/api/ratings/user/1"

# Test rating submission
curl -X POST "http://localhost:3001/api/ratings/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "offeringId": 1,
    "overall": 4.5,
    "access": 4.0,
    "treatment": 5.0,
    "helpful": 4.5,
    "effectiveness": 4.0
  }'

# Test bulk ratings summary
curl "http://localhost:3001/api/ratings/summary?offeringIds=1,2,3"
```

## Support

For questions about the ratings API:
1. Check this documentation
2. Review the database schema in `/database/README.md`
3. Examine the service layer in `/services/ratingsService.js`
4. Test endpoints with the provided examples