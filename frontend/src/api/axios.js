import axios from 'axios';

const defaultBaseUrl = `${window.location.protocol}//${window.location.hostname}:5000/api`;

const api = axios.create({
  // This pulls the URL from your .env file
  baseURL: import.meta.env.VITE_API_BASE_URL || defaultBaseUrl
});

export default api;
