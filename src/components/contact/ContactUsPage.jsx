
// // import React, { useState, useRef } from 'react';
// // import { motion, useInView, useAnimation } from 'framer-motion';
// // import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';
// // import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa6";
// // import { BsSend } from "react-icons/bs";


// // const ContactUsPage = () => {
// //   const [formData, setFormData] = useState({
// //     fullName: 'Aquib Javed',
// //     email: 'AqibJaved999@gmail.com',
// //     country: 'Country',
// //     zipCode: '226002',
// //     mobileNumber: '6042642638',
// //     message: 'Aquib Javed'
// //   });

// //   const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
// //   const [readPrivacy, setReadPrivacy] = useState(false);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   // Animation variants
// //   const fadeInUp = {
// //     hidden: {
// //       opacity: 0,
// //       y: 60,
// //       scale: 0.95
// //     },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       scale: 1,
// //       transition: {
// //         duration: 0.8,
// //         ease: "easeOut"
// //       }
// //     }
// //   };

// //   const fadeInLeft = {
// //     hidden: {
// //       opacity: 0,
// //       x: -50
// //     },
// //     visible: {
// //       opacity: 1,
// //       x: 0,
// //       transition: {
// //         duration: 0.6,
// //         ease: "easeOut"
// //       }
// //     }
// //   };

// //   const fadeInRight = {
// //     hidden: {
// //       opacity: 0,
// //       x: 50
// //     },
// //     visible: {
// //       opacity: 1,
// //       x: 0,
// //       transition: {
// //         duration: 0.6,
// //         ease: "easeOut"
// //       }
// //     }
// //   };

// //   const staggerContainer = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.2,
// //         delayChildren: 0.1
// //       }
// //     }
// //   };

// //   const scaleIn = {
// //     hidden: {
// //       scale: 0,
// //       opacity: 0,
// //       rotate: -180
// //     },
// //     visible: {
// //       scale: 1,
// //       opacity: 1,
// //       rotate: 0,
// //       transition: {
// //         duration: 0.6,
// //         ease: "easeOut",
// //         type: "spring",
// //         stiffness: 100
// //       }
// //     }
// //   };

// //   return (
// //     <div className="bg-purple-50 overflow-hidden">
// //       {/* Hero Section with Header */}
// //       <motion.div
// //         initial="hidden"
// //         animate="visible"
// //         variants={staggerContainer}
// //         className="relative"
// //       >
// //         {/* Animated background elements */}
// //         <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //           <motion.div
// //             animate={{
// //               rotate: 360,
// //               scale: [1, 1.2, 1],
// //             }}
// //             transition={{
// //               duration: 20,
// //               repeat: Infinity,
// //               ease: "linear",
// //             }}
// //             className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
// //           />
// //           <motion.div
// //             animate={{
// //               rotate: -360,
// //               scale: [1, 1.1, 1],
// //             }}
// //             transition={{
// //               duration: 25,
// //               repeat: Infinity,
// //               ease: "linear",
// //             }}
// //             className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl"
// //           />
// //         </div>

// //         <motion.h1
// //           variants={fadeInUp}
// //           className="font-semibold pt-36 leading-tight text-[24px] sm:text-[28px] md:text-[34px] lg:text-[36px] text-[#6E2D79] font-poppins max-w-xs sm:max-w-md lg:max-w-7xl mx-auto relative z-10"
// //         >
// //           Contact Us
// //         </motion.h1>
// //         <motion.p
// //           variants={fadeInUp}
// //           className="font-normal text-[#6E2D79] font-poppins text-base text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px] leading-6 max-w-xs sm:max-w-md lg:max-w-7xl mx-auto relative z-10"
// //         >
// //           We'd Love to Hear From You!
// //         </motion.p>
// //       </motion.div>

// //       {/* Contact Info Section */}
// //       <AnimatedSection>
// //         <div
// //           className="relative bg-cover bg-center flex-shrink-0 w-full h-auto lg:h-[489px] md:h-[600px] xl:h-[489px] "
// //           style={{
// //             backgroundImage: "url('/lookingpersonal.svg')",
// //           }}
// //         >
// //           {/* Overlay */}
// //           <div className="absolute inset-0  bg-opacity-70"></div>

