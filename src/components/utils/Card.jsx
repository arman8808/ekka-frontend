import React, { useRef, useState } from "react";
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
const courseData = [
  {
    id: 1,
    title: "Basic Course in Integrated Clinical Hypnotherapy Certification.",
    subtitle: "Level 1: Decode Your Mind",
    tag: "This Level Course",
    points: [
      "How to identify and shift negative thought patterns",
      "Your Sub-Conscious mind is 6000x more powerful than you think?",
      "Hypnotic State Induction (Finger Spreading, Arm Raising, etc.)",
    ],
    duration: "2 Day",
    skill: "All levels",
    buttonText: "Enroll Now",
    videoSrc: "https://d2nxi4iq5glqsu.cloudfront.net/4-Decode+your+Mind.mp4",
    thumbnailSrc: "/ich/level1.JPG",
    overlayText: "DECODE YOUR MIND",
    overlaySubtext: "15 mins",
  },
  {
    id: 2,
    title:
      "Course in Integrated Hypnotic Modalities for Behavioral Resolutions.",
    subtitle: "Level 2: Decode Your Behaviour",
    tag: "This Level explains",
    points: [
      "Advanced hypnotic techniques and emotional release tools",
      "Gain powerful tools to help clients with emotional and behavioral challenges",
      "Hypnotic Modalities & Emotional Management",
    ],
    duration: "5 Day",
    skill: "All levels",
    buttonText: "Enroll Now",
    videoSrc:
      "https://d2nxi4iq5glqsu.cloudfront.net/5-Decode+your+Behaviour.mp4",
    thumbnailSrc: "/ich/level2.JPG",
    overlayText: "DECODE YOUR BEHAVIOUR",
    overlaySubtext: "15 mins",
  },
  {
    id: 3,
    title:
      "Advanced Course in Integrated Hypnotic Modalities for Health Resolutions",
    subtitle: "Level 3: Decode Your Relationships",
    tag: "This Level covers",
    points: [
      "Deep dive into behavioral psychology through physical and emotional sexuality paradigms",
      "Learn to work with deeper psychological and emotional conditions",
      "Human Behavioral Paradigms – Sexuality & Emotional Intelligence",
    ],
    duration: "5 Day",
    skill: "All levels",
    buttonText: "Enroll Now",
    videoSrc:
      "https://d2nxi4iq5glqsu.cloudfront.net/6-Decode+your+Relationships.mp4",
    thumbnailSrc: "/ich/level3.JPG",
    overlayText: "DECODE YOUR RELATIONSHIPS",
    overlaySubtext: "15 mins",
  },
  {
    id: 4,
    title: "Certificate Course in Integrated Spiritual Hypnosis",
    subtitle: "Level 4: Decode Your Blue Print",
    tag: "This Level covers",
    points: [
      "Foundational knowledge in Regression Therapy and its timeless applications",
      "Equip yourself with deep spiritual tools for advanced therapeutic transformation",
      "Introduction to Regression & Spiritual Hypnosis",
    ],
    duration: "6 Day",
    skill: "All levels",
    buttonText: "Enroll Now",
    videoSrc:
      "https://d2nxi4iq5glqsu.cloudfront.net/7-Decode+your+Blueprint.mp4",
    thumbnailSrc: "/ich/level4.JPG",
    overlayText: "DECODE YOUR BLUE PRINT",
    overlaySubtext: "15 mins",
  },
  {
    id: 5,
    title: "Certificate Course on Integrated Clinical Hypnotherapy",
    subtitle: "Level 4: Decode Your Blue Print",
    tag: "This Level covers",
    points: [
      "Mind dynamics and direct dialogue with the Subconscious Mind",
      "Gain tools to address spiritual roots of physical illnesses",
      "Techniques to Open Energy Channels and Prepare Therapy Space",
    ],
    duration: "8 Day",
    skill: "All levels",
    buttonText: "Enroll Now",
    videoSrc:
      "https://d2nxi4iq5glqsu.cloudfront.net/7-Decode+your+Blueprint.mp4",
    thumbnailSrc: "/ich/level5.JPG",
    overlayText: "DECODE YOUR BLUE PRINT",
    overlaySubtext: "15 mins",
  },
  {
    id: 6,
    title: "Born Again Advanced Certificate Course for Inner Child Healing",
    subtitle: "Level 4: Decode Your Blue Print",
    tag: "This Level covers",
    points: [
      "Understand the concept of inner child and the types of inner children",
      "Determine core response patterns of clients",
      "Apply advanced therapeutic techniques to help clients feel whole and emotionally complete again",
    ],
    duration: "6 Day",
    skill: "All levels",
    buttonText: "Enroll Now",
    videoSrc:
      "https://d2nxi4iq5glqsu.cloudfront.net/7-Decode+your+Blueprint.mp4",
    thumbnailSrc: "/ich/level6.JPG",
    overlayText: "DECODE YOUR BLUE PRINT",
    overlaySubtext: "15 mins",
  },
];

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

