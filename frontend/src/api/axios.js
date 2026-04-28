import axios from 'axios';

const api = axios.create({
  // This pulls the URL from your .env file
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export default api;