// //           {/* Content */}
// //           <div className="relative z-10 flex flex-col md:flex-row h-full px-4 md:px-8 py-6 text-white font-poppins">
// //             {/* Left Side - Contact Info */}
// //             <motion.div
// //               initial="hidden"
// //               whileInView="visible"
// //               viewport={{ once: true, margin: "-100px" }}
// //               variants={staggerContainer}
// //               className="flex-1 flex flex-col justify-center space-y-6"
// //             >
// //               {/* Phone */}
// //               <ContactInfoItem
// //                 icon={<Phone size={16} />}
// //                 title="Call us"
// //                 content="+91 6042642638"
// //                 delay={0}
// //               />

// //               {/* Email */}
// //               <ContactInfoItem
// //                 icon={<Mail size={16} />}
// //                 title="Email us"
// //                 content="admin@ekaa.co.in"
// //                 delay={0.1}
// //               />

// //               {/* Address */}
// //               <ContactInfoItem
// //                 icon={<MapPin size={16} />}
// //                 title="Address"
// //                 content={
// //                   <>
// //                     Multi Integrated Clinical psychotherapy<br />
// //                     treatment that brings health and Wealth<br />
// //                     and our Clinical Connected network for Organic<br />
// //                     Ancient and Stunning Transparency EKAA.
// //                   </>
// //                 }
// //                 delay={0.2}
// //               />

// //               {/* Opening Hours */}
// //               <ContactInfoItem
// //                 icon={<Clock size={16} />}
// //                 title="Opening Hours"
// //                 content={
// //                   <>
// //                     Monday - Friday: 9:00 AM - 7:00 PM<br />
// //                     Saturday: 10:00 AM - 6:00 PM<br />
// //                     Sunday: Closed
// //                   </>
// //                 }
// //                 delay={0.3}
// //               />
// //             </motion.div>

// //             {/* Right Side - Empty Space */}
// //             <div className="flex-1 hidden md:block"></div>
// //           </div>

// //           {/* Social Media Icons */}
// //           {/* Social Media Icons */}
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true }}
// //             variants={staggerContainer}
// //             className="flex gap-3 z-10 mt-6 md:mt-0 md:absolute md:bottom-4 md:right-4"
// //           >
// //             {[
// //               { icon: <FaTwitter size={16} />, delay: 0 },
// //               { icon: <FaFacebookF size={16} />, delay: 0.1 },
// //               { icon: <Instagram size={16} />, delay: 0.2 },
// //               { icon: <FaGithub size={16} />, delay: 0.3 }
// //             ].map((social, index) => (
// //               <motion.div
// //                 key={index}
// //                 variants={{
// //                   hidden: { scale: 0, rotate: -180 },
// //                   visible: {
// //                     scale: 1,
// //                     rotate: 0,
// //                     transition: {
// //                       delay: social.delay,
// //                       duration: 0.5,
// //                       type: "spring",
// //                       stiffness: 100
// //                     }
// //                   }
// //                 }}
// //                 whileHover={{
// //                   scale: 1.2,
// //                   rotate: 360,
// //                   transition: { duration: 0.3 }
// //                 }}
// //                 whileTap={{ scale: 0.9 }}
// //                 className="w-8 h-8 border border-white text-white rounded-full flex items-center justify-center hover:bg-[#6E2D79] hover:border-[#6E2D79] transition cursor-pointer"
// //               >
// //                 {social.icon}
// //               </motion.div>
// //             ))}
// //           </motion.div>

// //         </div>
// //       </AnimatedSection>

// //       {/* Form Section */}
// //       <AnimatedSection>
// //         <div className="py-12 px-4">
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true, margin: "-50px" }}
// //             variants={fadeInUp}
// //             className="max-w-3xl mx-auto p-8"
// //           >
// //             <motion.form variants={staggerContainer}>
// //               {/* Full Name Field */}
// //               <motion.div variants={fadeInLeft} className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <FormField
// //                   label="Full Name"
// //                   type="text"
// //                   name="fullName"
// //                   value={formData.fullName}
// //                   onChange={handleInputChange}
// //                 />
// //               </motion.div>

// //               {/* Email Field */}
// //               <motion.div variants={fadeInRight} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
// //                 <FormField
// //                   label="Email Address"
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleInputChange}
// //                 />
// //               </motion.div>

