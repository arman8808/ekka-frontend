import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import familyService from "../services/familyConsitalation";
import toast from "react-hot-toast";

// Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  termsandcondition: yup.boolean().oneOf([true], "You must accept the terms and conditions").required(),
});

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
const FamilySessionForm = ({ onClose, selectedSession, programId }) => {
  const [IsSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      termsandcondition: false,
    },
  });
     const onSubmit = async (data) => {
     setIsSubmitting(true);
     const loadingToast = toast.loading("Processing your registration...");

           try {
        const formData = {
          programId: selectedSession._id, // Use the event's _id as programId
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          termsAndCondition: data.termsandcondition || false, // Fixed field name
          communicationPreferences: data.communicationPreferences || false,
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

      setShowThankYou(true);
      reset();

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
          You will shortly receive an email from contact@ekaausa.com with
          further details
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
                 Selected Session: {selectedSession?.event} on{" "}
                 {selectedSession?.date}
               </p>
              <div className="w-16 h-1 bg-[#6E2D79] mx-auto"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Hidden field for program ID */}
              <input type="hidden" value={programId} />
              
              {/* Session Details Display - Purple Theme */}
              <div className="bg-[#F5EDF7] border border-[#C183B2] rounded-lg p-4">
                <label className="block text-[#6E2D79] font-medium mb-3">
                  Session Details
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                     <div>
                     <p className="text-sm text-[#6E2D79] opacity-80">Event</p>
                     <p className="font-medium text-[#6E2D79]">
                       {selectedSession?.event}
                     </p>
                   </div>
                   <div>
                     <p className="text-sm text-[#6E2D79] opacity-80">Date</p>
                     <p className="font-medium text-[#6E2D79]">
                       {selectedSession?.date}
                     </p>
                   </div>
                   <div>
                     <p className="text-sm text-[#6E2D79] opacity-80">
                       Location
                     </p>
                     <p className="font-medium text-[#6E2D79]">
                       {selectedSession?.location}
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
                  {selectedSession?.price && (
                    <div>
                      <p className="text-sm text-[#6E2D79] opacity-80">Price</p>
                      <p className="font-medium text-[#6E2D79]">
                        {selectedSession?.price}
                      </p>
                    </div>
                  )}
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
                                     {...register("fullName")}
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
                                       {...register("email")}
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
                        {...register("phone")}
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="mt-6">
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
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-[#4A2C82]">
                    Terms and Conditions
                  </h2>
                  <div className="bg-[#F8F1FF] h-[2px] my-4"></div>
                  <div className="border p-4 rounded-lg text-sm text-[#C183B2] space-y-2">
                    <p>
                      I confirm that I am over 18 years of age and choose to
                      attend this workshop / course of my own free will.
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
                    className="mt-3"
                  />
                  {errors.termsandcondition && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.termsandcondition.message}
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
