import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Settings, X } from 'lucide-react'; // or your icon library

const HeroVideoSection = ({
  content = (
    <div className="text-center">
      <h1 className="max-w-[90%] md:max-w-[1331px] text-white font-[Poppins] text-[30px] sm:text-[35px] md:text-[60px] lg:text-[65px] font-semibold leading-[44px] sm:leading-[60px] md:leading-[72px] mb-2 sm:mb-4 -mt-8 sm:-mt-12">
        DECODE
      </h1>
      <p className="text-white font-[Poppins] text-[16px] sm:text-[18px] lg:text-[18px] font-normal leading-[24px] px-4 mb-8">
        Transform your Mind, Behavior, Relationships, and Blueprint
      </p>
    </div>
  ),
  buttonContent = (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-2xl border-2 border-white/30 hover:bg-white transition-all duration-300 z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6E2D79]/20 to-[#5C2166]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Play className="w-8 h-8 text-[#6E2D79] ml-1 relative z-10" />
    </div>
  ),
  contentPosition = "above", // 'above', 'below', 'left', 'right'
  videoUrl = "https://d2nxi4iq5glqsu.cloudfront.net/1-Introduction+-+Decode+landing+video+decode+page.mp4",
  thumbnailUrl = "/decodethumb.png",
  containerClass = "relative w-full h-[825px] sm:h-[700px] md:h-[825px] overflow-hidden",
  contentContainerClass = "absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);

  // Animation variants
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

  const dialogVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handlePlayButtonClick = () => {
    setIsDialogOpen(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const handleCloseDialog = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsDialogOpen(false);
    setProgress(0);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMute = () => {
    setMuted(!muted);
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && duration > 0) {
      const current = videoRef.current.currentTime;
      setProgress((current / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressBar = (e) => {
    if (videoRef.current && duration > 0) {
      const rect = e.target.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      videoRef.current.currentTime = newTime;
      setProgress(percent * 100);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  // Handle escape key to close dialog
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isDialogOpen) {
        handleCloseDialog();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isDialogOpen]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDialogOpen]);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={overlayVariants}
        className={containerClass}
        style={{ aspectRatio: "101 / 55" }}
      >
        {/* Thumbnail Background */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('${thumbnailUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent z-0"
        />

        {/* Content Overlay */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${contentContainerClass} ${
            contentPosition === "left" || contentPosition === "right"
              ? "md:flex-row"
              : "flex-col"
          }`}
        >
          {/* Content position handling for all cases */}
          {contentPosition === "above" && (
            <>
              <motion.div variants={textVariants}>
                {content}
              </motion.div>
              <motion.div
                variants={playIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayButtonClick}
                className="mt-8"
              >
                {buttonContent}
              </motion.div>
            </>
          )}

          {contentPosition === "below" && (
            <>
              <motion.div
                variants={playIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayButtonClick}
                className="mb-8"
              >
                {buttonContent}
              </motion.div>
              <motion.div variants={textVariants}>
                {content}
              </motion.div>
            </>
          )}

          {contentPosition === "left" && (
            <>
              <motion.div
                variants={textVariants}
                className="md:text-left md:pr-8"
              >
                {content}
              </motion.div>
              <motion.div
                variants={playIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayButtonClick}
              >
                {buttonContent}
              </motion.div>
            </>
          )}

          {contentPosition === "right" && (
            <>
              <motion.div
                variants={playIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayButtonClick}
              >
                {buttonContent}
              </motion.div>
              <motion.div
                variants={textVariants}
                className="md:text-left md:pl-8"
              >
                {content}
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Video Dialog Modal */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseDialog}
          >
            <motion.div
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-[70vw] 2xl:max-w-[60vw] bg-black rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDialog}
                className="absolute top-3 right-3 z-30 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Video Container */}
              <div className="relative w-full aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleVideoEnded}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  src={videoUrl}
                  poster={thumbnailUrl}
                  controls={false}
                  muted={muted}
                  onClick={handlePlayPause}
                />

                {/* Custom Video Controls */}
                {showControls && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 flex flex-col items-center px-2 sm:px-0">
                    <div
                      className="flex flex-col bg-[#6E2D79] rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 w-full max-w-sm sm:max-w-lg lg:w-[622px] lg:h-[51px]"
                      style={{
                        width: "min(calc(100vw - 64px), 622px)",
                        flexShrink: 0,
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
                          <button
                            onClick={handlePlayPause}
                            className="focus:outline-none p-1 sm:p-1.5 lg:p-0"
                          >
                            {isPlaying ? (
                              <Pause className="text-white text-xs sm:text-sm lg:text-lg" />
                            ) : (
                              <Play className="text-white text-xs sm:text-sm lg:text-lg" />
                            )}
                          </button>
                          <button
                            onClick={handleMute}
                            className="focus:outline-none p-1 sm:p-1.5 lg:p-0"
                          >
                            {muted ? (
                              <VolumeX className="text-white text-xs sm:text-sm lg:text-lg" />
                            ) : (
                              <Volume2 className="text-white text-xs sm:text-sm lg:text-lg" />
                            )}
                          </button>
                          <span className="hidden sm:inline text-white font-mono select-none text-xs">
                            {videoRef.current && duration > 0
                              ? `${formatTime(
                                  videoRef.current.currentTime
                                )} / ${formatTime(duration)}`
                              : "0:00 / 0:00"}
                          </span>
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
                          {/* Time display for mobile only */}
                          <span className="sm:hidden text-white font-mono select-none text-xs">
                            {videoRef.current && duration > 0
                              ? formatTime(videoRef.current.currentTime)
                              : "0:00"}
                          </span>

                          {/* Settings Button */}
                          <button
                            className="focus:outline-none p-1 sm:p-1.5 lg:p-0"
                            title="Settings"
                          >
                            <Settings className="text-white text-xs sm:text-sm lg:text-lg" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading/Buffering Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="text-white text-sm opacity-70">
                      {videoRef.current?.readyState === 4
                        ? "Click play to start"
                        : "Loading..."}
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

export default HeroVideoSection;