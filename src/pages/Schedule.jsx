import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialCarousel from "../components/home/Testimonials";
import ScheduleSkeleton from "../components/utils/ScheduleSkeleton";
import { useNavigate } from "react-router-dom";
import scheduleService from "../components/services/scheduleService";

function Schedule() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await scheduleService.getScheduleEvents();

      // Handle different response structures
      let eventsData = [];
      if (response && response.data) {
        eventsData = response.data;
      } else if (Array.isArray(response)) {
        eventsData = response;
      } else if (response && Array.isArray(response.events)) {
        eventsData = response.events;
      }

      setEvents(eventsData);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message || "Failed to fetch events");
      // Fallback to empty array if API fails
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (event) => {
    // Navigate to registration page with event ID
    navigate(`${event}`);
  };
  return (
    <div
      className="relative w-full flex flex-col overflow-x-hidden"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <motion.section
        className="relative mb-4 flex flex-col justify-center items-center text-center px-4 pt-[120px] md:pt-[160px] w-full h-[calc(800px-80px)] md:h-[700px] lg:h-[700px] bg-center bg-no-repeat  bg-cover "
        style={{
          backgroundImage: "url('/decode/Hero Image.svg')",
          height: "541px",
          flexShrink: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(244,234,253,0.8) 0%, transparent 20%)",
              "radial-gradient(circle at 70% 30%, rgba(32,178,170,0.5) 0%, transparent 25%)",
              "radial-gradient(circle at 30% 50%, rgba(244,234,253,0.8) 0%, transparent 20%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
          <motion.h1
            className="text-[26px] lg:text-[36px] sm:text-[32px] md:text-[36px] font-semibold mb-6 drop-shadow-lg text-[#6E2D79]"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Event Calendar
          </motion.h1>

          <motion.p
            className="text-[14px] sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#6E2D79]/90 max-w-3xl mb-10 w-full md:w-[796px] drop-shadow-md font-normal"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {loading
              ? "Loading events..."
              : "Explore the upcoming programs and reserve your spot today."}
          </motion.p>

          <motion.div
            className="w-full h-px bg-[#6E2D79]/30 mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-sm mb-2 text-[#6E2D79] font-medium tracking-wider">
              {loading ? "LOADING EVENTS..." : "SCROLL TO EXPLORE"}
            </p>

            <motion.div
              className="relative h-10 w-6 rounded-full border-2 border-[#6E2D79] flex justify-center p-1"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1 h-3 bg-[#6E2D79] rounded-full"
                animate={{
                  y: [0, 4, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </motion.div>

            <p className="text-xs mt-3 opacity-70 text-[#6E2D79] font-light">
              {loading ? "..." : events.length}
            </p>
          </motion.div>
        </div>

        {/* Animated floating circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#6E2D79]/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.section>
      <div className="px-4 py-8">
        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-800 font-medium">{error}</span>
              </div>
              <button
                onClick={fetchEvents}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}

        {/* Header with Refresh Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Upcoming Events
          </h2>
          <button
            onClick={fetchEvents}
            disabled={loading}
            className="px-4 py-2 bg-[#6E2D79] text-white rounded-md hover:bg-[#5a2465] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </>
            )}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#6E2D79]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Facilitator/Instructor
                  </th>{" "}
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Organizer Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Total Participants
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Program Fees
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <ScheduleSkeleton rows={8} />
                ) : error ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-4 text-center text-red-600"
                    >
                      {error}
                    </td>
                  </tr>
                ) : events.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      No events found.
                    </td>
                  </tr>
                ) : (
                  events.map((event, index) => (
                    <motion.tr
                      key={event.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                      className="group"
                    >
                      <td className="px-4 py-4">
                        <div
                          className="flex flex-col max-w-[250px] cursor-pointer"
                          onClick={() => {
                            // Navigate based on program type
                            if (event.programType === "hypnotherapy") {
                              navigate("/ich/level/1");
                            } else if (event.programType === "family") {
                              navigate("/family-constellation");
                            } else {
                              // Default fallback
                              event.pagelink && navigate(event.pagelink);
                            }
                          }}
                        >
                          <span className="text-sm font-bold text-[#2D2D2D] break-words">
                            {(event.event || event.eventName) &&
                            (event.event || event.eventName).includes(
                              "Training,"
                            ) ? (
                              <>
                                {
                                  (event.event || event.eventName).split(
                                    "Training,"
                                  )[0]
                                }
                                Training,
                                <br />
                                <span className="text-sm font-bold text-[#2D2D2D] break-words">
                                  {
                                    (event.event || event.eventName).split(
                                      "Training,"
                                    )[1]
                                  }
                                </span>
                              </>
                            ) : (
                              event.event ||
                              event.eventName ||
                              "Event Name Not Available"
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-[#2D2D2D] whitespace-nowrap">
                          {event.date ||
                            event.formattedStartDate ||
                            "Date Not Available"}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-[#2D2D2D]">
                          {event.location || "Location Not Available"}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-[#2D2D2D]">
                          {event.facilitator ||
                            event.organisedby ||
                            event.organiser ||
                            "-"}
                        </div>
                      </td>{" "}
                      <td className="px-4 py-4">
                        <div className="text-sm text-[#2D2D2D]">
                          {event.organisedby || event.organiser || "-"}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <span className={`px-2 py-1 rounded-full`}>
                            {event.eventType === "fc"
                              ? event.capacity || event.seats || "10 Seats"
                              : "Not Limited"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {event.noenroll ? (
                          <span className="text-sm text-[#2D2D2D]">-</span>
                        ) : (
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              (event.price && event.price.includes("AED")) ||
                              event.currency === "AED"
                                ? "bg-blue-100 text-blue-800"
                                : (event.price &&
                                    event.price.includes("USD")) ||
                                  event.currency === "USD"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {event.price != ""
                              ? event.price
                              : "TBD" || "Price Not Available"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {event.noenroll ? (
                          <span className="text-sm text-[#2D2D2D]">-</span>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (event.externalLink) {
                                window.open(event.externalLink, "_blank");
                              } else {
                                // Navigate to appropriate detail page with event data
                                if (event.eventType === "hyp") {
                                  navigate(`/ich/level/${event.programId}`, {
                                    state: {
                                      openModal: true,
                                      selectedEvent: event,
                                      fromSchedule: true,
                                    },
                                  });
                                } else if (event.eventType === "fc") {
                                  navigate("/family-constellation", {
                                    state: {
                                      openModal: true,
                                      selectedEvent: event,
                                      fromSchedule: true,
                                    },
                                  });
                                } else if (event.eventType === "decode") {
                                  navigate(`/decode/level/${event.programId}`, {
                                    state: {
                                      openModal: true,
                                      selectedEvent: event,
                                      fromSchedule: true,
                                    },
                                  });
                                } else {
                                  // Fallback to existing logic
                                  if (
                                    event.link &&
                                    event.link.startsWith("/")
                                  ) {
                                    handleRegister(event.link);
                                  } else if (event.link) {
                                    window.location.href = event.link;
                                  }
                                }
                              }
                            }}
                            className="px-3 py-2 bg-[#6E2D79] text-white text-xs rounded-md hover:bg-[#5a2465] transition-colors cursor-pointer"
                          >
                            Enroll Now
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

export default Schedule;
