import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const dividerIcon = "/ine.png";

export default function TrainingPrograms() {
  // Animation variants
  const topSlideVariants = {
    hidden: { opacity: 0, y: -70 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const bottomSlideVariants = {
    hidden: { opacity: 0, y: 70 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // New middle card animation (fade in)
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div
      id="trainings-section"
      className="w-full bg-purple-50 py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto lg:px-8 xl:px-12">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[24px] font-semibold text-[#6E2D79] mb-2">
            Our Training Programs
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 md:gap-4 lg:gap-6">
          {/* Left Card (slide from top) */}
          <motion.div
            className="bg-white rounded-lg shadow-md flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-start items-start gap-3 sm:gap-4"
            variants={topSlideVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-full aspect-[16/12] overflow-hidden rounded">
              <img
                src="/training-image-1.png"
                alt="Brain with DNA"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[#6E2D79] text-xl sm:text-[22px] font-medium leading-tight sm:leading-[33px] mt-2">
              DECODE
            </h2>
            <p className="text-[#A35F93] font-[Poppins] text-sm sm:text-base font-normal leading-relaxed sm:leading-[24px] flex-grow">
              A self-help program designed to help you rewire emotional patterns
              and reprogram your subconscious using neuroscience and mind-body
              mind.
            </p>
            <Link to="/decode">
              <button className="text-[#C183B2] font-[Poppins] text-lg sm:text-xl md:text-[22px] font-medium leading-tight sm:leading-[33px] underline transition-colors mt-auto cursor-pointer">
                Know More
              </button>
            </Link>
          </motion.div>

          {/* Middle Card (new addition) */}
          <motion.div
            className="bg-white rounded-lg shadow-md flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-start items-start gap-3 sm:gap-4"
            variants={bottomSlideVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-full aspect-[16/12] overflow-hidden rounded">
              <img
                src="/Image.png"
                alt="Brain with DNA"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[#6E2D79] text-xl sm:text-[22px] font-medium leading-tight sm:leading-[33px] mt-2">
              Integrated Clinical Hypnotherapy
            </h2>
            <p className="text-[#A35F93] font-[Poppins] text-sm sm:text-base font-normal leading-relaxed sm:leading-[24px] flex-grow">
              A professional certification program for those who want to become
              therapists and help others heal using subconscious mind.
            </p>
            <Link to="/ich">
              <button className="text-[#C183B2] font-[Poppins] text-lg sm:text-xl md:text-[22px] font-medium leading-tight sm:leading-[33px] underline transition-colors mt-auto cursor-pointer">
                Know More
              </button>
            </Link>
          </motion.div>

          {/* Right Card (slide from bottom) */}

          <motion.div
            className="bg-white rounded-lg shadow-md flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-start items-start gap-3 sm:gap-4"
            variants={fadeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-full aspect-[16/12] overflow-hidden rounded">
              <img
               src="/Image.png"
                alt="Family Constellation"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[#6E2D79] text-xl sm:text-[22px] font-medium leading-tight sm:leading-[33px] mt-2">
              TASSO
            </h2>
            <p className="text-[#A35F93] font-[Poppins] text-sm sm:text-base font-normal leading-relaxed sm:leading-[24px] flex-grow">
              A therapeutic approach that reveals hidden family dynamics and
              helps resolve intergenerational patterns for personal healing.
            </p>
            <Link to="/tasso">
              <button className="text-[#C183B2] font-[Poppins] text-lg sm:text-xl md:text-[22px] font-medium leading-tight sm:leading-[33px] underline transition-colors mt-auto cursor-pointer">
                Know More
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
