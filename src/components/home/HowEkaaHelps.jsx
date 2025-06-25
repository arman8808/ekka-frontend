// import React from "react";
// import { motion } from "framer-motion";

// // Mock images for demo - replace with your actual imports
// const bgImg = "/help/help.svg";
// const dividerIcon = "/ine.png";

// const HowEkaaHelps = () => {
//   const data = [
//     {
//       title: "Corporates",
//       description:
//         "Enhance leadership, decision-making, and team harmony through inner clarity and stress-reduction methodologies.",
//       img: "/home/Data analytics dashboard.svg",
//       icon: (
//         <svg
//           className="w-full h-full text-white"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//         </svg>
//       ),
//     },
//     {
//       title: "Parents & Teachers",
//       description:
//         "Gain tools to nurture emotional intelligence, resolve conflicts, and build stronger, more empathetic connections with children.",
//       img: "/home/Experience Transformational Learning make this  into  real image.svg",
//       icon: (
//         <svg
//           className="w-full h-full text-white"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//         </svg>
//       ),
//     },
//     {
//       title: "Health Practitioners",
//       description:
//         "Integrate mind-body tools into your practice to support emotional, psychological, and energetic healing in your clients.",
//       img: "/home/Guided by Certified Facilitators make this i nto real image and dont add any text.svg",
//       icon: (
//         <svg
//           className="w-full h-full text-white"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//         </svg>
//       ),
//     },
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1
//       }
//     }
//   };

//   const cardVariants = {
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
//         duration: 0.7,
//         ease: [0.25, 0.46, 0.45, 0.94],
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, scale: 1.1 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       transition: { duration: 0.8, ease: "easeOut" }
//     }
//   };

//   const iconVariants = {
//     hidden: { opacity: 0, scale: 0, rotate: -180 },
//     visible: { 
//       opacity: 1, 
//       scale: 1, 
//       rotate: 0,
//       transition: { 
//         duration: 0.6, 
//         delay: 0.3,
//         type: "spring",
//         stiffness: 200,
//         damping: 15
//       }
//     }
//   };

//   const textVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" }
//     }
//   };

//   const dividerVariants = {
//     hidden: { opacity: 0, scaleY: 0 },
//     visible: { 
//       opacity: 1, 
//       scaleY: 1,
//       transition: { 
//         duration: 0.6, 
//         delay: 0.4,
//         ease: "easeOut" 
//       }
//     }
//   };

//   const ctaVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.6, 
//         delay: 0.8,
//         ease: "easeOut" 
//       }
//     }
//   };

//   return (
//     <section
//       className="relative bg-cover bg-center bg-no-repeat text-center text-[#4b0082] overflow-hidden"
//       style={{ backgroundImage: `url(${bgImg})` }}
//     >
//       {/* Container with responsive padding */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-12 lg:py-16 xl:py-20">

//         {/* Header Section */}
//         <motion.header 
//           className="mb-8 sm:mb-12 lg:mb-16"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           variants={containerVariants}
//         >
//           <motion.div
//             className="mb-6 sm:mb-8 lg:mb-12"
//             variants={textVariants}
//           >
//             <motion.h2 
//               className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[24px] font-medium text-[#6E2D79] mb-2 sm:mb-3 lg:mb-4 leading-tight"
//               variants={textVariants}
//             >
//               Who can benefit
//             </motion.h2>
//             <motion.p 
//               className="text-[14px]  sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#A35F93] mb-4 sm:mb-6 lg:mb-8 max-w-sm sm:max-w-md lg:max-w-lg mx-auto leading-relaxed"
//               variants={textVariants}
//             >
//               Empowering individuals to heal, lead, and grow 
// with purpose across professions.
//             </motion.p>
//           </motion.div>
//         </motion.header>

//         {/* Cards Container */}
//         <motion.div 
//           className="flex flex-col lg:flex-row justify-center items-stretch gap-6 sm:gap-8 lg:gap-4 xl:gap-6 max-w-7xl mx-auto mb-8 sm:mb-12 lg:mb-16"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//           variants={containerVariants}
//         >
//           {data.map((item, index) => (
//             <React.Fragment key={index}>

//               {/* Card */}
//               <motion.article 
//                 className="bg-white rounded-xl sm:rounded-2xl border border-black/60 w-full max-w-sm sm:max-w-md lg:max-w-none lg:flex-1 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0px_8px_24px_rgba(110,45,121,0.3)] mx-auto lg:mx-0"
//                 variants={cardVariants}
//                 whileHover={{ 
//                   y: -8, 
//                   transition: { duration: 0.3, ease: "easeOut" } 
//                 }}
//               >

