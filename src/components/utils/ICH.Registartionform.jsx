import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import {
  Camera,
  Upload,
  AlertCircle,
  CheckCircle,
  User,
  X,
} from "lucide-react";

// Services
import registrationService from "../services/Ich.registrationService";

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

// How did you hear about us options
const hearAboutOptions = [
  "Facebook",
  "Instagram",
  "Google",
  "LinkedIn",
  "Friends/Relatives",
  "Other",
];

// City options for select dropdown
const cityOptions = [
  {
    value: "Houston | Hypnotherapy L3 Training | 13th-17th Aug",
    label:
      "Houston | Advanced Course in Integrated Hypnotic Modalities for Health Resolutions | 13th-17th Aug",
    level: 3,
    levelName:
      "Advanced Course in Integrated Hypnotic Modalities for Health Resolutions",
    date: "13th–17th Aug",
  },
  {
    value: "Houston | Hypnotherapy L2 Training | 13th–17th Aug",
    label:
      "Houston | Course in Integrated Hypnotic Modalities for Behavioral Resolutions. | 13th–17th Aug",
    level: 2,
    levelName:
      "Course in Integrated Hypnotic Modalities for Behavioral Resolutions.",
    date: "13th–17th Aug",
  },
  {
    value: "Houston | Hypnotherapy L1 Training | 20th-21th Aug",
    label:
      "Houston | Basic Course in Integrated Clinical Hypnotherapy Certification | 20th-21th Aug",
    level: 1,
    levelName: "Basic Course in Integrated Clinical Hypnotherapy Certification",
    date: "20th–21st Aug",
  },
  {
    value: "Houston | Hypnotherapy L1 Training | 11th Aug-12th Aug",
    label:
      "Houston | Basic Course in Integrated Clinical Hypnotherapy Certification | 11th Aug-12th Aug",
    level: 1,
    levelName: "Basic Course in Integrated Clinical Hypnotherapy Certification",
    date: "11th Aug-12th Aug",
  },
];

// Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  mobileNo: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  city: yup.string().required("City is required"),
  dob: yup.date().required("Date of birth is required"),
  occupation: yup.string().required("Occupation is required"),
  profileImage: yup.mixed().optional("Profile photo is required"),
  frontImage: yup.mixed().required("Front ID photo is required"),
  termsandcondition: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required(),
});

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

// Profile Image Upload Component
// const ProfileImageUpload = ({ image, onUpload, error }) => {
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Create preview URL
//     // const preview = URL.createObjectURL(file);
//     // onUpload({ file, preview });
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <div className="relative">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//           id="upload-profile"
//         />
//         <label
//           htmlFor="upload-profile"
//           className={`flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-full cursor-pointer transition-colors duration-200 overflow-hidden ${
//             error
//               ? "border-red-300 hover:border-red-400 hover:bg-red-50"
//               : "border-gray-300 hover:border-[#9D4EDD] hover:bg-gray-50"
//           }`}
//         >
//           {image ? (
//             <img
//               src={image}
//               alt="Profile"
//               className="w-full h-full object-cover rounded-full"
//             />
//           ) : (
//             <>
//               <User
//                 size={32}
//                 className={error ? "text-red-400" : "text-gray-400"}
//               />
//               <Upload
//                 size={16}
//                 className={error ? "text-red-400 mt-1" : "text-gray-400 mt-1"}
//               />
//             </>
//           )}
//         </label>
//       </div>

//       <div className="text-center">
//         <p
//           className={`text-sm font-medium mb-1 ${
//             error ? "text-red-600" : "text-gray-700"
//           }`}
//         >
//           Upload Profile Photo
//         </p>
//         <p className="text-xs text-gray-500">Click to select image</p>
//         {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
//       </div>
//     </div>
//   );
// };

// Upload Box Component
const UploadBox = ({ side, image, onUpload, error }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL
    const preview = URL.createObjectURL(file);
    onUpload({ file, preview }); // Pass both file and preview
  };
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id={`upload-${side}`}
        />
        <label
          htmlFor={`upload-${side}`}
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
          {side === "front" ? "Front ID" : "Back ID"} Photo
        </p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      <p className="text-xs text-[#9D4EDD] text-center max-w-40 leading-relaxed">
        {side === "front"
          ? "Please write your name legibly on the reverse of your ID*"
          : "Back side of ID (optional)"}
      </p>
    </div>
  );
};

