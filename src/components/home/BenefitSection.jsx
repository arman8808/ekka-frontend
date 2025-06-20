
// import React from "react";
// import { motion } from "framer-motion";
// import bgImg from "/Who Can Benefit from EKAA_ Bg.svg";
// import dividerIcon from "/ine.png";

// const BenefitSection = () => {
//     const data = [
//         {
//             id: 1,
//             video: "https://www.w3schools.com/html/mov_bbb.mp4",
//         },
//         {
//             id: 2,
//             video: "https://www.w3schools.com/html/movie.mp4",
//         },
//         {
//             id: 3,
//             video: "https://www.w3schools.com/html/mov_bbb.mp4",
//         },
//     ];

//     const testimonialAvatars = [
//         "https://randomuser.me/api/portraits/women/12.jpg",
//         "https://randomuser.me/api/portraits/men/23.jpg",
//         "https://randomuser.me/api/portraits/women/65.jpg",
//         "https://randomuser.me/api/portraits/men/15.jpg",
//     ];

//     return (
//         <section
//             className="relative bg-cover bg-center bg-no-repeat text-center text-[#4b0082] overflow-hidden"
//             style={{ backgroundImage: `url(${bgImg})` }}
//         >
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20">
//                 <header className="mb-6 sm:mb-8 lg:mb-12">
//                     <motion.div
//                         initial={{ opacity: 0, y: 50 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, ease: "easeOut" }}
//                         viewport={{ once: true, amount: 0.5 }}
//                         className="mb-6 sm:mb-8 lg:mb-12"
//                     >
//                         <h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[24px] font-medium text-[#6E2D79] mb-2 sm:mb- lg:mb-2 leading-tight">
//                             Who Can Benefit from DECODE?
//                         </h2>
//                         <p className="text-[14px]  sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#A35F93] mb-1 sm:mb-2 lg:mb-4 max-w-sm sm:max-w-md lg:max-w-lg mx-auto leading-relaxed">
//                             No Matter Who You Are,DECODE Has Something for You
//                         </p>


//                     {/* <div className="flex justify-center items-center mb-1 sm:mb-2 lg:mb-2">
//                         <div className="flex items-center -space-x-1 sm:-space-x-2">
//                             {testimonialAvatars.map((avatar, index) => (
//                                 <img
//                                     key={index}
//                                     src={avatar}
//                                     alt={`User ${index + 1}`}
//                                     className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white shadow-sm"
//                                     style={{ zIndex: testimonialAvatars.length - index }}
//                                     loading="lazy"
//                                 />
//                             ))}
//                         </div>
//                         <span className="text-xs sm:text-sm lg:text-base text-gray-600 ml-3 sm:ml-4 font-medium">
//                             20.4k+
//                         </span>
//                     </div> */}
//                       </motion.div>
//                 </header>

//                 <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 sm:gap-8 lg:gap-4 xl:gap-6 max-w-7xl mx-auto">
//                     {data.map((item, index) => (
//                         <React.Fragment key={item.id}>
//                             {/* Card with Video Only */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 50 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8, ease: "easeOut" }}
//                                 viewport={{ once: true, amount: 0.5 }}
//                                 className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden"
//                                 style={{
//                                     width: "357px",
//                                     height: "292px",
//                                     flexShrink: 0,
//                                 }}
//                             >
//                                 <video
//                                     src={item.video}
//                                     controls
//                                     className="w-full h-full object-cover"
//                                 />
//                             </motion.div>

//                             {/* Divider */}
//                             {index < data.length - 1 && (
//                                 <motion.div
//                                     className="hidden lg:flex items-center justify-center "
//                                     initial={{ scale: 0.8, opacity: 0 }}
//                                     whileInView={{ scale: 1, opacity: 1 }}
//                                     viewport={{ once: true, amount: 0.5 }}
//                                     transition={{ duration: 0.5, ease: "easeOut" }}
//                                 >
//                                     <motion.img
//                                         src={dividerIcon}
//                                         alt=""
//                                         className="w-8 xl:w-12 h-auto opacity-80"
//                                         role="presentation"
//                                     />
//                                 </motion.div>
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default BenefitSection;







