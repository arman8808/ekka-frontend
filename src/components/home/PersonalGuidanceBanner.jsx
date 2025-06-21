
import React from "react";
import { motion } from "framer-motion";

const PersonalGuidanceBanner = () => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
<div className="relative h-[400px] xs:h-[450px] sm:h-[500px] md:h-[550px] lg:h-[580px] xl:h-[650px] -mt-10">
  {/* Background images - different for mobile and desktop */}
  <picture>
    {/* Mobile image */}
    <source 
      srcSet="/home/bg (1)1.png" 
      media="(max-width: 639px)"
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    />
    {/* Desktop image */}
    <img
      src="/bg (1).png"
      alt="Background Banner"
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    />
  </picture>

  {/* Content with scroll animation */}
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-2 xs:px-3 sm:px-4 md:px-6">
    {/* Paragraph */}
    <motion.p
      className="text-[#F6F6F6] font-[Poppins] font-normal mb-4 sm:mb-4 max-w-[95%] xs:max-w-[90%] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[554px] mx-auto
        text-[14px] sm:text-[14px] md:text-[18px] lg:text-[22px]
        leading-[20px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px]"
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      Experience transformational breakthroughs with EKAA certified therapist
    </motion.p>

    {/* Button */}
    <motion.button
      className="text-[#F6F6F6] px-4 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2 md:py-2.5 lg:py-2 rounded-full font-medium shadow
        hover:bg-gray-200 hover:text-[#6E2D79] transition duration-300
        text-[14px] sm:text-[14px] md:text-[15px] lg:text-[18px] xl:text-[22px] border border-[#F6F6F6]"
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      Find a Therapist Near Me
    </motion.button>
  </div>
</div>
  );
};

export default PersonalGuidanceBanner;
