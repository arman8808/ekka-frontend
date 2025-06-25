import React from "react";
import { motion } from "framer-motion";
import {
  MdEmail,
  MdOutlineFacebook,
  MdOutlineLinkedCamera,
} from "react-icons/md";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.footer
      className="relative bg-[#6E2D79] text-white"
      style={{ height: "484px" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div className="max-w-5xl mx-auto h-full flex flex-col justify-center items-center gap-4 text-center">
        {/* Logo */}
        <motion.img
          src="/footerimage.png"
          alt="EKAA Therapy Logo"
          className="mx-auto"
          style={{
            width: "250px",
            height: "85px",
            flexShrink: 0,
            aspectRatio: "119 / 160.608",
          }}
          variants={itemVariants}
        />
        {/* Email */}
        <motion.a
          href="mailto:info@ekaatherapy.com"
          className="flex items-center gap-2 text-sm sm:text-base font-poppins"
          variants={itemVariants}
        >
          <MdEmail size={20} className="text-white" />
          <span className="text-[16px]">contact@ekaausa.com</span>
        </motion.a>
        <motion.span className="flex items-center gap-2">
          <img src="/footer/googletrust.svg" alt="footer" loading="lazy" />
          <img src="/footer/trustpilot.svg" alt="footer" loading="lazy" />
        </motion.span>{" "}
        <motion.div className="flex items-center gap-2">
          <span className="bg-white rounded-[50%] p-2 cursor-pointer hover:bg-[#f0f0f0] transition-colors">
            <a
              href="https://www.facebook.com/share/1LQY2EvYNu/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutlineFacebook className="text-[#6E2D79] text-xl cursor-pointer" />
            </a>
          </span>

          <span className="bg-white rounded-[50%] p-2 cursor-pointer hover:bg-[#f0f0f0] transition-colors">
            <a
              href="https://www.instagram.com/ekaa_institute?igsh=OTJneW5xM3RtcGV0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareInstagram className="text-[#6E2D79] text-xl" />
            </a>
          </span>

          <span className="bg-white rounded-[50%] p-2 cursor-pointer hover:bg-[#f0f0f0] transition-colors">
            <a href="#" target="_blank" rel="noopener noreferrer">
              {" "}
              <IoLogoLinkedin className="text-[#6E2D79] text-xl cursor-pointer" />
            </a>{" "}
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom line */}
      <div className="absolute bottom-4 left-0 w-full border-t border-white pt-4">
        <p className="text-center text-sm text-white font-poppins">
          &copy; 2025 EKAA. All rights reserved.{" "}
          <a
            href="https://sakhsham.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#A35F93] transition-colors duration-200"
          >
            Made by Sakhsham
          </a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
