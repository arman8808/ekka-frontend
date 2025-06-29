import api from "./api";

const familyService = {
  registerSession: async (sessionData) => {
    try {
      const response = await api.post(
        "/familyConsitalation/register",
        sessionData
      );
      return response;
    } catch (error) {
      // Handle specific error messages if available
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to register for session";
      throw new Error(errorMessage);
    }
  },
};

export default familyService;
