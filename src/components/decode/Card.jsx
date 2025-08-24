import React, { useRef, useState } from "react";
import { Clock, GraduationCap, RefreshCw, AlertCircle } from "lucide-react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaClosedCaptioning,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Video Player Component
const VideoPlayer = ({
  videoSrc,
  thumbnailSrc,
  overlayText,
  overlaySubtext,
}) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  const handlePlayPause = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setShowThumbnail(false);
      setVideoEnded(false);
      if (!videoStarted) {
        setVideoStarted(true);
      }
    }
    setPlaying(!playing);
  };

  const handleThumbnailClick = () => {
    setVideoStarted(true);
    setShowThumbnail(false);
    setVideoEnded(false);
    videoRef.current.play();
    setPlaying(true);
  };

  const handleVideoEnd = () => {
    setPlaying(false);
    setVideoEnded(true);
    setShowThumbnail(true);
    setProgress(0);
    videoRef.current.currentTime = 0;
  };

  const handleVideoPause = () => {
    setPlaying(false);
    setShowThumbnail(true);
  };

  const handleMute = () => {
    setMuted(!muted);
    videoRef.current.muted = !muted;
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    setProgress((current / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleProgressBar = (e) => {
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    videoRef.current.currentTime = newTime;
    setProgress(percent * 100);
  };

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
      {/* Thumbnail Overlay */}
      {showThumbnail && (
        <div
          className="absolute inset-0 z-20 cursor-pointer group"
          onClick={handleThumbnailClick}
        >
          <img
            src={thumbnailSrc}
            alt="Video Thumbnail"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>

          {/* Large Play Button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-16 h-16 rounded-full bg-white/90 hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
            <FaPlay className="text-[#6E2D79] text-xl ml-1" />
          </div>

          {/* Progress indicator */}
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

      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
          showThumbnail ? "opacity-0" : "opacity-100"
        }`}
        onClick={handlePlayPause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={handleVideoPause}
        onEnded={handleVideoEnd}
        muted={muted}
        preload="metadata"
      />

      {/* Play Button Overlay (when paused) */}
      {videoStarted && !playing && !showThumbnail && (
        <button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-16 h-16 rounded-full bg-black/60 hover:bg-black/80 transition border-2 border-white/30 shadow-lg cursor-pointer"
          onClick={handlePlayPause}
        >
          <FaPlay className="text-white text-xl opacity-90" />
        </button>
      )}

      {/* Video Controls */}
      {videoStarted && !showThumbnail && showControls && (
        <div className="absolute left-1/2 bottom-3 -translate-x-1/2 z-[1000] flex flex-col items-center px-2 w-full">
          <div className="flex flex-col bg-[#6E2D79] rounded-full px-4 py-2 w-full max-w-md">
            {/* Progress Bar */}
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
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePlayPause}
                  className="focus:outline-none"
                >
                  {playing ? (
                    <FaPause className="text-white text-sm" />
                  ) : (
                    <FaPlay className="text-white text-sm" />
                  )}
                </button>
                <button onClick={handleMute} className="focus:outline-none">
                  {muted ? (
                    <FaVolumeMute className="text-white text-sm" />
                  ) : (
                    <FaVolumeUp className="text-white text-sm" />
                  )}
                </button>
                <span className="text-xs text-white font-mono">
                  {videoRef.current
                    ? `${Math.floor(videoRef.current.currentTime / 60)}:${(
                        "0" + Math.floor(videoRef.current.currentTime % 60)
                      ).slice(-2)} / ${Math.floor(duration / 60)}:${(
                        "0" + Math.floor(duration % 60)
                      ).slice(-2)}`
                    : "0:00 / 0:00"}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button className="focus:outline-none" title="Closed Captions">
                  <FaClosedCaptioning className="text-white text-sm" />
                </button>
                <button className="focus:outline-none" title="Settings">
                  <FaCog className="text-white text-sm" />
                </button>
                <button
                  onClick={handleFullscreen}
                  className="focus:outline-none"
                >
                  <FaExpand className="text-white text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Card = ({ programs = [], loading = false, error = null, onRetry }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate();

  const handleEnrollNow = (levelNumber) => {
    const findLevel = programs.find((data) => data.id === levelNumber || data._id === levelNumber);

    if (findLevel) {
      setSelectedLevel(findLevel.subtitle || findLevel.title);
      localStorage.setItem("level", findLevel.title);
      navigate(`/decode/level/${levelNumber}`);
    } else {
      // Level not found - handle gracefully
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center py-8 md:py-10 lg:py-14 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl">
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
              <span className="text-[#6E2D79] font-medium">Loading programs...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center py-8 md:py-10 lg:py-14 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-red-800 font-semibold">Error Loading Programs</h3>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={onRetry}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!programs || programs.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 md:py-10 lg:py-14 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-gray-500 text-lg">No programs found</div>
            <p className="text-gray-400 mt-2">
              Check back later for upcoming decode programs.
            </p>
          </div>
        </div>
      </div>
    );
  }

     return (
     <div className="flex flex-col items-center py-8 md:py-10 lg:py-14 px-4 sm:px-6 md:px-8">
       {[...programs].reverse().map((course, idx) => (
        <div key={course.id || course._id || idx} className="relative w-full flex flex-col items-center">
          {/* Card */}
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-7xl bg-white rounded-xl border border-[#ccc] flex flex-col lg:flex-row justify-between items-start p-5 sm:p-6 lg:p-10 gap-6 sm:gap-8 z-10">
              {/* Left Side */}
              <div className="flex-1 lg:w-3/5 space-y-1">
                <h2 className="font-['Poppins'] font-medium text-2xl sm:text-3xl md:text-4xl leading-[1.2] sm:leading-[1.3] md:leading-[72px] text-[#6E2D79]">
                  {course.title || course.programTitle || "Program Title"}
                </h2>
                <p className="text-[#6E2D79] font-semibold text-[18px]">
                  {course.subtitle || course.description || course.title || "Program Description"}
                </p>
                                                   <ul className="w-full pt-2 pb-2 space-y-3 sm:space-y-[14px]">
                    {/* Show cardPoints if available, otherwise show default points */}
                    {course.cardPoints && course.cardPoints.length > 0 ? (
                      course.cardPoints.map((point, pidx) => {
                        // Extract text content from HTML if it's HTML
                        if (typeof point === 'string' && point.includes('<ul>')) {
                          // Remove HTML tags and extract list items
                          const textContent = point
                            .replace(/<ul>/g, '')
                            .replace(/<\/ul>/g, '')
                            .replace(/<li>/g, '')
                            .replace(/<\/li>/g, '')
                            .replace(/\r/g, '\n') // Replace \r with \n for proper line breaks
                            .trim();
                          
                          // Split by line breaks and filter out empty lines
                          const points = textContent.split('\n').filter(p => p.trim().length > 0);
                          
                          return points.map((text, idx) => (
                            <li key={`${pidx}-${idx}`} className="flex items-start gap-2 sm:gap-3">
                              <span className="w-2 h-2 bg-[#6E2D79] rounded-full mt-2 sm:mt-2.5 flex-shrink-0"></span>
                              <span className="text-base sm:text-[17px] md:text-[18px] leading-normal sm:leading-relaxed font-normal font-['Poppins'] text-justify text-[#6E2D79] px-2 sm:px-3 py-1 rounded-md w-full">
                                {text.trim()}
                              </span>
                            </li>
                          ));
                        } else {
                          // If it's plain text, display as is
                          return (
                            <li key={pidx} className="flex items-start gap-2 sm:gap-3">
                              <span className="w-2 h-2 bg-[#6E2D79] rounded-full mt-2 sm:mt-2.5 flex-shrink-0"></span>
                              <span className="text-base sm:text-[17px] md:text-[18px] leading-normal sm:leading-relaxed font-normal font-['Poppins'] text-justify text-[#6E2D79] px-2 sm:px-3 py-1 rounded-md w-full">
                                {point}
                              </span>
                            </li>
                          );
                        }
                      })
                    ) : (
                      // Default points if none provided by API
                      [
                        "Transformational learning experience",
                        "Expert-led sessions",
                        "Comprehensive program content"
                      ].map((point, pidx) => (
                        <li key={pidx} className="flex items-start gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-[#6E2D79] rounded-full mt-2 sm:mt-2.5 flex-shrink-0"></span>
                          <span className="text-base sm:text-[17px] md:text-[18px] leading-normal sm:leading-relaxed font-normal font-['Poppins'] text-justify text-[#6E2D79] px-2 sm:px-3 py-1 rounded-md w-full">
                            {point}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>

                <div className="flex flex-col items-start gap-3 sm:gap-4 pt-3 sm:pt-4">
                  <div className="flex flex-wrap gap-4 sm:gap-6 text-[#6E2D79]">
                    <div className="flex text-base sm:text-[17px] md:text-[18px] items-center gap-2">
                      <Clock size={16} />
                      <span>Duration: {course.duration || course.length || "TBD"}</span>
                    </div>
                  </div>
                  <button
                    className="bg-[#6E2D79] hover:bg-[#6E2D79] text-base sm:text-lg md:text-[22px] text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full cursor-pointer font-medium transition-colors shadow-md hover:shadow-lg"
                    onClick={() => handleEnrollNow(course.id || course._id)}
                  >
                    {course.buttonText || "Enroll Now"} →
                  </button>
                </div>
              </div>

                             {/* Right Side - Video Player */}
               <div className="relative w-full lg:w-2/5 h-64 sm:h-72 md:h-80 lg:h-96 mt-4 lg:mt-0">
                 <VideoPlayer
                   videoSrc={course.videoUrl || course.videoSrc || course.video || ""}
                   thumbnailSrc={course.thumbnail || course.thumbnailSrc || course.image || "/default.png"}
                   overlayText={course.title || "Program"}
                   overlaySubtext={course.duration || "Duration"}
                 />
               </div>
            </div>
          </div>

          {/* Middle Image between cards */}
          {idx < programs.length - 1 && (
            <div className="relative my-[-60px] sm:my-[-70px] md:my-[-80px] lg:my-[-100px] z-20 flex justify-center">
              <img
                src="/2.2.svg"
                alt="Middle Separator"
                className="w-8 h-32 sm:w-10 sm:h-40 md:w-12 md:h-48 lg:w-[59px] lg:h-[269px] z-20"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default Card;