// // import React from "react";
// // import { motion } from "framer-motion";
// // import bgImg from "/Who Can Benefit from EKAA_ Bg.svg";
// // import dividerIcon from "/ine.png";

// // const BenefitSection = () => {
// //     const data = [
// //         {
// //             id: 1,
// //             video: "https://www.w3schools.com/html/mov_bbb.mp4",
// //         },
// //         {
// //             id: 2,
// //             video: "https://www.w3schools.com/html/movie.mp4",
// //         },
// //         {
// //             id: 3,
// //             video: "https://www.w3schools.com/html/mov_bbb.mp4",
// //         },
// //     ];

// //     return (
// //         <section
// //             className="relative bg-cover bg-center bg-no-repeat overflow-hidden"
// //             style={{ backgroundImage: `url(${bgImg})` }}
// //         >
// //             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20">
// //                 <header className="mb-6 sm:mb-8 lg:mb-12">
// //                     <motion.div
// //                         initial={{ opacity: 0, y: 50 }}
// //                         whileInView={{ opacity: 1, y: 0 }}
// //                         transition={{ duration: 0.8, ease: "easeOut" }}
// //                         viewport={{ once: true, amount: 0.5 }}
// //                         className="mb-6 sm:mb-8 lg:mb-12"
// //                     >
// //                         <h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[24px] font-medium text-[#6E2D79] mb-2 sm:mb- lg:mb-2 leading-tight">
// //                             Who Can Benefit from EKAA?
// //                         </h2>
// //                         <p className="text-[14px]  sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#A35F93] mb-1 sm:mb-2 lg:mb-4 max-w-sm sm:max-w-md lg:max-w-lg mx-auto leading-relaxed">
// //                             No Matter Who You Are, EKAA Has Something for You
// //                         </p>


// //                         <div className="flex justify-center items-center mb-1 sm:mb-2 lg:mb-2">
// //                             <div className="flex items-center -space-x-1 sm:-space-x-2">
// //                                 {testimonialAvatars.map((avatar, index) => (
// //                                     <img
// //                                         key={index}
// //                                         src={avatar}
// //                                         alt={`User ${index + 1}`}
// //                                         className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white shadow-sm"
// //                                         style={{ zIndex: testimonialAvatars.length - index }}
// //                                         loading="lazy"
// //                                     />
// //                                 ))}
// //                             </div>
// //                             <span className="text-xs sm:text-sm lg:text-base text-gray-600 ml-3 sm:ml-4 font-medium">
// //                                 20.4k+
// //                             </span>
// //                         </div>
// //                     </motion.div>
// //                 </header>
// //                 <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 sm:gap-8 lg:gap-4 xl:gap-6 max-w-7xl mx-auto">
// //                     {data.map((item, index) => (
// //                         <React.Fragment key={item.id}>
// //                             {/* Card with Video Only */}
// //                             <motion.div
// //                                 initial={{ opacity: 0, y: 50 }}
// //                                 whileInView={{ opacity: 1, y: 0 }}
// //                                 transition={{ duration: 0.8, ease: "easeOut" }}
// //                                 viewport={{ once: true, amount: 0.5 }}
// //                                 className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden"
// //                                 style={{
// //                                     width: "357px",
// //                                     height: "292px",
// //                                     flexShrink: 0,
// //                                 }}
// //                             >
// //                                 <video
// //                                     src={item.video}
// //                                     controls
// //                                     className="w-full h-full object-cover"
// //                                 />
// //                             </motion.div>

