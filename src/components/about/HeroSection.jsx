// import React from "react";
// import { motion } from "framer-motion";

// const HeroSection = () => {
//   // Container animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         staggerChildren: 0.3
//       }
//     }
//   };

//   // Text animation variants
//   const textVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 40,
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

//   // Background overlay animation
//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { duration: 1.2 }
//     }
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={overlayVariants}
//       className="relative w-full h-[825px] sm:h-[700px] md:h-[825px]"
//       style={{
//         aspectRatio: "101 / 55",
//         backgroundImage: "url('/about/aboutbg.svg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Animated background overlay */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.1 }}
//         transition={{ duration: 1.5 }}
//         className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"
//       />
      
//       <motion.div 
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
//       >
//         <motion.h1
//           variants={textVariants}

//           className="max-w-[90%] md:max-w-[1331px] text-[#6E2D79] font-[Poppins] text-[26px] sm:text-[28px] md:text-[36px] lg:text-[36px] font-semibold leading-[44px] sm:leading-[60px] md:leading-[72px] mb-2 sm:mb-4 -mt-8 sm:-mt-12"
//         >
//           Empowering Conscious Transformation
//         </motion.h1>

//         <motion.p
//           variants={textVariants}

//           className="text-[#A35F93] font-[Poppins] text-[16px] sm:text-[18px] lg:text-[18px]  font-normal leading-[24px] px-4 "
//         >
//           EKAA brings healing through integrated hypnotherapy, awakening clarity and purpose <br/> within.
//         </motion.p>

//         {/* Optional: Floating elements for visual interest */}
    
       
//       </motion.div>
//     </motion.div>
//   );
// };

// export default HeroSection;














import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Settings } from "lucide-react";

const Herosection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2 },
    },
  };

  const playIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Open video modal
  const openVideoModal = () => {
    setIsModalOpen(true);
    setVideoStarted(true);
    setPlaying(true);
    setProgress(0);
    setShowControls(true);
    setShowThumbnail(false);
    document.body.style.overflow = 'hidden';
    
    // Auto play video after modal opens
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error('Auto-play failed:', error);
          setShowThumbnail(true);
          setPlaying(false);
          setVideoStarted(false);
        });
      }
    }, 100);
  };

  const closeVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsModalOpen(false);
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
    videoRef.current.currentTime = 0;
  };

  const handleVideoPause = () => {
    setPlaying(false);
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

  const handleVideoClick = (e) => {
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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={overlayVariants}
        className="relative w-full h-[825px] sm:h-[700px] md:h-[825px] overflow-hidden cursor-pointer"
        style={{
          aspectRatio: "101 / 55",
        }}
        onClick={openVideoModal}
      >
        {/* Thumbnail Background */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/decode/hero_decode.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"
        />

        {/* Content Overlay */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
        >
          <motion.h1
            variants={textVariants}
            className="max-w-[90%] md:max-w-[1331px] text-[#6E2D79] font-[Poppins] text-[30px] sm:text-[35px] md:text-[60px] lg:text-[65px] font-semibold leading-[44px] sm:leading-[60px] md:leading-[72px] mb-2 sm:mb-4 -mt-8 sm:-mt-12"
          >
            DECODE
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-[#5C2166] font-[Poppins] text-[16px] sm:text-[18px] lg:text-[18px] font-normal leading-[24px] px-4 mb-8"
          >
            Transform your Mind, Behavior, Relationships, and Blueprint
          </motion.p>

          {/* Play Button */}
          <motion.button
            variants={playIconVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className="group relative bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-2xl border-2 border-white/30 hover:bg-white transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6E2D79]/20 to-[#5C2166]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Play className="w-8 h-8 text-[#6E2D79] ml-1 relative z-10" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={closeVideoModal}
              variants={backdropVariants}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-black rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-[90vw] sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[75vh] sm:max-h-[80vh] overflow-hidden"
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
                {/* Thumbnail Overlay */}
                {showThumbnail && (
                  <div 
                    className="absolute inset-0 z-20 cursor-pointer group"
                    onClick={handleThumbnailClick}
                  >
                    <img
                      src="/decode/hero_decode.png"
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                    
                    {/* Large Play Button */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/90 hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
                      <Play className="text-[#6E2D79] text-xl sm:text-2xl lg:text-3xl ml-1" />
                    </div>
                    
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
                >
                  <source src="https://d2nxi4iq5glqsu.cloudfront.net/1-Introduction+-+Decode+landing+video+decode+page.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Controls Play Button Overlay */}
                {videoStarted && !playing && !showThumbnail && (
                  <button
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 hover:bg-black/80 transition border-2 border-white/30 shadow-lg cursor-pointer"
                    onClick={handlePlayPause}
                  >
                    <Play className="text-white text-lg sm:text-2xl lg:text-3xl opacity-90" />
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
                              <Pause className="text-white w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" /> :
                              <Play className="text-white w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                            }
                          </button>
                          <button onClick={handleMute} className="focus:outline-none p-1 sm:p-1.5 lg:p-0">
                            {muted ?
                              <VolumeX className="text-white w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" /> :
                              <Volume2 className="text-white w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
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
                          <span className="sm:hidden text-xs text-white font-mono select-none">
                            {videoRef.current
                              ? `${Math.floor(videoRef.current.currentTime / 60)}:${('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2)}`
                              : '0:00'}
                          </span>

                          <button className="focus:outline-none p-1 sm:p-1.5 lg:p-0" title="Closed Captions">
                            <svg className="text-white w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2h10z" clipRule="evenodd" />
                            </svg>
                          </button>

                          <button className="focus:outline-none p-1 sm:p-1.5 lg:p-0" title="Settings">
                            <Settings className="text-white w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Herosection;