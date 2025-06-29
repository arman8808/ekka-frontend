import React, { useState, useEffect } from "react";
import { Camera, Upload, AlertCircle, CheckCircle, User } from "lucide-react";

// API Service Layer - Functional approach with centralized configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL,
  endpoints: {
    registration: "/registration",
  },
};

// HTTP Request utility function
const httpRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.baseURL}${endpoint}`;

  const config = {
    headers: {
      ...options.headers,
    },
    ...options,
  };

  // Don't set Content-Type for FormData - browser will set it with boundary
  if (options.body instanceof FormData && config.headers["Content-Type"]) {
    delete config.headers["Content-Type"];
  }

  try {
    const response = await fetch(url, config);

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(
        data.message || data || `HTTP error! status: ${response.status}`
      );
    }

    return {
      data,
      status: response.status,
      success: true,
    };
  } catch (error) {
    console.error("API Request failed:", error);
    throw new Error(error.message || "Network request failed");
  }
};

// API Service Functions - Functional approach
const apiService = {
  submitRegistration: async (formData) => {
    return httpRequest(API_CONFIG.endpoints.registration, {
      method: "POST",
      body: formData, // FormData object
    });
  },
};

// Custom Hook for API calls with proper error handling
const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (requestFn) => {
    setLoading(true);
    setError(null);

    try {
      const result = await requestFn();
      return result;
    } catch (err) {
      const errorMessage = err.message || "Request failed. Please try again.";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { makeRequest, loading, error, setError };
};

// City-Venue-Slot mapping configuration
const cityConfig = {
  "New York": {
    venue: "Main Hall",
    slot: "Morning",
  },
  "Los Angeles": {
    venue: "Conference Center",
    slot: "Evening",
  },
  Chicago: {
    venue: "Training Room",
    slot: "Night",
  },
};

// Error Alert Component
const ErrorAlert = ({ error, onClose }) => (
  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
    <div className="flex items-center">
      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-red-800">Error</h3>
        <p className="text-sm text-red-700 mt-1">{error}</p>
      </div>
      <button onClick={onClose} className="text-red-400 hover:text-red-600">
        ×
      </button>
    </div>
  </div>
);

// Success Alert Component
const SuccessAlert = ({ message }) => (
  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
    <div className="flex items-center">
      <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
      <div>
        <h3 className="text-sm font-medium text-green-800">Success</h3>
        <p className="text-sm text-green-700 mt-1">{message}</p>
      </div>
    </div>
  </div>
);

// Form Validation with comprehensive rules
const validateForm = (formData, frontImage, backImage, profileImage) => {
  const errors = {};

  // Required fields validation
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "mobileNo",
    "city",
    "dob",
    "occupation",
    "levelName",
    // "courseDetailVenue",
    // "timeslot",
  ];

  requiredFields.forEach((field) => {
    if (!formData[field] || formData[field].trim() === "") {
      errors[field] = `${field
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()} is required`;
    }
  });

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone number validation (10 digits)
  const phoneRegex = /^\d{10}$/;
  if (formData.mobileNo && !phoneRegex.test(formData.mobileNo)) {
    errors.mobileNo = "Mobile number must be 10 digits";
  }

  // if (
  //   formData.TelNo &&
  //   formData.TelNo.trim() !== "" &&
  //   !phoneRegex.test(formData.TelNo)
  // ) {
  //   errors.TelNo = "Telephone number must be 10 digits";
  // }

  // File validation
  if (!profileImage) {
    errors.profileImage = "Profile photo is required";
  }
  if (!frontImage) {
    errors.frontImage = "Front ID photo is required";
  }
  // if (!backImage) {
  //   errors.backImage = "Back ID photo is required";
  // }

  // Terms acceptance
  if (!formData.termsandcondition) {
    errors.termsandcondition = "You must accept the terms and conditions";
  }

  return errors;
};

// Form Data Builder - Ensures proper API payload structure
const buildFormDataPayload = (
  formData,
  frontImageFile,
  backImageFile,
  profileImageFile
) => {
  const payload = new FormData();

  // Append all form fields with proper data types
  Object.entries(formData).forEach(([key, value]) => {
    let formattedValue = value;

    // Convert boolean to string for API compatibility
    if (typeof value === "boolean") {
      formattedValue = value.toString();
    }
    // Handle null/undefined values
    else if (value === null || value === undefined) {
      formattedValue = "";
    }

    payload.append(key, formattedValue);
  });

  // Append files with exact field names matching your API
  if (profileImageFile) {
    payload.append("profileImage", profileImageFile, profileImageFile.name);
  }
  if (frontImageFile) {
    payload.append("idPhotofront", frontImageFile, frontImageFile.name);
  }
  if (backImageFile) {
    payload.append("idphotoback", backImageFile, backImageFile.name);
  }

  return payload;
};

// Profile Image Upload Component - New component for profile photo
const ProfileImageUpload = ({ image, onUpload, error }) => (
  <div className="flex flex-col items-center space-y-4">
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onUpload(e, "profile")}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        id="upload-profile"
      />
      <label
        htmlFor="upload-profile"
        className={`flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-full cursor-pointer transition-colors duration-200 overflow-hidden ${
          error
            ? "border-red-300 hover:border-red-400 hover:bg-red-50"
            : "border-gray-300 hover:border-[#9D4EDD] hover:bg-gray-50"
        }`}
      >
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <>
            <User
              size={32}
              className={error ? "text-red-400" : "text-gray-400"}
            />
            <Upload
              size={16}
              className={error ? "text-red-400 mt-1" : "text-gray-400 mt-1"}
            />
          </>
        )}
      </label>
    </div>

    <div className="text-center">
      <p
        className={`text-sm font-medium mb-1 ${
          error ? "text-red-600" : "text-gray-700"
        }`}
      >
        Upload Profile Photo
      </p>
      <p className="text-xs text-gray-500">Click to select image</p>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  </div>
);

// Upload Box Component - Extracted for reusability
const UploadBox = ({ side, image, onUpload, error }) => {
  // Generate unique ID for accessibility
  const inputId = `upload-${side}`;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <button
          type="button"
          className={`flex items-center gap-2 px-6 py-2 border-2 rounded-full font-medium transition-colors duration-200 ${
            error
              ? "border-red-500 text-red-500 hover:bg-red-50"
              : "border-[#9D4EDD] text-[#9D4EDD] hover:bg-[#9D4EDD] hover:text-white"
          }`}
        >
          {side === "front" ? "Front" : "Back"}
        </button>
      </div>

      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onUpload(e, side)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id={inputId}
          {...(side === "front" && { required: true })}
        />
        <label
          htmlFor={inputId}
          className={`flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
            error
              ? "border-red-300 hover:border-red-400 hover:bg-red-50"
              : "border-gray-300 hover:border-[#9D4EDD] hover:bg-gray-50"
          }`}
        >
          {image ? (
            <img
              src={image}
              alt={`${side} side of document`}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <>
              <Camera
                size={24}
                className={error ? "text-red-400" : "text-gray-400"}
              />
              <Upload
                size={16}
                className={error ? "text-red-400" : "text-gray-400"}
              />
            </>
          )}
        </label>
      </div>

      <div className="text-center">
        <p
          className={`text-sm font-medium mb-1 ${
            error ? "text-red-600" : "text-gray-700"
          }`}
        >
          Click to upload photo
        </p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      <p className="text-xs text-[#9D4EDD] text-center max-w-40 leading-relaxed">
        Please write your name legibly on the reverse of your ID
        {side === "front" ? "*" : ""}
      </p>
    </div>
  );
};

// Thank You Component - Extracted for better organization
const ThankYouMessage = () => (
  <div
    className="bg-white rounded-lg max-w-md w-full p-8 text-center"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="mb-6">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
      {/* <h2 className="text-3xl font-bold text-[#6E2D79] mb-4">THANK YOU</h2> */}
      <p className="text-lg text-gray-600 leading-relaxed">
        Thank you for Registration. Payment link has ben sent on your registered
        Mail ID
      </p>
    </div>
  </div>
);

// Form Input Component - Reusable input field with error handling
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  readOnly = false,
  placeholder = "",
  className = "",
}) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-[#6E2D79] mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C183B2] ${
        error ? "border-red-500" : "border-gray-300"
      } ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Form Textarea Component
const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  rows = 3,
  className = "",
}) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-[#6E2D79] mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C183B2] ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
const FormCheckbox = ({ label, name, checked, onChange }) => {
  return (
    <div className="form-group">
      <label className="text-[#6E2D79]">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="mr-1 custom-checkbox"
        />
        {label}
      </label>
    </div>
  );
};

// Form Select Component
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  options = [],
  placeholder = "Select...",
  className = "",
}) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-[#6E2D79] mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C183B2] ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Custom hook for form data management
const useFormData = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateMultipleFields = (updates) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return { formData, updateField, updateMultipleFields, setFormData };
};

// Main Form Component
function FormPage({ onClose = () => {} }) {
  const { formData, updateField, updateMultipleFields } = useFormData({
    firstName: "",
    middleName: "",
    lastName: "",
    nameAsCertificate: "",
    currentAddress: "",
    permanenetAddress: "",
    city: "",
    venue: "",
    timeslot: "",
    TelNo: "",
    mobileNo: "",
    email: "",
    dob: "",
    occupation: "",
    courseDetailDate: "",
    courseDetailTime: "",
    courseDetailVenue: "",
    hearAbout: "",
    communicationPreferences: false,
    termsandcondition: false,
    isSameAddress: false,
    levelName: localStorage.getItem("level"),
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontImageFile, setFrontImageFile] = useState(null);
  const [backImageFile, setBackImageFile] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { makeRequest, loading, error, setError } = useApiCall();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    updateField(name, newValue);

    // Auto-fill venue and slot when city is selected
    if (name === "city" && value) {
      const config = cityConfig[value];
      if (config) {
        updateMultipleFields({
          city: value,
          courseDetailVenue: config.venue,
          timeslot: config.slot,
        });
      }
    }

    // Auto-fill nameAsCertificate
    if (name === "firstName" || name === "middleName" || name === "lastName") {
      const firstName = name === "firstName" ? value : formData.firstName;
      const middleName = name === "middleName" ? value : formData.middleName;
      const lastName = name === "lastName" ? value : formData.lastName;

      updateMultipleFields({
        [name]: newValue,
        nameAsCertificate: `${firstName} ${middleName} ${lastName}`
          .trim()
          .replace(/\s+/g, " "),
      });
    }
    if (name === "isSameAddress" && checked) {
      updateMultipleFields({
        isSameAddress: checked,
        permanenetAddress: formData.currentAddress,
      });
    }
    if (name === "currentAddress" && formData.isSameAddress) {
      updateField("permanenetAddress", value);
    }
    if (type === "radio") {
      updateField(name, value);

      // Auto-fill venue and slot when city is selected
      const config = cityConfig[value];
      if (config) {
        updateMultipleFields({
          city: value,
          courseDetailVenue: config.venue,
          timeslot: config.slot,
        });
      }
      return;
    }
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileUpload = (event, side) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (side === "profile") {
        setProfileImage(e.target.result);
        setProfileImageFile(file);
      } else if (side === "front") {
        setFrontImage(e.target.result);
        setFrontImageFile(file);
      } else {
        setBackImage(e.target.result);
        setBackImageFile(file);
      }
    };
    reader.readAsDataURL(file);

    // Clear file error
    if (formErrors[`${side}Image`]) {
      setFormErrors((prev) => ({
        ...prev,
        [`${side}Image`]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form
    const errors = validateForm(formData, frontImage, backImage, profileImage);
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors); // Log validation errors
      setFormErrors(errors);
      setError("Please fix the errors below before submitting");
      const firstErrorField = document.querySelector(".border-red-500");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      console.log("Preparing form submission...");

      // Build FormData payload
      const payload = buildFormDataPayload(
        formData,
        frontImageFile,
        backImageFile,
        profileImageFile
      );

      // Enhanced payload logging
      console.log("Form Data Payload Contents:");
      for (let [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }

      // Make actual API call
      console.log(
        "Making API request to:",
        API_CONFIG.baseURL + API_CONFIG.endpoints.registration
      );
      const response = await makeRequest(() =>
        apiService.submitRegistration(payload)
      );

      console.log("Registration successful - Full response:", response);
      setShowThankYou(true);

      setTimeout(() => {
        onClose();
      }, 5000);
    } catch (err) {
      console.error("Registration failed - Error details:", {
        message: err.message,
        stack: err.stack,
        response: err.response, // In case the error has a response property
      });

      // Set a more detailed error message
      setError(`Submission failed: ${err.message || "Unknown error"}`);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const FormRadioGroup = ({
    label,
    name,
    value,
    onChange,
    error,
    required = false,
    options = [],
    className = "",
  }) => (
    <div className={className}>
      <label className="block text-sm font-semibold text-[#6E2D79] mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
            relative flex items-start p-4 border rounded-lg cursor-pointer
            transition-all duration-200
            ${
              value === option.value
                ? "border-[#6E2D79] bg-[#F9F0FF]"
                : "border-gray-200 hover:border-[#C183B2]"
            }
          `}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="sr-only" // Hide default radio button
            />
            <div className={`flex items-center h-5`}>
              <div
                className={`
              flex items-center justify-center w-5 h-5 rounded-full border
              ${value === option.value ? "border-[#6E2D79]" : "border-gray-300"}
            `}
              >
                {value === option.value && (
                  <div className="w-3 h-3 rounded-full bg-[#6E2D79]"></div>
                )}
              </div>
            </div>
            <span className="ml-3 block text-sm text-gray-700">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );

  // Handle Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // City options for select dropdown
  const cityOptions = [
    {
      value: "New York | Ekaa Centre Auditorium | 17:00 (GMT-4)",
      label: "New York | Ekaa Centre Auditorium | 17:00 (GMT-4)",
    },
    {
      value: "Los Angeles | Conference Center | 19:00 (GMT-7)",
      label: "Los Angeles | Conference Center | 19:00 (GMT-7)",
    },
    {
      value: "Chicago | Training Room | 20:00 (GMT-5)",
      label: "Chicago | Training Room | 20:00 (GMT-5)",
    },
  ];

  // How did you hear about us options
  const hearAboutOptions = [
    "Facebook",
    "Instagram",
    "Google",
    "LinkedIn",
    "Friends/Relatives",
    "Other",
  ];

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[111111]"
      onClick={handleOverlayClick}
    >
      {showThankYou ? (
        <ThankYouMessage />
      ) : (
        <div
          className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold text-[#6E2D79]">
              Registration Form
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error Display */}
            {error && (
              <ErrorAlert error={error} onClose={() => setError(null)} />
            )}

            {/* Profile Image Section */}
            <div>
              <div className="bg-[#F8F1FF] h-[2px] mb-6"></div>

              <div className="flex justify-center">
                <ProfileImageUpload
                  image={profileImage}
                  onUpload={handleFileUpload}
                  error={formErrors.profileImage}
                />
              </div>
            </div>

            {/* Personal Information */}
            <div>
              {/* <h2 className="text-xl font-semibold text-[#6E2D79] mb-4">Personal Information</h2> */}
              <div className="bg-[#F8F1FF] h-[2px] mb-6"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={formErrors.firstName}
                  required
                />

                <FormInput
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                />

                <FormInput
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={formErrors.lastName}
                  required
                />

                <FormInput
                  label="Name as on Certificate"
                  name="nameAsCertificate"
                  value={formData.nameAsCertificate}
                  onChange={handleInputChange}
                  readOnly
                />

                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                  required
                />

                <FormInput
                  label="Mobile Number"
                  name="mobileNo"
                  type="tel"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  error={formErrors.mobileNo}
                  required
                />

                {/* <FormInput
                  label="Telephone Number"
                  name="TelNo"
                  type="tel"
                  value={formData.TelNo}
                  onChange={handleInputChange}
                  error={formErrors.TelNo}
                /> */}

                <FormInput
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  error={formErrors.dob}
                  required
                />

                <FormInput
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  error={formErrors.occupation}
                  required
                />

                {/* <FormInput
                  label="Office"
                  name="office"
                  value={formData.office}
                  onChange={handleInputChange}
                /> */}
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-semibold text-[#6E2D79] mb-4">
                Address Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <FormTextarea
                  label="Current Address"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                  rows={3}
                />
                <FormCheckbox
                  label="Permanent address is same as current address"
                  name="isSameAddress"
                  checked={formData.isSameAddress}
                  onChange={handleInputChange}
                />
                <FormTextarea
                  label="Permanent Address"
                  name="permanenetAddress"
                  value={formData.permanenetAddress}
                  onChange={handleInputChange}
                  rows={3}
                />

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  {/* <FormSelect
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={formErrors.city}
                    options={cityOptions}
                    placeholder="Select City"
                    required
                  /> */}
                  <FormRadioGroup
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={formErrors.city}
                    options={cityOptions}
                    required
                  />

                  {/* <FormInput
                    label="Venue"
                    name="courseDetailVenue"
                    value={formData.courseDetailVenue}
                    onChange={handleInputChange}
                    error={formErrors.courseDetailVenue}
                    placeholder="Auto-selected based on city"
                    readOnly
                    required
                  />

                  <FormInput
                    label="Time Slot"
                    name="timeslot"
                    value={formData.timeslot}
                    onChange={handleInputChange}
                    error={formErrors.timeslot}
                    placeholder="Auto-selected based on city"
                    readOnly
                    required
                    className="capitalize"
                  /> */}
                </div>
              </div>
            </div>

            {/* ID Upload Section */}
            <div className="w-full max-w-4xl mx-auto p-6 bg-white">
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-800 mb-2">
                  Attach a Photo Proof.
                  <span className="text-red-500">*</span>
                </h2>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-16">
                <UploadBox
                  side="front"
                  image={frontImage}
                  onUpload={handleFileUpload}
                  error={formErrors.frontImage}
                />
                <UploadBox
                  side="back"
                  image={backImage}
                  onUpload={handleFileUpload}
                  error={formErrors.backImage}
                />
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Accepted formats: JPG, PNG, PDF (Max size: 5MB)
                </p>
              </div>
            </div>

            {/* How did you hear about us */}
            <div>
              <h2 className="text-xl font-semibold text-[#6E2D79] mb-6">
                How did you hear about this course?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hearAboutOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="hearAbout"
                      value={option}
                      checked={formData.hearAbout === option}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#6E2D79] focus:ring-[#C183B2]"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Communication Preferences */}
            <div>
              <h2 className="text-xl font-semibold text-[#4A2C82]">
                Communication Preferences
              </h2>
              <div className="bg-[#F8F1FF] h-[2px] my-4"></div>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="communicationPreferences"
                  checked={formData.communicationPreferences}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#6E2D79] focus:ring-[#C183B2] mt-1"
                />
                <span className="text-sm text-[#C183B2]">
                  Yes, I am interested in receiving mailers/SMS from EKAA
                  Integrated Clinical Hypnotherapy Foundation about future
                  courses
                </span>
              </label>
            </div>

            {/* Terms and Conditions */}
            <div>
              <h2 className="text-xl font-semibold text-[#4A2C82]">
                Terms and Conditions
              </h2>
              <div className="bg-[#F8F1FF] h-[2px] my-4"></div>
              <div className="border p-4 rounded-lg text-sm text-[#C183B2] space-y-2">
                <p>
                  I confirm that I am over 18 years of age and choose to attend
                  this workshop / course of my own free will.
                </p>
                <p>
                  I confirm that I have no mental / psychological ailment /
                  disorder and am not on any psychiatric / psychological
                  treatment/s and/or drug/s.
                </p>
                <p>
                  I also discharge the organization from any obligation
                  whatsoever that may arise during the workshop/course.
                </p>
                <p>
                  I have read and understood the aims and objectives of the
                  course curriculum.
                </p>
              </div>
              <label className="flex items-start space-x-3 mt-4">
                <input
                  type="checkbox"
                  name="termsandcondition"
                  checked={formData.termsandcondition}
                  onChange={handleInputChange}
                  className={`w-4 h-4 text-[#6E2D79] focus:ring-[#C183B2] mt-1 ${
                    formErrors.termsandcondition ? "border-red-500" : ""
                  }`}
                />
                <span className="text-sm text-[#6E2D79]">
                  I agree to the terms and conditions mentioned above. *
                </span>
              </label>
              {formErrors.termsandcondition && (
                <p className="text-red-500 text-xs mt-1 ml-7">
                  {formErrors.termsandcondition}
                </p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-[#6E2D79] text-white rounded-md transition-colors flex items-center justify-center min-w-[140px] ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#5a2465]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
const styles = `
  .form-checkbox-group {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
  }
  
  .custom-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #6E2D79;
    border-radius: 4px;
    margin-right: 8px;
    position: relative;
    cursor: pointer;
  }
  
  .custom-checkbox:checked {
    background-color: #6E2D79;
  }
  
  .custom-checkbox:checked::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .checkbox-label {
    cursor: pointer;
    user-select: none;
  }
`;

// Add the styles to the head (if using plain JS)
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default FormPage;
