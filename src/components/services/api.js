import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.ekaausa.com/api/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    config.headers['X-Request-ID'] = crypto.randomUUID();
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {

    return response.data;
  },
  (error) => {
  
    if (error.response) {
 
      const { status, data } = error.response;
      
      if (status === 401) {

        console.error('Authentication required');
      }
      

      const apiError = new Error(data?.message || 'API request failed');
      apiError.status = status;
      apiError.data = data;
      
      return Promise.reject(apiError);
    } else if (error.request) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {

      return Promise.reject(new Error('Request configuration error'));
    }
  }
);

// Export API methods
export default {
  post: (url, data, config) => api.post(url, data, config),
  get: (url, config) => api.get(url, config),
  put: (url, data, config) => api.put(url, data, config),
  delete: (url, config) => api.delete(url, config),
};