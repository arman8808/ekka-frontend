import api from "./api";

const ICHRegistrationService = {
  submitRegistration: async (formData) => {
    try {
      const response = await api.post("/ich/ich-registration", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to submit registration");
    }
  },
};

export default ICHRegistrationService;