// //               {/* Country and Zip Code */}
// //               <motion.div variants={fadeInLeft} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
// //                 <FormField
// //                   label="Country"
// //                   type="select"
// //                   name="country"
// //                   value={formData.country}
// //                   onChange={handleInputChange}
// //                   options={[
// //                     { value: "", label: "Select Country" },
// //                     { value: "India", label: "India" },
// //                     { value: "USA", label: "USA" },
// //                     { value: "UK", label: "UK" },
// //                     { value: "Canada", label: "Canada" }
// //                   ]}
// //                 />
// //                 <FormField
// //                   label="Zip Code"
// //                   type="text"
// //                   name="zipCode"
// //                   value={formData.zipCode}
// //                   onChange={handleInputChange}
// //                 />
// //               </motion.div>

// //               {/* Mobile Number */}
// //               <motion.div variants={fadeInRight} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
// //                 <div className="flex p-4 px-4 items-start gap-1 flex-1 self-stretch border border-[#6E2D79] rounded-md hover:border-purple-500 transition-colors duration-300">
// //                   <div className="w-full">
// //                     <label className="block text-sm text-gray-600 mb-1">Mobile Number</label>
// //                     <div className="flex">
// //                       <div className="flex items-center px-3 py-2">
// //                         <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5 h-3 mr-2" />
// //                         <span className="text-sm text-[#6E2D79]">+91</span>
// //                       </div>
// //                       <input
// //                         type="tel"
// //                         name="mobileNumber"
// //                         value={formData.mobileNumber}
// //                         onChange={handleInputChange}
// //                         className="w-full rounded-md text-[#6E2D79] font-poppins text-base font-normal leading-6 outline-none"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>

// //               {/* Message Field */}
// //               <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
// //                 <div className="w-full p-4 border border-[#6E2D79] rounded-md hover:border-purple-500 transition-colors duration-300">
// //                   <label className="block text-sm text-gray-600 mb-1">Message</label>
// //                   <textarea
// //                     name="message"
// //                     value={formData.message}
// //                     rows="4"
// //                     onChange={handleInputChange}
// //                     className="w-full px-3 py-2 rounded-md text-[#6E2D79] font-poppins text-base font-normal leading-6 outline-none resize-none"
// //                   />
// //                 </div>
// //               </motion.div>

// //               {/* Privacy Policy */}
// //               <motion.div variants={fadeInLeft} className="mt-6 space-y-2 text-sm">
// //                 <motion.span
// //                   whileHover={{ color: "#4b0082" }}
// //                   className="text-[#6E2D79] font-poppins text-sm font-normal leading-6 decoration-solid cursor-pointer"
// //                 >
// //                   I accept the Privacy Policy
// //                 </motion.span>
// //               </motion.div>

// //               <motion.span
// //                 variants={fadeInRight}
// //                 whileHover={{ color: "#4b0082" }}
// //                 className="text-[#6E2D79] font-poppins text-sm font-normal leading-6 underline underline-offset-auto decoration-solid cursor-pointer"
// //               >
// //                 I've read Privacy Policy
// //               </motion.span>

// //               {/* Submit Button */}
// //               <motion.button
// //                 variants={fadeInUp}
// //                 whileHover={{
// //                   scale: 1.02,
// //                   boxShadow: "0 20px 40px rgba(110,45,121,0.3)",
// //                   transition: { duration: 0.2 }
// //                 }}
// //                 whileTap={{
// //                   scale: 0.98,
// //                   transition: { duration: 0.1 }
// //                 }}
// //                 type="submit"
// //                 className="mt-6 w-full inline-flex justify-center items-center text-white font-semibold rounded-[30px] shadow-lg hover:shadow-xl transition-all duration-300 bg-[#6E2D79] px-6 py-4 sm:px-10 md:px-16 lg:px-[143px] gap-2"
// //               >
// //                 <motion.span
// //                   initial={{ x: 0 }}
// //                   whileHover={{ x: -5 }}
// //                   transition={{ duration: 0.2 }}
// //                 >
// //                   Send Message
// //                 </motion.span>
// //                 <motion.div
// //                   initial={{ x: 0, rotate: 0 }}
// //                   whileHover={{ x: 5, rotate: 45 }}
// //                   transition={{ duration: 0.2 }}
// //                 >
// //                   <BsSend size={20} />
// //                 </motion.div>
// //               </motion.button>

