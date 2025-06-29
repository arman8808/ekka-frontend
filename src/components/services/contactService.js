import api from "./api";

const contactService = {
  submitContactForm: async (formData) => {
    try {
      const response = await api.post("/contact", formData);
      return response;
    } catch (error) {
      t;
      throw new Error(error.message || "Failed to submit contact form");
    }
  },
};

export default contactService;
