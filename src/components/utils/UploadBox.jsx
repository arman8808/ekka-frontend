import React from "react";
import { Camera, Upload } from "lucide-react";

const UploadBox = ({ side, image, onUpload, error }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create preview URL
    const preview = URL.createObjectURL(file);
    onUpload({ file, preview });
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

export default UploadBox;