// //             </motion.form>
// //           </motion.div>
// //         </div>
// //       </AnimatedSection>
// //     </div>
// //   );
// // };

// // // Reusable animated section wrapper
// // const AnimatedSection = ({ children }) => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, margin: "-100px" });
// //   const controls = useAnimation();

// //   React.useEffect(() => {
// //     if (isInView) {
// //       controls.start("visible");
// //     }
// //   }, [isInView, controls]);

// //   return (
// //     <motion.div
// //       ref={ref}
// //       initial="hidden"
// //       animate={controls}
// //       variants={{
// //         hidden: { opacity: 0 },
// //         visible: {
// //           opacity: 1,
// //           transition: { duration: 0.6 }
// //         }
// //       }}
// //     >
// //       {children}
// //     </motion.div>
// //   );
// // };

// // // Contact Info Item Component
// // const ContactInfoItem = ({ icon, title, content, delay }) => {
// //   return (
// //     <motion.div
// //       variants={{
// //         hidden: { opacity: 0, x: -50, scale: 0.9 },
// //         visible: {
// //           opacity: 1,
// //           x: 0,
// //           scale: 1,
// //           transition: {
// //             delay: delay,
// //             duration: 0.6,
// //             ease: "easeOut"
// //           }
// //         }
// //       }}
// //       whileHover={{
// //         x: 10,
// //         transition: { duration: 0.2 }
// //       }}
// //       className="flex items-start gap-4 cursor-pointer"
// //     >
// //       <motion.div
// //         whileHover={{
// //           scale: 1.1,
// //           rotate: 360,
// //           transition: { duration: 0.5 }
// //         }}
// //         className="w-8 h-8 bg-white rounded-full flex items-center justify-center mt-1 shadow-lg"
// //       >
// //         <div className="text-purple-600">
// //           {icon}
// //         </div>
// //       </motion.div>
// //       <div>
// //         <motion.h3
// //           className="text-base font-normal text-[#F6F6F6] mb-1"
// //           whileHover={{ color: "#C183B2" }}
// //         >
// //           {title}
// //         </motion.h3>
// //         <p className="text-sm opacity-90">{content}</p>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // // Form Field Component
// // const FormField = ({ label, type, name, value, onChange, options }) => {
// //   return (
// //     <motion.div
// //       whileHover={{
// //         scale: 1.02,
// //         transition: { duration: 0.2 }
// //       }}
// //       className="flex p-4 px-4 items-start gap-1 flex-1 self-stretch border border-[#6E2D79] rounded-md hover:border-purple-500 hover:shadow-md transition-all duration-300"
// //     >
// //       <div className="w-full">
// //         <label className="block text-sm text-gray-600 mb-1">{label}</label>
// //         {type === 'select' ? (
// //           <select
// //             name={name}
// //             value={value}
// //             onChange={onChange}
// //             className="w-full rounded-md text-[#6E2D79] font-poppins text-base font-normal leading-6 outline-none bg-transparent"
// //           >
// //             {options?.map((option, index) => (
// //               <option key={index} value={option.value}>
// //                 {option.label}
// //               </option>
// //             ))}
// //           </select>
// //         ) : (
// //           <input
// //             type={type}
// //             name={name}
// //             value={value}
// //             onChange={onChange}
// //             className="w-full rounded-md text-[#6E2D79] font-poppins text-base font-normal leading-6 outline-none bg-transparent"
// //           />
// //         )}
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default ContactUsPage;



// import React, { useState, useRef } from 'react';
// import { motion, useInView, useAnimation } from 'framer-motion';
// import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';
// import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa6";
// import { BsSend } from "react-icons/bs";


// const ContactUsPage = () => {
//   const [formData, setFormData] = useState({
//     fullName: 'Full Name',
//     email: 'Enter Your Email',
//     country: 'Country',
//     zipCode: '226002',
//     mobileNumber: '6042642638',
//     message: 'Enter Message'
//   });

//   const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
//   const [readPrivacy, setReadPrivacy] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Animation variants
//   const fadeInUp = {
//     hidden: {
//       opacity: 0,
//       y: 60,
//       scale: 0.95
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut"
//       }
//     }
//   };

