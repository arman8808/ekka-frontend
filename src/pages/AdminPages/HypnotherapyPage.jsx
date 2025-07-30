// src/pages/Hypnotherapy.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  Calendar,
  BookOpen,
  List,
  ChevronDown,
  ChevronUp,
  Check,
  Star,
  Users,
  DollarSign,
  MapPin,
  User,
  Link as LinkIcon,
  RefreshCw,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

const HypnotherapyPage = () => {
  // Static data for demonstration
  const initialEvents = [
    {
      id: 1,
      title: "Advanced Hypnotherapy Certification",
      subtitle: "Master the art of therapeutic hypnosis",
      duration: "8 weeks",
      learningPoints: [
        "Advanced hypnotic techniques and emotional release tools",
        "Ericksonian hypnosis principles and indirect communication",
        "Effective use of regression and dream therapy",
        "How to apply emotional management tools in real-life cases",
        "Diagnose through Hypnodrama, Paris Window, and Corrective Therapy",
        "Apply NLP to subconscious reprogramming",
        "Manage phobias and physical pain through mind-body connection"
      ],
      upcomingEvents: [
        {
          id: 101,
          date: "Aug 15, 2025",
          eventName: "Introductory Workshop",
          location: "New York, NY",
          organiser: "Dr. Samantha Reed",
          price: "$199",
          paymentLink: "https://payment.link/hypno1"
        },
        {
          id: 102,
          date: "Sep 5, 2025",
          eventName: "Advanced Techniques Seminar",
          location: "Los Angeles, CA",
          organiser: "Dr. Michael Chen",
          price: "$299",
          paymentLink: "https://payment.link/hypno2"
        }
      ],
      status: "Open"
    },
    {
      id: 2,
      title: "Clinical Hypnotherapy Intensive",
      subtitle: "Transformative techniques for mental health professionals",
      duration: "6 weeks",
      learningPoints: [
        "Advanced therapeutic approaches for anxiety and depression",
        "Pain management protocols",
        "Hypnosis for habit change and addiction",
        "Trauma resolution techniques",
        "Working with children and adolescents",
        "Ethical considerations in clinical practice"
      ],
      upcomingEvents: [
        {
          id: 201,
          date: "Sep 20, 2025",
          eventName: "Clinical Applications Workshop",
          location: "Chicago, IL",
          organiser: "Dr. Elizabeth Turner",
          price: "$349",
          paymentLink: "https://payment.link/hypno3"
        }
      ],
      status: "Open"
    },
    {
      id: 3,
      title: "Hypnosis for Personal Growth",
      subtitle: "Unlock your subconscious potential",
      duration: "4 weeks",
      learningPoints: [
        "Self-hypnosis techniques for daily practice",
        "Overcoming limiting beliefs",
        "Enhancing creativity and problem-solving",
        "Building confidence and self-esteem",
        "Stress reduction and relaxation methods"
      ],
      upcomingEvents: [],
      status: "Closed"
    }
  ];

  const [events, setEvents] = useState(initialEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState(null);
  
  const itemsPerPage = 5;
  
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
  } = useForm();

  // Pagination calculation
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setEvents(initialEvents);
      setCurrentPage(1);
      return;
    }

    const filtered = initialEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEvents(filtered);
    setCurrentPage(1);
  };

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      // Simulate API call
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEvent = {
        id: currentEvent ? currentEvent.id : events.length + 1,
        ...data,
        learningPoints: data.learningPoints || [],
        upcomingEvents: data.upcomingEvents || []
      };
      
      if (currentEvent) {
        // Update existing event
        const updatedEvents = events.map((event) =>
          event.id === currentEvent.id ? newEvent : event
        );
        setEvents(updatedEvents);
      } else {
        // Add new event
        setEvents([...events, newEvent]);
      }
      
      setShowModal(false);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setError("Failed to save program. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete event
  const handleDeleteEvent = async () => {
    setIsDeleting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const filteredEvents = events.filter((event) => event.id !== eventToDelete.id);
      setEvents(filteredEvents);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete program. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Open edit modal with event data
  const openEditModal = (event) => {
    setCurrentEvent(event);
    setValue("title", event.title);
    setValue("subtitle", event.subtitle);
    setValue("duration", event.duration);
    setValue("learningPoints", event.learningPoints);
    setValue("upcomingEvents", event.upcomingEvents);
    setValue("status", event.status);
    setShowModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    setCurrentEvent(null);
    reset({
      title: "",
      subtitle: "",
      duration: "",
      learningPoints: [""],
      upcomingEvents: [{
        date: "",
        eventName: "",
        location: "",
        organiser: "",
        price: "",
        paymentLink: ""
      }],
      status: "Open"
    });
    setShowModal(true);
  };

  // Toggle event expansion
  const toggleExpand = (id) => {
    if (expandedEvent === id) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(id);
    }
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Add a new learning point
  const addLearningPoint = () => {
    const currentPoints = watch("learningPoints") || [];
    setValue("learningPoints", [...currentPoints, ""]);
  };

  // Remove a learning point
  const removeLearningPoint = (index) => {
    const currentPoints = watch("learningPoints") || [];
    if (currentPoints.length > 1) {
      const newPoints = [...currentPoints];
      newPoints.splice(index, 1);
      setValue("learningPoints", newPoints);
    }
  };

  // Add a new upcoming event
  const addUpcomingEvent = () => {
    const currentEvents = watch("upcomingEvents") || [];
    setValue("upcomingEvents", [
      ...currentEvents,
      { date: "", eventName: "", location: "", organiser: "", price: "", paymentLink: "" }
    ]);
  };

  // Remove an upcoming event
  const removeUpcomingEvent = (index) => {
    const currentEvents = watch("upcomingEvents") || [];
    if (currentEvents.length > 1) {
      const newEvents = [...currentEvents];
      newEvents.splice(index, 1);
      setValue("upcomingEvents", newEvents);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
          <span className="text-[#6E2D79] font-medium">Loading programs...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#6E2D79]">
                Hypnotherapy Events Management
              </h1>
              <p className="text-gray-600 mt-1">
                Total Programs: {events.length}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openAddModal}
                className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Program</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs by title, subtitle, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleSearch}
                className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setEvents(initialEvents);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Programs List */}
        <div className="space-y-6">
          {paginatedEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              <div 
                className="p-5 cursor-pointer flex justify-between items-center bg-gray-50"
                onClick={() => toggleExpand(event.id)}
              >
                <div>
                  <div className="flex items-center">
                    <Star className="text-yellow-500 mr-2 w-5 h-5" />
                    <h3 className="text-xl font-bold text-[#6E2D79]">{event.title}</h3>
                  </div>
                  <p className="text-gray-600 mt-1">{event.subtitle}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <button 
                    className="text-[#6E2D79] hover:text-[#5C2166] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(event.id);
                    }}
                  >
                    {expandedEvent === event.id ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
              
              {expandedEvent === event.id && (
                <div className="border-t border-gray-200 p-5 space-y-8">
                  {/* Program Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="text-[#6E2D79] w-6 h-6" />
                      <h4 className="text-lg font-bold text-[#6E2D79]">Program Details</h4>
                    </div>
                    <div className="ml-9 space-y-4">
                      <div className="flex items-center">
                        <span className="bg-gray-100 text-[#6E2D79] p-2 rounded-lg mr-3">
                          <Calendar className="w-5 h-5" />
                        </span>
                        <p><span className="font-medium text-gray-700">Duration:</span> <span className="text-gray-800">{event.duration}</span></p>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="bg-gray-100 text-[#6E2D79] p-2 rounded-lg mr-3">
                            <List className="w-5 h-5" />
                          </span>
                          <p className="font-medium text-gray-700">Learning Objectives:</p>
                        </div>
                        <ul className="ml-9 space-y-2">
                          {event.learningPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="bg-gray-200 text-[#6E2D79] p-1 rounded-full mr-2 mt-1">
                                <Check className="w-4 h-4" />
                              </span>
                              <span className="text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Upcoming Events */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="text-[#6E2D79] w-6 h-6" />
                      <h4 className="text-lg font-bold text-[#6E2D79]">Upcoming Events</h4>
                    </div>
                    
                    {event.upcomingEvents.length > 0 ? (
                      <div className="ml-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {event.upcomingEvents.map((upcoming, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="font-bold text-[#6E2D79]">{upcoming.eventName}</h5>
                              <span className="bg-gray-100 text-[#6E2D79] px-3 py-1 rounded-lg text-sm font-medium">
                                {upcoming.date}
                              </span>
                            </div>
                            <div className="mt-4 space-y-3">
                              <div className="flex items-center">
                                <span className="text-[#6E2D79] mr-3">
                                  <MapPin className="w-5 h-5" />
                                </span>
                                <p><span className="font-medium text-gray-700">Location:</span> {upcoming.location}</p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-[#6E2D79] mr-3">
                                  <User className="w-5 h-5" />
                                </span>
                                <p><span className="font-medium text-gray-700">Organizer:</span> {upcoming.organiser}</p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-[#6E2D79] mr-3">
                                  <DollarSign className="w-5 h-5" />
                                </span>
                                <p><span className="font-medium text-gray-700">Price:</span> <span className="text-[#6E2D79] font-bold">{upcoming.price}</span></p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-[#6E2D79] mr-3">
                                  <LinkIcon className="w-5 h-5" />
                                </span>
                                <p>
                                  <span className="font-medium text-gray-700">Payment Link:</span>{" "}
                                  <a 
                                    href={upcoming.paymentLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#6E2D79] hover:text-[#5C2166] hover:underline font-medium"
                                  >
                                    Register Now
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="ml-9 text-gray-600 italic">No upcoming events scheduled</p>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => openEditModal(event)}
                      className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Program</span>
                    </button>
                    <button
                      onClick={() => {
                        setEventToDelete(event);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {events.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-[#6E2D79]" />
              </div>
              <div className="text-xl text-[#6E2D79] font-bold mt-4">
                No hypnotherapy programs found
              </div>
              <p className="text-gray-600 mt-2">
                Try adjusting your search criteria or add a new program
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-sm text-gray-700">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, events.length)} of{" "}
                {events.length} results
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === i + 1
                          ? "bg-[#6E2D79] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Program Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {currentEvent ? "Edit Hypnotherapy Program" : "Add New Hypnotherapy Program"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Program Title and Subtitle */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Program Title
                      </label>
                      <input
                        {...register("title", { required: "Title is required" })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.title ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Advanced Hypnotherapy Certification"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subtitle
                      </label>
                      <input
                        {...register("subtitle", { required: "Subtitle is required" })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.subtitle ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Master the art of therapeutic hypnosis"
                      />
                      {errors.subtitle && (
                        <p className="mt-1 text-sm text-red-600">{errors.subtitle.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        {...register("duration", { required: "Duration is required" })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.duration ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="8 weeks"
                      />
                      {errors.duration && (
                        <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        {...register("status", { required: "Status is required" })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.status ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Learning Points Section */}
                  <div className="space-y-4 pt-6">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                      <h3 className="text-lg font-semibold text-[#6E2D79] flex items-center">
                        <List className="mr-2 w-5 h-5 text-[#6E2D79]" />
                        Learning Objectives
                      </h3>
                      <button
                        type="button"
                        onClick={addLearningPoint}
                        className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200"
                      >
                        Add Point
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {watch("learningPoints")?.map((_, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <div className="bg-gray-100 text-[#6E2D79] p-2 rounded-lg mr-3">
                                <Check className="w-4 h-4" />
                              </div>
                              <input
                                {...register(`learningPoints.${index}`, { 
                                  required: "Learning point is required" 
                                })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                  errors.learningPoints?.[index] ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="What participants will learn..."
                              />
                            </div>
                            {errors.learningPoints?.[index] && (
                              <p className="mt-1 text-sm text-red-600 ml-10">
                                {errors.learningPoints[index].message}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLearningPoint(index)}
                            className="mt-3 text-red-500 hover:text-red-700"
                            disabled={watch("learningPoints")?.length <= 1}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Upcoming Events Section */}
                  <div className="space-y-4 pt-8">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                      <h3 className="text-lg font-semibold text-[#6E2D79] flex items-center">
                        <Calendar className="mr-2 w-5 h-5 text-[#6E2D79]" />
                        Upcoming Events
                      </h3>
                      <button
                        type="button"
                        onClick={addUpcomingEvent}
                        className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200"
                      >
                        Add Event
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {watch("upcomingEvents")?.map((_, index) => (
                        <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-[#6E2D79]">Event #{index + 1}</h4>
                            <button
                              type="button"
                              onClick={() => removeUpcomingEvent(index)}
                              className="text-red-500 hover:text-red-700"
                              disabled={watch("upcomingEvents")?.length <= 1}
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Event Date (MMM DD, YYYY)
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                  {...register(`upcomingEvents.${index}.date`, { 
                                    required: "Date is required" 
                                  })}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.date ? "border-red-500" : "border-gray-300"
                                  }`}
                                  placeholder="Aug 15, 2025"
                                />
                              </div>
                              {errors.upcomingEvents?.[index]?.date && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.upcomingEvents[index].date.message}
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Event Name
                              </label>
                              <input
                                {...register(`upcomingEvents.${index}.eventName`, { 
                                  required: "Event name is required" 
                                  })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                  errors.upcomingEvents?.[index]?.eventName ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="Introductory Workshop"
                              />
                              {errors.upcomingEvents?.[index]?.eventName && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.upcomingEvents[index].eventName.message}
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                              </label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                  {...register(`upcomingEvents.${index}.location`, { 
                                    required: "Location is required" 
                                  })}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.location ? "border-red-500" : "border-gray-300"
                                  }`}
                                  placeholder="New York, NY"
                                />
                              </div>
                              {errors.upcomingEvents?.[index]?.location && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.upcomingEvents[index].location.message}
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Organizer
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                  {...register(`upcomingEvents.${index}.organiser`, { 
                                    required: "Organizer is required" 
                                  })}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.organiser ? "border-red-500" : "border-gray-300"
                                  }`}
                                  placeholder="Dr. Samantha Reed"
                                />
                              </div>
                              {errors.upcomingEvents?.[index]?.organiser && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.upcomingEvents[index].organiser.message}
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price
                              </label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                  {...register(`upcomingEvents.${index}.price`, { 
                                    required: "Price is required" 
                                  })}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.price ? "border-red-500" : "border-gray-300"
                                  }`}
                                  placeholder="$199"
                                />
                              </div>
                              {errors.upcomingEvents?.[index]?.price && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.upcomingEvents[index].price.message}
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Link
                              </label>
                              <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                  {...register(`upcomingEvents.${index}.paymentLink`, { 
                                    required: "Payment link is required" 
                                  })}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.paymentLink ? "border-red-500" : "border-gray-300"
                                  }`}
                                  placeholder="https://payment.link/hypno1"
                                />
                              </div>
                              {errors.upcomingEvents?.[index]?.paymentLink && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.upcomingEvents[index].paymentLink.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{currentEvent ? "Update Program" : "Create Program"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && eventToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="bg-red-600 text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Confirm Deletion</h2>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                      <Trash2 className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <p className="text-center text-gray-700">
                    Are you sure you want to delete the program{" "}
                    <span className="font-semibold text-[#6E2D79]">{eventToDelete.title}</span>?
                    This action cannot be undone.
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteEvent}
                    disabled={isDeleting}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Program</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HypnotherapyPage;