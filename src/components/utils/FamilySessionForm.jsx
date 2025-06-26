import React, { useState } from "react";
import { useForm } from "react-hook-form";

const FamilySessionForm = ({ onClose, availableSessions, selectedSession }) => {
  const [familyMembers, setFamilyMembers] = useState([{ name: "" }]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sessionModes = [
    { value: "in-person", label: "In-Person Session" },
    { value: "online", label: "Online Session" },
    { value: "hybrid", label: "Hybrid (In-Person & Online)" },
  ];

  const paymentOptions = [
    { value: "credit-card", label: "Credit Card" },
    { value: "debit-card", label: "Debit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank-transfer", label: "Bank Transfer" },
  ];

  const addFamilyMember = () => {
    if (familyMembers.length < 4) {
      setFamilyMembers([...familyMembers, { name: "" }]);
    }
  };

  const removeFamilyMember = (index) => {
    if (familyMembers.length > 1) {
      const updatedMembers = [...familyMembers];
      updatedMembers.splice(index, 1);
      setFamilyMembers(updatedMembers);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Add your form submission logic here
    reset();
    setFamilyMembers([{ name: "" }]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden z-9999">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
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

      <div className="py-8 px-6 md:px-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#6E2D79] mb-2">
            Book Your Family Session
          </h2>
          <p className="text-gray-600 mb-2">
            Selected Session: {selectedSession?.Venue} on{" "}
            {selectedSession?.date}
          </p>
          <div className="w-16 h-1 bg-[#6E2D79] mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Date & Time */}
            <div>
              <label className="block text-[#6E2D79] font-medium mb-4">
                Available Time Slots
              </label>

              <div className="space-y-3">
                {availableSessions?.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <input
                      type="radio"
                      id={session.id}
                      value={`${session.date} - ${session.time}`}
                      checked // This makes it checked by default
                      readOnly // Makes it not changeable
                      className="h-4 w-4 text-[#6E2D79] focus:ring-[#6E2D79] border-[#E5D0E9]"
                      {...register("sessionSlot")}
                    />
                    <label
                      htmlFor={session.id}
                      className="ml-3 block text-base text-gray-700"
                    >
                      <span className="font-medium">{session.date}</span>
                      <span className="text-gray-500 ml-2">{session.time}</span>
                      <span className="block text-gray-500">
                        {session.Venue}
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              {errors.sessionSlot && (
                <p className="mt-2 text-red-500 text-sm">
                  {errors.sessionSlot.message}
                </p>
              )}
            </div>

            {/* Family Members */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[#6E2D79] font-medium">
                  Family Members (up to 4)
                </label>
                {familyMembers.length < 4 && (
                  <button
                    type="button"
                    onClick={addFamilyMember}
                    className="flex items-center text-[#6E2D79] hover:text-[#8a3c97] transition-colors text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add member
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {familyMembers.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder={`Family member ${index + 1} name`}
                        className={`w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#6E2D79] text-gray-700 ${
                          errors[`familyMember${index}`] ? "border-red-300" : ""
                        }`}
                        {...register(`familyMember${index}`, {
                          required: `Family member ${
                            index + 1
                          } name is required`,
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeFamilyMember(index)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {errors[`familyMember0`] && (
                <p className="mt-2 text-red-500 text-sm">
                  {errors[`familyMember0`].message}
                </p>
              )}
            </div>

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
                className="w-full py-4 bg-[#6E2D79] text-white font-medium rounded-lg hover:bg-[#8a3c97] transition-colors shadow-md"
              >
                Complete Registration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamilySessionForm;
