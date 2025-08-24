import { useEffect, useState } from "react";
import React from "react";
import FamilySessionForm from "./FamilySessionForm";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import familyEventService from "../services/familyEventService";

const UpcomingSessions = ({ id, modal, selectedEventFromSchedule, fromSchedule }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Extract program ID from the id prop (this will be passed from FamilyConstellation)
  const programId = id;

  // Fetch family events from API
  useEffect(() => {
    fetchFamilyEvents();
  }, []);

  const fetchFamilyEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await familyEventService.getUserEvents();
      // Handle different response structures
      const events = response.events || response || [];
      setSessions(events);
    } catch (err) {
      console.error("Error fetching family events:", err);
      setError(err.message || "Failed to fetch family events");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle event from Schedule page
  useEffect(() => {
    if (fromSchedule && selectedEventFromSchedule && sessions.length > 0) {
      // Find the matching session from our local sessions
      const matchingSession = sessions.find(
        (session) => session._id === selectedEventFromSchedule._id
      );
      if (matchingSession) {
        setSelectedEvent(matchingSession);
        setSelectedWorkshop(matchingSession);
        setShowModal(true);
        // Update URL to reflect the modal state
        navigate(`?id=${matchingSession._id}&modal=true`, { replace: true });
      }
    }
  }, [fromSchedule, selectedEventFromSchedule, sessions, navigate]);

  useEffect(() => {
    if (id && modal === "true" && sessions.length > 0) {
      const matchingSession = sessions.find(
        (session) => session._id?.toString() === id.toString() || session.id?.toString() === id.toString()
      );
      if (matchingSession) {
        setSelectedEvent(matchingSession);
        setSelectedWorkshop(matchingSession);
        setShowModal(true);
      }
    }
  }, [id, modal, sessions]);

  const handleEnroll = (session) => {
    setSelectedWorkshop(session);
    setSelectedEvent(session);
    setShowModal(true);
    // Update URL when opening modal
    navigate(`?id=${session._id || session.id}&modal=true`, { replace: true });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setSelectedWorkshop(null);

    if (modal === "true") {
      navigate("/schedule");
    }
  };

  // Helper function to format date
  const formatDate = (event) => {
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
    return "Family Constellation";
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

  // Helper function to get payment link
  const getPaymentLink = (event) => {
    if (event.paymentLink) return event.paymentLink;
    if (event.externalLink) return event.externalLink;
    if (event.link) return event.link;
    return null;
  };

  // Helper function to determine if event is enrollable
  const isEnrollable = (event) => {
    // All events are enrollable if status is Open, regardless of payment link
    return event.status === "Open";
  };

  // Skeleton loader component
  const SessionSkeleton = () => (
    <div className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-12 animate-pulse"></div>
        
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border border-[#C183B2] p-4 rounded-2xl">
              <div className="min-w-full divide-y divide-[#C183B2]">
                {/* Header skeleton */}
                <div className="bg-[#6E2D79] py-4 px-6 rounded-t-2xl">
                  <div className="flex space-x-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-6 bg-white/20 rounded w-20 animate-pulse"></div>
                    ))}
                  </div>
                </div>
                
                {/* Rows skeleton */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="py-4 px-6">
                    <div className="flex space-x-6">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <div key={j} className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800 mb-2">Error loading events</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchFamilyEvents}
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
    <div className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events</h3>
          <p className="text-gray-600">Check back later for upcoming family constellation sessions.</p>
        </div>
      </div>
    </div>
  );

  // Show loading state
  if (loading) {
    return <SessionSkeleton />;
  }

  // Show error state
  if (error) {
    return <ErrorState />;
  }

  // Show empty state
  if (sessions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[1.5rem] font-medium text-center text-[#6E2D79] mb-12">
          Programs Details
        </h2>

        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border border-[#C183B2] p-4 rounded-2xl">
              <table className="min-w-full divide-y divide-[#C183B2]">
                <thead>
                  <tr className="bg-[#6E2D79]">
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider rounded-tl-2xl"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      Event
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      No of Seats
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider rounded-tr-2xl"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#C183B2]">
                  {sessions.map((session, index) => (
                    <motion.tr
                      key={session._id || session.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-purple-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-[#6E2D79]">
                        {formatDate(session)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E2D79]">
                        {getEventName(session)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E2D79]">
                        {getLocation(session)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E2D79]">
                        {getCapacity(session)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base">
                        <button
                          onClick={() => {
                            // Check if there's an external link (like Brooke Schwab scheduling)
                            if (session.externalLink) {
                              window.open(session.externalLink, "_blank");
                            } else {
                              // Always open the registration modal for Family Constellation sessions
                              handleEnroll(session);
                            }
                          }}
                          className="px-4 py-2 bg-[#6E2D79] text-white rounded-lg hover:bg-[#8a3c97] transition-colors shadow-sm text-base cursor-pointer"
                          title={session.externalLink ? "Click to schedule with external provider" : "Click to enroll in this session"}
                        >
                          Enroll Now
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-center">
                <p className="text-sm text-[#6E2D79] italic">
                  * Seats are allocated on a first come first serve basis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={handleCloseModal} // Close when clicking backdrop
          style={{ zIndex: "9999999" }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] flex flex-col z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <FamilySessionForm
              onClose={handleCloseModal}
              selectedSession={selectedEvent}
              programId={programId}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UpcomingSessions;
