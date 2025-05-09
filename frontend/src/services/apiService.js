import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

const API = axios.create({
  baseURL,
  timeout: 60000,
});

// Request interceptor for adding Authorization token
API.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally for any failed request
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Backend Error:', error.response.data);
    } else if (error.request) {
      // No response received from server
      console.error('Network Error:', error.message);
    } else {
      // Other errors (e.g., config error)
      console.error('Error setting up request:', error.message);
    }

    // Optional: You could also redirect to login if unauthorized, or show a user-friendly message.
    return Promise.reject(error);
  }
);

export default API;