//   const fadeInLeft = {
//     hidden: {
//       opacity: 0,
//       x: -50
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const fadeInRight = {
//     hidden: {
//       opacity: 0,
//       x: 50
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1
//       }
//     }
//   };

//   const scaleIn = {
//     hidden: {
//       scale: 0,
//       opacity: 0,
//       rotate: -180
//     },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       rotate: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//         type: "spring",
//         stiffness: 100
//       }
//     }
//   };

//   return (
//     <div className="bg-purple-50 overflow-hidden">
//       {/* Hero Section with Header */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={staggerContainer}
//         className="relative"
//       >
//         {/* Animated background elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <motion.div
//             animate={{
//               rotate: 360,
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: 20,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//             className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
//           />
//           <motion.div
//             animate={{
//               rotate: -360,
//               scale: [1, 1.1, 1],
//             }}
//             transition={{
//               duration: 25,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//             className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl"
//           />
//         </div>

//         <motion.h1
//           variants={fadeInUp}
//           className="font-semibold pt-36 leading-tight text-[24px] sm:text-[28px] md:text-[34px] lg:text-[36px] text-[#6E2D79] font-poppins max-w-xs sm:max-w-md lg:max-w-7xl mx-auto relative z-10"
//         >
//           Contact Us
//         </motion.h1>
//         <motion.p
//           variants={fadeInUp}
//           className="font-normal text-[#6E2D79] font-poppins text-base text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px] leading-6 max-w-xs sm:max-w-md lg:max-w-7xl mx-auto relative z-10"
//         >
//           We'd Love to Hear From You!
//         </motion.p>
//       </motion.div>

//       {/* Form Section */}
//       <AnimatedSection>
//         <div className=" px-4">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             variants={fadeInUp}

//             className="max-w-3xl mx-auto p-4"
//           >
//             <motion.form variants={staggerContainer}>
//               {/* Full Name Field */}
//               <motion.div variants={fadeInLeft} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* <FormField
//                   // label="Full Name"
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                 /> */}
//                 <input
//                   type="name"
//                   placeholder="Enter Your Full Name"
//                   className="w-full border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 />
//               </motion.div>

//               {/* Email Field */}
//               <motion.div variants={fadeInRight} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//                 <input
//                   type="mail"
//                   placeholder="Enter Your Email"
//                   className="w-full border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 />
//               </motion.div>

//               <motion.div variants={fadeInRight} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//                 <input
//                   type="tel"
//                   placeholder="+1 6042642638"
//                   className="w-full border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 />
//               </motion.div>

//               {/* Country and Zip Code */}
//               <motion.div variants={fadeInLeft} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <select className="flex-1 border border-[#6E2D79] rounded-md px-4 py-3 text-gray-700 focus:outline-none">
//                     <option>Select Country</option>
//                     <option>India</option>
//                     <option>USA</option>
//                     <option>UK</option>
//                   </select>

//                 </div>
//                 {/* Country and Pin Code */}


//                 {/* Phone Input */}

//                 {/* <input
//                   type="text"
//                   placeholder="226002"
//                   className="flex-1 border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 /> */}
//               </motion.div>



//               <input

//                   placeholder="226002"
//                   className="w-full border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 mt-6"
//                 >

//                 </input>

//               {/* Mobile Number */}


//               {/* Message Field */}
//               <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
//                 <textarea
//                   rows="4"
//                   placeholder="Enter Message"
//                   className="w-full border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 ></textarea>
//               </motion.div>

//               {/* Privacy Policy */}
//               <motion.div variants={fadeInLeft} className="mt-6 space-y-2 text-sm">
//                 <motion.span
//                   whileHover={{ color: "#4b0082" }}
//                   className="text-[#6E2D79] font-poppins text-sm font-normal leading-6 decoration-solid cursor-pointer"
//                 >
//                   I accept the Privacy Policy
//                 </motion.span>
//               </motion.div>

//               <motion.span
//                 variants={fadeInRight}
//                 whileHover={{ color: "#4b0082" }}
//                 className="text-[#6E2D79] font-poppins text-sm font-normal leading-6 underline underline-offset-auto decoration-solid cursor-pointer"
//               >
//                 I've read Privacy Policy
//               </motion.span>

