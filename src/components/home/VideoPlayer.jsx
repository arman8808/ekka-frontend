// import React, { useRef, useState } from 'react';
// import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';
// import { FaClosedCaptioning, FaCog } from 'react-icons/fa';

// const VideoPlayer = ({ 
//   src = 'https://d2nxi4iq5glqsu.cloudfront.net/2-+1st+video+on+home+page.mp4', 
//   poster,
//   thumbnailSrc = '/thumbnailvideo1.png' // Default thumbnail path
// }) => {
//   const videoRef = useRef(null);
//   const [playing, setPlaying] = useState(false);
//   const [muted, setMuted] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [showControls, setShowControls] = useState(true);
//   const [videoStarted, setVideoStarted] = useState(false); // Track if video has been started
//   const [videoEnded, setVideoEnded] = useState(false); // Track if video has ended
//   const [showThumbnail, setShowThumbnail] = useState(true); // Control thumbnail visibility

//   const handlePlayPause = () => {
//     if (playing) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//       setShowThumbnail(false);
//       setVideoEnded(false);
//       if (!videoStarted) {
//         setVideoStarted(true);
//       }
//     }
//     setPlaying(!playing);
//   };

//   const handleThumbnailClick = () => {
//     setVideoStarted(true);
//     setShowThumbnail(false);
//     setVideoEnded(false);
//     videoRef.current.play();
//     setPlaying(true);
//   };

//   const handleVideoEnd = () => {
//     setPlaying(false);
//     setVideoEnded(true);
//     setShowThumbnail(true);
//     setProgress(0);
//     // Reset video to beginning
//     videoRef.current.currentTime = 0;
//   };

//   const handleVideoPause = () => {
//     setPlaying(false);
//     setShowThumbnail(true);
//   };

//   const handleMute = () => {
//     setMuted(!muted);
//     videoRef.current.muted = !muted;
//   };

//   const handleTimeUpdate = () => {
//     const current = videoRef.current.currentTime;
//     setProgress((current / duration) * 100);
//   };

//   const handleLoadedMetadata = () => {
//     setDuration(videoRef.current.duration);
//   };

//   const handleProgressBar = (e) => {
//     const rect = e.target.getBoundingClientRect();
//     const percent = ((e.clientX - rect.left) / rect.width);
//     const newTime = percent * duration;
//     videoRef.current.currentTime = newTime;
//     setProgress(percent * 100);
//   };

//   const handleFullscreen = () => {
//     if (videoRef.current.requestFullscreen) {
//       videoRef.current.requestFullscreen();
//     }
//   };

//   return (
//     <div className="relative w-full max-w-7xl mx-auto rounded-lg overflow-hidden py-10 sm:py-14 md:py-20 px-4 sm:px-6 lg:px-8">
//       <div className="hidden lg:block absolute top-19 left-1/2 -translate-x-1/2 sm:top-20 sm:left-1/2 md:top-70 md:left-100 lg:top-180 lg:left-1/2 z-[999] pointer-events-none">
//         <img src="/2.2.svg" alt="Leaf" />
//       </div>
      
//       <div className="relative aspect-video rounded-2xl overflow-hidden">
//         {/* Thumbnail Overlay - Shows before video starts, when paused, or when ended */}
//         {showThumbnail && (
//           <div 
//             className="absolute inset-0 z-20 cursor-pointer group"
//             onClick={handleThumbnailClick}
//           >
//             {/* Thumbnail Image */}
//             <img
//               src={thumbnailSrc}
//               alt="Video Thumbnail"
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 // Fallback to a gradient background if thumbnail fails to load
//                 e.target.style.display = 'none';
//                 // e.target.parentElement.style.background = 'linear-gradient(135deg, #6E2D79 0%, #B97AC9 100%)';
//               }}
//             />
            
//             {/* Overlay for better contrast */}
//             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
            
