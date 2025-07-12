import React, { useState } from "react";
import { useForm } from "react-hook-form";
import familyService from "../services/familyConsitalation";
import toast from "react-hot-toast";

const FamilySessionForm = ({ onClose, selectedSession }) => {
  const [IsSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Processing your registration...");

    try {
      const formData = {
        session: {
          id: selectedSession.id,
          Event: selectedSession.Event,
          Date: selectedSession.Date,
          Location: selectedSession.Location,
          organisedby: selectedSession.organisedby,
          capacity: selectedSession.capacity,
          status: selectedSession.status,
        },
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
      };

      const response = await familyService.registerSession(formData);

      toast.success(response.message || "Registration successful!", {
        id: loadingToast,
        duration: 4000,
        position: "top-center",
        style: {
          background: "#6E2D79",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#6E2D79",
        },
      });

      // Show thank you popup
      setShowThankYou(true);
      reset();

      // Close form after delay
      setTimeout(() => {
        setShowThankYou(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${error.message}`, {
        id: loadingToast,
        duration: 5000,
        position: "top-center",
        style: {
          background: "#ff4d4f",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff4d4f",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ThankYouMessage = () => (
    <div
      className="bg-white rounded-lg max-w-md w-full p-8 text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-16 w-16 text-green-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg text-gray-600 leading-relaxed">
          Thank you for Registration. Payment link has been sent to your
          registered Mail ID
        </p>
      </div>
    </div>
  );
  return (
    <>
      {showThankYou ? (
        <ThankYouMessage />
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden flex flex-col h-full">
          {/* Close button */}
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close form"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 hover:text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form content with scrollable area */}
          <div className="py-8 px-6 md:px-10 flex-grow overflow-y-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#6E2D79] mb-2">
                Book Your Session
              </h2>
              <p className="text-gray-600 mb-2">
                Selected Session: {selectedSession?.Event} on{" "}
                {selectedSession?.Date}
              </p>
              <div className="w-16 h-1 bg-[#6E2D79] mx-auto"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Session Details Display - Purple Theme */}
              <div className="bg-[#F5EDF7] border border-[#C183B2] rounded-lg p-4">
                <label className="block text-[#6E2D79] font-medium mb-3">
                  Session Details
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-[#6E2D79] opacity-80">Event</p>
                    <p className="font-medium text-[#6E2D79]">
                      {selectedSession?.Event}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6E2D79] opacity-80">Date</p>
                    <p className="font-medium text-[#6E2D79]">
                      {selectedSession?.Date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6E2D79] opacity-80">
                      Location
                    </p>
                    <p className="font-medium text-[#6E2D79]">
                      {selectedSession?.Location}
                    </p>
                  </div>
                  {/* <div>
                <p className="text-sm text-[#6E2D79] opacity-80">
                  Organized By
                </p>
                <p className="font-medium text-[#6E2D79]">
                  {selectedSession?.organisedby}
                </p>
              </div> */}
                  <div>
                    <p className="text-sm text-[#6E2D79] opacity-80">
                      Capacity
                    </p>
                    <p className="font-medium text-[#6E2D79]">
                      {selectedSession?.capacity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6E2D79] opacity-80">Status</p>
                    <p className="font-medium text-[#6E2D79]">
                      {selectedSession?.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[#6E2D79] font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-white focus:outline-none focus:ring-1 focus:ring-[#6E2D79] text-gray-700 ${
                    errors.fullName ? "border-red-300" : ""
                  }`}
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.fullName && (
                  <p className="mt-2 text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-[#6E2D79] font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#6E2D79] text-gray-700 ${
                      errors.email ? "border-red-300" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Contact Number (USA) */}
                <div>
                  <label className="block text-[#6E2D79] font-medium mb-2">
                    Contact Number (USA)
                  </label>
                  <div className="flex">
                    <div className="w-16 mr-2">
                      <input
                        type="text"
                        value="+1"
                        readOnly
                        className="w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-gray-100 text-gray-700"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="tel"
                        placeholder="(123) 456-7890"
                        className={`w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#6E2D79] text-gray-700 ${
                          errors.phone ? "border-red-300" : ""
                        }`}
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                            message: "Please enter a valid US phone number",
                          },
                        })}
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 text-white font-medium rounded-lg transition-colors shadow-md cursor-pointer ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#6E2D79] hover:bg-[#8a3c97]"
                    }`}
                  >
                    {isSubmitting ? "Processing..." : "Complete Registration"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FamilySessionForm;
