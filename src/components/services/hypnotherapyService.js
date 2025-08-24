import axios from "axios";
import Cookies from "js-cookie";
const API_URL = `${import.meta.env.VITE_API_BASE_URL}hypnotherapy`;

// Create axios instance
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

const hypnotherapyService = {
  // Get all programs with pagination and search (Admin)
  getPrograms: async (search = "", page = 1, limit = 10) => {
    try {
      const response = await api.get("", {
        params: { search, page, limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get all programs for users (no pagination/search)
  getUserPrograms: async () => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get single program for users
  getUserProgramById: async (id) => {
    try {
      const response = await api.get(`/user/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Create new program
  createProgram: async (programData) => {
    try {
      const response = await api.post("", programData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Update program
  updateProgram: async (id, programData) => {
    try {
      const response = await api.put(`/${id}`, programData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Delete program
  deleteProgram: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Get single program (Admin)
  getProgramById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
};

export default hypnotherapyService;
