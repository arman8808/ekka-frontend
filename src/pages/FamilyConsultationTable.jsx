import React, { useState, useEffect } from 'react';
import { Eye, Download, RefreshCw, AlertCircle, Search, Filter, X } from 'lucide-react';
import Layout from '../components/layout/Layout';

const FamilyConsultationTable = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;

  // Fetch consultation data
  const fetchConsultations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 100000);
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}familyConsitalation`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setConsultations(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch consultations');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timeout. Please check your connection and try again.');
      } else if (err.message.includes('Failed to fetch')) {
        setError('Network error. Please check if the server is running.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  // Filter consultations based on search term - FIXED TO MATCH ACTUAL DATA STRUCTURE
  const filteredConsultations = consultations.filter(consultation => {
    const fullName = consultation.fullName || '';
    const email = consultation.email || '';
    const location = consultation.location || '';
    const event = consultation.event || '';
    const phone = consultation.phone || '';
    
    const searchLower = searchTerm.toLowerCase();
    
    return (
      fullName.toLowerCase().includes(searchLower) ||
      email.toLowerCase().includes(searchLower) ||
      location.toLowerCase().includes(searchLower) ||
      event.toLowerCase().includes(searchLower) ||
      phone.includes(searchTerm) // Numbers don't need toLowerCase
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredConsultations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentConsultations = filteredConsultations.slice(startIndex, endIndex);

  // Format date with time
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format event date
  const formatEventDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // View consultation details
  const viewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
          <span className="text-[#6E2D79] font-medium">Loading consultations...</span>
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

  return (
    <>
      <Layout>
        <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#6E2D79]">Family Consultation Management</h1>
                <p className="text-gray-600 mt-1">Total Consultations: {consultations.length}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={fetchConsultations}
                  disabled={loading}
                  className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
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
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                />
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Filter className="w-5 h-5" />
                <span className="text-sm">Found: {filteredConsultations.length} results</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#6E2D79] text-white">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold hidden md:table-cell">Email</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Location</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold">Event</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold hidden sm:table-cell">Phone</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold hidden xl:table-cell">Registration Date</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentConsultations.map((consultation, index) => (
                    <tr key={consultation._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
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
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => viewDetails(consultation)}
                          className="bg-[#6E2D79] text-white p-2 rounded-lg hover:bg-[#5C2166] transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredConsultations.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No consultations found</div>
                <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredConsultations.length)} of {filteredConsultations.length} results
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 rounded-lg ${
                            currentPage === pageNum
                              ? 'bg-[#6E2D79] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal for Consultation Details */}
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
                      <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Personal Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Full Name:</span> {selectedConsultation.fullName}</p>
                        <p><span className="font-medium">Email:</span> {selectedConsultation.email}</p>
                        <p><span className="font-medium">Phone:</span> {selectedConsultation.phone}</p>
                        <p><span className="font-medium">Location:</span> {selectedConsultation.location}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Event Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Event:</span> {selectedConsultation.event}</p>
                        <p><span className="font-medium">Date:</span> {selectedConsultation.date}</p>
                        <p><span className="font-medium">Organized By:</span> {selectedConsultation.organisedBy}</p>
                        <p><span className="font-medium">Organizer Email:</span> {selectedConsultation.organiserEmail}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 md:col-span-2">
                      <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Administrative Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><span className="font-medium">Session ID:</span> {selectedConsultation.sessionId}</p>
                        <p><span className="font-medium">Registration Date:</span> {formatDateTime(selectedConsultation.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default FamilyConsultationTable;