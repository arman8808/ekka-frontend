import React from "react";
import { Clock, GraduationCap } from "lucide-react";

const DynamicLevelBanner = ({ levelData }) => {
  return (
    <div
      className="w-full bg-cover bg-center flex flex-col items-center justify-center text-center text-white py-16 px-4"
      style={{
        backgroundImage: "url('/decode/Hero Image.svg')", // Replace with correct path
        height: "541px",
        flexShrink: 0,
      }}
    >
      <h1 className=" text-[#6E2D79] font-[Poppins] text-[30px] sm:text-[35px] md:text-[60px] lg:text-[65px] font-semibold leading-[44px] sm:leading-[60px] md:leading-[72px] mb-2 sm:mb-4 -mt-8 sm:-mt-12">
        Level {levelData.level}: {levelData.title}
      </h1>
      <p className="text-[#5C2166] font-[Poppins] text-[16px] sm:text-[18px] lg:text-[18px] font-normal leading-[24px] px-4 mb-6">
        {levelData.subtitle}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex justify-center items-center gap-2 px-2.5 py-2 rounded-full border border-[#6E2D79] bg-[#6E2D79] text-white text-sm">
          <Clock size={16} /> Duration: {levelData.duration}
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-[#6E2D79] text-white rounded-full text-sm">
          {levelData.certification} <GraduationCap size={16} />
        </div>
      </div>
    </div>
  );
};

export default DynamicLevelBanner;
