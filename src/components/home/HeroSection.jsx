import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col justify-center items-center text-center px-4 pt-[120px] md:pt-[160px] w-full h-[calc(800px-80px)] md:h-[700px] lg:h-[700px]">
      <div className="relative z-10 flex flex-col items-center w-full">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[26px] lg:text-[36px] sm:text-[32px] md:text-[36px] font-semibold text-[#6E2D79] mb-6 drop-shadow-lg"
        >
          Conscious Living
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[14px]  sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#5C2166] max-w-3xl mb-10 w-full md:w-[796px] drop-shadow-md font-normal"
        >
          Experience transformative training, workshops, and healing pathways with EKAA.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6"
        >
          {/* Trainings Button */}
         <a href="#trainings-section">
          <button className="bg-[#6E2D79] w-full sm:w-[200px] h-[57px] text-white px-[14px] py-[12px] rounded-full text-[14px] sm:text-[14px] md:text-[22px] font-medium cursor-pointer flex justify-center items-center">
            <div>Trainings</div>
          </button>
          </a>

          {/* Constellation Button */}
          <button className="border border-[#6E2D79] w-full sm:w-[200px] h-[57px] text-[#6E2D79] px-[14px] py-[12px] rounded-full text-[14px] sm:text-[14px] md:text-[22px] font-medium hover:bg-purple-100 transition cursor-pointer flex justify-center items-center">
            <div>Constellation</div>
          </button>

        </motion.div>

        <Link to={'/about'}>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            href="#"
            className="text-[#6E2D79] underline hover:text-purple-900 mb-4 font-normal text-[14px]  sm:text-[14px] md:text-[18px] lg:text-[18px]"
          >
            Learn about EKAA
          </motion.a>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;