// Form Input Component
const FormInput = ({
  label,
  name,
  type = "text",
  register,
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
      {...register(name)}
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
  register,
  error,
  required = false,
  rows = 3,
  className = "",
  readOnly = false,
}) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-[#6E2D79] mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      {...register(name)}
      rows={rows}
      readOnly={readOnly}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C183B2] ${
        error ? "border-red-500" : "border-gray-300"
      } ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Form Radio Group Component
// Form Radio Group Component (fixed)
const FormRadioGroup = ({
  label,
  name,
  options = [],
  control,
  error,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-[#6E2D79] mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <Controller
            key={option.value}
            name={name}
            control={control}
            render={({ field }) => (
              <label
                className={`
                  relative flex items-start p-4 border rounded-lg cursor-pointer
                  transition-all duration-200
                  ${
                    field.value === option.value
                      ? "border-[#6E2D79] bg-[#F9F0FF]"
                      : "border-gray-200 hover:border-[#C183B2]"
                  }
                `}
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  className="sr-only"
                />
                <div className="flex items-center h-5">
                  <div
                    className={`
                    flex items-center justify-center w-5 h-5 rounded-full border
                    ${
                      field.value === option.value
                        ? "border-[#6E2D79]"
                        : "border-gray-300"
                    }
                  `}
                  >
                    {field.value === option.value && (
                      <div className="w-3 h-3 rounded-full bg-[#6E2D79]"></div>
                    )}
                  </div>
                </div>
                <span className="ml-3 block text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            )}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
    </div>
  );
};

// Form Checkbox Component
const FormCheckbox = ({ label, name, register, error, className = "" }) => (
  <div className={`flex items-start space-x-3 mt-4 ${className}`}>
    <input
      type="checkbox"
      id={name}
      {...register(name)}
      className={`w-4 h-4 text-[#6E2D79] focus:ring-[#C183B2] mt-1 ${
        error ? "border-red-500" : ""
      }`}
    />
    <label htmlFor={name} className="text-sm text-[#6E2D79]">
      {label}
    </label>
    {error && <p className="text-red-500 text-xs mt-1 ml-7">{error}</p>}
  </div>
);

const RegistrationForm = ({ onClose = () => {}, level, date }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      levelName: localStorage.getItem("level") || "",
      communicationPreferences: false,
      isSameAddress: false,
      profileImage:
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    },
  });

  // Watched values
  const firstName = watch("firstName");
  const middleName = watch("middleName");
  const lastName = watch("lastName");
  const currentAddress = watch("currentAddress");
  const isSameAddress = watch("isSameAddress");
  const city = watch("city");

  // Auto-fill name as certificate
  useEffect(() => {
    const fullName = `${firstName || ""} ${middleName || ""} ${lastName || ""}`
      .trim()
      .replace(/\s+/g, " ");
    if (fullName) setValue("nameAsCertificate", fullName);
  }, [firstName, middleName, lastName, setValue]);

  // Auto-fill permanent address
  useEffect(() => {
    if (isSameAddress && currentAddress) {
      setValue("permanenetAddress", currentAddress);
    }
  }, [isSameAddress, currentAddress, setValue]);

  // Auto-fill venue and time slot
  useEffect(() => {
    if (city) {
      const selectedCity = Object.keys(cityConfig).find((c) =>
        city.includes(c)
      );
      if (selectedCity) {
        const config = cityConfig[selectedCity];
        setValue("courseDetailVenue", config.venue);
        setValue("timeslot", config.slot);
      }
    }
  }, [city, setValue]);

  const handleFileUpload = (file, fieldName) => {
    setValue(fieldName, file);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const formData = new FormData();

      const dummyImageData = new Blob(
        [
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
        ],
        { type: "image/png" }
      );
      const dummyImage = new File([dummyImageData], "/default-profile.png", {
        type: "image/png",
      });

      // Add dummy profile image
      // formData.append("profileImage", dummyImage);

      // Process other fields
      Object.entries(data).forEach(([key, value]) => {
        if (["frontImage", "backImage"].includes(key)) {
          if (value?.file) {
            formData.append(key, value.file);
          }
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (level) {
        formData.append("level", level);
      }

      const loadingToast = toast.loading("Submitting registration...");
      const response = await registrationService.submitRegistration(formData);

      toast.dismiss(loadingToast);
      toast.success("Registration submitted successfully!");
      setShowThankYou(true);
      setTimeout(() => onClose(), 5000);
    } catch (error) {
      console.error("Registration error:", error);

      // Properly extract error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      setApiError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Handle Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);
  useEffect(() => {
    return () => {
      // Cleanup preview URLs when component unmounts
      const fields = ["frontImage", "backImage"];
      fields.forEach((field) => {
        const value = watch(field);
        if (value?.preview) {
          URL.revokeObjectURL(value.preview);
        }
      });
    };
  }, []);
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
              className="text-gray-500 hover:text-gray-700 text-2xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {apiError && (
              <ErrorAlert error={apiError} onClose={() => setApiError(null)} />
            )}

            {/* Profile Image Section */}
            {/* <div>
              <div className="bg-[#F8F1FF] h-[2px] mb-6"></div>
              <div className="flex justify-center">
                <Controller
                  name="profileImage"
                  control={control}
                  render={({ field }) => (
                    <ProfileImageUpload
                      image={field.value?.preview}
                      onUpload={(uploadData) => {
                        field.onChange(uploadData);
                      }}
                      error={errors.profileImage?.message}
                    />
                  )}
                />
              </div>
            </div> */}

            {/* Personal Information */}
            <div>
              <div className="bg-[#F8F1FF] h-[2px] mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  name="firstName"
                  register={register}
                  error={errors.firstName}
                  required
                />

                <FormInput
                  label="Middle Name"
                  name="middleName"
                  register={register}
                />

                <FormInput
                  label="Last Name"
                  name="lastName"
                  register={register}
                  error={errors.lastName}
                  required
                />

                <FormInput
                  label="Name as on Certificate"
                  name="nameAsCertificate"
                  register={register}
                  readOnly
                />

                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  register={register}
                  error={errors.email}
                  required
                />

                <FormInput
                  label="Mobile Number"
                  name="mobileNo"
                  type="tel"
                  register={register}
                  error={errors.mobileNo}
                  required
                />

                <FormInput
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  register={register}
                  error={errors.dob}
                  required
                />

                <FormInput
                  label="Occupation"
                  name="occupation"
                  register={register}
                  error={errors.occupation}
                  required
                />
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
                  register={register}
                  rows={3}
                />

                <FormCheckbox
                  label="Permanent address is same as current address"
                  name="isSameAddress"
                  register={register}
                />

                <FormTextarea
                  label="Permanent Address"
                  name="permanenetAddress"
                  register={register}
                  rows={3}
                  readOnly={isSameAddress}
                />

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <FormRadioGroup
                    label="City"
                    name="city"
                    options={cityOptions.filter(
                      (option) =>
                        option.level.toString() === level &&
                        option.date.toString() == date
                    )}
                    control={control}
                    error={errors.city}
                    required
                  />
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
                <Controller
                  name="frontImage"
                  control={control}
                  render={({ field }) => (
                    <UploadBox
                      side="front"
                      image={field.value?.preview}
                      onUpload={(file) => {
                        handleFileUpload(file, "frontImage");
                        field.onChange(file);
                      }}
                      error={errors.frontImage?.message}
                    />
                  )}
                />

                <Controller
                  name="backImage"
                  control={control}
                  render={({ field }) => (
                    <UploadBox
                      side="back"
                      image={field.value?.preview}
                      onUpload={(file) => {
                        handleFileUpload(file, "backImage");
                        field.onChange(file);
                      }}
                    />
                  )}
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
                      value={option}
                      {...register("hearAbout")}
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
              <FormCheckbox
                label="Yes, I am interested in receiving mailers/SMS from EKAA about future courses"
                name="communicationPreferences"
                register={register}
              />
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
              <FormCheckbox
                label="I agree to the terms and conditions mentioned above. *"
                name="termsandcondition"
                register={register}
                error={errors.termsandcondition?.message}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-[#6E2D79] text-white rounded-md transition-colors flex items-center justify-center min-w-[140px] cursor-pointer ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#5a2465]"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const ThankYouMessage = () => (
  <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
    <div className="mb-6">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
      <p className="text-lg text-gray-600 leading-relaxed">
        You will shortly receive an email from contact@ekaausa.com with further
        details
      </p>
    </div>
  </div>
);

export default RegistrationForm;
