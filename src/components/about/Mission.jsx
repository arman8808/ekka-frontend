import React from "react";
import { motion } from "framer-motion";

function Mission() {
  const fadeInUp = {
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
    <div className="relative flex flex-col items-center px-4 md:px-[63px] py-[35px] w-full bg-[#6E2D79] mt-[128px] mb-[40px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-[212px] max-w-[1512px] w-full justify-center">
        {/* Vision */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: true }} // animation triggers every time in view
          className="text-white max-w-full md:max-w-[489px] lg:max-w-[589px] mx-auto lg:mx-0"
        >
          <h3 className="text-[33px] font-medium leading-[54px] mb-4 text-[#F6F6F6]">
            Vision
          </h3>
          <p
            className="text-[18px] font-normal leading-[33px] text-left"
            style={{ color: "#F6F6F6", fontFamily: "Poppins, sans-serif" }}
          >
            A world where every person lives with emotional clarity, inner
            peace, and holistic well-being.
          </p>
        </motion.div>
        {/* Mission */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: true }} // removed `once: true` to allow repeat
          className="text-white max-w-full md:max-w-[489px] lg:max-w-[589px] mx-auto lg:mx-0"
        >
          <h3 className="text-[33px] font-medium leading-[54px] mb-4 text-[#F6F6F6]">
            Mission
          </h3>
          <p
           className="text-[18px] font-normal leading-[33px] text-left"
            style={{ color: "#F6F6F6", fontFamily: "Poppins, sans-serif" }}
          >
            To spread self-healing and conscious living through professional
            hypnotherapy education and awareness programs.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Mission;
