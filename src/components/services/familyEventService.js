import axios from "axios";
import Cookies from "js-cookie";
const API_URL = `${import.meta.env.VITE_API_BASE_URL}familyEvent`;

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const familyEventService = {
  // Get all events for users (no admin token required)
  getUserEvents: async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}familyEvent/user`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get single event for users by ID
  getUserEventById: async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}familyEvent/user/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get all events with pagination and search (admin only)
  getEvents: async (search = "", page = 1, limit = 50) => {
    try {
      const response = await api.get("", {
        params: { search, page, limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Create new event
  createEvent: async (eventData) => {
    try {
      const response = await api.post("", eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Update event
  updateEvent: async (id, eventData) => {
    try {
      const response = await api.put(`/${id}`, eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Delete event
  deleteEvent: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get single event
  getEventById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
};

export default familyEventService;
