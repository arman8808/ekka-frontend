import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'https://api.ekaausa.com/api/'}events/open`;

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

const scheduleService = {
  // Get all schedule events with pagination and search
  getScheduleEvents: async (search = "", page = 1, limit = 50) => {
    try {
      const response = await api.get("", {
        params: { search, page, limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get schedule events by program type
  getEventsByType: async (programType) => {
    try {
      const response = await api.get(`/type/${programType}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get upcoming events
  getUpcomingEvents: async () => {
    try {
      const response = await api.get("/upcoming");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get events by date range
  getEventsByDateRange: async (startDate, endDate) => {
    try {
      const response = await api.get("/date-range", {
        params: { startDate, endDate },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get single event by ID
  getEventById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
};

export default scheduleService;

