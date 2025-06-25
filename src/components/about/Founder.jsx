// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const topVariants = {
//   hidden: { opacity: 0, y: -100 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: "easeOut" },
//   },
// };

// const bottomVariants = {
//   hidden: { opacity: 0, y: 100 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: "easeOut" },
//   },
// };

// const Founder = () => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 h-auto w-full">
//       {/* Left Side - Image (from top) */}
//       <motion.div
//         className="h-[250px] lg:h-[386px] w-full"
//         style={{
//           backgroundImage: "url('/about/aboutbg.svg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//         variants={topVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//       />

//       {/* Right Side - Text on Background (from bottom) */}
//       <motion.div
//         className="relative px-6 sm:px-10 lg:px-14 py-6 h-auto lg:h-[386px] w-full"
//         style={{
//           backgroundImage: "url('/about/ababout.jpg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//         variants={bottomVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <div className="max-w-full lg:max-w-[645px] text-[#6E2D79]">
//           <h2 className="font-[Poppins] text-[20px] sm:text-[24px] lg:text-[24px] font-medium leading-tight lg:leading-[72px] mb-4">
//             Meet Our Founder
//           </h2>
//           <p className="text-justify font-[Poppins] text-[#A35F93] text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[22px] sm:leading-[24px]">
//             Dr. Yuvraj Kapadia, founder of EKAA, is a pioneer in integrating the subconscious mind with conscious living practices. His mission is to train compassionate healers and help every individual experience self-mastery and emotional harmony. <br />
//             With over 15 years of experience in hypnotherapy and mindfulness practices, Dr. Kapadia has developed unique methodologies that blend modern psychology with ancient wisdom traditions.
//           </p>
//         </div>

//         {/* Bottom-right link */}
//         <Link
//           to="/contact-us"
//           className="absolute bottom-4 p-4 right-6 mt-2 sm:bottom-0 sm:right-10 lg:right-14 text-sm font-[Poppins] text-[#6E2D79] underline"
//         >
//           Know More EKAA
//         </Link>
//       </motion.div>
//     </div>
//   );
// };

// export default Founder;

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const imageVariants = {
  hidden: { opacity: 0, y: 50 }, // start 50px below
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: -50 }, // start 50px above
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Founder = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full bg-white">
      {/* Left side - Image */}
      <motion.div
        className="w-full lg:w-[607px] lg:h-[591px] flex items-center justify-center flex-shrink-0"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="w-full h-full overflow-hidden">
          <img
            src="/about/yuvraj.png"
            alt="Dr. Yuvraj Kapadia"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Right side - Text Content */}
      <motion.div
        className="relative flex-shrink-0 flex flex-col justify-center px-6 sm:px-10 md:px-14 py-10 w-full lg:w-[calc(100%-607px)] h-auto min-h-[591px] bg-cover bg-center overflow-hidden"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main content container with proper constraints */}
        <div className="relative z-10 w-full max-w-[765px] mx-auto overflow-y-auto">
          <h2 className="text-[22px] md:text-[26px] font-bold text-[#6E2D79] font-[Poppins]">
            Dr. Yuvraj Kapadia
          </h2>
          <p className="text-[18px] md:text-[20px] font-medium text-[#6E2D79] font-[Poppins] mb-4">
            Founder-Director & CEO
          </p>

          <div className="space-y-4 text-[#A35F93] font-[Poppins] text-[16px] sm:text-[18px] leading-[1.6]">
            <p>
              Dr. Yuvraj Kapadia, a gold medalist in Microbiology from Mumbai
              University, began his career as a financial expert before
              dedicating his life to empowering minds. Today, he is a globally
              respected hypnotherapy and regression training expert who
              encourages independent thinking and self-liberation from limiting
              beliefs and conditioning.
            </p>

            <p>
              He has conducted transformational workshops for leading
              organizations such as Fidelity Investments, HSBC, and the TAJ
              Group of Hotels. Internationally, he has been a keynote trainer in
              cities like Dubai, Singapore, Hong Kong, and Bangkok.
            </p>

            <p>
              A distinguished global faculty member of TASSO International, Dr.
              Kapadia is one of only five trainers worldwide recognized by the
              institute. He has represented EKAA (formerly CHII) at multiple
              World Congresses on Regression Therapies (WCRT), presenting
              pioneering work on emotional empowerment, parallel realities, and
              the body–mind connection in healing.
            </p>

            <p>
              His visionary leadership continues to shape EKAA's mission to
              spread conscious transformation across the world.
            </p>
          </div>
        </div>

        {/* Contact us link at bottom-right */}
        {/* <div className="absolute bottom-4 right-6 z-10 mt-4">
          <Link
            to="/contact-us"
            className="text-[#6E2D79] underline text-sm font-medium transition-colors duration-200 hover:text-[#4a1a5e]"
          >
            Contact us
          </Link>
        </div> */}
      </motion.div>
    </div>
  );
};

export default Founder;
