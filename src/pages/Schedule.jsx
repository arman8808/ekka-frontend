import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialCarousel from "../components/home/Testimonials";
import ScheduleSkeleton from "../components/utils/ScheduleSkeleton";
import scheduleService from "../components/services/scheduleService";
import { useNavigate } from "react-router-dom";

function Schedule() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchScheduleEvents();
  }, []);

  const fetchScheduleEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await scheduleService.getScheduleEvents();
      setEvents(response.events || response || []);
    } catch (err) {
      console.error("Error fetching schedule events:", err);
      setError(err.message || "Failed to fetch schedule events");
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

  // Helper function to format date range
  const formatDateRange = (event) => {
    if (event.startDate && event.endDate) {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      
      // Check if same day
      if (startDate.toDateString() === endDate.toDateString()) {
        return startDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
      } else {
        // Different days - show range
        const startFormatted = startDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
        const endFormatted = endDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
        return `${startFormatted} - ${endFormatted}`;
      }
    }
    
    // Fallback to legacy date field
    if (event.date) {
      return event.date;
    }
    
    return "TBD";
  };

  // Helper function to get event name
  const getEventName = (event) => {
    if (event.eventName) return event.eventName;
    if (event.event) return event.event;
    if (event.programTitle) return event.programTitle;
    return "Event";
  };

  // Helper function to get facilitator
  const getFacilitator = (event) => {
    if (event.facilitator) return event.facilitator;
    if (event.organisedby) return event.organisedby;
    if (event.organiser) return event.organiser;
    return "-";
  };

  // Helper function to get location
  const getLocation = (event) => {
    if (event.location) return event.location;
    return "-";
  };

  // Helper function to get capacity
  const getCapacity = (event) => {
    if (event.capacity) return event.capacity;
    return "TBD";
  };

  // Helper function to get price
  const getPrice = (event) => {
    if (event.price) return event.price;
    return "-";
  };

  // Helper function to get payment link
  const getPaymentLink = (event) => {
    if (event.paymentLink) return event.paymentLink;
    if (event.externalLink) return event.externalLink;
    return null;
  };

  // Helper function to determine if event is enrollable
  const isEnrollable = (event) => {
    return getPaymentLink(event) && event.status === "Open";
  };

  // Helper function to get navigation link
  const getNavigationLink = (event) => {
    if (event.programType === "family") {
      return "/family-constellation";
    } else if (event.programType === "hypnotherapy") {
      return "/decode";
    } else if (event.programType === "ich") {
      return "/ich/levels";
    }
    return "/";
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
            Explore the upcoming programs and reserve your spot today.
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
              SCROLL TO EXPLORE
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
              0
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
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading events</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={fetchScheduleEvents}
                  className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && <ScheduleSkeleton rows={8} />}

        {/* Events Table */}
        {!loading && events.length > 0 && (
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
                      Facilitator
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
                  {events.map((event, index) => (
                    <motion.tr
                      key={event._id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                      className="group"
                    >
                      <td className="px-4 py-4">
                        <div
                          className="flex flex-col max-w-[250px] cursor-pointer"
                          onClick={() => navigate(getNavigationLink(event))}
                        >
                          <span className="text-sm font-bold text-[#2D2D2D] break-words">
                            {getEventName(event).includes("Training,") ? (
                              <>
                                {getEventName(event).split("Training,")[0]}Training,
                                <br />
                                <span className="text-sm font-bold text-[#2D2D2D] break-words">
                                  {getEventName(event).split("Training,")[1]}
                                </span>
                              </>
                            ) : (
                              getEventName(event)
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="text-sm text-[#2D2D2D] whitespace-nowrap">
                          {formatDateRange(event)}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-[#2D2D2D]">
                          {getLocation(event)}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-[#2D2D2D]">
                          {getFacilitator(event)}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <span className={`px-2 py-1 rounded-full`}>
                            {getCapacity(event)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {!isEnrollable(event) ? (
                          <span className="text-sm text-[#2D2D2D]">-</span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {getPrice(event)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {!isEnrollable(event) ? (
                          <span className="text-sm text-[#2D2D2D]">-</span>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const paymentLink = getPaymentLink(event);
                              if (paymentLink && paymentLink.startsWith("/")) {
                                handleRegister(paymentLink);
                              } else if (paymentLink) {
                                window.open(paymentLink, "_blank");
                              }
                            }}
                            className="px-3 py-2 bg-[#6E2D79] text-white text-xs rounded-md hover:bg-[#5a2465] transition-colors cursor-pointer"
                          >
                            Enroll Now
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* No Events State */}
        {!loading && events.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
          >
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No events scheduled</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for upcoming events.</p>
          </motion.div>
        )}
      </div>
      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

export default Schedule;