const Card = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate();

  const handleEnrollNow = (levelNumber) => {
    const findLevel = courseData.find((data) => data.id === levelNumber);

    if (findLevel) {
      setSelectedLevel(findLevel.subtitle);
      localStorage.setItem("level", findLevel.title);
      navigate(`/ich/levels?level=${levelNumber}`);
    } else {
      console.log("Level not found");
    }
  };

  return (
    <div className="flex flex-col items-center py-8 md:py-10 lg:py-14 px-4 sm:px-6 md:px-8">
      {courseData.map((course, idx) => (
        <div key={idx} className="relative w-full flex flex-col items-center">
          {/* Card */}
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-7xl bg-white rounded-xl border border-[#ccc] flex flex-col lg:flex-row justify-between items-start p-5 sm:p-6 lg:p-10 gap-6 sm:gap-8 z-10">
              {/* Left Side */}
              <div className="flex-1 lg:w-3/5 space-y-1">
                <h2 className="font-['Poppins'] font-medium text-2xl sm:text-3xl md:text-4xl leading-[1.2] sm:leading-[1.3] md:leading-[72px] text-[#6E2D79]">
                  {course.title}
                </h2>

                <ul className="w-full pt-2 pb-2 space-y-3 sm:space-y-[14px]">
                  {course.points.map((point, pidx) => (
                    <li key={pidx} className="flex items-start gap-2 sm:gap-3">
                      <span className="w-2 h-2 bg-[#6E2D79] rounded-full mt-2 sm:mt-2.5 flex-shrink-0"></span>
                      <span className="text-base sm:text-[17px] md:text-[18px] leading-normal sm:leading-relaxed font-normal font-['Poppins'] text-justify text-[#6E2D79] px-2 sm:px-3 py-1 rounded-md w-full">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col items-start gap-3 sm:gap-4 pt-3 sm:pt-4">
                  <div className="flex flex-wrap gap-4 sm:gap-6 text-[#6E2D79]">
                    <div className="flex text-base sm:text-[17px] md:text-[18px] items-center gap-2">
                      <Clock size={16} />
                      <span>Duration: {course.duration}</span>
                    </div>
                  </div>
                  <button
                    className="bg-[#6E2D79] hover:bg-[#6E2D79] text-base sm:text-lg md:text-[22px] text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full cursor-pointer font-medium transition-colors shadow-md hover:shadow-lg"
                    onClick={() => handleEnrollNow(course.id)}
                  >
                    {course.buttonText} →
                  </button>
                </div>
              </div>

              {/* Right Side - Video Player */}
              <div className="relative w-full lg:w-2/5 h-64 sm:h-72 md:h-80 lg:h-96 mt-4 lg:mt-0">
                <VideoPlayer
                  videoSrc={course.videoSrc}
                  thumbnailSrc={course.thumbnailSrc}
                  overlayText={course.overlayText}
                  overlaySubtext={course.overlaySubtext}
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
      ))}
    </div>
  );
};
export default Card;
