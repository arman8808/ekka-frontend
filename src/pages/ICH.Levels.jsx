import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams, useParams } from "react-router-dom";
import { Clock, GraduationCap } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Faq2 from "../components/decode/Faq2";
import TestimonialCarousel from "../components/home/Testimonials";
import { levelsData } from "../components/data/ich.levels.data";
import RegistrationForm from "../components/utils/ICH.Registartionform";
import { tr } from "framer-motion/client";
import hypnotherapyService from "../components/services/hypnotherapyService";
import scheduleService from "../components/services/scheduleService";

const ICHLevels = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [programData, setProgramData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { id } = useParams(); // Get ID from route parameters
  const level = id || searchParams.get("level") || "1"; // Use route param first, then query param
  const modal = searchParams.get("modal");
  const date = searchParams.get("date");

  // Handle location state from Schedule page
  useEffect(() => {
    if (location.state?.fromSchedule && location.state?.openModal && location.state?.selectedEvent) {
      setSelectedEvent(location.state.selectedEvent);
      setIsModalOpen(true);
      // Clear the state to prevent reopening on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Fetch program data from API
  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await hypnotherapyService.getUserProgramById(level);
        
        // Handle different API response structures
        let processedData = response;
        
        // If response has data property, extract it
        if (response && response.data) {
          processedData = response.data;
        }
        
        // If response has events property, map it to upcomingEvents
        if (processedData && processedData.events && !processedData.upcomingEvents) {
          processedData.upcomingEvents = processedData.events;
        }
        
        // If response has sessions property, map it to upcomingEvents
        if (processedData && processedData.sessions && !processedData.upcomingEvents) {
          processedData.upcomingEvents = processedData.sessions;
        }
        
        // Only use the program's own upcoming events - don't fetch from schedule service
        // Each program should only show its own events, not events from other programs
        
        setProgramData(processedData);
      } catch (err) {
        console.error("❌ Error fetching program data:", err);
        setError(err.message || "Failed to fetch program data");
        // Fallback to static data if API fails
        const fallbackData = levelsData[level] || levelsData[1];
        setProgramData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    if (level) {
      fetchProgramData();
    }
  }, [level]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEnrollClick = () => {
    // Check if there are any upcoming events available
    const allEvents = (programData?.upcomingEvents && programData.upcomingEvents.length > 0) ||
                     (programData?.events && programData.events.length > 0) ||
                     (programData?.sessions && programData.sessions.length > 0) ||
                     [];

    if (allEvents.length === 0) {
      // No events available - show alert or handle appropriately
      alert("No upcoming sessions available at the moment. Please check back later or contact us for more information.");
      return;
    }

    // Pass the FIRST event as selectedEvent so upcomingEventId gets set correctly
    // This ensures the form has a valid upcomingEventId when submitting
    const firstEvent = allEvents[0];
    setSelectedEvent(firstEvent);
    setIsModalOpen(true);
  };

  const handleEventEnroll = (event) => {
    // Always open registration form
    
    // Pass specific event data to modal
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Data for different levels (keeping for fallback)
  const sessions = [
    {
      id: 1,
      Event:
        "Advanced Course in Integrated Hypnotic Modalities for Health Resolutions",
      Date: "13th–17th Aug",
      Location: "Houston",
      capacity: "10 Seats",
      organisedby: "Dr Aiyasawmy's A/C",
      // price: "$ 375",
      status: "Open",
      level: 3,
      levelName:
        "Advanced Course in Integrated Hypnotic Modalities for Health Resolutions",
    },

    {
      id: 4,
      Event: "Basic Course in Integrated Clinical Hypnotherapy Certification",
      Date: "11th Aug-12th Aug",
      Location: "Houston TX",
      capacity: "10 Seats",
      organisedby: "Dr Manoj's",
      // price: "$ 375",
      status: "Open",
      level: 1,
      levelName:
        "Basic Course in Integrated Clinical Hypnotherapy Certification",
    },
    // {
    //   id: 2,
    //   Event: "Basic Course in Integrated Clinical Hypnotherapy Certification",
    //   Date: "20th–21st Aug",
    //   Location: "Austin",
    //   capacity: "10 Seats",
    //   organisedby: "Dr Manoj's",
    //   // price: "$ 375",
    //   status: "Open",
    //   level: 1,
    //   levelName:
    //     "Basic Course in Integrated Clinical Hypnotherapy Certification",
    // },
    {
      id: 3,
      Event:
        "Course in Integrated Hypnotic Modalities for Behavioral Resolutions.",
      Date: "13th–17th Aug",
      Location: "Houston TX",
      capacity: "10 Seats",
      organisedby: "Dr.Sonia Gupte",
      // price: "$ 375",
      status: "Open",
      level: 2,
      levelName:
        "Course in Integrated Hypnotic Modalities for Behavioral Resolutions.",
    },
  ];

  // Use API data if available, otherwise fallback to static data
  const levelData = programData || levelsData[level] || levelsData[1];

  // Dynamic section counter - calculates section numbers based on what exists
  const getSectionNumber = (sectionType) => {
    let sectionCount = 0;

    // Count learning sections
    if (levelData.learningSections && levelData.learningSections.length > 0) {
      sectionCount += levelData.learningSections.length;
    }

    // Count static sections that exist
    if (levelData.immediate_benefits || levelData.long_term_benefits)
      sectionCount++;
    if (levelData.curriculum && levelData.curriculum.length > 0) sectionCount++;
    if (levelData.who_should_attend && levelData.who_should_attend.length > 0)
      sectionCount++;
    if (levelData.prerequisites && levelData.prerequisites.length > 0)
      sectionCount++;
    if (levelData.session_details) sectionCount++;
    if (levelData.instructor) sectionCount++; // Add instructor section
    if (levelData.upcomingEvents && levelData.upcomingEvents.length > 0)
      sectionCount++; // Add upcoming events section

    // Return the next section number
    return sectionCount + 1;
  };



  useEffect(() => {
    if (modal) {
      setIsModalOpen(true);
    }
  }, [modal]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6E2D79] mx-auto mb-4"></div>
            <p className="text-[#6E2D79] text-lg">Loading program details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !programData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-red-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Error loading program
              </h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      <div
        className="w-full bg-cover bg-center flex flex-col items-center justify-center text-center text-white py-16 px-4"
        style={{
          backgroundImage: "url('/decode/Hero Image.svg')",
          height: "541px",
          flexShrink: 0,
        }}
      >
        <h1 className="text-[#6E2D79] font-[Poppins] text-[30px] sm:text-[35px] md:text-[60px] lg:text-[65px] font-semibold leading-[44px] sm:leading-[60px] md:leading-[72px] mb-2 sm:mb-4 -mt-8 sm:-mt-12">
          {levelData.title || `Level ${level}`}
        </h1>
        <p className="text-[#5C2166] font-[Poppins] text-[16px] sm:text-[18px] lg:text-[18px] font-normal leading-[24px] px-4 mb-6">
          {levelData.subtitle || "Integrated Clinical Hypnotherapy"}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex justify-center items-center gap-2 px-2.5 py-2 rounded-full border border-[#6E2D79] bg-[#6E2D79] text-white text-sm">
            <Clock size={16} /> Duration: {levelData.duration || "TBD"}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#6E2D79] text-white rounded-full text-sm">
            {levelData.certification || "Professional Certification"}{" "}
            <GraduationCap size={16} />
          </div>
        </div>
      </div>

      <div className="mx-auto p-4 sm:p-6">
        {/* Custom CSS for HTML content rendering */}
        <style jsx>{`
          .prose ul {
            list-style-type: disc !important;
            padding-left: 1.25rem !important;
            margin: 0.75rem 0 !important;
          }
          .prose li {
            margin: 0.5rem 0 !important;
            line-height: 1.6 !important;
            font-size: 1rem !important;
          }
          .prose p {
            margin: 0.75rem 0 !important;
          }
          .prose h1,
          .prose h2,
          .prose h3,
          .prose h4,
          .prose h5,
          .prose h6 {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            margin: 1rem 0 0.5rem 0 !important;
          }
        `}</style>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Section - 3/4 width on large screens */}
          <div className="lg:col-span-3 min-h-screen px-2 sm:px-4 overflow-y-auto scroll-hide">
            <div className="w-full mx-auto">
              <div className="flex-1">
                {/* What You'll Learn - Only show if data exists */}
                {levelData.learningSections &&
                  levelData.learningSections.length > 0 && (
                    <div className="bg-white rounded-t-xl p-4 sm:p-6 shadow-sm mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm sm:text-base">
                            1
                          </span>
                        </div>
                        <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                          {levelData.learningSections[0].title}
                        </h2>
                      </div>
                      <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                      <div className="flex flex-col lg:flex-row">
                        <div className="hidden lg:flex w-auto items-center justify-center mb-4 lg:mb-0">
                          <div className="w-[40px] h-[200px] sm:w-[59px] sm:h-[343px] flex items-center">
                            <img
                              src="/2.2.svg"
                              alt="Leaf"
                              className="w-auto h-full object-contain"
                            />
                          </div>
                        </div>
                        <div className="ml-0 lg:ml-6 w-full">
                          <div className="mb-6 sm:mb-8 p-3 sm:p-4">
                            <div className="space-y-3">
                              <div
                                className="text-[#6E2D79] text-sm sm:text-base prose prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-[#C183B2]"
                                dangerouslySetInnerHTML={{
                                  __html: levelData.learningSections[0].content,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Additional Learning Sections - Only show if more than 1 section exists */}
                {levelData.learningSections &&
                  levelData.learningSections.length > 1 &&
                  levelData.learningSections.slice(1).map((section, idx) => (
                    <div
                      key={section._id || idx}
                      className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm sm:text-base">
                            {idx + 2}
                          </span>
                        </div>
                        <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                          {section.title}
                        </h2>
                      </div>
                      <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                      <div className="flex flex-col lg:flex-row">
                        <div className="hidden lg:flex w-auto items-center justify-center mb-4 lg:mb-0">
                          <div className="w-[40px] h-[200px] sm:w-[59px] sm:h-[343px] flex items-center">
                            <img
                              src="/2.2.svg"
                              alt="Leaf"
                              className="w-auto h-full object-contain"
                            />
                          </div>
                        </div>
                        <div className="ml-0 lg:ml-6 w-full">
                          <div className="mb-6 sm:mb-8 p-3 sm:p-4">
                            <div
                              className="text-[#6E2D79] text-sm sm:text-base prose prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-[#C183B2]"
                              dangerouslySetInnerHTML={{
                                __html: section.content,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Course Benefits - Only show if data exists */}
                {(levelData.immediate_benefits ||
                  levelData.long_term_benefits) && (
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm sm:text-base">
                          {(levelData.learningSections
                            ? levelData.learningSections.length
                            : 0) + 1}
                        </span>
                      </div>
                      <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                        Course Benefits
                      </h2>
                    </div>
                    <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                    <div className="flex flex-col lg:flex-row">
                      <div className="hidden lg:flex w-auto items-center justify-center mb-4 lg:mb-0">
                        <div className="w-[40px] h-[200px] sm:w-[59px] sm:h-[343px] flex items-center">
                          <img
                            src="/2.2.svg"
                            alt="Leaf"
                            className="w-auto h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="ml-0 lg:ml-6 w-full">
                        {/* Immediate Benefits */}
                        {levelData.immediate_benefits &&
                          levelData.immediate_benefits.length > 0 && (
                            <div className="mb-6 sm:mb-8 s rounded-lg p-3 sm:p-4">
                              <h3 className="font-semibold text-[#6E2D79] text-[18px] sm:text-[21px] mb-4">
                                Immediate Practical Applications
                              </h3>
                              <div className="space-y-3">
                                {levelData.immediate_benefits.map(
                                  (item, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-3"
                                    >
                                      <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                                      <span className="text-[#6E2D79] text-sm sm:text-base">
                                        {item}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {/* Long-term Benefits */}
                        {levelData.long_term_benefits &&
                          levelData.long_term_benefits.length > 0 && (
                            <div className="mb-6 sm:mb-8 p-3 sm:p-4">
                              <h3 className="font-semibold text-[#6E2D79] text-[18px] sm:text-[21px] mb-4">
                                Long-Term Transformational Outcomes
                              </h3>
                              <div className="space-y-3">
                                {levelData.long_term_benefits.map(
                                  (item, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-3"
                                    >
                                      <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                                      <span className="text-[#6E2D79] text-sm sm:text-base">
                                        {item}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Curriculum - Only show if data exists */}
                {levelData.curriculum && levelData.curriculum.length > 0 && (
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm sm:text-base">
                          {(levelData.learningSections
                            ? levelData.learningSections.length
                            : 0) + 2}
                        </span>
                      </div>
                      <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                        Curriculum Overview
                      </h2>
                    </div>
                    <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {levelData.curriculum.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3  rounded-lg"
                        >
                          <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-[#6E2D79] text-sm sm:text-base">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Who Should Attend - Only show if data exists */}
                {levelData.who_should_attend &&
                  levelData.who_should_attend.length > 0 && (
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm sm:text-base">
                            {(levelData.learningSections
                              ? levelData.learningSections.length
                              : 0) + 3}
                          </span>
                        </div>
                        <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                          Who Should Attend
                        </h2>
                      </div>
                      <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                      <div className="space-y-3">
                        {levelData.who_should_attend.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                            <span className="text-[#6E2D79] text-sm sm:text-base">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Prerequisites - Only show if data exists */}
                {levelData.prerequisites &&
                  levelData.prerequisites.length > 0 && (
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm sm:text-base">
                            {(levelData.learningSections
                              ? levelData.learningSections.length
                              : 0) + 4}
                          </span>
                        </div>
                        <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                          Prerequisites
                        </h2>
                      </div>
                      <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                      <div className="space-y-3">
                        {levelData.prerequisites.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                            <span className="text-[#6E2D79] text-sm sm:text-base">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Right Section - 1/4 width on large screens */}
          <div className="lg:col-span-1 w-full">
            {/* Enrollment Card */}
            <div
              className="rounded-[10px] p-4 sm:p-6 text-white flex flex-col mb-6"
              style={{
                minHeight: "400px",
                height: "auto",
                backgroundColor: "#6E2D79",
              }}
            >
              <div className="mb-6">
                <div className="flex flex-col justify-center mb-2 text-[18px] sm:text-[22.225px] opacity-90">
                  Enroll in Level 
                </div>

                {/* Show first upcoming event info if available */}
                {(programData?.upcomingEvents && programData.upcomingEvents.length > 0) ||
                (programData?.events && programData.events.length > 0) ||
                (programData?.sessions && programData.sessions.length > 0) ? (
                    <div className="mb-4 p-3 bg-white/10 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">
                        Next Session:
                      </h4>
                      <p className="text-sm mb-1 font-medium">
                        {programData?.title || `Level ${level}`}
                      </p>
                      <p className="text-sm opacity-90">
                        {(programData?.upcomingEvents && programData.upcomingEvents[0]?.price) ||
                         (programData?.events && programData.events[0]?.price) ||
                         (programData?.sessions && programData.sessions[0]?.price) ||
                         programData?.price}
                      </p>
                      {((programData?.upcomingEvents && programData.upcomingEvents[0]?.location) ||
                        (programData?.events && programData.events[0]?.location) ||
                        (programData?.sessions && programData.sessions[0]?.location)) && (
                        <p className="text-sm opacity-90">
                          📍 {(programData?.upcomingEvents && programData.upcomingEvents[0]?.location) ||
                               (programData?.events && programData.events[0]?.location) ||
                               (programData?.sessions && programData.sessions[0]?.location)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                      <h4 className="font-semibold text-sm mb-2 text-yellow-200">
                        ⏰ Coming Soon
                      </h4>
                      <p className="text-sm opacity-90 text-yellow-100">
                        New sessions will be announced soon. Stay tuned for updates!
                      </p>
                    </div>
                  )}

                <div className="font-bold mb-2 text-[20px] sm:text-[22.225px]">
                  {levelData.price}
                </div>
                
                {/* Show next session info or coming soon message */}
                {(programData?.upcomingEvents && programData.upcomingEvents.length > 0) ||
                 (programData?.events && programData.events.length > 0) ||
                 (programData?.sessions && programData.sessions.length > 0) ? (
                  programData?.next_session && (
                    <div className="text-sm opacity-90 mt-4 sm:mt-6">
                      Next session starts: {programData.next_session}
                    </div>
                  )
                ) : (
                  <div className="text-sm opacity-90 mt-4 sm:mt-6 text-yellow-200">
                    Registration will open when new sessions are scheduled
                  </div>
                )}
              </div>

              {levelData.enrollment_features &&
                levelData.enrollment_features.length > 0 && (
                  <ul className="list-disc text-[14px] sm:text-[15px] space-y-2 pl-5 marker:text-white marker:text-[10px] mb-4">
                    {levelData.enrollment_features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                )}

              <button
                onClick={handleEnrollClick}
                className={`font-semibold transition-colors text-center mt-auto w-full py-3 sm:py-4 px-6 text-white cursor-pointer ${
                  (programData?.upcomingEvents && programData.upcomingEvents.length > 0) ||
                  (programData?.events && programData.events.length > 0) ||
                  (programData?.sessions && programData.sessions.length > 0)
                    ? "bg-[#C183B2] hover:opacity-90"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                style={{
                  borderRadius: "30px",
                }}
                disabled={
                  !(programData?.upcomingEvents && programData.upcomingEvents.length > 0) &&
                  !(programData?.events && programData.events.length > 0) &&
                  !(programData?.sessions && programData.sessions.length > 0)
                }
              >
                {(programData?.upcomingEvents && programData.upcomingEvents.length > 0) ||
                 (programData?.events && programData.events.length > 0) ||
                 (programData?.sessions && programData.sessions.length > 0)
                  ? "Enroll Now"
                  : "No Sessions Available"
                }
              </button>
              

            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 shadow-sm">
              <div
                className="flex flex-col items-start h-full"
                style={{ borderColor: "#6E2D79" }}
              >
                <h3 className="mb-2 font-bold text-[18px] sm:text-[21px] text-[#4A2C82]">
                  Have Questions?
                </h3>
                <Link
                  to="mailto:contact@ekaausa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm transition-colors inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2 sm:py-3 rounded-[30px] bg-[#6E2D79] cursor-pointer"
                >
                  Email Us
                </Link>
              </div>
            </div>

            {/* Instructor Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden text-center mt-6">
              <img
                src="/EK-2.jpg"
                alt="Lead Instructor"
                className="w-full h-48 object-cover"
              />
              <p className="font-semibold text-[#6E2D79] text-base sm:text-base py-3">
                Yuvraj Kapadia
              </p>
              <p className="text-[#6E2D79] text-sm sm:text-base px-4 pb-4 leading-relaxed">
                World-renowned master healer Yuvraj Kapadia is a leading expert
                in the science of the subconscious mind. As the founder of EKAA
                Global Institute, he trains practitioners in{" "}
                <span className="font-medium">
                  Integrated Clinical Hypnotherapy
                </span>{" "}
                across all continents.
                <br />
                <br />
                Specializing in:
                <ul className="list-disc list-inside text-left mt-2 mb-3 pl-4 space-y-1">
                  <li>Regression Therapy</li>
                  <li>Inner Child Work</li>
                  <li>Past Life Regression</li>
                  <li>Transpersonal Regression</li>
                  <li>Family & Systemic Constellations</li>
                </ul>
                Yuvraj conducts{" "}
                <span className="italic">sold-out retreats</span>, workshops,
                and trainings worldwide. This workshop offers a rare opportunity
                to experience his transformative energy as he guides
                participants through an experiential journey of conscious
                parenting - healing subconscious wounds and unlocking profound
                personal growth.
                <br />
                <br />
                <span className="font-semibold text-[#6E2D79]">
                  A once-in-a-lifetime experience
                </span>{" "}
                with one of the world's most sought-after healers.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden text-center mt-6 ">
              <img
                src="/Mirani Smith.jpeg"
                alt="Lead Instructor"
                className="w-full h-48 object-cover"
              />
              <p className="font-semibold text-[#6E2D79] text-base sm:text-base py-3">
                Mirani Smith
              </p>
              <p className="text-[#6E2D79] text-sm sm:text-base px-4 pb-4 leading-relaxed">
                With over 40 years as a Montessori guide, trainer, and
                administrator, Mirani has dedicated her career to personalizing
                education for neurodiverse children. Her extensive experience
                includes serving as:
                <ul className="list-disc list-inside text-left mt-2 mb-3 pl-4 space-y-1">
                  <li>
                    Executive Director and AMI Primary Trainer at Houston
                    Montessori Institute (10 years)
                  </li>
                  <li>
                    Early Childhood Director at The Post Oak School (10 years)
                  </li>
                </ul>
                Mirani holds an AMI Diploma from Sri Lanka, an M.Ed. from Loyola
                University Maryland, and earned her AMI Primary Trainer
                certification in 2012. Her practice is rooted in careful
                observation and adaptation to each child's unique learning
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Section - Only show if session_details exists */}
      {levelData.session_details && (
        <section className="px-4 sm:px-6 py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm sm:text-base">
                    {(levelData.learningSections
                      ? levelData.learningSections.length
                      : 0) + 4}
                  </span>
                </div>
                <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                  Upcoming Workshop
                </h2>
              </div>
              <hr className="mt-2 border-t border-purple-300" />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#6E2D79] mb-2">
                    Date & Time
                  </h3>
                  <p className="text-gray-700">
                    {levelData.session_details.date}
                    <br />
                    {levelData.session_details.time}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#6E2D79] mb-2">
                    Venue
                  </h3>
                  <p className="text-gray-700">
                    {levelData.session_details.venue}
                  </p>
                </div>
                {levelData.session_details.registration && (
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-[#6E2D79] mb-2">
                      Registration
                    </h3>
                    <p className="text-gray-700">
                      {levelData.session_details.registration}
                    </p>
                  </div>
                )}
                {levelData.session_details.discount_note && (
                  <div className="md:col-span-2 bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-700">
                      {levelData.session_details.discount_note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events from API - Only show if data exists */}

      {levelData.upcomingEvents && levelData.upcomingEvents.length > 0 && (
        <section className="px-4 sm:px-6 py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm sm:text-base">
                    {getSectionNumber("upcomingEvents")}
                  </span>
                </div>
                <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                  Upcoming Sessions
                </h2>
              </div>
              <hr className="mt-2 border-t border-purple-300" />
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl p-6 shadow-sm overflow-x-auto">
              <table className="w-full divide-y divide-gray-200 min-w-full">
                <thead className="bg-[#6E2D79]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[300px]">
                      Event Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">
                      Organizer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[80px]">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[80px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {levelData.upcomingEvents.map((event, idx) => (
                    <tr key={idx} className="hover:bg-purple-50">
                      <td className="px-6 py-4 text-sm font-medium text-[#6E2D79]">
                        <div className="max-w-[280px]">
                          {event.eventName && event.eventName.includes("Training,") ? (
                            <>
                              {event.eventName.split("Training,")[0]}Training,
                              <br />
                              <span className="text-sm font-medium text-[#6E2D79]">
                                {event.eventName.split("Training,")[1]}
                              </span>
                            </>
                          ) : (
                            event.eventName || event.event || "Event Name Not Available"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6E2D79]">
                        {event.startDate && event.endDate ? (
                          <>
                            {new Date(event.startDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}{" "}
                            -{" "}
                            {new Date(event.endDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </>
                        ) : (
                          event.date || event.formattedStartDate || "TBD"
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6E2D79]">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6E2D79]">
                        {event.organiser || event.organisedby || event.facilitator}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6E2D79]">
                        {event.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6E2D79]">
                        <button
                          onClick={() => handleEventEnroll(event)}
                          className="text-[#C183B2] hover:text-[#6E2D79] font-medium"
                        >
                          Enroll →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {levelData.upcomingEvents.map((event, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-[#6E2D79] text-base mb-1 leading-tight">
                        {event.eventName && event.eventName.includes("Training,") ? (
                          <>
                            {event.eventName.split("Training,")[0]}Training,
                            <br />
                            <span className="text-sm font-medium text-[#6E2D79]">
                              {event.eventName.split("Training,")[1]}
                            </span>
                          </>
                        ) : (
                          event.eventName || event.event || "Event Name Not Available"
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {event.startDate && event.endDate ? (
                          <>
                            {new Date(event.startDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}{" "}
                            -{" "}
                            {new Date(event.endDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </>
                        ) : (
                          event.date || event.formattedStartDate || "TBD"
                        )}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">
                          Location:
                        </span>
                        <p className="text-[#6E2D79] break-words">{event.location}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Organizer:
                        </span>
                        <p className="text-[#6E2D79] break-words">{event.organiser || event.organisedby || event.facilitator}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Price:
                        </span>
                        <p className="text-[#6E2D79]">{event.price}</p>
                      </div>
                                          <div className="col-span-1 sm:col-span-2">
                      <button
                        onClick={() => handleEventEnroll(event)}
                        className="inline-block w-full text-center bg-[#C183B2] text-white py-2 px-4 rounded-lg hover:bg-[#6E2D79] transition-colors"
                      >
                        Enroll →
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* Registration Form Modal */}
      {isModalOpen && (
        <>
          <RegistrationForm
            onClose={handleCloseModal}
            level={level}
            date={date}
            eventData={selectedEvent}
            allUpcomingEvents={programData?.upcomingEvents || programData?.events || programData?.sessions || []}
          />
        </>
      )}
      

      <TestimonialCarousel />
      {/* <Faq2 /> */}
      <Footer />
    </div>
  );
};

export default ICHLevels;
