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
  Video,
  Image,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import decodeService from "../../components/services/decodeService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import RichTextEditor from "../../components/utils/RichTextEditor";

const DecodeAdminPage = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
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
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const itemsPerPage = 10;

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      videoUrl: "",
      thumbnail: null,
      duration: "",
      cardPoints: [""],
      learningSections: [{ title: "", content: "" }],
      upcomingEvents: [],
      status: "Open",
    },
  });

  // Validation functions
  const validateSectionTitle = (value, sectionIndex) => {
    const sections = watch("learningSections");
    return (
      sections[sectionIndex].title.trim() !== "" || "Section title is required"
    );
  };

  const validateSectionContent = (value, sectionIndex) => {
    const sections = watch("learningSections");
    const content = sections[sectionIndex].content;
    // Remove HTML tags and check content length
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    return (
      textContent.length >= 10 ||
      "Section content must be at least 10 characters"
    );
  };

  const validateCardPoint = (value) => {
    const cardPoint = watch("cardPoints.0");
    // Remove HTML tags and check if content exists
    const textContent = cardPoint?.replace(/<[^>]*>/g, "").trim();
    return textContent !== "" || "Card point is required";
  };

  const validateEventStartDate = (value, eventIndex) => {
    const events = watch("upcomingEvents");
    const event = events[eventIndex];

    // If any other field in this event has content, start date becomes required
    if (
      event.eventName ||
      event.location ||
      event.organiser ||
      event.price ||
      event.paymentLink ||
      event.endDate
    ) {
      return (
        value.trim() !== "" ||
        "Start date and time is required when adding an event"
      );
    }

    // If no other fields have content, start date is optional
    return true;
  };

  const validateEventEndDate = (value, eventIndex) => {
    const events = watch("upcomingEvents");
    const event = events[eventIndex];

    // If any other field in this event has content, end date becomes required
    if (
      event.startDate ||
      event.eventName ||
      event.location ||
      event.organiser ||
      event.price ||
      event.paymentLink
    ) {
      if (!event.startDate) {
        return "Start date is required before setting end date";
      }

      if (!value) {
        return "End date and time is required when adding an event";
      }

      const startDate = new Date(event.startDate);
      const endDate = new Date(value);

      if (endDate <= startDate) {
        return "End date must be after start date";
      }
    }

    // If no other fields have content, end date is optional
    return true;
  };

  // Helper function to check if an event has any content
  const hasEventContent = (event) => {
    return !!(
      event.startDate ||
      event.endDate ||
      event.eventName ||
      event.location ||
      event.organiser ||
      event.price ||
      event.paymentLink
    );
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
    if (!events[eventIndex].paymentLink.trim())
      return "Payment link is required";

    try {
      new URL(events[eventIndex].paymentLink);
      return true;
    } catch {
      return "Invalid URL format";
    }
  };

  const validateOrganizerEmail = (value, eventIndex) => {
    const events = watch("upcomingEvents");
    const email = events[eventIndex].organizerEmail;

    // Only validate if email has a value (field is optional)
    if (email && email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
      }
    }

    return true;
  };

  const validateVideoUrl = (value) => {
    if (!value) return true; // Optional
    try {
      new URL(value);
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
      const data = await decodeService.getPrograms(
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

      // Filter out empty upcoming events
      if (data.upcomingEvents) {
        data.upcomingEvents = data.upcomingEvents.filter((event) =>
          hasEventContent(event)
        );
      }

      // Create FormData to handle file upload
      const formData = new FormData();

      // Handle thumbnail separately to ensure we only send new file, not old value
      let thumbnailHandled = false;
      if (data.thumbnail && data.thumbnail instanceof File) {
        formData.append("thumbnail", data.thumbnail);
        thumbnailHandled = true;
        console.log("✅ Sending new thumbnail file:", data.thumbnail.name);
      } else {
        console.log(
          "❌ No new thumbnail file found. Keeping existing thumbnail if editing."
        );
        console.log("📋 data.thumbnail value:", data.thumbnail);
      }

      // Append all other form data to FormData (excluding thumbnail)
      Object.keys(data).forEach((key) => {
        if (key !== "thumbnail") {
          // Skip thumbnail as it's handled above
          if (Array.isArray(data[key])) {
            formData.append(key, JSON.stringify(data[key]));
          } else {
            formData.append(key, data[key]);
          }
        }
      });

      // Debug log for form data
      console.log("📋 Form submission - thumbnail handled:", thumbnailHandled);
      if (currentProgram) {
        console.log("🔄 Updating existing program:", currentProgram.title);
      } else {
        console.log("➕ Creating new program");
      }

      if (currentProgram) {
        await decodeService.updateProgram(currentProgram._id, formData);
        toast.success("Program updated successfully");
      } else {
        await decodeService.createProgram(formData);
        toast.success("Program created successfully");
      }

      fetchPrograms();
      reset();
      setShowModal(false);
      setThumbnailPreview(null);
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
      await decodeService.deleteProgram(programToDelete._id);
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
    setValue("videoUrl", program.videoUrl || "");
    setValue("duration", program.duration);

    // Handle card points - check if it's already HTML or plain text
    if (Array.isArray(program.cardPoints) && program.cardPoints.length > 0) {
      const firstCardPoint = program.cardPoints[0];

      // If it's already HTML content (contains <ul> or <li>), use it as is
      if (
        firstCardPoint &&
        (firstCardPoint.includes("<ul>") || firstCardPoint.includes("<li>"))
      ) {
        setValue("cardPoints", [firstCardPoint]);
      } else {
        // If it's plain text, convert to HTML
        const cardPointsHtml = program.cardPoints
          .map((point) => `<li>${point}</li>`)
          .join("");
        setValue("cardPoints", [`<ul>${cardPointsHtml}</ul>`]);
      }
    } else {
      setValue("cardPoints", [""]);
    }

    // Convert old points to HTML content if needed
    const convertedSections = program.learningSections.map((section) => {
      if (section.points && Array.isArray(section.points)) {
        // Check if content is already HTML
        if (
          section.content &&
          (section.content.includes("<ul>") || section.content.includes("<li>"))
        ) {
          return section; // Use existing HTML content
        } else {
          // Convert plain text points to HTML
          return {
            title: section.title,
            content: `<ul>${section.points
              .map((point) => `<li>${point}</li>`)
              .join("")}</ul>`,
          };
        }
      }
      return section;
    });

    setValue("learningSections", convertedSections);

    // Convert old date format to new startDate/endDate format if needed
    const convertedEvents = program.upcomingEvents.map((event) => {
      let startDate = event.startDate;
      let endDate = event.endDate;

      // If we have old date format, convert it
      if (event.date && !event.startDate) {
        const eventDate = new Date(event.date);
        const endDateTime = new Date(eventDate);
        endDateTime.setHours(eventDate.getHours() + 2); // Default 2-hour event

        startDate = eventDate.toISOString().slice(0, 16); // Format for datetime-local input
        endDate = endDateTime.toISOString().slice(0, 16);
      }

      // If we have startDate but it's not in the right format, convert it
      if (event.startDate && typeof event.startDate === "string") {
        try {
          const startDateTime = new Date(event.startDate);
          if (!isNaN(startDateTime.getTime())) {
            // Convert UTC to local timezone for display
            const localStartDate = new Date(
              startDateTime.getTime() -
                startDateTime.getTimezoneOffset() * 60000
            );
            startDate = localStartDate.toISOString().slice(0, 16);
          }
        } catch (e) {
          console.warn("Invalid start date format:", event.startDate);
        }
      }

      // If we have endDate but it's not in the right format, convert it
      if (event.endDate && typeof event.endDate === "string") {
        try {
          const endDateTime = new Date(event.endDate);
          if (!isNaN(endDateTime.getTime())) {
            // Convert UTC to local timezone for display
            const localEndDate = new Date(
              endDateTime.getTime() - endDateTime.getTimezoneOffset() * 60000
            );
            endDate = localEndDate.toISOString().slice(0, 16);
          }
        } catch (e) {
          console.warn("Invalid end date format:", event.endDate);
        }
      }

      return {
        ...event,
        startDate: startDate || "",
        endDate: endDate || "",
        organizerEmail: event.organizerEmail || "",
        date: undefined, // Remove old date field
      };
    });

    // Debug info removed

    setValue("upcomingEvents", convertedEvents);
    setValue("status", program.status);

    // Set thumbnail preview and clear form thumbnail field for editing
    if (program.thumbnail && program.thumbnail !== "null") {
      console.log("🖼️ Setting thumbnail preview for:", program.thumbnail);
      setThumbnailPreview(program.thumbnail);
      // Clear the form thumbnail field so user can upload new image
      setValue("thumbnail", null);
      console.log("🧹 Cleared form thumbnail field");
    } else {
      console.log("🖼️ No existing thumbnail found");
      setThumbnailPreview(null);
      setValue("thumbnail", null);
    }

    setShowModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    setCurrentProgram(null);
    reset({
      title: "",
      subtitle: "",
      videoUrl: "",
      thumbnail: null,
      duration: "",
      cardPoints: [""],
      learningSections: [{ title: "", content: "" }],
      upcomingEvents: [],
      status: "Open",
    });
    setThumbnailPreview(null);
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
      { title: "", content: "" },
    ]);

    // Trigger validation for new section
    setTimeout(() => {
      trigger(`learningSections.${currentSections.length}.title`);
      trigger(`learningSections.${currentSections.length}.content`);
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

  // Add a new upcoming event
  const addUpcomingEvent = () => {
    const currentEvents = watch("upcomingEvents") || [];
    setValue("upcomingEvents", [
      ...currentEvents,
      {
        startDate: "",
        endDate: "",
        eventName: "",
        location: "",
        organiser: "",
        organizerEmail: "",
        price: "",
        paymentLink: "",
      },
    ]);
  };

  // Remove an upcoming event
  const removeUpcomingEvent = (index) => {
    const currentEvents = watch("upcomingEvents") || [];
    if (currentEvents.length > 0) {
      const newEvents = [...currentEvents];
      newEvents.splice(index, 1);
      setValue("upcomingEvents", newEvents);
    }
  };

  // Handle thumbnail change
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(
        "📁 New thumbnail file selected:",
        file.name,
        "Type:",
        file.type
      );

      // Clear any existing thumbnail data and set new file
      setValue("thumbnail", file);

      // Create preview for UI using the new file
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("🖼️ Setting new thumbnail preview from uploaded file");
        setThumbnailPreview(reader.result); // This will be a data URL
      };
      reader.readAsDataURL(file);

      // Clear the file input to allow re-selection of the same file if needed
      e.target.value = "";
    }
  };

  // Remove thumbnail
  const removeThumbnail = () => {
    console.log("🗑️ Removing thumbnail - clearing form field and preview");
    setValue("thumbnail", null);
    setThumbnailPreview(null);

    // Also clear any file input elements
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = "";
    });

    console.log("🗑️ Thumbnail completely cleared");
  };

  useEffect(() => {
    const adminToken = Cookies.get("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

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
      {/* Custom CSS for lists and modal */}
      <style jsx>{`
        .prose ul {
          list-style-type: disc !important;
          margin-left: 20px !important;
          margin-top: 8px !important;
          margin-bottom: 8px !important;
        }
        .prose ol {
          list-style-type: decimal !important;
          margin-left: 20px !important;
          margin-top: 8px !important;
          margin-bottom: 8px !important;
        }
        .prose li {
          margin-bottom: 4px !important;
          padding-left: 4px !important;
        }
        .prose p {
          margin-bottom: 8px !important;
        }

        /* Modal z-index fixes */
        .modal-overlay {
          z-index: 9999 !important;
        }
        .modal-content {
          z-index: 10000 !important;
          position: relative;
        }
        .modal-header {
          z-index: 10001 !important;
          position: sticky;
          top: 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Ensure smooth scrolling in modal */
        .modal-content .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #6e2d79 #f3f4f6;
        }

        .modal-content .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .modal-content .overflow-y-auto::-webkit-scrollbar-track {
          background: #f3f4f6;
        }

        .modal-content .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #6e2d79;
          border-radius: 4px;
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#6E2D79]">
                Decode Events
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

                  {/* Display card points in collapsed view */}
                  {expandedProgram !== program._id && program.cardPoints && (
                    <div className="mt-3">
                      <div
                        className="prose max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(program.cardPoints)
                            ? program.cardPoints[0] || ""
                            : program.cardPoints || "",
                        }}
                      />
                    </div>
                  )}
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

                      {program.videoUrl && (
                        <div className="flex items-center">
                          <span className="bg-gray-100 text-[#6E2D79] p-2 rounded-lg mr-3">
                            <Video className="w-5 h-5" />
                          </span>
                          <p>
                            <span className="font-medium text-gray-700">
                              Video:
                            </span>{" "}
                            <a
                              href={program.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#6E2D79] hover:underline"
                            >
                              Watch video
                            </a>
                          </p>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center mb-2">
                          <span className="bg-gray-100 text-[#6E2D79] p-2 rounded-lg mr-3">
                            <List className="w-5 h-5" />
                          </span>
                          <p className="font-medium text-gray-700">
                            Learning Objectives:
                          </p>
                        </div>
                        <div className="ml-9 space-y-2">
                          {program.learningSections.map(
                            (section, sectionIdx) => (
                              <div key={sectionIdx} className="space-y-2">
                                <h5 className="font-semibold text-[#6E2D79]">
                                  {section.title}
                                </h5>
                                <div
                                  className="prose max-w-none text-gray-700 ml-4"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      section.content ||
                                      section.points
                                        ?.map((point) => `<li>${point}</li>`)
                                        .join("") ||
                                      "",
                                  }}
                                />
                              </div>
                            )
                          )}
                        </div>
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
                              <div className="flex flex-col space-y-1">
                                <span className="bg-gray-100 text-[#6E2D79] px-3 py-1 rounded-lg text-sm font-medium">
                                  {new Date(
                                    upcoming.startDate || upcoming.date
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                                {upcoming.startDate && upcoming.endDate && (
                                  <span className="text-xs text-gray-600">
                                    {new Date(
                                      upcoming.startDate
                                    ).toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}{" "}
                                    -{" "}
                                    {new Date(
                                      upcoming.endDate
                                    ).toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                )}
                              </div>
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
                              {upcoming.organizerEmail && (
                                <div className="flex items-center">
                                  <span className="text-[#6E2D79] mr-3">
                                    <User className="w-5 h-5" />
                                  </span>
                                  <p>
                                    <span className="font-medium text-gray-700">
                                      Organizer Email:
                                    </span>{" "}
                                    <a
                                      href={`mailto:${upcoming.organizerEmail}`}
                                      className="text-[#6E2D79] hover:text-[#5C2166] hover:underline"
                                    >
                                      {upcoming.organizerEmail}
                                    </a>
                                  </p>
                                </div>
                              )}
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
                No decode programs found
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 modal-overlay">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col modal-content">
              <div className="bg-[#6E2D79] text-white p-6 rounded-t-lg flex-shrink-0 modal-header">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {currentProgram
                      ? "Edit Decode Program"
                      : "Add New Decode Program"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-6 space-y-6"
                >
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
                            message: "Title must be at least 5 characters",
                          },
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.title ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Advanced Decode Certification"
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
                            message: "Subtitle must be at least 10 characters",
                          },
                        })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                          errors.subtitle ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Master the art of decoding consciousness"
                      />
                      {errors.subtitle && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.subtitle.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Video URL
                      </label>
                      <div className="relative">
                        <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...register("videoUrl", {
                            validate: validateVideoUrl,
                          })}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                            errors.videoUrl
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="https://youtube.com/watch?v=..."
                        />
                      </div>
                      {errors.videoUrl && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.videoUrl.message}
                        </p>
                      )}
                    </div>

                    {/* Thumbnail Section */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thumbnail Image
                      </label>

                      <div className="space-y-4">
                        {thumbnailPreview && (
                          <div className="relative inline-block">
                            <img
                              src={
                                thumbnailPreview.startsWith("http")
                                  ? thumbnailPreview
                                  : `${
                                      import.meta.env.VITE_API_Image_Url
                                    }${thumbnailPreview}`
                              }
                              alt="Thumbnail preview"
                              className="max-w-xs rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={removeThumbnail}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Image className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  {thumbnailPreview
                                    ? "Change thumbnail"
                                    : "Click to upload"}
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF (MAX. 5MB)
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleThumbnailChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Card Points Section */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Points (For Display) *
                      </label>
                      <RichTextEditor
                        value={watch("cardPoints.0") || ""}
                        onChange={(html) => {
                          setValue("cardPoints.0", html);
                          trigger("cardPoints.0");
                        }}
                        placeholder="Enter card points for display (you can create bullet points, numbered lists, etc.)"
                      />
                      {errors.cardPoints?.[0] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.cardPoints[0].message}
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
                            message: "Invalid duration format",
                          },
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
                                        message:
                                          "Title must be at least 3 characters",
                                      },
                                      validate: (value) =>
                                        validateSectionTitle(
                                          value,
                                          sectionIndex
                                        ),
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
                                onClick={() =>
                                  removeLearningSection(sectionIndex)
                                }
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
                                  Section Content *
                                </h4>
                              </div>

                              <div>
                                <RichTextEditor
                                  value={section.content || ""}
                                  onChange={(html) => {
                                    setValue(
                                      `learningSections.${sectionIndex}.content`,
                                      html
                                    );
                                    trigger(
                                      `learningSections.${sectionIndex}.content`
                                    );
                                  }}
                                  placeholder="Enter section content..."
                                />
                                {errors.learningSections?.[sectionIndex]
                                  ?.content && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {
                                      errors.learningSections[sectionIndex]
                                        .content.message
                                    }
                                  </p>
                                )}
                              </div>
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
                        Upcoming Events (Optional)
                      </h3>
                      <button
                        type="button"
                        onClick={addUpcomingEvent}
                        className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200"
                      >
                        Add Event
                      </button>
                    </div>

                    {watch("upcomingEvents")?.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">
                          No upcoming events scheduled
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Click "Add Event" to schedule an event for this
                          program
                        </p>
                      </div>
                    ) : (
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
                                disabled={watch("upcomingEvents")?.length === 0}
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Start Date & Time *
                                </label>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                  <input
                                    type="datetime-local"
                                    {...register(
                                      `upcomingEvents.${index}.startDate`,
                                      {
                                        required: false, // Not required by default
                                        validate: (value) =>
                                          validateEventStartDate(value, index),
                                      }
                                    )}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                      errors.upcomingEvents?.[index]?.startDate
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }`}
                                  />
                                </div>
                                {errors.upcomingEvents?.[index]?.startDate && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {
                                      errors.upcomingEvents[index].startDate
                                        .message
                                    }
                                  </p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  End Date & Time *
                                </label>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                  <input
                                    type="datetime-local"
                                    {...register(
                                      `upcomingEvents.${index}.endDate`,
                                      {
                                        required: false, // Not required by default
                                        validate: (value) =>
                                          validateEventEndDate(value, index),
                                      }
                                    )}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                      errors.upcomingEvents?.[index]?.endDate
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }`}
                                  />
                                </div>
                                {errors.upcomingEvents?.[index]?.endDate && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {
                                      errors.upcomingEvents[index].endDate
                                        .message
                                    }
                                  </p>
                                )}
                              </div>

                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Event Name *
                                </label>
                                <input
                                  {...register(
                                    `upcomingEvents.${index}.eventName`,
                                    {
                                      required: false, // Not required by default
                                      minLength: {
                                        value: 5,
                                        message:
                                          "Name must be at least 5 characters",
                                      },
                                      validate: (value) => {
                                        const event = watch(
                                          `upcomingEvents.${index}`
                                        );
                                        // If any other field has content, event name becomes required
                                        if (
                                          event.startDate ||
                                          event.endDate ||
                                          event.location ||
                                          event.organiser ||
                                          event.price ||
                                          event.paymentLink
                                        ) {
                                          if (
                                            !value ||
                                            value.trim().length < 5
                                          ) {
                                            return "Event name is required and must be at least 5 characters when adding an event";
                                          }
                                        }
                                        return true;
                                      },
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
                                        required: false, // Not required by default
                                        minLength: {
                                          value: 3,
                                          message:
                                            "Location must be at least 3 characters",
                                        },
                                        validate: (value) => {
                                          const event = watch(
                                            `upcomingEvents.${index}`
                                          );
                                          // If any other field has content, location becomes required
                                          if (
                                            event.startDate ||
                                            event.endDate ||
                                            event.eventName ||
                                            event.organiser ||
                                            event.price ||
                                            event.paymentLink
                                          ) {
                                            if (
                                              !value ||
                                              value.trim().length < 3
                                            ) {
                                              return "Location is required and must be at least 3 characters when adding an event";
                                            }
                                          }
                                          return true;
                                        },
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
                                  Facilitator (Optional)
                                </label>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                  <input
                                    {...register(
                                      `upcomingEvents.${index}.facilitator`,
                                      {
                                        required: false, // Not required by default
                                        minLength: {
                                          value: 3,
                                          message:
                                            "Organizer must be at least 3 characters",
                                        },
                                      }
                                    )}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                      errors.upcomingEvents?.[index]?.organiser
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }`}
                                    placeholder="Facilitator(Optional)"
                                  />
                                </div>
                                {errors.upcomingEvents?.[index]?.facilitator && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {
                                      errors.upcomingEvents[index].facilitator
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
                                        required: false, // Not required by default
                                        minLength: {
                                          value: 3,
                                          message:
                                            "Organizer must be at least 3 characters",
                                        },
                                        validate: (value) => {
                                          const event = watch(
                                            `upcomingEvents.${index}`
                                          );
                                          // If any other field has content, organizer becomes required
                                          if (
                                            event.startDate ||
                                            event.endDate ||
                                            event.eventName ||
                                            event.location ||
                                            event.price ||
                                            event.paymentLink
                                          ) {
                                            if (
                                              !value ||
                                              value.trim().length < 3
                                            ) {
                                              return "Organizer is required and must be at least 3 characters when adding an event";
                                            }
                                          }
                                          return true;
                                        },
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
                                  Organizer Email
                                </label>
                                <input
                                  type="email"
                                  {...register(
                                    `upcomingEvents.${index}.organizerEmail`,
                                    {
                                      validate: (value) =>
                                        validateOrganizerEmail(value, index),
                                    }
                                  )}
                                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]
                                      ?.organizerEmail
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                  placeholder="organizer@example.com"
                                />
                                {errors.upcomingEvents?.[index]
                                  ?.organizerEmail && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {
                                      errors.upcomingEvents[index]
                                        .organizerEmail.message
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
                                        required: false, // Not required by default
                                        validate: (value) => {
                                          const event = watch(
                                            `upcomingEvents.${index}`
                                          );
                                          // If any other field has content, price becomes required
                                          // if (event.startDate || event.endDate || event.eventName || event.location || event.organiser || event.paymentLink) {
                                          //   if (!value) {
                                          //     return "Price is required when adding an event";
                                          //   }
                                          //   return validatePrice(value, index);
                                          // }
                                          // return true;
                                        },
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
                                        required: false, // Not required by default
                                        validate: (value) => {
                                          const event = watch(
                                            `upcomingEvents.${index}`
                                          );
                                          // If any other field has content, payment link becomes required
                                          if (
                                            event.startDate ||
                                            event.endDate ||
                                            event.eventName ||
                                            event.location ||
                                            event.organiser ||
                                            event.price
                                          ) {
                                            if (!value) {
                                              return "Payment link is required when adding an event";
                                            }
                                            return validatePaymentLink(
                                              value,
                                              index
                                            );
                                          }
                                          return true;
                                        },
                                      }
                                    )}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                      errors.upcomingEvents?.[index]
                                        ?.paymentLink
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }`}
                                    placeholder="https://payment.example.com/decode1"
                                  />
                                </div>
                                {errors.upcomingEvents?.[index]
                                  ?.paymentLink && (
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
                    )}
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
                            {currentProgram
                              ? "Update Program"
                              : "Create Program"}
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 modal-overlay">
            <div className="bg-white rounded-lg max-w-md w-full modal-content">
              <div className="bg-red-600 text-white p-6 rounded-t-lg modal-header">
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

export default DecodeAdminPage;
