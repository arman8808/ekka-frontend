import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialCarousel from "../components/home/Testimonials";
import Faq2 from "../components/decode/Faq2";
import decodeService from "../components/services/decodeService";
import { Calendar, MapPin, User, DollarSign } from "lucide-react";

// Import the existing components
import DynamicLevelBanner from "../components/level1/LevelBanner";
import DynamicDecodePage from "../components/level1/DecodePage";
import FormPage from "../components/level1/FormPage";

function DecodeLevel() {
  const { id } = useParams();
  const [programData, setProgramData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedEventForRegistration, setSelectedEventForRegistration] = useState(null);

  // Handle location state from Schedule page
  useEffect(() => {
    if (location.state?.fromSchedule && location.state?.openModal && location.state?.selectedEvent) {
      setSelectedEventForRegistration(location.state.selectedEvent);
      setShowRegistrationForm(true);
      // Clear the state after a delay to ensure modal opens
      setTimeout(() => {
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location.state]);

  // Fetch program data from API
  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await decodeService.getUserProgramById(id);
        
        // Handle different API response structures
        let processedData = response;
        
        // If response has data property, extract it
        if (response && response.data) {
          processedData = response.data;
        }
        
        setProgramData(processedData);
      } catch (err) {
        console.error("❌ Error fetching decode program data:", err);
        setError(err.message || "Failed to fetch program data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProgramData();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6E2D79] mx-auto mb-4"></div>
            <p className="text-[#6E2D79] text-lg">Loading program details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center max-w-md">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-red-800 font-semibold">Error Loading Program</h3>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // If no program data
  if (!programData) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Program Not Found
            </h1>
            <p className="text-gray-600">The requested program does not exist.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

     // Transform API data to match the expected format for existing components
   const transformedData = {
     level: programData.title?.includes('LEVEL') ? parseInt(programData.title.match(/LEVEL (\d+)/)?.[1] || '1') : 1,
     title: programData.title, // Use the title directly from API without manipulation
     subtitle: programData.subtitle,
     duration: programData.duration,
     certification: programData.status,
     description: programData.subtitle,
     price: programData.price || "",
     next_session: programData.next_session || "",
     enrollment_features: programData.enrollment_features || [],
     videoUrl: programData.videoUrl,
     thumbnail: programData.thumbnail,
     cardPoints: programData.cardPoints,
     // Pass the learningSections directly for dynamic rendering
     learningSections: programData.learningSections || [],
     // Pass upcoming events for enrollment card
     upcomingEvents: programData.upcomingEvents || []
   };



   // Function to open session modal
   const openSessionModal = (session) => {
     setSelectedSession(session);
     setShowSessionModal(true);
   };

   // Function to open registration form
   const openRegistrationForm = (session) => {
     // Set the selected event for registration
     setSelectedEventForRegistration(session);
     
     setShowRegistrationForm(true);
     setShowSessionModal(false);
   };







  return (
    <>
      <Header />
      <DynamicLevelBanner levelData={transformedData} />
              <DynamicDecodePage 
        levelData={transformedData} 
        programId={id} 
        upcomingEvents={programData.upcomingEvents}
        modal={location.state?.fromSchedule && location.state?.openModal ? "true" : "false"}
      />
      {/* Debug info */}
      {location.state?.fromSchedule && (
        <div style={{display: 'none'}}>
          Debug: fromSchedule={String(location.state.fromSchedule)}, 
          openModal={String(location.state.openModal)}, 
          modal prop={String(location.state?.fromSchedule && location.state?.openModal ? "true" : "undefined")}
        </div>
      )}
      
      {/* Upcoming Sessions Section - Only show if data exists */}
      {programData.upcomingEvents && programData.upcomingEvents.length > 0 && (
        <section className="px-4 sm:px-6 py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm sm:text-base">
                    3
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
                  {programData.upcomingEvents.map((event, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-purple-50 cursor-pointer transition-colors"
                      onClick={() => openSessionModal(event)}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-[#6E2D79]">
                        <div className="max-w-[280px]">
                          {event.eventName || event.event || "Event Name Not Available"}
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
                          onClick={() => openRegistrationForm(event)}
                          className="text-[#C183B2] hover:text-[#6E2D79] font-medium cursor-pointer"
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
              {programData.upcomingEvents.map((event, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => openSessionModal(event)}
                >
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-[#6E2D79] text-base mb-1 leading-tight">
                        {event.eventName || event.event || "Event Name Not Available"}
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
                      <div>
                        <span className="font-medium text-gray-700">
                          Status:
                        </span>
                        <p className="text-[#6E2D79]">{event.status}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => openRegistrationForm(event)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#6E2D79] hover:bg-[#8a3c97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6E2D79] transition-colors"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <FormPage
          onClose={() => setShowRegistrationForm(false)}
          level={transformedData.level}
          upcomingEventId={selectedEventForRegistration?._id || ""}
          programId={id}
          upcomingEvents={programData.upcomingEvents}
          selectedEvent={selectedEventForRegistration}
        />
      )}

      <TestimonialCarousel />
      <Faq2 />
      <Footer />


 
    </>
  );
}

export default DecodeLevel;
