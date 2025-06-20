// import React from 'react';

// const Therapy = () => {
//     return (
//         <div className="relative w-full h-[815px] mx-auto flex-shrink-0 overflow-hidden">
//             {/* Background Image */}
//             <div
//                 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//                 style={{
//                     backgroundImage: "url('/about/Rectangle 4271.svg')"
//                 }}
//             >
//                 <div className="absolute inset-0 bg-opacity-20"></div>
//             </div>

//             {/* Content Container */}
//             <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center">

//                 {/* Main Heading */}
//                 <h1
//                     className="mb-8 font-medium max-w-[90%] md:max-w-[448px] text-[30px]  lg:text-[32px] md:text-[40px] leading-[48px] md:leading-[72px]"
//                     style={{
//                         color: '#6E2D79',
//                         fontFamily: 'Poppins, sans-serif',
//                         fontStyle: 'normal',
//                     }}
//                 >
//                     What is EKAA Therapy
//                 </h1>

//                 {/* Description Text */}
//                 <div className="max-w-full mb-2 lg:mb-12">
//                     <p
//                         className="mx-auto mb-6 text-center px-4 sm:px-0 text-[16px] md:text-[18px] leading-[24px] font-medium"
//                         style={{
//                             color: '#6E2D79',
//                             fontFamily: 'Poppins, sans-serif',
//                         }}
//                     >
//                         EKAA is India’s first integrated hypnotherapy school, combining science and ancient wisdom. Our methods help individuals reconnect with their inner power and transform deeply rooted emotional patterns through subconscious work.
//                     </p>

//                     <div className="flex items-center justify-center mb-6">
//                         <img
//                             src="/leaveimage.png"
//                             alt="decorative"
//                             className="w-[40px] md:w-[59px] h-[180px] md:h-[269px]"
//                         />
//                     </div>

//                     <p
//                         className="mx-auto mb-6 text-center px-4 sm:px-0 text-[16px] md:text-[18px] leading-[24px] font-medium"
//                         style={{
//                             color: '#6E2D79',
//                             fontFamily: 'Poppins, sans-serif',
//                         }}
//                     >
//                         We blend modern neuroscience with time-tested meditation techniques to create lasting change at the deepest levels of consciousness.
//                     </p>
//                 </div>

//                 {/* Call to Action Button */}
//                 <button
//                     className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[30px] border transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-base"
//                     style={{
//                         borderColor: '#6E2D79',
//                         backgroundColor: '#FFF',
//                         color: '#6E2D79',
//                         fontWeight: 600,
//                     }}
//                 >
//                     Find a Therapist
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Therapy;
import React from "react";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Therapy = () => {
  return (
    <div className="relative w-full h-[815px] mx-auto flex-shrink-0 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/about/Rectangle 4271.svg')",
        }}
      >
        <div className="absolute inset-0 bg-opacity-20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center">
        {/* Main Heading */}
        <motion.h1
          className=" font-medium max-w-[90%] md:max-w-[448px] text-[24px]  lg:text-[24px] md:text-[24px] leading-[48px] md:leading-[72px]"
          style={{
            color: "#6E2D79",
            fontFamily: "Poppins, sans-serif",
            fontStyle: "normal",
          }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5, once: true }}
        >
          What is EKAA Therapy
        </motion.h1>

        {/* Description Text */}
        <div className="max-w-full  lg:mb-12">
          <motion.p
            className="mx-auto text-center px-4 sm:px-0 text-[16px] md:text-[18px] lg:text-[18px] leading-[24px] font-medium"
            style={{
              color: "#A35F93",
              fontFamily: "Poppins, sans-serif",
            }}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            transition={{ delay: 0.1 }}
          >
            EKAA is India’s first integrated hypnotherapy school, combining
            science and ancient wisdom. Our methods help individuals reconnect
            with their inner power and transform deeply rooted emotional
            patterns through subconscious work.
          </motion.p>

          <motion.div
            className="flex items-center justify-center "
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="/2.2.svg"
              alt="decorative"
              className="w-[40px] md:w-[59px] h-[180px] md:h-[269px]"
            />
          </motion.div>

          <motion.p
            className="mx-auto mb-6 text-center px-4 sm:px-0 text-[16px] md:text-[18px] leading-[24px] font-medium"
            style={{
              color: "#A35F93",
              fontFamily: "Poppins, sans-serif",
            }}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            transition={{ delay: 0.3 }}
          >
            We blend modern neuroscience with time-tested meditation
            techniques to create lasting change at the deepest levels of
            consciousness.
          </motion.p>
        </div>

        {/* Call to Action Button */}
        <motion.button
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[30px] border transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-base"
          style={{
            borderColor: "#6E2D79",
            backgroundColor: "#FFF",
            color: "#6E2D79",
            fontWeight: 600,
          }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5, once: true }}
          transition={{ delay: 0.4 }}
        >
          Find a Therapist
        </motion.button>
      </div>
    </div>
  );
};

export default Therapy;
