// Mapbox configuration
// This file handles environment variable access for Mapbox token

const getMapboxToken = () => {
  // Method 1: Try Vite environment variables (import.meta.env)
  if (import.meta && import.meta.env && import.meta.env.VITE_MAPBOX_TOKEN) {
    return import.meta.env.VITE_MAPBOX_TOKEN;
  }
  
  // Method 2: Fallback to process.env for Node.js environments
  if (typeof process !== 'undefined' && process.env && process.env.VITE_MAPBOX_TOKEN) {
    return process.env.VITE_MAPBOX_TOKEN;
  }
  
  // Method 3: Check if the token was injected as a global variable
  if (typeof window !== 'undefined' && window.VITE_MAPBOX_TOKEN) {
    return window.VITE_MAPBOX_TOKEN;
  }
  
  // Method 4: For development, you can temporarily hardcode your token here
  // IMPORTANT: Remove this before committing to git!
  // Uncomment the line below and add your actual Mapbox token to test
  // const DEVELOPMENT_TOKEN = 'pk.your_actual_mapbox_token_here';
  // return DEVELOPMENT_TOKEN;
  
  console.warn('Mapbox token not found. Please add VITE_MAPBOX_TOKEN to your .env file and restart your development server.');
  return null;
};

export const MAPBOX_TOKEN = getMapboxToken();
export default MAPBOX_TOKEN;