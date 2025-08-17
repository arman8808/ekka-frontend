import React, { useRef, useState, useEffect } from "react";
import { Clock, GraduationCap } from "lucide-react";
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
import hypnotherapyService from "../services/hypnotherapyService";

// Comment out the static data
// const courseData = [
//   {
//     id: 1,
//     title: "Level 1: Basic Course in Integrated Clinical Hypnotherapy Certification.",
//     subtitle: "Level 1: Decode Your Mind",
//     tag: "This Level Course",
//     points: [
//       "How to identify and shift negative thought patterns",
//       "Your Sub-Conscious mind is 6000x more powerful than you think?",
//       "Hypnotic State Induction (Finger Spreading, Arm Raising, etc.)",
//     ],
//     duration: "2 Day",
//     skill: "All levels",
//     buttonText: "Enroll Now",
//     videoSrc: `${import.meta.env.VITE_API_Cloud_Front_URL}ICH/L1.mp4`,
//     thumbnailSrc: "/ich/level1.JPG",
//     overlayText: "DECODE YOUR MIND",
//     overlaySubtext: "15 mins",
//   },
//   // ... rest of the static data commented out
// ];

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

// Skeleton loader component
const CardSkeleton = () => (
  <div className="flex flex-col items-center py-8 md:py-10 lg:py-14 px-4 sm:px-6 md:px-8">
    {[1, 2, 3, 4, 5, 6].map((idx) => (
      <div key={idx} className="relative w-full flex flex-col items-center mb-8">
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-7xl rounded-xl border border-[#ccc] bg-transparent flex flex-col lg:flex-row justify-between items-start p-5 sm:p-6 lg:p-10 gap-6 sm:gap-8 z-10">
            {/* Left Side Skeleton */}
            <div className="flex-1 lg:w-3/5 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              {/* Subtitle skeleton */}
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            
            {/* Right Side Skeleton */}
            <div className="w-full lg:w-2/5 h-64 sm:h-72 md:h-80 lg:h-96 mt-4 lg:mt-0">
              <div className="w-full h-full bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Middle Image skeleton */}
        {idx < 6 && (
          <div className="relative my-[-60px] sm:my-[-70px] md:my-[-80px] lg:my-[-100px] z-20 flex justify-center">
            <div className="w-8 h-32 sm:w-10 sm:h-40 md:w-12 md:h-48 lg:w-[59px] lg:h-[269px] bg-gray-200 rounded animate-pulse"></div>
          </div>
        )}
      </div>
    ))}
  </div>
);

// Error state component
const ErrorState = ({ error, onRetry }) => (
  <div className="flex flex-col items-center py-16 px-4 sm:px-6 md:px-8">
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8">
        <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 className="text-lg font-medium text-red-800 mb-2">Error loading programs</h3>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="flex flex-col items-center py-16 px-4 sm:px-6 md:px-8">
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No programs available</h3>
        <p className="text-gray-600">Check back later for upcoming hypnotherapy programs.</p>
      </div>
    </div>
  </div>
);

const Card = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch hypnotherapy programs from API
  useEffect(() => {
    fetchHypnotherapyPrograms();
  }, []);

  const fetchHypnotherapyPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await hypnotherapyService.getPrograms();
      // Handle different response structures
      const programs = response.programs || response || [];
      setCourseData(programs);
    } catch (err) {
      console.error("Error fetching hypnotherapy programs:", err);
      setError(err.message || "Failed to fetch hypnotherapy programs");
      setCourseData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollNow = (course) => {
    console.log('🎯 Enrolling in course:', course);
    console.log('🆔 Course ID:', course._id);
    console.log('📝 Course Title:', course.title);
    
    if (course && course._id) {
      setSelectedLevel(course.subtitle || course.title);
      localStorage.setItem("level", course.title);
      // Navigate to the level page with the program ID
      const navigationPath = `/ich/levels?level=${course._id}`;
      console.log('🧭 Navigating to:', navigationPath);
      navigate(navigationPath);
    } else {
      console.log("❌ Course not found or missing _id");
    }
  };

  // Helper function to get card points
  const getCardPoints = (program) => {
    console.log('🎯 Getting card points for program:', program.title);
    
    if (program.cardPoints && Array.isArray(program.cardPoints)) {
      console.log('📋 Using cardPoints:', program.cardPoints);
      // Convert HTML to clean text and extract individual points
      const points = program.cardPoints.map(point => {
        if (typeof point === 'string') {
          return extractListItemsFromHtml(point);
        }
        return point;
      }).flat(); // Flatten the array since extractListItemsFromHtml returns an array
      
      console.log('🔄 Flattened points:', points);
      return points;
    }
    if (program.learningSections && Array.isArray(program.learningSections)) {
      console.log('📚 Using learningSections:', program.learningSections);
      const points = program.learningSections.map(section => {
        if (section.content && typeof section.content === 'string') {
          return extractListItemsFromHtml(section.content);
        }
        return section.title || "Learning point";
      }).flat();
      
      console.log('🔄 Flattened learning points:', points);
      return points;
    }
    return ["Program details coming soon"];
  };

  // Helper function to extract list items from HTML
  const extractListItemsFromHtml = (htmlString) => {
    if (!htmlString || typeof htmlString !== 'string') return [htmlString];
    
    console.log('🔍 Parsing HTML:', htmlString);
    
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    
    // Find the deepest level of list items (avoid nested duplicates)
    // Look for li elements that don't contain other ul elements
    const deepestListItems = Array.from(tempDiv.querySelectorAll('li')).filter(li => {
      // Check if this li contains any ul elements (meaning it's not the deepest level)
      return !li.querySelector('ul');
    });
    
    console.log('📋 Found deepest list items:', deepestListItems.length);
    
    if (deepestListItems.length > 0) {
      // Extract text from each deepest li element
      const extractedItems = deepestListItems.map((li, index) => {
        let text = li.textContent || li.innerText || '';
        // Clean up extra whitespace and newlines
        text = text.replace(/\s+/g, ' ').trim();
        // Remove common HTML artifacts
        text = text.replace(/Type your list item here/g, '');
        console.log(`📝 Deepest Item ${index + 1}:`, text);
        return text;
      }).filter(text => text.length > 0); // Remove empty items
      
      console.log('✨ Final deepest items:', extractedItems);
      return extractedItems;
    }
    
    // Fallback: if no deepest items found, try the original approach
    const allListItems = tempDiv.querySelectorAll('li');
    console.log('📋 Fallback: Found all list items:', allListItems.length);
    
    if (allListItems.length > 0) {
      const extractedItems = Array.from(allListItems).map((li, index) => {
        let text = li.textContent || li.innerText || '';
        text = text.replace(/\s+/g, ' ').trim();
        text = text.replace(/Type your list item here/g, '');
        console.log(`📝 Fallback Item ${index + 1}:`, text);
        return text;
      }).filter(text => text.length > 0);
      
      // Remove duplicates while preserving order
      const uniqueItems = [];
      const seen = new Set();
      for (const item of extractedItems) {
        if (!seen.has(item)) {
          seen.add(item);
          uniqueItems.push(item);
        }
      }
      
      console.log('✨ Final unique fallback items:', uniqueItems);
      return uniqueItems;
    }
    
    // If no li elements found, return the text content as a single item
    let text = tempDiv.textContent || tempDiv.innerText || '';
    text = text.replace(/\s+/g, ' ').trim();
    text = text.replace(/Type your list item here/g, '');
    return [text];
  };

  // Helper function to convert HTML to clean text (keeping for backward compatibility)
  const convertHtmlToText = (htmlString) => {
    if (!htmlString || typeof htmlString !== 'string') return htmlString;
    
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    
    // Extract text content and clean it up
    let text = tempDiv.textContent || tempDiv.innerText || '';
    
    // Clean up extra whitespace and newlines
    text = text.replace(/\s+/g, ' ').trim();
    
    // Remove common HTML artifacts
    text = text.replace(/Type your list item here/g, '');
    
    return text;
  };

  // Helper function to get subtitle
  const getSubtitle = (program) => {
    if (program.subtitle) return program.subtitle;
    if (program.title) {
      // Extract subtitle from title if it contains a colon
      const parts = program.title.split(':');
      if (parts.length > 1) {
        return parts[1].trim();
      }
    }
    return "Integrated Clinical Hypnotherapy";
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Helper function to get truncated points
  const getTruncatedPoints = (points, maxPoints = 3) => {
    if (!Array.isArray(points)) return [];
    
    const truncatedPoints = points.slice(0, maxPoints);
    
    // If we have more points than maxPoints, add an indicator
    if (points.length > maxPoints) {
      truncatedPoints.push(`+${points.length - maxPoints} more points`);
    }
    
    return truncatedPoints;
  };

  // Helper function to get video source
  const getVideoSrc = (program, level) => {
    if (program.videoUrl) return program.videoUrl;
    // Fallback to static videos based on level
    return `${import.meta.env.VITE_API_Cloud_Front_URL}ICH/L${level}.mp4`;
  };

  // Helper function to get thumbnail source
  const getThumbnailSrc = (program, level) => {
    if (program.thumbnail) return program.thumbnail;
    // Fallback to static thumbnails based on level
    return `/ich/level${level}.JPG`;
  };

  // Helper function to get overlay text
  const getOverlayText = (program, level) => {
    if (program.title) return program.title.split(':')[1]?.trim() || program.title;
    return `Level ${level}`;
  };

  // Show loading state
  if (loading) {
    return <CardSkeleton />;
  }

  // Show error state
  if (error) {
    return <ErrorState error={error} onRetry={fetchHypnotherapyPrograms} />;
  }

  // Show empty state
  if (courseData.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col items-center py-8 md:py-10 lg:py-14 px-4 sm:px-6 md:px-8">
      {courseData.map((course, idx) => {
        const isLevel6 = course._id === 6 || course.id === 6;
        const levelNumber = course._id || course.id || idx + 1;
        
        return (
          <div key={course._id || course.id || idx} className="relative w-full flex flex-col items-center">
            {/* Card */}
            <div className="w-full flex flex-col items-center">
              <div 
                className={`w-full max-w-7xl rounded-xl border flex flex-col lg:flex-row justify-between items-start p-5 sm:p-6 lg:p-10 gap-6 sm:gap-8 z-10 ${
                  isLevel6 
                    ? 'border-[#cccccc]' 
                    : 'border-[#ccc] bg-transparent'
                }`}
                style={isLevel6 ? {
                  background: 'linear-gradient(135deg, #f8f0fb 0%, #ffffff 50%, #f3e9fa 100%)'
                } : {}}
              >
                {/* Left Side */}
                <div className="flex-1 lg:w-3/5 space-y-1">
                  <h2 className={`font-['Poppins'] font-medium text-2xl sm:text-3xl md:text-4xl leading-[1.2] sm:leading-[1.3] md:leading-[56px] ${
                    isLevel6 ? 'text-[#6E2D79]' : 'text-[#6E2D79]'
                  }`}>
                    {course.title || `Level ${levelNumber}: Program Title`}
                  </h2>

                  {/* Subtitle */}
                  <p className={`text-lg sm:text-xl md:text-2xl font-normal ${
                    isLevel6 ? 'text-[#6E2D79]/80' : 'text-[#6E2D79]/80'
                  } mt-2 mb-4`}>
                    {truncateText(getSubtitle(course), 80)}
                  </p>

                  <ul className="w-full pt-2 pb-2 space-y-3 sm:space-y-[14px]">
                    {getTruncatedPoints(getCardPoints(course), 5).map((point, pidx) => (
                      <li key={pidx} className="flex items-start gap-2 sm:gap-3">
                        <span className={`w-2 h-2 rounded-full mt-2 sm:mt-2.5 flex-shrink-0 ${
                          isLevel6 ? 'bg-[#6E2D79]' : 'bg-[#6E2D79]'
                        }`}></span>
                        <span className={`text-base sm:text-[17px] md:text-[18px] leading-normal sm:leading-relaxed font-normal font-['Poppins'] text-justify px-2 sm:px-3 py-1 rounded-md w-full ${
                          isLevel6 ? 'text-[#6E2D79]' : 'text-[#6E2D79]'
                        }`}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col items-start gap-3 sm:gap-4 pt-3 sm:pt-4">
                    <div className={`flex flex-wrap gap-4 sm:gap-6 ${
                      isLevel6 ? 'text-[#6E2D79]' : 'text-[#6E2D79]'
                    }`}>
                      <div className="flex text-base sm:text-[17px] md:text-[18px] items-center gap-2">
                        <Clock size={16} color="#6E2D79" />
                        <span>Duration: {course.duration || "TBD"}</span>
                      </div>
                    </div>
                    {/* Button styling remains consistent */}
                    <button
                      className="bg-[#6E2D79] hover:bg-[#5a2465] text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full cursor-pointer font-medium transition-colors shadow-md hover:shadow-lg text-base sm:text-lg md:text-[22px]"
                      onClick={() => handleEnrollNow(course)}
                    >
                      Enroll Now →
                    </button>
                  </div>
                </div>

                {/* Right Side - Video Player */}
                <div className="relative w-full lg:w-2/5 h-64 sm:h-72 md:h-80 lg:h-96 mt-4 lg:mt-0">
                  <VideoPlayer
                    videoSrc={getVideoSrc(course, levelNumber)}
                    thumbnailSrc={getThumbnailSrc(course, levelNumber)}
                    overlayText={getOverlayText(course, levelNumber)}
                    overlaySubtext="15 mins"
                  />
                </div>
              </div>
            </div>

            {/* Middle Image between cards */}
            {idx < courseData.length - 1 && (
              <div className="relative my-[-60px] sm:my-[-70px] md:my-[-80px] lg:my-[-100px] z-20 flex justify-center">
                <img
                  src="/2.2.svg"
                  alt="Middle Separator"
                  className="w-8 h-32 sm:w-10 sm:h-40 md:w-12 md:h-48 lg:w-[59px] lg:h-[269px] z-20"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Card;
