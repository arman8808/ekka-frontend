import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  Download,
  RefreshCw,
  AlertCircle,
  Search,
  Filter,
  X,
  Edit,
  Plus,
  Trash2,
  Calendar,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import familyEventService from "../../components/services/familyEventService.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 
const FamilyConstellationPage = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const token = Cookies.get("adminToken");;
    if (token) {
      setUser({ token });
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      event: "Family Constellation",
      startDate: "",
      endDate: "",
      location: "",
      capacity: "",
      organisedby: "",
      organiserEmail: "",
      price: "",
      paymentLink: "",
      status: "Open",
      facilitator: "",
      externalLink: "",
    },
  });

  // Watch start date to trigger end date validation
  const startDate = watch("startDate");
  
  // Helper function to get current date/time in datetime-local format
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };
  
  // Helper function to get today's date at 00:00 for start date validation
  const getTodayStartTime = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().slice(0, 16);
  };
  
  // Helper function to set end date automatically when start date changes
  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    if (startDate) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setHours(end.getHours() + 2); // Default 2-hour event
      
      setValue("endDate", end.toISOString().slice(0, 16));
      // Trigger validation for end date
      setTimeout(() => {
        trigger("endDate");
      }, 100);
    }
  };
  
  // Trigger end date validation when start date changes
  useEffect(() => {
    if (startDate) {
      // Small delay to ensure the form state is updated
      setTimeout(() => {
        trigger("endDate");
      }, 100);
    }
  }, [startDate, trigger]);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("adminToken");
      const data = await familyEventService.getEvents(
        searchTerm,
        currentPage,
        itemsPerPage,
        token
      );
      setEvents(data.events);
      setTotalPages(data.totalPages);
      setTotalEvents(data.totalEvents);
    } catch (error) {
      setError(error.message || "Failed to fetch events");
      toast.error(error.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [searchTerm, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchEvents();
  };

  const onSubmit = async (data) => {
    try {
      const token = Cookies.get("adminToken");
      if (!token) {
        toast.error("Authentication required");
        return;
      }

      if (showAddModal) {
        await familyEventService.createEvent(data, token);
        toast.success("Event created successfully");
      } else if (showEditModal && currentEvent) {
        await familyEventService.updateEvent(currentEvent._id, data, token);
        toast.success("Event updated successfully");
      }

      fetchEvents();
      reset();
      setShowAddModal(false);
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.message || "Failed to save event");
      console.error("Form submission error:", error);
    }
  };

  const handleDeleteEvent = async () => {
    setIsDeleting(true);
    try {
      const token =Cookies.get("adminToken");
      if (!token) {
        toast.error("Authentication required");
        return;
      }

      await familyEventService.deleteEvent(eventToDelete._id, token);
      toast.success("Event deleted successfully");
      fetchEvents();
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.message || "Failed to delete event");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const openEditModal = (event) => {
    setCurrentEvent(event);
    setValue("event", event.event);
    
    // Handle date conversion - prioritize new format over legacy
    if (event.startDate && event.endDate) {
      // Use the new startDate/endDate format
      setValue("startDate", event.startDate.slice(0, 16)); // Format for datetime-local input
      setValue("endDate", event.endDate.slice(0, 16));
    } else if (event.date && !event.startDate) {
      // Convert legacy date format to start/end dates
      const eventDate = new Date(event.date);
      const endDate = new Date(eventDate);
      endDate.setHours(eventDate.getHours() + 2); // Default 2-hour event
      
      setValue("startDate", eventDate.toISOString().slice(0, 16)); // Format for datetime-local input
      setValue("endDate", endDate.toISOString().slice(0, 16));
    } else {
      // Fallback - set empty values
      setValue("startDate", "");
      setValue("endDate", "");
    }
    
    setValue("location", event.location);
    setValue("capacity", event.capacity);
    setValue("organisedby", event.organisedby);
    setValue("organiserEmail", event.organiserEmail);
    setValue("price", event.price);
    setValue("paymentLink", event.paymentLink);
    setValue("status", event.status);
    setValue("facilitator", event.facilitator || "");
    setValue("externalLink", event.externalLink || "");
    setShowEditModal(true);
  };

  const openAddModal = () => {
    reset({
      event: "Family Constellation",
      startDate: "",
      endDate: "",
      location: "",
      capacity: "",
      organisedby: "",
      organiserEmail: "",
      price: "",
      paymentLink: "",
      status: "Open",
      facilitator: "",
      externalLink: "",
    });
    setShowAddModal(true);
  };

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

  const validatePrice = (value) => {
    const priceRegex = /^\$\s?\d+(,\d{3})*(\.\d{2})?$/;
    return (
      priceRegex.test(value) ||
      "Price must be in currency format (e.g., $375 or $375.00)"
    );
  };

  useEffect(() => {
    const adminToken = Cookies.get("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
          <span className="text-[#6E2D79] font-medium">Loading events...</span>
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
          onClick={fetchEvents}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  if (!authChecked) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
            <span className="text-[#6E2D79] font-medium">
              Verifying authentication...
            </span>
          </div>
        </div>
      </Layout>
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
                Family Constellation Events
              </h1>
              <p className="text-gray-600 mt-1">Total Events: {totalEvents}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {user && (
                <button
                  onClick={openAddModal}
                  className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Event</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, organizer, status, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
                  setCurrentPage(1);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#6E2D79] text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Event
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Date & Time
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Location
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Facilitator
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Capacity
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Organizer
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  {user && (
                    <th className="px-4 py-4 text-center text-sm font-semibold">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-[#5C2166]">
                      {event.event}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {event.startDate && event.endDate ? (
                        <div className="space-y-1">
                          <div className="font-medium">
                            {new Date(event.startDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(event.startDate).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })} - {new Date(event.endDate).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      ) : event.date ? (
                        <div className="text-gray-500 italic">
                          {event.date} (Legacy format)
                        </div>
                      ) : (
                        <div className="text-gray-400 italic">No date set</div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {event.location}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {event.facilitator || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {event.capacity}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {event.organisedby}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {event.price}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
                    </td>
                    {user && (
                      <td className="px-4 py-4 text-center flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openEditModal(event)}
                          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEventToDelete(event);
                            setShowDeleteModal(true);
                          }}
                          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No events found</div>
              <p className="text-gray-400 mt-2">
                Try adjusting your search criteria or add a new event
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
                {Math.min(currentPage * itemsPerPage, totalEvents)} of{" "}
                {totalEvents} results
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

        {/* Add/Edit Event Modal */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-overlay">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col modal-content">
              <div className="flex-shrink-0 bg-[#6E2D79] text-white p-6 rounded-t-lg modal-header">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {showAddModal ? "Add New Event" : "Edit Event"}
                  </h2>
                  <button
                    onClick={() => {
                      if (showAddModal) setShowAddModal(false);
                      if (showEditModal) setShowEditModal(false);
                    }}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Name
                      </label>
                      <input
                        {...register("event", {
                          required: "Event name is required",
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.event ? "border-red-500" : "border-gray-300"
                        }`}
                        disabled
                      />
                      {errors.event && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.event.message}
                        </p>
                      )}
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date & Time *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="datetime-local"
                          {...register("startDate", {
                            required: "Start date and time is required",
                            min: getTodayStartTime(), // Allow any time from today onwards
                          })}
                          onChange={handleStartDateChange}
                          min={getTodayStartTime()}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                            errors.startDate ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        You can select any time from today onwards (00:00 to 23:59)
                      </p>
                      {errors.startDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>

                    {/* End Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date & Time *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="datetime-local"
                          {...register("endDate", {
                            required: "End date and time is required",
                            validate: (value) => {
                              const startDate = getValues("startDate");
                              if (!startDate || !value) {
                                return true; // Let required validation handle empty values
                              }
                              
                              const start = new Date(startDate);
                              const end = new Date(value);
                              
                              // Debug logging
                              console.log("Validation - Start Date:", startDate, "Parsed:", start);
                              console.log("Validation - End Date:", value, "Parsed:", end);
                              console.log("Comparison:", end <= start, "End <= Start");
                              
                              // Check if dates are valid
                              if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                                return "Invalid date format";
                              }
                              
                              // Check if end date is after start date
                              if (end <= start) {
                                return "End date must be after start date";
                              }
                              
                              return true;
                            }
                          })}
                          min={startDate || getTodayStartTime()}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                            errors.endDate ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        End time must be after start time
                      </p>
                      {errors.endDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.endDate.message}
                        </p>
                      )}
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        {...register("location", {
                          required: "Location is required",
                          minLength: {
                            value: 3,
                            message: "Location must be at least 3 characters",
                          },
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.location ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.location.message}
                        </p>
                      )}
                    </div>

                    {/* Facilitator (Optional) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Facilitator (Optional)
                      </label>
                      <input
                        {...register("facilitator")}
                        placeholder="Enter facilitator name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Capacity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Capacity
                      </label>
                      <input
                        {...register("capacity", {
                          required: "Capacity is required",
                          pattern: {
                            value: /^\d+\sSeats?$/,
                            message:
                              "Capacity must be in format like '10 Seats'",
                          },
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.capacity ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.capacity && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.capacity.message}
                        </p>
                      )}
                    </div>

                    {/* Organizer Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organizer Name
                      </label>
                      <input
                        {...register("organisedby", {
                          required: "Organizer name is required",
                          minLength: {
                            value: 3,
                            message:
                              "Organizer name must be at least 3 characters",
                          },
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.organisedby
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.organisedby && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.organisedby.message}
                        </p>
                      )}
                    </div>

                    {/* Organizer Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organizer Email
                      </label>
                      <input
                        type="email"
                        {...register("organiserEmail", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.organiserEmail
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.organiserEmail && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.organiserEmail.message}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        {...register("price", {
                          required: "Price is required",
                          validate: validatePrice,
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.price ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    {/* Payment Link */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Link
                      </label>
                      <input
                        type="url"
                        {...register("paymentLink", {
                          required: "Payment link is required",
                          pattern: {
                            value:
                              /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                            message: "Invalid URL format",
                          },
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.paymentLink
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.paymentLink && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.paymentLink.message}
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        {...register("status", {
                          required: "Status is required",
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.status ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.status.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      External Link (Optional)
                    </label>
                    <input
                      type="url"
                      {...register("externalLink", {
                        pattern: {
                          value:
                            /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,})([\/\w \.\-?=&%\[\]]*)*\/?$/,
                          message: "Invalid URL format",
                        },
                      })}
                      placeholder="https://example.com"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                        errors.externalLink
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.externalLink && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.externalLink.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        if (showAddModal) setShowAddModal(false);
                        if (showEditModal) setShowEditModal(false);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
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
                          <span>
                            {showAddModal ? "Adding..." : "Updating..."}
                          </span>
                        </>
                      ) : (
                        <>
                          {showAddModal ? (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>Add Event</span>
                            </>
                          ) : (
                            <>
                              <Edit className="w-4 h-4" />
                              <span>Update Event</span>
                            </>
                          )}
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
                  <p className="text-gray-700">
                    Are you sure you want to delete the event on{" "}
                    {eventToDelete.startDate && eventToDelete.endDate ? (
                      <>
                        <span className="font-semibold">
                          {new Date(eventToDelete.startDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>{" "}
                        from{" "}
                        <span className="font-semibold">
                          {new Date(eventToDelete.startDate).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold">
                          {new Date(eventToDelete.endDate).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold">{eventToDelete.date}</span>
                    )}{" "}
                    at{" "}
                    <span className="font-semibold">
                      {eventToDelete.location}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
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
                        <span>Delete</span>
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

export default FamilyConstellationPage;

<style jsx>{`
  .modal-overlay {
    z-index: 50;
  }
  
  .modal-content {
    max-height: 90vh;
    overflow: hidden;
  }
  
  .modal-header {
    flex-shrink: 0;
    z-index: 10;
  }
  
  .modal-body {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e0 #f7fafc;
  }
  
  .modal-body::-webkit-scrollbar {
    width: 6px;
  }
  
  .modal-body::-webkit-scrollbar-track {
    background: #f7fafc;
    border-radius: 3px;
  }
  
  .modal-body::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
  }
  
  .modal-body::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`}</style>