//               {/* Submit Button */}
//               <motion.button
//                 variants={fadeInUp}
//                 whileHover={{
//                   scale: 1.02,
//                   boxShadow: "0 20px 40px rgba(110,45,121,0.3)",
//                   transition: { duration: 0.2 }
//                 }}
//                 whileTap={{
//                   scale: 0.98,
//                   transition: { duration: 0.1 }
//                 }}
//                 type="submit"
//                 className="mt-6 w-full inline-flex justify-center items-center text-white font-semibold rounded-[30px] shadow-lg hover:shadow-xl transition-all duration-300 bg-[#6E2D79] px-6 py-4 sm:px-10 md:px-16 lg:px-[143px] gap-2"
//               >
//                 <motion.span
//                   initial={{ x: 0 }}
//                   whileHover={{ x: -5 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   Send Message
//                 </motion.span>
//                 <motion.div
//                   initial={{ x: 0, rotate: 0 }}
//                   whileHover={{ x: 5, rotate: 45 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <BsSend size={20} />
//                 </motion.div>
//               </motion.button>

//             </motion.form>
//           </motion.div>
//         </div>
//       </AnimatedSection>
//     </div>
//   );
// };

// // Reusable animated section wrapper
// const AnimatedSection = ({ children }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const controls = useAnimation();

//   React.useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={{
//         hidden: { opacity: 0 },
//         visible: {
//           opacity: 1,
//           transition: { duration: 0.6 }
//         }
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // Contact Info Item Component
// const ContactInfoItem = ({ icon, title, content, delay }) => {
//   return (
//     <motion.div
//       variants={{
//         hidden: { opacity: 0, x: -50, scale: 0.9 },
//         visible: {
//           opacity: 1,
//           x: 0,
//           scale: 1,
//           transition: {
//             delay: delay,
//             duration: 0.6,
//             ease: "easeOut"
//           }
//         }
//       }}
//       whileHover={{
//         x: 10,
//         transition: { duration: 0.2 }
//       }}
//       className="flex items-start gap-4 cursor-pointer"
//     >
//       <motion.div
//         whileHover={{
//           scale: 1.1,
//           rotate: 360,
//           transition: { duration: 0.5 }
//         }}
//         className="w-8 h-8 bg-white rounded-full flex items-center justify-center mt-1 shadow-lg"
//       >
//         <div className="text-purple-600">
//           {icon}
//         </div>
//       </motion.div>
//       <div>
//         <motion.h3
//           className="text-base font-normal text-[#F6F6F6] mb-1"
//           whileHover={{ color: "#C183B2" }}
//         >
//           {title}
//         </motion.h3>
//         <p className="text-sm opacity-90">{content}</p>
//       </div>
//     </motion.div>
//   );
// };

// // Form Field Component
// const FormField = ({ label, type, name, value, onChange, options }) => {
//   return (
//     <motion.div
//       whileHover={{
//         scale: 1.02,
//         transition: { duration: 0.2 }
//       }}
//       className="flex p-4 px-4 items-start gap-1 flex-1 self-stretch border border-[#6E2D79] rounded-md hover:border-purple-500 hover:shadow-md transition-all duration-300"
//     >
//       <div className="w-full">
//         <label className="block text-sm text-gray-600 mb-1">{label}</label>
//         {type === 'select' ? (
//           <select
//             name={name}
//             value={value}
//             onChange={onChange}
//             className="w-full rounded-md text-[#6E2D79] font-poppins text-base font-normal leading-6 outline-none bg-transparent"
//           >
//             {options?.map((option, index) => (
//               <option key={index} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         ) : (
//           <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={onChange}
//             className="w-full rounded-md text-[#6E2D79] font-poppins text-base font-normal leading-6 outline-none bg-transparent"
//           />
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default ContactUsPage;
















































// // import React from "react";
// // import { Send } from "lucide-react";

// // export default function ContactUsPage() {
// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-[#F5F0F9] px-4">
// //       <div className="max-w-2xl w-full">
// //         {/* Heading */}
// //         <div className="mb-6">
// //           <h2 className="text-2xl sm:text-3xl font-semibold text-[#6E2D79]">
// //             Contact Us
// //           </h2>
// //           <p className="text-sm text-gray-600">We’d Love to Hear From You!</p>
// //         </div>