//             {/* Large Play Button */}
//             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/90 hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
//               <FaPlay className="text-[#6E2D79] text-xl sm:text-2xl lg:text-3xl ml-1" />
//             </div>
            
//             {/* Video Status Badge */}
            
            
//             {/* Progress indicator for paused/ended videos */}
//             {videoStarted && (
//               <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
//                 <div 
//                   className="h-full bg-[#B97AC9] transition-all duration-200"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             )}
//           </div>
//         )}

//         {/* Video Element */}
//         <video
//           ref={videoRef}
//           src={src}
//           poster={poster}
//           className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
//             showThumbnail ? 'opacity-0' : 'opacity-100'
//           }`}
//           onClick={handlePlayPause}
//           onTimeUpdate={handleTimeUpdate}
//           onLoadedMetadata={handleLoadedMetadata}
//           onPlay={() => setPlaying(true)}
//           onPause={handleVideoPause}
//           onEnded={handleVideoEnd}
//           muted={muted}
//           preload="metadata"
//         />

//         {/* Video Controls Play Button Overlay (shows when video is paused after starting but thumbnail is hidden) */}
//         {videoStarted && !playing && !showThumbnail && (
//           <button
//             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 hover:bg-black/80 transition border-2 border-white/30 shadow-lg cursor-pointer"
//             onClick={handlePlayPause}
//             style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.25)' }}
//           >
//             <FaPlay className="text-white text-lg sm:text-2xl lg:text-3xl opacity-90" />
//           </button>
//         )}

//         {/* Controls Box at Bottom Center - Only show when video is playing and thumbnail is hidden */}
        // {videoStarted && !showThumbnail && showControls && (
        //   <div className="absolute left-1/2 bottom-3 sm:bottom-4 lg:bottom-1 -translate-x-1/2 z-[1000] flex flex-col items-center px-2 sm:px-0">
        //     <div
        //       className="flex flex-col bg-[#6E2D79] rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 w-full max-w-sm sm:max-w-lg lg:w-[622px] lg:h-[51px]"
        //       style={{
        //         width: 'min(calc(100vw - 32px), 622px)',
        //         flexShrink: 0
        //       }}
        //     >
        //       {/* Progress Bar on Top */}
        //       <div
        //         className="w-full h-1 bg-white/30 rounded-full mb-1 relative cursor-pointer"
        //         onClick={handleProgressBar}
        //       >
        //         <div
        //           className="h-1 bg-[#B97AC9] rounded-full transition-all duration-200"
        //           style={{ width: `${progress}%` }}
        //         />
        //       </div>

        //       {/* Control Buttons */}
        //       <div className="relative flex items-center justify-between w-full py-0.5 sm:py-1 lg:py-0">
        //         {/* Left Controls */}
        //         <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-4">
        //           <button onClick={handlePlayPause} className="focus:outline-none p-1 sm:p-1.5 lg:p-0">
        //             {playing ?
        //               <FaPause className="text-white text-xs sm:text-sm lg:text-lg" /> :
        //               <FaPlay className="text-white text-xs sm:text-sm lg:text-lg" />
        //             }
        //           </button>
        //           <button onClick={handleMute} className="focus:outline-none p-1 sm:p-1.5 lg:p-0">
        //             {muted ?
        //               <FaVolumeMute className="text-white text-xs sm:text-sm lg:text-lg" /> :
        //               <FaVolumeUp className="text-white text-xs sm:text-sm lg:text-lg" />
        //             }
        //           </button>
        //           <span className="hidden sm:inline text-xs text-white font-mono select-none">
        //             {videoRef.current
        //               ? `${Math.floor(videoRef.current.currentTime / 60)}:${('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2)} / ${Math.floor(duration / 60)}:${('0' + Math.floor(duration % 60)).slice(-2)}`
        //               : '0:00 / 0:00'}
        //           </span>
        //         </div>

        //         {/* Right Controls */}
        //         <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
        //           {/* Time display for mobile only */}
        //           <span className="sm:hidden text-xs text-white font-mono select-none">
        //             {videoRef.current
        //               ? `${Math.floor(videoRef.current.currentTime / 60)}:${('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2)}`
        //               : '0:00'}
        //           </span>

        //           {/* CC Button */}
        //           <button className="focus:outline-none p-1 sm:p-1.5 lg:p-0" title="Closed Captions">
        //             <FaClosedCaptioning className="text-white text-xs sm:text-sm lg:text-lg" />
        //           </button>

        //           {/* Settings Button */}
        //           <button className="focus:outline-none p-1 sm:p-1.5 lg:p-0" title="Settings">
        //             <FaCog className="text-white text-xs sm:text-sm lg:text-lg" />
        //           </button>

        //           {/* Fullscreen Button */}
        //           <button onClick={handleFullscreen} className="focus:outline-none p-1 sm:p-1.5 lg:p-0">
        //             <FaExpand className="text-white text-xs sm:text-sm lg:text-lg" />
        //           </button>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // )}
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;











