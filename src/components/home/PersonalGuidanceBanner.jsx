
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
    <div className="relative h-[580px] xs:h-[580px] sm:h-[580px] md:h-[580px] lg:h-[580px] xl:h-[650px] -mt-10">
      {/* Background image */}
      <img
        src="/bg (1).png"
        alt="Background Banner"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Brain icon */}

      {/* <div className="absolute left-2 sm:left-4 md:left-6 top-[30%] sm:top-[30%] md:top-[30%] lg:top-[30%] z-30">
        <motion.img
          src="/Overlay+Border+OverlayBlur (1).png"
          alt="Brain Icon"
          className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full shadow-lg object-cover"
          animate={{ x: [0, 8, 0, -8, 0], y: [0, -8, 0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </div> */}

      {/* Heart icon */}
      {/* <div className="absolute right-2 sm:right-4 md:right-6 top-[70%] sm:top-[70%] md:top-[70%] lg:top-[70%] z-30">
        <motion.img
          src="/Component 162.svg"
          alt="Heart Icon"
          className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full  object-cover bg-transparent"
          animate={{ x: [0, -8, 0, 8, 0], y: [0, 8, 0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </div> */}

      {/* Content with scroll animation */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-2 xs:px-3 sm:px-4 md:px-6">
        {/* Heading */}
        {/* <motion.h1
          className="text-[#F6F6F6] font-[Poppins] font-medium mb-1 xs:mb-2 sm:mb-2 md:mb-3 lg:mb-2
            text-[18px] xs:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[36px] xl:text-[40px]
            leading-[24px] xs:leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[56px] xl:leading-[72px]"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Looking for Personal Guidance?
        </motion.h1> */}

        {/* Paragraph */}
        <motion.p
          className="text-[#F6F6F6] font-[Poppins] font-normal mb-2 xs:mb-3 sm:mb-4 max-w-[95%] xs:max-w-[90%] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[554px] mx-auto
           text-[12px]  sm:text-[14px] md:text-[18px] lg:text-[22px]
            leading-[16px] xs:leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px]"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Experience Transformation breakthroughs with Ekaa certificate therapist
        </motion.p>

        {/* Button */}
        <motion.button
          className="text-[#F6F6F6] px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 xs:py-2 sm:py-2 md:py-2.5 lg:py-2 rounded-full font-medium shadow
            hover:bg-gray-200 hover:text-[#6E2D79] transition duration-300
            text-[11px] xs:text-[12px] sm:text-[13px] md:text-[15px] lg:text-[18px] xl:text-[22px] border border-[#F6F6F6]"
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