// //         {/* Form */}
// //         <form className="space-y-4">
// //           <input
// //             type="text"
// //             placeholder="Full Name"
// //             className="w-full border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
// //           />

// //           <input
// //             type="email"
// //             placeholder="Enter Your Email"
// //             className="w-full border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
// //           />

// //           {/* Country and Pin Code */}
// //           <div className="flex flex-col sm:flex-row gap-4">
// //             <select className="flex-1 border border-[#6E2D79] rounded-md px-4 py-3 text-gray-700 focus:outline-none">
// //               <option>Select Country</option>
// //               <option>India</option>
// //               <option>USA</option>
// //               <option>UK</option>
// //             </select>
// //             <input
// //               type="text"
// //               placeholder="226002"
// //               className="flex-1 border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
// //             />
// //           </div>

// //           {/* Phone Input */}
// //           <input
// //             type="tel"
// //             placeholder="+91 6042642638"
// //             className="w-full border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
// //           />

// //           {/* Message */}
// //           <textarea
// //             rows="4"
// //             placeholder="Enter Message"
// //             className="w-full border border-[#6E2D79] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
// //           ></textarea>

// //           {/* Policy */}
// //           <div className="text-xs text-gray-600">
// //             I accept the Privacy Policy<br />
// //             <a href="#" className="text-[#6E2D79] underline">I've read Privacy Policy</a>
// //           </div>

// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             className="w-full bg-[#6E2D79] text-white py-3 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base font-semibold"
// //           >
// //             Send Message <Send size={16} />
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
















import React, { useState, useRef, useCallback } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { BsSend } from "react-icons/bs";

// Constants for better maintainability
const ANIMATION_CONFIG = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }
};

const COUNTRIES = [
  { value: '', label: 'Select Country' },
  { value: 'US', label: 'United States' },
  { value: 'IN', label: 'India' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' }
];

const FORM_VALIDATION = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phoneNumber: { required: true, pattern: /^\+?[\d\s\-\(\)]{10,}$/ },
  country: { required: true },
  zipCode: { required: true, minLength: 3 },
  message: { required: true, minLength: 0 },
  acceptPrivacyPolicy: { required: true }
};

