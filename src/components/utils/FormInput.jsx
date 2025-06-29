import React from "react";

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

export default FormInput;