import React, { useState, useEffect } from "react";
import {
  Eye,
  Download,
  RefreshCw,
  AlertCircle,
  Search,
  Filter,
  X,
  ZoomIn,
  Calendar,
  Trash2,
} from "lucide-react";
import Layout from "../components/layout/Layout";

const IchRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [downloadDateRange, setDownloadDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
    nextPage: null,
    prevPage: null,
  });
  const itemsPerPage = 10;

  // Base URL for images
  const BASE_IMAGE_URL = "https://api.ekaausa.com/";

  // Fetch registration data with server-side pagination
  const fetchRegistrations = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL(`${import.meta.env.VITE_API_BASE_URL}ich`);
      url.searchParams.append("page", page);
      url.searchParams.append("limit", itemsPerPage);

      if (searchTerm) url.searchParams.append("search", searchTerm);

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setRegistrations(data.data);
        setPagination(data.pagination);
        setCurrentPage(data.pagination.currentPage);
      } else {
        throw new Error(data.message || "Failed to fetch registrations");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Format date with time
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // View registration details
  const viewDetails = (registration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  // View image in full screen
  const viewImage = (imagePath, title) => {
    setSelectedImage({ path: imagePath, title });
    setShowImageModal(true);
  };

  // Get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    const cleanPath = imagePath.replace(/\\/g, "/");
    return `${BASE_IMAGE_URL}${cleanPath}`;
  };

  // Handle CSV download
  const handleDownloadCSV = async () => {
    setIsDownloading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (downloadDateRange.startDate)
        params.append("startDate", downloadDateRange.startDate);
      if (downloadDateRange.endDate)
        params.append("endDate", downloadDateRange.endDate);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }ich/download-csv?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to download CSV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ich_registrations.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setShowDownloadModal(false);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };
  const handleDeleteRegistration = async () => {
    if (!registrationToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}ich/${registrationToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete registration");
      }

      const data = await response.json();
      if (data.success) {
        // Refresh the data after successful deletion
        fetchRegistrations(pagination.currentPage);
        setShowDeleteModal(false);
      } else {
        throw new Error(data.message || "Failed to delete registration");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(`Delete failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
          <span className="text-[#6E2D79] font-medium">
            Loading registrations...
          </span>
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
          onClick={fetchRegistrations}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
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
                ICH Registration Management
              </h1>
              <p className="text-gray-600 mt-1">
                Total Registrations: {pagination.totalRegistrations}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => fetchRegistrations()}
                disabled={loading}
                className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
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
                placeholder="Search by name, email, city, level, or phone..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  fetchRegistrations(1); // Reset to page 1 when searching
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowDownloadModal(true)}
                className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </button>

              <div className="flex items-center space-x-2 text-gray-600">
                <Filter className="w-5 h-5" />
                <span className="text-sm">
                  Showing {registrations.length} of{" "}
                  {pagination.totalRegistrations} records
                </span>
              </div>
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
                    Name
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden md:table-cell">
                    Email
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">
                    Location
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Level
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden sm:table-cell">
                    Mobile
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden xl:table-cell">
                    Registration Date
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registrations.map((registration, index) => (
                  <tr
                    key={registration._id}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-25"
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-[#5C2166]">
                        {registration.nameAsCertificate}
                      </div>
                      <div className="text-xs text-gray-500 md:hidden">
                        {registration.email}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden md:table-cell">
                      {registration.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">
                      {registration.city.split("|")[0].trim()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      <span className="bg-[#f0e6f2] text-[#6E2D79] px-2 py-1 rounded-full text-xs font-medium">
                        {registration.levelName.split(".")[0] ||
                          registration.level}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden sm:table-cell">
                      {registration.mobileNo}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden xl:table-cell">
                      {formatDateTime(registration.createdAt)}
                    </td>

                    <td className="px-4 py-4 text-center flex items-center space-x-2">
                      <button
                        onClick={() => viewDetails(registration)}
                        className="bg-[#6E2D79] text-white p-2 rounded-lg hover:bg-[#5C2166] transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setRegistrationToDelete(registration);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                        title="Delete Registration"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {registrations.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No registrations found
              </div>
              <p className="text-gray-400 mt-2">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-sm text-gray-700">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                {Math.min(
                  pagination.currentPage * pagination.limit,
                  pagination.total
                )}{" "}
                of {pagination.total} results
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fetchRegistrations(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (
                        pagination.currentPage >=
                        pagination.totalPages - 2
                      ) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => fetchRegistrations(pageNum)}
                          className={`px-3 py-2 rounded-lg ${
                            pagination.currentPage === pageNum
                              ? "bg-[#6E2D79] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  onClick={() => fetchRegistrations(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Download CSV Modal */}
        {showDownloadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Download Registrations</h2>
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#5C2166]">
                    Select Date Range
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={downloadDateRange.startDate}
                          onChange={(e) =>
                            setDownloadDateRange({
                              ...downloadDateRange,
                              startDate: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={downloadDateRange.endDate}
                          onChange={(e) =>
                            setDownloadDateRange({
                              ...downloadDateRange,
                              endDate: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Leave dates empty to download all records
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDownloadCSV}
                    disabled={isDownloading}
                    className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registration Details Modal */}
        {showModal && selectedRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    ICH Registration Details
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
                {/* ... (keep your existing modal content exactly the same) ... */}
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showModal && selectedRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    ICH Registration Details
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">
                      Personal Information
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {selectedRegistration.nameAsCertificate}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {selectedRegistration.email}
                      </p>
                      <p>
                        <span className="font-medium">Mobile:</span>{" "}
                        {selectedRegistration.mobileNo}
                      </p>
                      <p>
                        <span className="font-medium">Date of Birth:</span>{" "}
                        {formatDateTime(selectedRegistration.dob)}
                      </p>
                      <p>
                        <span className="font-medium">Occupation:</span>{" "}
                        {selectedRegistration.occupation}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">
                      Address Information
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Current Address:</span>{" "}
                        {selectedRegistration.currentAddress}
                      </p>
                      <p>
                        <span className="font-medium">Permanent Address:</span>{" "}
                        {selectedRegistration.permanenetAddress}
                      </p>
                      <p>
                        <span className="font-medium">City:</span>{" "}
                        {selectedRegistration.city.split("|")[0].trim()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">
                      Course Information
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Level:</span>{" "}
                        {selectedRegistration.levelName}
                      </p>
                      <p>
                        <span className="font-medium">Venue:</span>{" "}
                        {selectedRegistration.city.split("|")[1]?.trim() ||
                          selectedRegistration.city}
                      </p>
                      <p>
                        <span className="font-medium">Time:</span>{" "}
                        {selectedRegistration.city.split("|")[2]?.trim() ||
                          "Not specified"}
                      </p>
                      <p>
                        <span className="font-medium">Time Slot:</span>{" "}
                        {selectedRegistration.timeslot}
                      </p>
                      <p>
                        <span className="font-medium">Venue Detail:</span>{" "}
                        {selectedRegistration.courseDetailVenue}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">
                      Additional Information
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">
                          How did you hear about us:
                        </span>{" "}
                        {selectedRegistration.hearAbout}
                      </p>
                      <p>
                        <span className="font-medium">
                          Communication Preferences:
                        </span>{" "}
                        {selectedRegistration.communicationPreferences
                          ? "Yes"
                          : "No"}
                      </p>
                      <p>
                        <span className="font-medium">Terms Accepted:</span>{" "}
                        {selectedRegistration.termsandcondition ? "Yes" : "No"}
                      </p>
                      <p>
                        <span className="font-medium">Registration Date:</span>{" "}
                        {formatDateTime(selectedRegistration.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ID Photos Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">
                    ID Photos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Image */}
                    {selectedRegistration.profileImage && (
                      <div className="space-y-2">
                        <p className="font-medium text-sm">Profile Image:</p>
                        <div className="relative group">
                          <img
                            src={getImageUrl(selectedRegistration.profileImage)}
                            alt="Profile Image"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#6E2D79] transition-colors"
                            onClick={() =>
                              viewImage(
                                selectedRegistration.profileImage,
                                "Profile Image"
                              )
                            }
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-lg">
                            <ZoomIn className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ID Photo Front */}
                    {selectedRegistration.idPhotofront && (
                      <div className="space-y-2">
                        <p className="font-medium text-sm">ID Photo (Front):</p>
                        <div className="relative group">
                          <img
                            src={getImageUrl(selectedRegistration.idPhotofront)}
                            alt="ID Photo Front"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#6E2D79] transition-colors"
                            onClick={() =>
                              viewImage(
                                selectedRegistration.idPhotofront,
                                "ID Photo (Front)"
                              )
                            }
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+";
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-lg">
                            <ZoomIn className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    )}

                    {!selectedRegistration.profileImage &&
                      !selectedRegistration.idPhotofront && (
                        <div className="text-center py-8 text-gray-500 md:col-span-2">
                          <p>No images available</p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showDeleteModal && (
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
                    Are you sure you want to delete the registration for{" "}
                    <span className="font-semibold">
                      {registrationToDelete?.nameAsCertificate}
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
                    onClick={handleDeleteRegistration}
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

export default IchRegistration;