//                 {/* Image Container */}
//                 <motion.div 
//                   className="relative w-full aspect-video overflow-hidden"
//                   variants={imageVariants}
//                 >
//                   <motion.img
//                     src={item.img}
//                     alt={`${item.title} illustration`}
//                     className="w-full h-full object-cover"
//                     loading="lazy"
//                     initial={{ scale: 1.1 }}
//                     animate={{ scale: 1 }}
//                     transition={{ duration: 0.8, ease: "easeOut" }}
//                   />
//                 </motion.div>

//                 {/* Icon Button */}
//                 <motion.div 
//                   className="relative z-10 -mt-6 sm:-mt-7 flex justify-start px-4 sm:px-5 lg:px-6"
//                   variants={iconVariants}
//                 >
//                   <motion.div 
//                     className="flex w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 p-2 sm:p-3 justify-center items-center rounded-xl bg-gradient-to-br from-[#C183B2] to-[#6E2D79] shadow-[0px_4px_12px_rgba(110,45,121,0.20)]"
//                     whileHover={{ 
//                       scale: 1.1, 
//                       rotate: 5,
//                       transition: { duration: 0.2 } 
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     {item.icon}
//                   </motion.div>
//                 </motion.div>

//                 {/* Content */}
//                 <motion.div 
//                   className="p-4 sm:p-5 lg:p-6 text-left flex-1 flex flex-col"
//                   variants={textVariants}
//                 >
//                   <motion.h3 
//                     className="text-base sm:text-lg lg:text-xl font-medium text-[#6E2D79] font-[Poppins] mb-3 sm:mb-4 leading-tight"
//                     variants={textVariants}
//                   >
//                     {item.title}
//                   </motion.h3>
//                   {/* <motion.p 
//                     className="text-sm sm:text-base font-normal text-[#A35F93] font-[Poppins] leading-relaxed flex-1"
//                     variants={textVariants}
//                   >
//                     {item.description}
//                   </motion.p> */}
//                 </motion.div>
//               </motion.article>

//               {/* Divider - Only visible on large screens between cards */}
//               {index < data.length - 1 && (
//                 <motion.div 
//                   className="hidden lg:flex items-center justify-center px-2 xl:px-4"
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true, amount: 0.5 }}
//                   variants={dividerVariants}
//                 >
//                   <motion.img
//                     src={dividerIcon}
//                     alt=""
//                     className="w-8 lg:w-10 xl:w-12 h-auto max-h-80"
//                     role="presentation"
//                     whileHover={{ 
//                       scale: 1.1,
//                       transition: { duration: 0.2 }
//                     }}
//                   />
//                 </motion.div>
//               )}
//             </React.Fragment>
//           ))}
//         </motion.div>

//         {/* Call to Action */}

//       </div>
//     </section>
//   );
// };

// export default HowEkaaHelps;











import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaClosedCaptioning, FaCog } from "react-icons/fa";

// Mock images for demo - replace with your actual imports
const bgImg = "/help/help.svg";
const dividerIcon = "/ine.png";

const HowEkaaHelps = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  // Video control states
  const [videoStarted, setVideoStarted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  const [showThumbnail, setShowThumbnail] = useState(true);

  const data = [
    {
      title: "Corporates",
      img: "/home/corparte.png",
      videoUrl: "https://d2nxi4iq5glqsu.cloudfront.net/9-Decode+for+Corporate.mp4",
      icon: (
        <svg
          className="w-full h-full text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      title: "Parents & Teachers",
      img: "/home/Parents & Teachers.png",
      videoUrl: "https://d2nxi4iq5glqsu.cloudfront.net/8-Decode+for+parents+%26+teacher.mp4",
      icon: (
        <svg
          className="w-full h-full text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      title: "Health Practitioners",
      img: "/home/doctor.png",
      videoUrl: "https://d2nxi4iq5glqsu.cloudfront.net/10-Decode+for+medical+prof..mp4",
      icon: (
        <svg
          className="w-full h-full text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  // Modified Handle video modal - Auto play video when modal opens
  const openVideoModal = (videoData) => {
    setSelectedVideo(videoData);
    setVideoStarted(true); // Set to true immediately
    setPlaying(true); // Set playing to true
    setProgress(0);
    setShowControls(true);
    setShowThumbnail(false); // Hide thumbnail immediately
    document.body.style.overflow = 'hidden';
    
    // Auto play video after modal opens
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error('Auto-play failed:', error);
          // If autoplay fails, show thumbnail as fallback
          setShowThumbnail(true);
          setPlaying(false);
          setVideoStarted(false);
        });
      }
    }, 100); // Small delay to ensure video element is ready
  };

  const closeVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedVideo(null);
    setVideoStarted(false);
    setPlaying(false);
    setProgress(0);
    setShowThumbnail(true);
    document.body.style.overflow = 'unset';
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
  };

  // Video control handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowThumbnail(false);
        if (!videoStarted) {
          setVideoStarted(true);
        }
      }
      setPlaying(!playing);
    }
  };

  const handleThumbnailClick = () => {
    setVideoStarted(true);
    setShowThumbnail(false);
    videoRef.current.play();
    setPlaying(true);
  };

  const handleVideoEnd = () => {
    setPlaying(false);
    setShowThumbnail(true);
    setProgress(0);
    // Reset video to beginning
    videoRef.current.currentTime = 0;
  };

  const handleVideoPause = () => {
    setPlaying(false);
    // Don't show thumbnail on pause - let user see the paused frame
    // setShowThumbnail(true);
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleProgressBar = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      videoRef.current.currentTime = newTime;
      setProgress((newTime / duration) * 100);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    const timeout = setTimeout(() => {
      if (playing && videoStarted && !showThumbnail) {
        setShowControls(false);
      }
    }, 4000);
    setControlsTimeout(timeout);
  };

  // Video event handlers
  const handleVideoClick = (e) => {
    // Prevent click when clicking on controls
    if (e.target.closest('.video-controls')) {
      return;
    }
    handlePlayPause();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [controlsTimeout]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const dividerVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      <section
        className="relative bg-cover bg-center bg-no-repeat text-center text-[#4b0082] overflow-hidden"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* Container with responsive padding */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-12 lg:py-16 xl:py-20">

          {/* Header Section */}
          <motion.header
            className="mb-8 sm:mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div
              className="mb-6 sm:mb-8 lg:mb-12"
              variants={textVariants}
            >
              <motion.h2
                className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[24px] font-medium text-[#6E2D79] mb-2 sm:mb-3 lg:mb-4 leading-tight"
                variants={textVariants}
              >
                Who can benefit
              </motion.h2>
              <motion.p
                className="text-[14px] sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#A35F93] mb-4 sm:mb-6 lg:mb-8 max-w-sm sm:max-w-md lg:max-w-lg mx-auto leading-relaxed"
                variants={textVariants}
              >
                Empowering individuals to heal, lead, and grow
                with purpose across professions.
              </motion.p>
            </motion.div>
          </motion.header>

          {/* Cards Container */}
          <motion.div
            className="flex flex-col lg:flex-row justify-center items-stretch gap-6 sm:gap-8 lg:gap-4 xl:gap-6 max-w-7xl mx-auto mb-8 sm:mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {data.map((item, index) => (
              <React.Fragment key={index}>

                {/* Card */}
                <motion.article
                  className="bg-white rounded-xl sm:rounded-2xl border border-black/60 w-full max-w-sm sm:max-w-md lg:max-w-none lg:flex-1 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0px_8px_24px_rgba(110,45,121,0.3)] mx-auto lg:mx-0"
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >

                  {/* Image Container */}
                  <motion.div
                    className="relative w-full aspect-video overflow-hidden"
                    variants={imageVariants}
                  >
                    <motion.img
                      src={item.img}
                      alt={`${item.title} illustration`}
                      className="w-full h-full object- as"
                      loading="lazy"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      
                    />
                  </motion.div>

                  {/* Icon Button */}
                  <motion.div
                    className="relative z-10 -mt-6 sm:-mt-7 flex justify-start px-4 sm:px-5 lg:px-6"
                    variants={iconVariants}
                  >
                    <motion.button
                      className="flex w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 p-2 sm:p-3 justify-center items-center rounded-xl bg-gradient-to-br from-[#C183B2] to-[#6E2D79] shadow-[0px_4px_12px_rgba(110,45,121,0.20)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6E2D79] focus:ring-offset-2 transition-all duration-200"
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openVideoModal(item)}
                      aria-label={`Play video for ${item.title}`}
                    >
                      <FaPlay className="text-white"/>
                    </motion.button>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="p-4 sm:p-5 lg:p-6 text-left flex-1 flex flex-col"
                    variants={textVariants}
                  >
                    <motion.h3
                      className="text-base sm:text-lg lg:text-xl font-medium text-[#6E2D79] font-[Poppins] mb-3 sm:mb-4 leading-tight"
                      variants={textVariants}
                    >
                      {item.title}
                    </motion.h3>
                  </motion.div>
                </motion.article>

                {/* Divider - Only visible on large screens between cards */}
                {index < data.length - 1 && (
                  <motion.div
                    className="hidden lg:flex items-center justify-center px-2 xl:px-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={dividerVariants}
                  >
                    <motion.img
                      src={dividerIcon}
                      alt=""
                      className="w-8 lg:w-10 xl:w-12 h-auto max-h-80"
                      role="presentation"
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                    />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={closeVideoModal}
              variants={backdropVariants}
            />

            {/* Modal Content - Reduced Size */}
            <motion.div
              className="relative bg-black rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-[90vw] sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl max-h-[75vh] sm:max-h-[80vh] overflow-hidden"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between p-3 sm:p-4 lg:p-6 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex-1" />
                
                {/* Close Button */}
                <motion.button
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  onClick={closeVideoModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close video modal"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Video Container */}
              <div
                className="relative aspect-video bg-black group"
                onMouseMove={handleMouseMove}
              >
                {/* Thumbnail Overlay - Shows before video starts, when paused, or when ended */}
                {showThumbnail && (
                  <div 
                    className="absolute inset-0 z-20 cursor-pointer group"
                    onClick={handleThumbnailClick}
                  >
                    {/* Thumbnail Image */}
                    <img
                      src={selectedVideo.img}
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    
                    {/* Overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                    
                    {/* Large Play Button */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/90 hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
                      <FaPlay className="text-[#6E2D79] text-xl sm:text-2xl lg:text-3xl ml-1" />
                    </div>
                    
                    {/* Progress indicator for paused/ended videos */}
                    {videoStarted && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                        <div 
                          className="h-full bg-[#B97AC9] transition-all duration-200"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}

                <video
                  ref={videoRef}
                  className={`w-full h-full object-contain cursor-pointer transition-opacity duration-300 ${
                    showThumbnail ? 'opacity-0' : 'opacity-100'
                  }`}
                  onClick={handleVideoClick}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setPlaying(true)}
                  onPause={handleVideoPause}
                  onEnded={handleVideoEnd}
                  muted={muted}
                  preload="metadata"
                  onError={(e) => {
                    console.error('Video failed to load:', e);
                  }}
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Controls Play Button Overlay (shows when video is paused after starting but thumbnail is hidden) */}
                {videoStarted && !playing && !showThumbnail && (
                  <button
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 hover:bg-black/80 transition border-2 border-white/30 shadow-lg cursor-pointer"
                    onClick={handlePlayPause}
                    style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.25)' }}
                  >
                    <FaPlay className="text-white text-lg sm:text-2xl lg:text-3xl opacity-90" />
                  </button>
                )}

                {/* Enhanced Controls Box at Bottom Center */}
                {videoStarted && !showThumbnail && showControls && (
          <div className="absolute left-1/2 bottom-1 sm:bottom-4 lg:bottom-1 xl:bottom-0 -translate-x-1/2 z-[1000] flex flex-col items-center px-2 sm:px-0">
            <div
              className="flex flex-col bg-[#6E2D79] rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 w-full max-w-sm sm:max-w-lg lg:w-[622px] lg:h-[51px]"
              style={{
                width: 'min(calc(100vw - 32px), 622px)',
                flexShrink: 0
              }}
            >
              {/* Progress Bar on Top */}
              <div
                className="w-full h-1 bg-white/30 rounded-full mb-1 relative cursor-pointer"
                onClick={handleProgressBar}
              >
                <div
                  className="h-1 bg-[#B97AC9] rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="relative flex items-center justify-between w-full py-0.5 sm:py-1 lg:py-0">
                {/* Left Controls */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-4">
                  <button onClick={handlePlayPause} className="focus:outline-none p-1 sm:p-1.5 lg:p-0">
                    {playing ?
                      <FaPause className="text-white text-xs sm:text-sm lg:text-lg" /> :
                      <FaPlay className="text-white text-xs sm:text-sm lg:text-lg" />
                    }
                  </button>
                  <button onClick={handleMute} className="focus:outline-none p-1 sm:p-1.5 lg:p-0">
                    {muted ?
                      <FaVolumeMute className="text-white text-xs sm:text-sm lg:text-lg" /> :
                      <FaVolumeUp className="text-white text-xs sm:text-sm lg:text-lg" />
                    }
                  </button>
                  <span className="hidden sm:inline text-xs text-white font-mono select-none">
                    {videoRef.current
                      ? `${Math.floor(videoRef.current.currentTime / 60)}:${('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2)} / ${Math.floor(duration / 60)}:${('0' + Math.floor(duration % 60)).slice(-2)}`
                      : '0:00 / 0:00'}
                  </span>
                </div>

                {/* Right Controls */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
                  {/* Time display for mobile only */}
                  <span className="sm:hidden text-xs text-white font-mono select-none">
                    {videoRef.current
                      ? `${Math.floor(videoRef.current.currentTime / 60)}:${('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2)}`
                      : '0:00'}
                  </span>

                  {/* CC Button */}
                  <button className="focus:outline-none p-1 sm:p-1.5 lg:p-0" title="Closed Captions">
                    <FaClosedCaptioning className="text-white text-xs sm:text-sm lg:text-lg" />
                  </button>

                  {/* Settings Button */}
                  <button className="focus:outline-none p-1 sm:p-1.5 lg:p-0" title="Settings">
                    <FaCog className="text-white text-xs sm:text-sm lg:text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HowEkaaHelps;