import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';
import { FaClosedCaptioning, FaCog } from 'react-icons/fa';

const VideoPlayer = ({ 
  src = 'https://d2nxi4iq5glqsu.cloudfront.net/2-+1st+video+on+home+page.mp4', 
  poster,
  thumbnailSrc = '/thumbnailvideo1.png'
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

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
    const percent = ((e.clientX - rect.left) / rect.width);
    const newTime = percent * duration;
    videoRef.current.currentTime = newTime;
    setProgress(percent * 100);
  };

  const handleFullscreen = async () => {
    const container = containerRef.current;
    
    if (!isFullscreen) {
      // Enter fullscreen
      try {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          await container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
          await container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {
          await container.msRequestFullscreen();
        }
      } catch (error) {
        console.error('Error entering fullscreen:', error);
      }
    } else {
      // Exit fullscreen
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      } catch (error) {
        console.error('Error exiting fullscreen:', error);
      }
    }
  };

  const getVideoObjectFit = () => {
    if (isFullscreen) {
      // In fullscreen, use contain to prevent cropping
      return 'contain';
    }
    return 'cover';
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-lg overflow-hidden py-10 sm:py-14 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="hidden lg:block absolute top-19 left-1/2 -translate-x-1/2 sm:top-20 sm:left-1/2 md:top-70 md:left-100 lg:top-180 lg:left-1/2 z-[999] pointer-events-none">
        <img src="/2.2.svg" alt="Leaf" />
      </div>
      
      <div 
        ref={containerRef}
        className={`relative aspect-video rounded-2xl overflow-hidden ${
          isFullscreen ? 'bg-black w-screen h-screen aspect-auto fixed top-0 left-0 z-[9999] rounded-none flex items-center justify-center' : ''
        }`}
      >
        {/* Thumbnail Overlay */}
        {showThumbnail && (
          <div 
            className={`absolute inset-0 z-20 cursor-pointer group ${
              isFullscreen ? 'flex items-center justify-center' : ''
            }`}
            onClick={handleThumbnailClick}
          >
            {/* Thumbnail Image */}
            <img
              src={thumbnailSrc}
              alt="Video Thumbnail"
              className={`${
                isFullscreen 
                  ? 'max-w-full max-h-full object-contain' 
                  : 'w-full h-full object-cover'
              }`}
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

        {/* Video Element */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={`cursor-pointer transition-opacity duration-300 ${
            showThumbnail ? 'opacity-0' : 'opacity-100'
          } ${
            isFullscreen 
              ? 'max-w-full max-h-full object-contain' 
              : 'w-full h-full object-cover'
          }`}
          style={isFullscreen ? { objectFit: 'contain' } : { objectFit: 'cover' }}
          onClick={handlePlayPause}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setPlaying(true)}
          onPause={handleVideoPause}
          onEnded={handleVideoEnd}
          muted={muted}
          preload="metadata"
        />

        {/* Video Controls Play Button Overlay */}
        {videoStarted && !playing && !showThumbnail && (
          <button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 hover:bg-black/80 transition border-2 border-white/30 shadow-lg cursor-pointer"
            onClick={handlePlayPause}
            style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.25)' }}
          >
            <FaPlay className="text-white text-lg sm:text-2xl lg:text-3xl opacity-90" />
          </button>
        )}

        {/* Controls Box at Bottom Center */}
        {videoStarted && !showThumbnail && showControls && (
          <div className={`absolute left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center px-2 sm:px-0 ${
            isFullscreen ? 'bottom-8 sm:bottom-12 lg:bottom-1' : 'bottom-1 sm:bottom-4 lg:bottom-1 '
          }`}>
            <div
              className={`flex flex-col bg-[#6E2D79] rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 w-full max-w-sm sm:max-w-lg lg:w-[622px] lg:h-[51px] ${
                isFullscreen ? 'lg:w-[800px] lg:h-[60px]' : ''
              }`}
              style={{
                width: isFullscreen ? 'min(calc(100vw - 64px), 800px)' : 'min(calc(100vw - 32px), 622px)',
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
                      <FaPause className={`text-white ${isFullscreen ? 'text-lg lg:text-xl' : 'text-xs sm:text-sm lg:text-lg'}`} /> :
                      <FaPlay className={`text-white ${isFullscreen ? 'text-lg lg:text-xl' : 'text-xs sm:text-sm lg:text-lg'}`} />
                    }
                  </button>
                  <button onClick={handleMute} className="focus:outline-none p-1 sm:p-1.5 lg:p-0">
                    {muted ?
                      <FaVolumeMute className={`text-white ${isFullscreen ? 'text-lg lg:text-xl' : 'text-xs sm:text-sm lg:text-lg'}`} /> :
                      <FaVolumeUp className={`text-white ${isFullscreen ? 'text-lg lg:text-xl' : 'text-xs sm:text-sm lg:text-lg'}`} />
                    }
                  </button>
                  <span className={`hidden sm:inline text-white font-mono select-none ${isFullscreen ? 'text-sm lg:text-base' : 'text-xs'}`}>
                    {videoRef.current
                      ? `${Math.floor(videoRef.current.currentTime / 60)}:${('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2)} / ${Math.floor(duration / 60)}:${('0' + Math.floor(duration % 60)).slice(-2)}`
                      : '0:00 / 0:00'}
                  </span>
                </div>

                {/* Right Controls */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
                  {/* Time display for mobile only */}
                  <span className={`sm:hidden text-white font-mono select-none ${isFullscreen ? 'text-sm' : 'text-xs'}`}>
                    {videoRef.current
                      ? `${Math.floor(videoRef.current.currentTime / 60)}:${('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2)}`
                      : '0:00'}
                  </span>

                  {/* CC Button */}
                  <button className="focus:outline-none p-1 sm:p-1.5 lg:p-0" title="Closed Captions">
                    <FaClosedCaptioning className={`text-white ${isFullscreen ? 'text-lg lg:text-xl' : 'text-xs sm:text-sm lg:text-lg'}`} />
                  </button>

                  {/* Settings Button */}
                  <button className="focus:outline-none p-1 sm:p-1.5 lg:p-0" title="Settings">
                    <FaCog className={`text-white ${isFullscreen ? 'text-lg lg:text-xl' : 'text-xs sm:text-sm lg:text-lg'}`} />
                  </button>

                  {/* Fullscreen Button */}
                  <button onClick={handleFullscreen} className="focus:outline-none p-1 sm:p-1.5 lg:p-0" title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
                    {isFullscreen ? 
                      <FaCompress className={`text-white ${isFullscreen ? 'text-lg lg:text-xl' : 'text-xs sm:text-sm lg:text-lg'}`} /> :
                      <FaExpand className={`text-white ${isFullscreen ? 'text-lg lg:text-xl' : 'text-xs sm:text-sm lg:text-lg'}`} />
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;