// Custom hooks for better separation of concerns
const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((name, value) => {
    const validation = FORM_VALIDATION[name];
    if (!validation) return '';

    if (validation.required && !value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (validation.minLength && value.length < validation.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${validation.minLength} characters`;
    }

    if (validation.pattern && !validation.pattern.test(value)) {
      if (name === 'email') return 'Please enter a valid email address';
      if (name === 'phoneNumber') return 'Please enter a valid phone number';
    }

    return '';
  }, []);

  const validateForm = useCallback((data) => {
    const newErrors = {};
    Object.keys(FORM_VALIDATION).forEach(field => {
      const error = validateField(field, data[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateField]);

  return { errors, validateField, validateForm, setErrors };
};

const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const submitForm = useCallback(async (formData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://ekaausa.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error.message || 'Failed to send message. Please try again.';
      setSubmitStatus({ type: 'error', message: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { submitForm, isSubmitting, submitStatus };
};

// Reusable components
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={ANIMATION_CONFIG.staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  options = [],
  className = "",
  ...props
}) => {
  const baseInputClasses = `
    w-full border rounded-md px-4 py-3 font-poppins text-base
    focus:outline-none focus:ring-2 transition-all duration-300
    ${error
      ? 'border-red-500 focus:ring-red-300 bg-red-50'
      : 'border-[#6E2D79] focus:ring-purple-300 bg-white'
    }
  `;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#6E2D79]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={baseInputClasses}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${baseInputClasses} resize-vertical min-h-[120px]`}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={baseInputClasses}
          {...props}
        />
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const StatusMessage = ({ status }) => {
  if (!status) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-md mb-6 ${status.type === 'success'
          ? 'bg-green-50 border border-green-200 text-green-800'
          : 'bg-red-50 border border-red-200 text-red-800'
        }`}
    >
      {status.message}
    </motion.div>
  );
};

// Main component
const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    zipCode: '',
    message: '',
    acceptPrivacyPolicy: false
  });

  const [touchedFields, setTouchedFields] = useState({});
  const { errors, validateField, validateForm, setErrors } = useFormValidation(formData);
  const { submitForm, isSubmitting, submitStatus } = useFormSubmission();

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors, setErrors]);

  const handleFieldBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    if (touchedFields[name] || value) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touchedFields, validateField, setErrors]);

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();

    if (!validateForm(formData)) {
      setTouchedFields(Object.keys(FORM_VALIDATION).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}));
      return;
    }

    const result = await submitForm(formData);
    if (result.success) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        zipCode: '',
        message: '',
        acceptPrivacyPolicy: false
      });
      setTouchedFields({});
      setErrors({});
    }
  }, [formData, validateForm, submitForm, setErrors]);

  return (
    <div className="bg-purple-50 min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={ANIMATION_CONFIG.staggerContainer}
        className="relative z-10 text-center pt-20 pb-16"
      >
        <motion.h1
          variants={ANIMATION_CONFIG.fadeInUp}
          className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#6E2D79] font-poppins mb-4"
        >
          Contact Us
        </motion.h1>
        <motion.p
          variants={ANIMATION_CONFIG.fadeInUp}
          className="font-normal text-[#6E2D79] font-poppins text-base sm:text-lg max-w-2xl mx-auto px-4"
        >
          We'd Love to Hear From You!
        </motion.p>
      </motion.div>

      {/* Form Section */}
      <AnimatedSection className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={ANIMATION_CONFIG.fadeInUp}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
          >
            <StatusMessage status={submitStatus} />

            <div className="space-y-6">
              {/* First Name and Last Name */}
              <motion.div variants={ANIMATION_CONFIG.fadeInLeft}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Enter your first name"
                    error={touchedFields.firstName ? errors.firstName : ''}
                    required
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Enter your last name"
                    error={touchedFields.lastName ? errors.lastName : ''}
                    required
                  />
                </div>
              </motion.div>

              {/* Email and Phone Number */}
              <motion.div variants={ANIMATION_CONFIG.fadeInRight}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Enter your email address"
                    error={touchedFields.email ? errors.email : ''}
                    required
                  />
                  <FormField
                    label="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="+1 (555) 123-4567"
                    error={touchedFields.phoneNumber ? errors.phoneNumber : ''}
                    required
                  />
                </div>
              </motion.div>

              {/* Country and Zip Code */}
              <motion.div variants={ANIMATION_CONFIG.fadeInLeft}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Country"
                    type="select"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    options={COUNTRIES}
                    error={touchedFields.country ? errors.country : ''}
                    required
                  />
                  <FormField
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Enter zip code"
                    error={touchedFields.zipCode ? errors.zipCode : ''}
                    required
                  />
                </div>
              </motion.div>

              {/* Message */}
              <motion.div variants={ANIMATION_CONFIG.fadeInRight}>
                <FormField
                  label="Message"
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  placeholder="Tell us how we can help you..."
                  error={touchedFields.message ? errors.message : ''}
                  required
                  rows={5}
                />
              </motion.div>

              {/* Privacy Policy Checkbox */}
              <motion.div variants={ANIMATION_CONFIG.fadeInUp}>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="acceptPrivacyPolicy"
                    name="acceptPrivacyPolicy"
                    checked={formData.acceptPrivacyPolicy}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className="mt-1 h-4 w-4 text-[#6E2D79] focus:ring-[#6E2D79] border-gray-300 rounded"
                  />
                  <label htmlFor="acceptPrivacyPolicy" className="text-sm text-[#6E2D79]">
                    I accept the{' '}
                    <motion.a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6E2D79] underline font-medium"
                      whileHover={{ color: "#4b0082" }}
                    >
                      Privacy Policy
                    </motion.a>{' '}
                    <span className="text-red-500">*</span>
                  </label>

                </div>
                {touchedFields.acceptPrivacyPolicy && errors.acceptPrivacyPolicy && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium mt-2"
                  >
                    {errors.acceptPrivacyPolicy}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={ANIMATION_CONFIG.fadeInUp}>
                <motion.button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? {
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(110,45,121,0.3)",
                  } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full inline-flex justify-center items-center text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-[#6E2D79] px-8 py-4 gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={!isSubmitting ? { x: -5 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.span>
                  <motion.div
                    initial={{ x: 0, rotate: 0 }}
                    whileHover={!isSubmitting ? { x: 5, rotate: 45 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <BsSend size={20} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ContactUsPage;
