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
  Image as ImageIcon,
  Video,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import hypnotherapyService from "../../components/services/hypnotherapyService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../../components/utils/RichTextEditor";


const HypnotherapyPage = () => {
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
  const [thumbnailFile, setThumbnailFile] = useState(null);

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
    return sections[sectionIndex].title.trim() !== "" || "Section title is required";
  };
  
  const validateSectionContent = (value, sectionIndex) => {
    const sections = watch("learningSections");
    return sections[sectionIndex].content.trim() !== "" || "Content is required";
  };

  const validateCardPoint = (value) => {
    const cardPoint = watch("cardPoints.0");
    // Remove HTML tags and check if content exists
    const textContent = cardPoint?.replace(/<[^>]*>/g, '').trim();
    return textContent !== "" || "Card point is required";
  };

  const validateEventStartDate = (value, eventIndex) => {
    const events = watch("upcomingEvents");
    const event = events[eventIndex];
    
    // If any other field in this event has content, start date becomes required
    if (event.eventName || event.location || event.organiser || event.price || event.paymentLink || event.endDate) {
      return value.trim() !== "" || "Start date and time is required when adding an event";
    }
    
    // If no other fields have content, start date is optional
    return true;
  };

  const validateEventEndDate = (value, eventIndex) => {
    const events = watch("upcomingEvents");
    const event = events[eventIndex];
    
    // If any other field in this event has content, end date becomes required
    if (event.startDate || event.eventName || event.location || event.organiser || event.price || event.paymentLink) {
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
    return !!(event.startDate || event.endDate || event.eventName || event.location || event.organiser || event.price || event.paymentLink);
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

  const validateVideoUrl = (value) => {
    if (!value) return true; // Optional field
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

  // Handle thumbnail file change
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Create FormData if we have a thumbnail file
      let formData;
      if (thumbnailFile) {
        formData = new FormData();
        formData.append('thumbnail', thumbnailFile);
        
        // Append all other fields
        Object.keys(data).forEach(key => {
          if (key !== 'thumbnail') {
            if (Array.isArray(data[key])) {
              if (key === 'upcomingEvents') {
                // Filter out empty events before sending
                const filteredEvents = data[key].filter(event => hasEventContent(event));
                formData.append(key, JSON.stringify(filteredEvents));
              } else if (key === 'cardPoints') {
                // For cardPoints, we need to handle HTML content properly
                formData.append(key, JSON.stringify(data[key]));
              } else {
                formData.append(key, JSON.stringify(data[key]));
              }
            } else {
              formData.append(key, data[key]);
            }
          }
        });
      }

      // Filter out empty events if no thumbnail file
      if (!thumbnailFile && data.upcomingEvents) {
        data.upcomingEvents = data.upcomingEvents.filter(event => hasEventContent(event));
      }

      if (currentProgram) {
        const updateData = thumbnailFile ? formData : data;
        await hypnotherapyService.updateProgram(currentProgram._id, updateData, thumbnailFile ? true : false);
        toast.success("Program updated successfully");
      } else {
        const createData = thumbnailFile ? formData : data;
        await hypnotherapyService.createProgram(createData, thumbnailFile ? true : false);
        toast.success("Program created successfully");
      }
      
      fetchPrograms();
      reset();
      setThumbnailPreview(null);
      setThumbnailFile(null);
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
    try {
      console.log("=== openEditModal called ===");
      console.log("Program data:", program);
      console.log("Current showModal state:", showModal);
      console.log("Current currentProgram state:", currentProgram);
      
      // Set current program first
      setCurrentProgram(program);
      console.log("setCurrentProgram called");
      
      // Set basic form values with error handling
      try {
        setValue("title", program.title || "");
        setValue("subtitle", program.subtitle || "");
        setValue("videoUrl", program.videoUrl || "");
        setValue("duration", program.duration || "");
        setValue("status", program.status || "Open");
      } catch (error) {
        console.error("Error setting basic form values:", error);
      }
      
      // Handle card points with error handling
      try {
        if (Array.isArray(program.cardPoints) && program.cardPoints.length > 0) {
          const cardPointsHtml = program.cardPoints.map(point => `<li>${point}</li>`).join('');
          setValue("cardPoints", [`<ul>${cardPointsHtml}</ul>`]);
        } else {
          setValue("cardPoints", [""]);
        }
      } catch (error) {
        console.error("Error setting card points:", error);
        setValue("cardPoints", [""]);
      }
      
      // Handle learning sections with error handling
      try {
        const convertedSections = program.learningSections?.map(section => {
          if (section.points && Array.isArray(section.points)) {
            return {
              title: section.title || "",
              content: `<ul>${section.points.map(point => `<li>${point}</li>`).join('')}</ul>`
            };
          }
          return {
            title: section.title || "",
            content: section.content || ""
          };
        }) || [{ title: "", content: "" }];
        
        setValue("learningSections", convertedSections);
      } catch (error) {
        console.error("Error setting learning sections:", error);
        setValue("learningSections", [{ title: "", content: "" }]);
      }
      
      // Handle upcoming events with error handling
      try {
        const convertedEvents = program.upcomingEvents?.map(event => {
          console.log("Processing event:", event);
          
          // If event already has startDate and endDate, convert them to datetime-local format
          if (event.startDate && event.endDate) {
            try {
              console.log("Event has startDate/endDate:", event.startDate, event.endDate);
              
              // Convert to datetime-local format (YYYY-MM-DDTHH:MM)
              const startDate = new Date(event.startDate);
              const endDate = new Date(event.endDate);
              
              const formattedStartDate = startDate.toISOString().slice(0, 16);
              const formattedEndDate = endDate.toISOString().slice(0, 16);
              
              console.log("Formatted dates:", formattedStartDate, formattedEndDate);
              
              return {
                ...event,
                startDate: formattedStartDate,
                endDate: formattedEndDate
              };
            } catch (dateError) {
              console.error("Error formatting existing dates:", dateError);
              return {
                ...event,
                startDate: "",
                endDate: ""
              };
            }
          }
          
          // If event has old date format, convert it
          if (event.date && !event.startDate) {
            try {
              console.log("Converting old date format:", event.date);
              const eventDate = new Date(event.date);
              const endDate = new Date(eventDate);
              endDate.setHours(eventDate.getHours() + 2);
              
              const formattedStartDate = eventDate.toISOString().slice(0, 16);
              const formattedEndDate = endDate.toISOString().slice(0, 16);
              
              console.log("Converted old format dates:", formattedStartDate, formattedEndDate);
              
              const convertedEvent = {
                ...event,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                date: undefined
              };
              console.log("Converted event:", convertedEvent);
              return convertedEvent;
            } catch (dateError) {
              console.error("Error converting date:", dateError);
              return {
                ...event,
                startDate: "",
                endDate: ""
              };
            }
          }
          
          // If event has no dates, create empty ones
          if (!event.startDate && !event.endDate && !event.date) {
            console.log("Event has no dates, creating empty ones");
            return {
              ...event,
              startDate: "",
              endDate: ""
            };
          }
          
          // If event has partial dates, ensure both are set
          if (event.startDate && !event.endDate) {
            try {
              const startDate = new Date(event.startDate);
              const endDate = new Date(startDate);
              endDate.setHours(startDate.getHours() + 2);
              
              return {
                ...event,
                startDate: startDate.toISOString().slice(0, 16),
                endDate: endDate.toISOString().slice(0, 16)
              };
            } catch (dateError) {
              console.error("Error handling partial dates:", dateError);
              return {
                ...event,
                startDate: "",
                endDate: ""
              };
            }
          }
          
          return event;
        }) || [];
        
        console.log("Final converted events:", convertedEvents);
        setValue("upcomingEvents", convertedEvents);
        
        // Debug: Check what was actually set in the form
        setTimeout(() => {
          const formEvents = watch("upcomingEvents");
          console.log("Form events after setValue:", formEvents);
          console.log("Form events startDate values:", formEvents?.map(e => e.startDate));
          console.log("Form events endDate values:", formEvents?.map(e => e.endDate));
        }, 100);
      } catch (error) {
        console.error("Error setting upcoming events:", error);
        setValue("upcomingEvents", []);
      }
      
      // Handle thumbnail with error handling
      try {
        if (program.thumbnail) {
          setThumbnailPreview(getThumbnailUrl(program.thumbnail));
        } else {
          setThumbnailPreview(null);
        }
      } catch (error) {
        console.error("Error setting thumbnail:", error);
        setThumbnailPreview(null);
      }
      
      console.log("About to set showModal to true");
      setShowModal(true);
      console.log("setShowModal(true) called");
      
      // Check state after a short delay
      setTimeout(() => {
        console.log("After timeout - showModal should be true");
        console.log("Current showModal state:", showModal);
      }, 100);
      
    } catch (error) {
      console.error("Critical error in openEditModal:", error);
      // Even if there's an error, try to open the modal with basic data
      setCurrentProgram(program);
      setShowModal(true);
    }
  };

  // Open add modal
  const openAddModal = () => {
    setCurrentProgram(null);
    reset({
      title: "",
      subtitle: "",
      duration: "",
      videoUrl: "",
      thumbnail: "",
      cardPoints: [""],
      learningSections: [{ title: "", content: "" }],
      upcomingEvents: [],
      status: "Open",
    });
    setThumbnailPreview(null);
    setThumbnailFile(null);
    setShowModal(true);
  };

  // Toggle program expansion
  const toggleExpand = (id) => {
    setExpandedProgram(expandedProgram === id ? null : id);
  };

  // Helper function to strip HTML tags
  const stripHtmlTags = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, '').trim();
  };

  // Helper function to get thumbnail URL
  const getThumbnailUrl = (thumbnail) => {
    if (!thumbnail) return null;
    return `https://api.ekaausa.com/uploads/${thumbnail}`;
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

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  // Monitor modal state changes for debugging
  useEffect(() => {
    console.log("Modal state changed - showModal:", showModal);
    console.log("Current program:", currentProgram);
  }, [showModal, currentProgram]);

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
      `}</style>
      
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
                <div className="flex items-start space-x-4">
                  {program.thumbnail && (
                    <div className="flex-shrink-0">
                      <img
                        src={`https://api.ekaausa.com/uploads/${program.thumbnail}`}
                        alt="Program thumbnail"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                  )}
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
                              ? program.cardPoints[0] || '' 
                              : program.cardPoints || '' 
                          }} 
                        />
                      </div>
                    )}
                  </div>
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
                      
                      {/* Video URL */}
                      {program.videoUrl && (
                        <div className="flex items-center">
                          <span className="bg-gray-100 text-[#6E2D79] p-2 rounded-lg mr-3">
                            <Video className="w-5 h-5" />
                          </span>
                          <p>
                            <span className="font-medium text-gray-700">
                              Video URL:
                            </span>{" "}
                            <a
                              href={program.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#6E2D79] hover:underline"
                            >
                              Watch Video
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
                        <div className="ml-9 space-y-4">
                          {program.learningSections.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                              <h5 className="font-semibold text-[#6E2D79] mb-2">
                                {section.title}
                              </h5>
                              <div 
                                className="prose max-w-none text-gray-700"
                                dangerouslySetInnerHTML={{ __html: section.content }} 
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Card Points Display */}
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="bg-gray-100 text-[#6E2D79] p-2 rounded-lg mr-3">
                            <Check className="w-5 h-5" />
                          </span>
                          <p className="font-medium text-gray-700">
                            Key Points:
                          </p>
                        </div>
                        <div className="ml-9 space-y-3">
                          {program.cardPoints.map((point, pointIdx) => {
                            console.log(`Card Point ${pointIdx}:`, point);
                            console.log(`Card Point ${pointIdx} HTML:`, point);
                            return (
                              <div key={pointIdx} className="bg-gray-50 p-3 rounded-lg">
                                                              <div 
                                className="prose max-w-none text-gray-700"
                                style={{
                                  lineHeight: '1.6'
                                }}
                                dangerouslySetInnerHTML={{ __html: point }} 
                              />
                              </div>
                            );
                          })}
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
                                   {new Date(upcoming.startDate).toLocaleDateString('en-US', { 
                                     month: 'short', 
                                     day: 'numeric', 
                                     year: 'numeric' 
                                   })}
                                 </span>
                                 <span className="text-xs text-gray-600">
                                   {new Date(upcoming.startDate).toLocaleTimeString('en-US', { 
                                     hour: '2-digit', 
                                     minute: '2-digit' 
                                   })} - {new Date(upcoming.endDate).toLocaleTimeString('en-US', { 
                                     hour: '2-digit', 
                                     minute: '2-digit' 
                                   })}
                                 </span>
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
                      onClick={() => {
                        console.log("=== Edit button clicked ===");
                        console.log("Program being edited:", program);
                        console.log("Program ID:", program._id);
                        console.log("Program title:", program.title);
                        console.log("About to call openEditModal");
                        openEditModal(program);
                        console.log("openEditModal called");
                      }}
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
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="bg-[#6E2D79] text-white p-6 rounded-t-lg flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {currentProgram
                      ? "Edit Hypnotherapy Program"
                      : "Add New Hypnotherapy Program"}
                  </h2>
                  <button
                    onClick={() => {
                      console.log("Closing modal");
                      setShowModal(false);
                    }}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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

                    {/* Video URL */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Video URL (Optional)
                      </label>
                      <div className="relative">
                        <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          {...register("videoUrl", {
                            validate: validateVideoUrl
                          })}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                            errors.videoUrl ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="https://youtube.com/example"
                        />
                      </div>
                      {errors.videoUrl && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.videoUrl.message}
                        </p>
                      )}
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thumbnail Image
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <label className="cursor-pointer">
                            <div className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                              <ImageIcon className="w-5 h-5" />
                              <span>Choose File</span>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleThumbnailChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {thumbnailPreview && (
                          <div className="flex-shrink-0">
                            <img
                              src={thumbnailPreview}
                              alt="Thumbnail preview"
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        {!thumbnailPreview && currentProgram?.thumbnail && (
                          <div className="flex-shrink-0">
                            <img
                              src={`https://api.ekaausa.com/uploads/${currentProgram.thumbnail}`}
                              alt="Current thumbnail"
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Upload a thumbnail image for this program (optional)
                      </p>
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

                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Content *
                              </label>
                              <RichTextEditor
                                value={section.content || ""}
                                onChange={(html) => {
                                  setValue(`learningSections.${sectionIndex}.content`, html);
                                  trigger(`learningSections.${sectionIndex}.content`);
                                }}
                                placeholder="Enter section content..."
                              />
                              {errors.learningSections?.[sectionIndex]?.content && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.learningSections[sectionIndex].content.message}
                                </p>
                              )}
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
                          Click "Add Event" to schedule an event for this program
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
                                  {...register(`upcomingEvents.${index}.startDate`, {
                                    required: false, // Not required by default
                                    validate: (value) => 
                                      validateEventStartDate(value, index)
                                  })}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.startDate
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                />
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Debug: {watch(`upcomingEvents.${index}.startDate`) || 'No value'}
                              </div>
                              {errors.upcomingEvents?.[index]?.startDate && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.upcomingEvents[index].startDate.message}
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
                                  {...register(`upcomingEvents.${index}.endDate`, {
                                    required: false, // Not required by default
                                    validate: (value) => 
                                      validateEventEndDate(value, index)
                                  })}
                                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none ${
                                    errors.upcomingEvents?.[index]?.endDate
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                />
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Debug: {watch(`upcomingEvents.${index}.endDate`) || 'No value'}
                              </div>
                              {errors.upcomingEvents?.[index]?.endDate && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.upcomingEvents[index].endDate.message}
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
                                        message: "Name must be at least 5 characters"
                                      },
                                      validate: (value) => {
                                        const event = watch(`upcomingEvents.${index}`);
                                        // If any other field has content, event name becomes required
                                        if (event.startDate || event.endDate || event.location || event.organiser || event.price || event.paymentLink) {
                                          if (!value || value.trim().length < 5) {
                                            return "Event name is required and must be at least 5 characters when adding an event";
                                          }
                                        }
                                        return true;
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
                                      required: false, // Not required by default
                                      minLength: {
                                        value: 3,
                                        message: "Location must be at least 3 characters"
                                      },
                                      validate: (value) => {
                                        const event = watch(`upcomingEvents.${index}`);
                                        // If any other field has content, location becomes required
                                        if (event.startDate || event.endDate || event.eventName || event.organiser || event.price || event.paymentLink) {
                                          if (!value || value.trim().length < 3) {
                                            return "Location is required and must be at least 3 characters when adding an event";
                                          }
                                        }
                                        return true;
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
                                      required: false, // Not required by default
                                      minLength: {
                                        value: 3,
                                        message: "Organizer must be at least 3 characters"
                                      },
                                      validate: (value) => {
                                        const event = watch(`upcomingEvents.${index}`);
                                        // If any other field has content, organizer becomes required
                                        if (event.startDate || event.endDate || event.eventName || event.location || event.price || event.paymentLink) {
                                          if (!value || value.trim().length < 3) {
                                            return "Organizer is required and must be at least 3 characters when adding an event";
                                          }
                                        }
                                        return true;
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
                                      required: false, // Not required by default
                                      validate: (value) => {
                                        const event = watch(`upcomingEvents.${index}`);
                                        // If any other field has content, price becomes required
                                        if (event.startDate || event.endDate || event.eventName || event.location || event.organiser || event.paymentLink) {
                                          if (!value) {
                                            return "Price is required when adding an event";
                                          }
                                          return validatePrice(value, index);
                                        }
                                        return true;
                                      }
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
                                        const event = watch(`upcomingEvents.${index}`);
                                        // If any other field has content, payment link becomes required
                                        if (event.startDate || event.endDate || event.eventName || event.location || event.organiser || event.price) {
                                          if (!value) {
                                            return "Payment link is required when adding an event";
                                          }
                                          return validatePaymentLink(value, index);
                                        }
                                        return true;
                                      }
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

export default HypnotherapyPage;