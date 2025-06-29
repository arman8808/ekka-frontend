import React from "react";
import { Upload, User } from "lucide-react";

const ProfileImageUpload = ({ image, onUpload, error }) => {
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
};

export default ProfileImageUpload;