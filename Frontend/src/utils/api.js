import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token and username
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authToken');
  const username = sessionStorage.getItem('userName');
  
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  
  if (username) {
    config.headers['username'] = username;
  }
  
  return config;
});

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized and 403 Forbidden
      if (error.response.status === 401 || error.response.status === 403) {
        // Clear auth data and redirect to login
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userName');
        window.location.href = '/login';
      }
      // Handle other errors
      console.error('API Error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export const budgetApi = {
  // Get all budget categories
  getCategories: () => api.get('/categories/'),
  
  // Create a new budget category
  createCategory: (data) => {
    const formData = new FormData();
    formData.append('category', data.category);
    formData.append('limit', data.limit);
    if (data.image) {
      formData.append('image', data.image);
    }
    return api.post('/categories/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Update a budget category
  updateCategory: (id, data) => {
    const formData = new FormData();
    formData.append('category', data.category);
    formData.append('limit', data.limit);
    if (data.image) {
      formData.append('image', data.image);
    }
    return api.put(`/categories/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Delete a budget category
  deleteCategory: (id) => api.delete(`/categories/${id}/`),
};

export const entriesApi = {
  // Get all entries
  getEntries: () => api.get('/entries/'),
  
  // Create a new entry
  createEntry: (data) => api.post('/entries/', data),
  
  // Update an entry
  updateEntry: (id, data) => api.put(`/entries/${id}/`, data),
  
  // Delete an entry
  deleteEntry: (id) => api.delete(`/entries/${id}/`),
};

export default api; 