// //                             {/* Divider */}
// //                             {index < data.length - 1 && (
// //                                 <motion.div
// //                                     className="hidden lg:flex items-center justify-center px-2 xl:px-4"
// //                                     initial={{ scale: 0.8, opacity: 0 }}
// //                                     whileInView={{ scale: 1, opacity: 1 }}
// //                                     viewport={{ once: true, amount: 0.5 }}
// //                                     transition={{ duration: 0.5, ease: "easeOut" }}
// //                                 >
// //                                     <motion.img
// //                                         src={dividerIcon}
// //                                         alt=""
// //                                         className="w-8 xl:w-12 h-auto max-h-80 opacity-80"
// //                                         role="presentation"
// //                                     />
// //                                 </motion.div>
// //                             )}
// //                         </React.Fragment>
// //                     ))}
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default BenefitSection;






import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';
import { FaClosedCaptioning, FaCog } from 'react-icons/fa';
import bgImg from "/Who Can Benefit from EKAA_ Bg.svg";

const BenefitSection = () => {
    // const bgImg = "/Who Can Benefit from EKAA_ Bg.svg";
    const dividerIcon = "/ine.png";

    const data = [
        {
            id: 1,
            video: "https://d2nxi4iq5glqsu.cloudfront.net/8-Decode+for+parents+%26+teacher.mp4",
            thumbnail: "/thumbnailvideo3.png",
        },
        {
            id: 2,
            video: "https://d2nxi4iq5glqsu.cloudfront.net/9-Decode+for+Corporate.mp4",
            thumbnail: "/thumbnailvideo4.png",
        },
        {
            id: 3,
            video: "https://d2nxi4iq5glqsu.cloudfront.net/10-Decode+for+medical+prof..mp4",
            thumbnail: "/thumbnailvideo5.png",
        },
    ];

    const VideoCard = ({ video, thumbnail, title, index }) => {
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
            const percent = ((e.clientX - rect.left) / rect.width);
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
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden relative mx-auto"
                style={{
                    // Responsive dimensions
                    width: "min(357px, calc(100vw - 32px))",
                    height: "min(292px, calc((100vw - 32px) * 0.818))", // Maintain aspect ratio
                    maxWidth: "357px",
                    maxHeight: "292px",
                    flexShrink: 0,
                }}
            >
                {/* Thumbnail Overlay */}
                {showThumbnail && (
                    <div 
                        className="absolute inset-0 z-20 cursor-pointer group"
                        onClick={handleThumbnailClick}
                    >
                        {/* Thumbnail Image */}
                        <img
                            src={thumbnail}
                            alt={`${title} Video Thumbnail`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.style.background = 'linear-gradient(135deg, #6E2D79 0%, #B97AC9 100%)';
                            }}
                        />
                        
                        {/* Overlay for better contrast */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                        
                        {/* Responsive Large Play Button */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/90 hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
                            <FaPlay className="text-[#6E2D79] text-sm sm:text-lg md:text-xl ml-0.5 sm:ml-1" />
                        </div>
                        
                        {/* Video Status Badge - Responsive */}
                        
                        
                        {/* Progress indicator */}
                        {videoStarted && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                                <div 
                                    className="h-full bg-[#B97AC9] transition-all duration-200"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}
                        
                        {/* Title Badge - Responsive */}
                        {title && (
                            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-[#6E2D79]/90 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                                {title}
                            </div>
                        )}
                    </div>
                )}

                {/* Video Element */}
                <video
                    ref={videoRef}
                    src={video}
                    className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
                        showThumbnail ? 'opacity-0' : 'opacity-100'
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

                {/* Video Controls Play Button Overlay - Responsive */}
                {videoStarted && !playing && !showThumbnail && (
                    <button
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 transition border-2 border-white/30 shadow-lg cursor-pointer"
                        onClick={handlePlayPause}
                        style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.25)' }}
                    >
                        <FaPlay className="text-white text-sm sm:text-lg opacity-90" />
                    </button>
                )}

                {/* Responsive Compact Controls Box */}
                {videoStarted && !showThumbnail && showControls && (
                    <div className="absolute left-1/2 bottom-1 sm:bottom-2 -translate-x-1/2 z-[1000] flex flex-col items-center px-2">
                        <div 
                            className="flex flex-col bg-[#6E2D79] rounded-full px-2 py-1 sm:px-3 sm:py-1.5"
                            style={{
                                width: "min(280px, calc(100% - 16px))",
                                minWidth: "240px"
                            }}
                        >
                            {/* Progress Bar */}
                            <div
                                className="w-full h-1 bg-white/30 rounded-full mb-0.5 sm:mb-1 relative cursor-pointer"
                                onClick={handleProgressBar}
                            >
                                <div
                                    className="h-1 bg-[#B97AC9] rounded-full transition-all duration-200"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Control Buttons */}
                            <div className="flex items-center justify-between w-full">
                                {/* Left Controls */}
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                    <button onClick={handlePlayPause} className="focus:outline-none p-0.5">
                                        {playing ?
                                            <FaPause className="text-white text-xs" /> :
                                            <FaPlay className="text-white text-xs" />
                                        }
                                    </button>
                                    <button onClick={handleMute} className="focus:outline-none p-0.5">
                                        {muted ?
                                            <FaVolumeMute className="text-white text-xs" /> :
                                            <FaVolumeUp className="text-white text-xs" />
                                        }
                                    </button>
                                    <span className="text-xs text-white font-mono select-none hidden sm:inline">
                                        {videoRef.current
                                            ? `${Math.floor(videoRef.current.currentTime / 60)}:${('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2)}`
                                            : '0:00'}
                                    </span>
                                </div>

                                {/* Right Controls */}
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                    {/* Time display for mobile */}
                                    <span className="sm:hidden text-xs text-white font-mono select-none">
                                        {videoRef.current
                                            ? `${Math.floor(videoRef.current.currentTime / 60)}:${('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2)}`
                                            : '0:00'}
                                    </span>
                                    
                                    <button className="focus:outline-none p-0.5 hidden sm:block" title="Closed Captions">
                                        <FaClosedCaptioning className="text-white text-xs" />
                                    </button>
                                    <button className="focus:outline-none p-0.5 hidden sm:block" title="Settings">
                                        <FaCog className="text-white text-xs" />
                                    </button>
                                    <button onClick={handleFullscreen} className="focus:outline-none p-0.5">
                                        <FaExpand className="text-white text-xs" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat text-center text-[#4b0082] overflow-hidden"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20">
                <header className="mb-6 sm:mb-8 lg:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="mb-6 sm:mb-8 lg:mb-12"
                    >
                        <h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[24px] font-medium text-[#6E2D79] mb-2 sm:mb-1 lg:mb-2 leading-tight px-4">
                            Who Can Benefit from DECODE?
                        </h2>
                        <p className="text-[14px] sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#A35F93] mb-1 sm:mb-2 lg:mb-4 max-w-sm sm:max-w-md lg:max-w-lg mx-auto leading-relaxed px-4">
                            No Matter Who You Are, DECODE Has Something for You
                        </p>
                    </motion.div>
                </header>

                {/* Responsive Grid Layout */}
                <div className="flex flex-col sm:flex-col lg:flex-row justify-center items-center sm:items-stretch gap-4 sm:gap-6 lg:gap-4 xl:gap-6 max-w-7xl mx-auto">
                    {data.map((item, index) => (
                        <React.Fragment key={item.id}>
                            {/* Enhanced Video Card with Thumbnail */}
                            <VideoCard 
                                video={item.video}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                index={index}
                            />

                            {/* Responsive Divider */}
                            {index < data.length - 1 && (
                                <motion.div
                                    className="flex lg:flex items-center justify-center"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                                >
                                    <motion.img
                                        src={dividerIcon}
                                        alt=""
                                        className="w-6 sm:w-8 lg:w-12 xl:w-12 h-auto opacity-80 rotate-90 lg:rotate-0"
                                        role="presentation"
                                    />
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitSection;