// src/services/api.js
import axios from 'axios';

// Get the API URL from environment variables with fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // Optional: add timeout
  timeout: 10000 // 10 seconds
});

// Request interceptor - useful for adding auth tokens later
api.interceptors.request.use(
  (config) => {
    // You can add auth token here when you implement user auth
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error);
    // You can handle specific errors here (like 401 unauthorized)
    return Promise.reject(error);
  }
);

// Wrapper functions for API endpoints

/**
 * Fetch all offerings
 */
export const fetchOfferings = async () => {
  try {
    const response = await api.get('/offerings');
    return response.data;
  } catch (error) {
    console.error('Error fetching offerings:', error);
    throw error;
  }
};

/**
 * Search offerings by term
 * @param {string} term - Search term
 */
export const searchOfferings = async (term) => {
  try {
    const response = await api.get(`/offerings/search?term=${encodeURIComponent(term)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching offerings:', error);
    throw error;
  }
};

/**
 * Fetch offering by ID
 * @param {number} id - Offering ID
 */
export const fetchOfferingById = async (id) => {
  try {
    const response = await api.get(`/offerings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching offering details:', error);
    throw error;
  }
};

/**
 * Fetch map data for all offerings with coordinates
 */
export const fetchMapData = async () => {
  try {
    const response = await api.get('/map');
    return response.data;
  } catch (error) {
    console.error('Error fetching map data:', error);
    throw error;
  }
};

/**
 * Submit a rating for an offering
 * @param {number} userId - User ID
 * @param {number} entryId - Offering ID
 * @param {object} rating - Rating data with overall and categories
 */
export const submitRating = async (userId, entryId, rating) => {
  try {
    const response = await api.post('/ratings', {
      userId,
      entryId,
      overallRating: rating.overall,
      categoryRatings: rating.categories,
      comment: rating.comment || null
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting rating:', error);
    throw error;
  }
};

// Not implemented yet, but you'll need these for admin functions later
export const addOffering = async (offering) => {
  try {
    const response = await api.post('/offerings', offering);
    return response.data;
  } catch (error) {
    console.error('Error adding offering:', error);
    throw error;
  }
};

export const updateOffering = async (id, offering) => {
  try {
    const response = await api.put(`/offerings/${id}`, offering);
    return response.data;
  } catch (error) {
    console.error('Error updating offering:', error);
    throw error;
  }
};

export const deleteOffering = async (id) => {
  try {
    const response = await api.delete(`/offerings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting offering:', error);
    throw error;
  }
};

export default api;