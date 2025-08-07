import React, { useState, useEffect } from "react";
import {
  Eye,
  Download,
  RefreshCw,
  AlertCircle,
  Search,
  Filter,
  X,
  Trash2,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const FamilyConsultationTable = () => {
  const navigate = useNavigate(); // Added for redirection
  const [authChecked, setAuthChecked] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadStartDate, setDownloadStartDate] = useState("");
  const [downloadEndDate, setDownloadEndDate] = useState("");
  const [consultationToDelete, setConsultationToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRegistrations: 0,
  });

  const fetchConsultations = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL(
        `${import.meta.env.VITE_API_BASE_URL}familyConsitalation`
      );
      url.searchParams.append("page", page);
      url.searchParams.append("limit", itemsPerPage);

      // Add search and date filters if they exist
      if (searchTerm) url.searchParams.append("search", searchTerm);
      if (startDate) url.searchParams.append("startDate", startDate);
      if (endDate) url.searchParams.append("endDate", endDate);

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setConsultations(data.data);
        setPagination(data.pagination);
        setCurrentPage(data.pagination.currentPage);
      } else {
        throw new Error(data.message || "Failed to fetch consultations");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
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

  // View consultation details
  const viewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setShowModal(true);
  };

  // Handle download initiation
  const handleDownloadInitiate = () => {
    setShowDownloadModal(true);
  };

  // Handle actual download
  const handleDownloadCSV = async () => {
    try {
      const params = new URLSearchParams();
      if (downloadStartDate) params.append("startDate", downloadStartDate);
      if (downloadEndDate) params.append("endDate", downloadEndDate);
      if (searchTerm) params.append("search", searchTerm);

      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }familyConsitalation/download-csv?${params.toString()}`;

      const a = document.createElement("a");
      a.href = url;
      a.download = "family_consultation_registrations.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setShowDownloadModal(false);
    } catch (error) {
      console.error("Download error:", error);
      setError(`Download failed: ${error.message}`);
    }
  };
  // Add this function near your other handler functions
  const handleDeleteConsultation = async () => {
    if (!consultationToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}familyConsitalation/${
          consultationToDelete._id
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete consultation");
      }

      const data = await response.json();
      if (data.success) {
        // Refresh the data after successful deletion
        fetchConsultations(pagination.currentPage);
        setShowDeleteModal(false);
      } else {
        throw new Error(data.message || "Failed to delete consultation");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(`Delete failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };
  // Clear filters
  const clearDateFilters = () => {
    setStartDate("");
    setEndDate("");
    setShowDateFilter(false);
    fetchConsultations(1);
  };

  const clearDownloadDateFilters = () => {
    setDownloadStartDate("");
    setDownloadEndDate("");
  };
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
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
          <span className="text-[#6E2D79] font-medium">
            Loading consultations...
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
          onClick={fetchConsultations}
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
                Family Consultation Management
              </h1>
              <p className="text-gray-600 mt-1">
                Total Consultations: {pagination.totalRegistrations}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadInitiate}
                disabled={pagination.totalRegistrations === 0}
                className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </button>

              <button
                onClick={() => setShowDateFilter(!showDateFilter)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  showDateFilter || startDate || endDate
                    ? "bg-[#5C2166] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Date Filter</span>
              </button>

              <button
                onClick={() => fetchConsultations()}
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
                placeholder="Search by name, email, location, event, or phone..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  fetchConsultations(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="w-5 h-5" />
              <span className="text-sm">
                Showing {consultations.length} of{" "}
                {pagination.totalRegistrations} records
              </span>
            </div>
          </div>

          {/* Date Filter Panel */}
          {showDateFilter && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    fetchConsultations(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    fetchConsultations(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                onClick={clearDateFilters}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Clear Dates</span>
              </button>
            </div>
          )}
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
                    Event
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden sm:table-cell">
                    Phone
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
                {consultations.map((consultation) => (
                  <tr key={consultation._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-[#5C2166]">
                        {consultation.fullName}
                      </div>
                      <div className="text-xs text-gray-500 md:hidden">
                        {consultation.email}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden md:table-cell">
                      {consultation.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">
                      {consultation.location}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      <span className="bg-[#f0e6f2] text-[#6E2D79] px-2 py-1 rounded-full text-xs font-medium">
                        {consultation.event}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden sm:table-cell">
                      {consultation.phone}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden xl:table-cell">
                      {formatDateTime(consultation.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-center flex items-center space-x-2">
                      <button
                        onClick={() => viewDetails(consultation)}
                        className="bg-[#6E2D79] text-white p-2 rounded-lg hover:bg-[#5C2166] transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setConsultationToDelete(consultation);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                        title="Delete Consultation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {consultations.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  No consultations found
                </div>
                <p className="text-gray-400 mt-2">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-sm text-gray-700">
                Showing {(pagination.currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(
                  pagination.currentPage * itemsPerPage,
                  pagination.totalRegistrations
                )}{" "}
                of {pagination.totalRegistrations} results
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fetchConsultations(pagination.currentPage - 1)}
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
                          onClick={() => fetchConsultations(pageNum)}
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
                  onClick={() => fetchConsultations(pagination.currentPage + 1)}
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
              <div className="bg-[#6E2D79] text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Select Date Range</h2>
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={downloadStartDate}
                      onChange={(e) => setDownloadStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={downloadEndDate}
                      onChange={(e) => setDownloadEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={clearDownloadDateFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear Dates</span>
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowDownloadModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDownloadCSV}
                      className="px-4 py-2 bg-[#6E2D79] text-white rounded-lg hover:bg-[#5C2166]"
                    >
                      Download CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consultation Details Modal */}
        {showModal && selectedConsultation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Consultation Details</h2>
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
                        <span className="font-medium">Full Name:</span>{" "}
                        {selectedConsultation.fullName}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {selectedConsultation.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {selectedConsultation.phone}
                      </p>
                      <p>
                        <span className="font-medium">Location:</span>{" "}
                        {selectedConsultation.location}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">
                      Event Information
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Event:</span>{" "}
                        {selectedConsultation.event}
                      </p>
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {selectedConsultation.date}
                      </p>
                      <p>
                        <span className="font-medium">Organized By:</span>{" "}
                        {selectedConsultation.organisedBy}
                      </p>
                      <p>
                        <span className="font-medium">Organizer Email:</span>{" "}
                        {selectedConsultation.organiserEmail}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">
                      Administrative Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <p>
                        <span className="font-medium">Session ID:</span>{" "}
                        {selectedConsultation.sessionId}
                      </p>
                      <p>
                        <span className="font-medium">Registration Date:</span>{" "}
                        {formatDateTime(selectedConsultation.createdAt)}
                      </p>
                    </div>
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
                    Are you sure you want to delete the consultation for{" "}
                    <span className="font-semibold">
                      {consultationToDelete?.fullName}
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
                    onClick={handleDeleteConsultation}
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

export default FamilyConsultationTable;
