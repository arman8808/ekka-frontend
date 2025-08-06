// src/pages/Hypnotherapy.js
import React, { useEffect, useState } from "react";
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
  AlertCircle,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import hypnotherapyService from "../../components/services/hypnotherapyService";
import toast from "react-hot-toast";

const HypnotherapyPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [programToDelete, setProgramToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedProgram, setExpandedProgram] = useState(null);

  const itemsPerPage = 10;

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger
  } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      duration: "",
      learningSections: [{ title: "", points: [""] }],
      upcomingEvents: [{
        date: "",
        eventName: "",
        location: "",
        organiser: "",
        price: "",
        paymentLink: "",
      }],
      status: "Open",
    }
  });
  const validateSectionTitle = (value, sectionIndex) => {
    const sections = watch("learningSections");
    return sections[sectionIndex].title.trim() !== "" || "Section title is required";
  };
const validateSectionPoint = (value, sectionIndex, pointIndex) => {
    const sections = watch("learningSections");
    return sections[sectionIndex].points[pointIndex].trim() !== "" || "Learning point is required";
  };

  const validateEventDate = (value, eventIndex) => {
    const events = watch("upcomingEvents");
    return events[eventIndex].date.trim() !== "" || "Date is required";
  };

  const validatePrice = (value, eventIndex) => {
    const events = watch("upcomingEvents");
    if (!events[eventIndex].price.trim()) return "Price is required";
    if (!/^\$?\d+(\.\d{1,2})?$/.test(events[eventIndex].price)) {
      return "Invalid price format (e.g., $99 or 99.99)";
    }
    return true;
  };

  const validatePaymentLink = (value, eventIndex) => {
    const events = watch("upcomingEvents");
    if (!events[eventIndex].paymentLink.trim()) return "Payment link is required";
    
    try {
      new URL(events[eventIndex].paymentLink);
      return true;
    } catch {
      return "Invalid URL format";
    }
  };

  // Fetch programs
  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await hypnotherapyService.getPrograms(
        searchTerm,
        currentPage,
        itemsPerPage
      );
      setPrograms(data.programs);
      setTotalPages(data.totalPages);
      setTotalPrograms(data.totalPrograms);
    } catch (error) {
      setError(error || "Failed to fetch programs");
      toast.error(error || "Failed to fetch programs");
    } finally {
      setLoading(false);
    }
  };

  // Load programs on component mount and when search/page changes
  useEffect(() => {
    fetchPrograms();
  }, [searchTerm, currentPage]);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    fetchPrograms();
  };

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (currentProgram) {
        await hypnotherapyService.updateProgram(currentProgram._id, data);
        toast.success("Program updated successfully");
      } else {
        await hypnotherapyService.createProgram(data);
        toast.success("Program created successfully");
      }
      
      fetchPrograms();
      reset();
      setShowModal(false);
    } catch (error) {
      toast.error(error || "Failed to save program");
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete program
  const handleDeleteProgram = async () => {
    setIsDeleting(true);
    try {
      await hypnotherapyService.deleteProgram(programToDelete._id);
      toast.success("Program deleted successfully");
      fetchPrograms();
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error || "Failed to delete program");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Open edit modal with program data
  const openEditModal = (program) => {
    setCurrentProgram(program);
    setValue("title", program.title);
    setValue("subtitle", program.subtitle);
    setValue("duration", program.duration);
    setValue("learningSections", program.learningSections);
    setValue("upcomingEvents", program.upcomingEvents);
    setValue("status", program.status);
    setShowModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    setCurrentProgram(null);
    reset({
      title: "",
      subtitle: "",
      duration: "",
      learningSections: [{ title: "", points: [""] }],
      upcomingEvents: [
        {
          date: "",
          eventName: "",
          location: "",
          organiser: "",
          price: "",
          paymentLink: "",
        },
      ],
      status: "Open",
    });
    setShowModal(true);
  };

  // Toggle program expansion
  const toggleExpand = (id) => {
    setExpandedProgram(expandedProgram === id ? null : id);
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

  // Add a new learning section
  const addLearningSection = async () => {
    const currentSections = watch("learningSections") || [];
    setValue("learningSections", [
      ...currentSections,
      { title: "", points: [""] },
    ]);
    
    // Trigger validation for new section
    setTimeout(() => {
      trigger(`learningSections.${currentSections.length}.title`);
      trigger(`learningSections.${currentSections.length}.points.0`);
    }, 100);
  };

  // Remove a learning section
  const removeLearningSection = (sectionIndex) => {
    const currentSections = watch("learningSections") || [];
    if (currentSections.length > 1) {
      const newSections = [...currentSections];
      newSections.splice(sectionIndex, 1);
      setValue("learningSections", newSections);
    }
  };

  // Add a new learning point to a section
  const addLearningPoint = (sectionIndex) => {
    const currentSections = [...watch("learningSections")];
    currentSections[sectionIndex].points.push("");
    setValue("learningSections", currentSections);
  };

  // Remove a learning point from a section
  const removeLearningPoint = (sectionIndex, pointIndex) => {
    const currentSections = [...watch("learningSections")];
    if (currentSections[sectionIndex].points.length > 1) {
      currentSections[sectionIndex].points.splice(pointIndex, 1);
      setValue("learningSections", currentSections);
    }
  };

  // Add a new upcoming event
  const addUpcomingEvent = () => {
    const currentEvents = watch("upcomingEvents") || [];
    setValue("upcomingEvents", [
      ...currentEvents,
      {
        date: "",
        eventName: "",
        location: "",
        organiser: "",
        price: "",
        paymentLink: "",
      },
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

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
          <span className="text-[#6E2D79] font-medium">
            Loading programs...
          </span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={fetchPrograms}
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
                Total Programs: {totalPrograms}
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
                  fetchPrograms();
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
          {programs.map((program) => (
            <div
              key={program._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              <div
                className="p-5 cursor-pointer flex justify-between items-center bg-gray-50"
                onClick={() => toggleExpand(program._id)}
              >
                <div>
                  <div className="flex items-center">
                    <Star className="text-yellow-500 mr-2 w-5 h-5" />
                    <h3 className="text-xl font-bold text-[#6E2D79]">
                      {program.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mt-1">{program.subtitle}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      program.status
                    )}`}
                  >
                    {program.status}
                  </span>
                  <button
                    className="text-[#6E2D79] hover:text-[#5C2166] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(program._id);
                    }}
                  >
                    {expandedProgram === program._id ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>

              {expandedProgram === program._id && (
                <div className="border-t border-gray-200 p-5 space-y-8">
                  {/* Program Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="text-[#6E2D79] w-6 h-6" />
                      <h4 className="text-lg font-bold text-[#6E2D79]">
                        Program Details
                      </h4>
                    </div>
                    <div className="ml-9 space-y-4">
                      <div className="flex items-center">
                        <span className="bg-gray-100 text-[#6E2D79] p-2 rounded-lg mr-3">
                          <Calendar className="w-5 h-5" />
                        </span>
                        <p>
                          <span className="font-medium text-gray-700">
                            Duration:
                          </span>{" "}
                          <span className="text-gray-800">
                            {program.duration}
                          </span>
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="bg-gray-100 text-[#6E2D79] p-2 rounded-lg mr-3">
                            <List className="w-5 h-5" />
                          </span>
                          <p className="font-medium text-gray-700">
                            Learning Objectives:
                          </p>
                        </div>
                        <ul className="ml-9 space-y-2">
                          {program.learningSections.map((section, sectionIdx) => (
                            <React.Fragment key={sectionIdx}>
                              <li className="font-semibold text-[#6E2D79]">
                                {section.title}
                              </li>
                              {section.points.map((point, pointIdx) => (
                                <li key={pointIdx} className="flex items-start ml-4">
                                  <span className="bg-gray-200 text-[#6E2D79] p-1 rounded-full mr-2 mt-1">
                                    <Check className="w-4 h-4" />
                                  </span>
                                  <span className="text-gray-700">{point}</span>
                                </li>
                              ))}
                            </React.Fragment>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Events */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="text-[#6E2D79] w-6 h-6" />
                      <h4 className="text-lg font-bold text-[#6E2D79]">
                        Upcoming Events
                      </h4>
                    </div>

                    {program.upcomingEvents.length > 0 ? (
                      <div className="ml-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {program.upcomingEvents.map((upcoming, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="font-bold text-[#6E2D79]">
                                {upcoming.eventName}
                              </h5>
                              <span className="bg-gray-100 text-[#6E2D79] px-3 py-1 rounded-lg text-sm font-medium">
                                {upcoming.date}
                              </span>
                            </div>
                            <div className="mt-4 space-y-3">
                              <div className="flex items-center">
                                <span className="text-[#6E2D79] mr-3">
                                  <MapPin className="w-5 h-5" />
                                </span>
                                <p>
                                  <span className="font-medium text-gray-700">
                                    Location:
                                  </span>{" "}
                                  {upcoming.location}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-[#6E2D79] mr-3">
                                  <User className="w-5 h-5" />
                                </span>
                                <p>
                                  <span className="font-medium text-gray-700">
                                    Organizer:
                                  </span>{" "}
                                  {upcoming.organiser}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-[#6E2D79] mr-3">
                                  <DollarSign className="w-5 h-5" />
                                </span>
                                <p>
                                  <span className="font-medium text-gray-700">
                                    Price:
                                  </span>{" "}
                                  <span className="text-[#6E2D79] font-bold">
                                    {upcoming.price}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-[#6E2D79] mr-3">
                                  <LinkIcon className="w-5 h-5" />
                                </span>
                                <p>
                                  <span className="font-medium text-gray-700">
                                    Payment Link:
                                  </span>{" "}
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
                      <p className="ml-9 text-gray-600 italic">
                        No upcoming events scheduled
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => openEditModal(program)}
                      className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Program</span>
                    </button>
                    <button
                      onClick={() => {
                        setProgramToDelete(program);
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

          {programs.length === 0 && !loading && (
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
                {Math.min(currentPage * itemsPerPage, totalPrograms)} of{" "}
                {totalPrograms} results
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
                    {currentProgram
                      ? "Edit Hypnotherapy Program"
                      : "Add New Hypnotherapy Program"}
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
                        Program Title *
                      </label>
                      <input
                        {...register("title", {
                          required: "Title is required",
                          minLength: {
                            value: 5,
                            message: "Title must be at least 5 characters"
                          }
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.title ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Advanced Hypnotherapy Certification"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subtitle *
                      </label>
                      <input
                        {...register("subtitle", {
                          required: "Subtitle is required",
                          minLength: {
                            value: 10,
                            message: "Subtitle must be at least 10 characters"
                          }
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.subtitle ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Master the art of therapeutic hypnosis"
                      />
                      {errors.subtitle && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.subtitle.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration *
                      </label>
                      <input
                        {...register("duration", {
                          required: "Duration is required",
                          pattern: {
                            value: /^[a-zA-Z0-9\s]+$/,
                            message: "Invalid duration format"
                          }
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.duration ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="8 weeks"
                      />
                      {errors.duration && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.duration.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        {...register("status", {
                          required: "Status is required"
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

                  {/* Learning Points Section */}
                  <div className="space-y-4 pt-6">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                      <h3 className="text-lg font-semibold text-[#6E2D79] flex items-center">
                        <List className="mr-2 w-5 h-5 text-[#6E2D79]" />
                        Sections *
                      </h3>
                      <button
                        type="button"
                        onClick={addLearningSection}
                        className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200"
                      >
                        Add Section
                      </button>
                    </div>

                    <div className="space-y-6">
                      {watch("learningSections")?.map(
                        (section, sectionIndex) => (
                          <div
                            key={sectionIndex}
                            className="bg-gray-50 p-5 rounded-lg border border-gray-200"
                          >
                            <div className="flex justify-between items-center mb-4">
                              <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Section Title *
                                </label>
                                <input
                                  {...register(
                                    `learningSections.${sectionIndex}.title`,
                                    {
                                      required: "Section title is required",
                                      minLength: {
                                        value: 3,
                                        message: "Title must be at least 3 characters"
                                      },
                                      validate: (value) => 
                                        validateSectionTitle(value, sectionIndex)
                                    }
                                  )}
                                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.learningSections?.[sectionIndex]
                                      ?.title
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                  placeholder="Advanced Techniques"
                                />
                                {errors.learningSections?.[sectionIndex]
                                  ?.title && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {
                                      errors.learningSections[sectionIndex]
                                        .title.message
                                    }
                                  </p>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeLearningSection(sectionIndex)}
                                className="text-red-500 hover:text-red-700 ml-4 mt-6"
                                disabled={
                                  watch("learningSections")?.length <= 1
                                }
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="space-y-4 ml-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-700">
                                  Learning Points *
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => addLearningPoint(sectionIndex)}
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                                >
                                  Add Point
                                </button>
                              </div>

                              {section.points?.map((_, pointIndex) => (
                                <div
                                  key={pointIndex}
                                  className="flex items-start space-x-3"
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center">
                                      <div className="bg-gray-100 text-[#6E2D79] p-2 rounded-lg mr-3">
                                        <Check className="w-4 h-4" />
                                      </div>
                                      <input
                                        {...register(
                                          `learningSections.${sectionIndex}.points.${pointIndex}`,
                                          {
                                            required: "Learning point is required",
                                            minLength: {
                                              value: 5,
                                              message: "Point must be at least 5 characters"
                                            },
                                            validate: (value) => 
                                              validateSectionPoint(value, sectionIndex, pointIndex)
                                          }
                                        )}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                          errors.learningSections?.[
                                            sectionIndex
                                          ]?.points?.[pointIndex]
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        }`}
                                        placeholder="What participants will learn..."
                                      />
                                    </div>
                                    {errors.learningSections?.[sectionIndex]
                                      ?.points?.[pointIndex] && (
                                      <p className="mt-1 text-sm text-red-600 ml-10">
                                        {
                                          errors.learningSections[sectionIndex]
                                            .points[pointIndex].message
                                        }
                                      </p>
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeLearningPoint(sectionIndex, pointIndex)}
                                    className="mt-3 text-red-500 hover:text-red-700"
                                    disabled={section.points.length <= 1}
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
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
                        <div
                          key={index}
                          className="bg-gray-50 p-5 rounded-lg border border-gray-200"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-[#6E2D79]">
                              Event #{index + 1}
                            </h4>
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
                                Event Date *
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                  {...register(`upcomingEvents.${index}.date`, {
                                    required: "Date is required",
                                    validate: (value) => 
                                      validateEventDate(value, index)
                                  })}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.date
                                      ? "border-red-500"
                                      : "border-gray-300"
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
                                Event Name *
                              </label>
                              <input
                                {...register(
                                  `upcomingEvents.${index}.eventName`,
                                  {
                                    required: "Event name is required",
                                    minLength: {
                                      value: 5,
                                      message: "Name must be at least 5 characters"
                                    }
                                  }
                                )}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                  errors.upcomingEvents?.[index]?.eventName
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                placeholder="Introductory Workshop"
                              />
                              {errors.upcomingEvents?.[index]?.eventName && (
                                <p className="mt-1 text-sm text-red-600">
                                  {
                                    errors.upcomingEvents[index].eventName
                                      .message
                                  }
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location *
                              </label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                  {...register(
                                    `upcomingEvents.${index}.location`,
                                    {
                                      required: "Location is required",
                                      minLength: {
                                        value: 3,
                                        message: "Location must be at least 3 characters"
                                      }
                                    }
                                  )}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.location
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                  placeholder="New York, NY"
                                />
                              </div>
                              {errors.upcomingEvents?.[index]?.location && (
                                <p className="mt-1 text-sm text-red-600">
                                  {
                                    errors.upcomingEvents[index].location
                                      .message
                                  }
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Organizer *
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                  {...register(
                                    `upcomingEvents.${index}.organiser`,
                                    {
                                      required: "Organizer is required",
                                      minLength: {
                                        value: 3,
                                        message: "Organizer must be at least 3 characters"
                                      }
                                    }
                                  )}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.organiser
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                  placeholder="Dr. Samantha Reed"
                                />
                              </div>
                              {errors.upcomingEvents?.[index]?.organiser && (
                                <p className="mt-1 text-sm text-red-600">
                                  {
                                    errors.upcomingEvents[index].organiser
                                      .message
                                  }
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price *
                              </label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                  {...register(
                                    `upcomingEvents.${index}.price`,
                                    {
                                      required: "Price is required",
                                      validate: (value) => 
                                        validatePrice(value, index)
                                    }
                                  )}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.price
                                      ? "border-red-500"
                                      : "border-gray-300"
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
                                Payment Link *
                              </label>
                              <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                  type="url"
                                  {...register(
                                    `upcomingEvents.${index}.paymentLink`,
                                    {
                                      required: "Payment link is required",
                                      validate: (value) => 
                                        validatePaymentLink(value, index)
                                    }
                                  )}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.paymentLink
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                  placeholder="https://payment.example.com/hypno1"
                                />
                              </div>
                              {errors.upcomingEvents?.[index]?.paymentLink && (
                                <p className="mt-1 text-sm text-red-600">
                                  {
                                    errors.upcomingEvents[index].paymentLink
                                      .message
                                  }
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
                          <span>
                            {currentProgram ? "Update Program" : "Create Program"}
                          </span>
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
        {showDeleteModal && programToDelete && (
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
                    <span className="font-semibold text-[#6E2D79]">
                      {programToDelete.title}
                    </span>
                    ? This action cannot be undone.
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
                    onClick={handleDeleteProgram}
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