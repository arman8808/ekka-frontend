import React from "react";

const FormCheckbox = ({
  label,
  name,
  register,
  error,
  className = "",
}) => (
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
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default FormCheckbox;