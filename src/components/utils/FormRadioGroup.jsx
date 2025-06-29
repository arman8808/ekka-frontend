import React from "react";

const FormRadioGroup = ({
  label,
  name,
  options = [],
  control,
  error,
  required = false,
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
              control?.value === option.value
                ? "border-[#6E2D79] bg-[#F9F0FF]"
                : "border-gray-200 hover:border-[#C183B2]"
            }
          `}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={control?.value === option.value}
            onChange={() => control?.onChange(option.value)}
            className="sr-only"
          />
          <div className="flex items-center h-5">
            <div
              className={`
              flex items-center justify-center w-5 h-5 rounded-full border
              ${control?.value === option.value ? "border-[#6E2D79]" : "border-gray-300"}
            `}
            >
              {control?.value === option.value && (
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

export default FormRadioGroup;