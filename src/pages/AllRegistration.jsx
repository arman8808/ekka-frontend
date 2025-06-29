// import React, { useState, useEffect } from 'react';
// import { Eye, Download, RefreshCw, AlertCircle, Search, Filter } from 'lucide-react';
// import Layout from '../components/layout/Layout';

// const AllRegistration = () => {
//   const [registrations, setRegistrations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRegistration, setSelectedRegistration] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const itemsPerPage = 10;

//   // Fetch registration data
//   const fetchRegistrations = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 100000);
      
//       const response = await fetch('http://localhost:5000/api/registration', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         signal: controller.signal
//       });

//       clearTimeout(timeoutId);

//       if (!response.ok) {
//         throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
//       }

//       const data = await response.json();

//       if (data.success) {
//         setRegistrations(data.data);
//       } else {
//         throw new Error(data.message || 'Failed to fetch registrations');
//       }
//     } catch (err) {
//       if (err.name === 'AbortError') {
//         setError('Request timeout. Please check your connection and try again.');
//       } else if (err.message.includes('Failed to fetch')) {
//         setError('Network error. Please check if the server is running.');
//       } else {
//         setError(`Error: ${err.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRegistrations();
//   }, []);

//   // Filter registrations based on search term
//   const filteredRegistrations = registrations.filter(reg =>
//     reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     reg.levelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     reg.city.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination
//   const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentRegistrations = filteredRegistrations.slice(startIndex, endIndex);

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // View registration details
//   const viewDetails = (registration) => {
//     setSelectedRegistration(registration);
//     setShowModal(true);
//   };

//   // Export to CSV
//   const exportToCSV = () => {
//     const headers = Object.keys(registrations[0] || {}).join(',');
//     const csvContent = registrations.map(row => 
//       Object.values(row).map(value => 
//         typeof value === 'string' && value.includes(',') ? `"${value}"` : value
//       ).join(',')
//     ).join('\n');
    
//     const blob = new Blob([headers + '\n' + csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'registrations.csv';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-64">
//         <div className="flex items-center space-x-2">
//           <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
//           <span className="text-[#6E2D79] font-medium">Loading registrations...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//         <div className="flex items-center space-x-2 mb-4">
//           <AlertCircle className="w-6 h-6 text-red-600" />
//           <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
//         </div>
//         <p className="text-red-700 mb-4">{error}</p>
//         <button
//           onClick={fetchRegistrations}
//           className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
//         >
//           <RefreshCw className="w-4 h-4" />
//           <span>Retry</span>
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//     <Layout>
//     <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//           <div>
//             <h1 className="text-2xl lg:text-3xl font-bold text-[#6E2D79]">Registration Management</h1>
//             <p className="text-gray-600 mt-1">Total Registrations: {registrations.length}</p>
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={fetchRegistrations}
//               disabled={loading}
//               className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
//             >
//               <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//               <span>Refresh</span>
//             </button>
            
//             {/* <button
//               onClick={exportToCSV}
//               disabled={registrations.length === 0}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
//             >
//               <Download className="w-4 h-4" />
//               <span>Export CSV</span>
//             </button> */}
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name, email, city, or level..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
//             />
//           </div>
          
//           <div className="flex items-center space-x-2 text-gray-600">
//             <Filter className="w-5 h-5" />
//             <span className="text-sm">Found: {filteredRegistrations.length} results</span>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#6E2D79] text-white">
//               <tr>
//                 <th className="px-4 py-4 text-left text-sm font-semibold">Name</th>
//                 <th className="px-4 py-4 text-left text-sm font-semibold hidden md:table-cell">Email</th>
//                 <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">City</th>
//                 <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Level</th>
//                 <th className="px-4 py-4 text-left text-sm font-semibold hidden sm:table-cell">Mobile</th>
//                 <th className="px-4 py-4 text-left text-sm font-semibold hidden xl:table-cell">Registration Date</th>
//                 <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {currentRegistrations.map((registration, index) => (
//                 <tr key={registration._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
//                   <td className="px-4 py-4">
//                     <div className="text-sm font-medium text-[#5C2166]">
//                       {registration.firstName} {registration.lastName}
//                     </div>
//                     <div className="text-xs text-gray-500 md:hidden">
//                       {registration.email}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-900 hidden md:table-cell">
//                     {registration.email}
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">
//                     {registration.city}
//                   </td>
//                   <td className=" text-sm text-gray-900 hidden lg:table-cell">
//                     <span className="bg-opacity-10 text-[#6E2D79] px-2 py-1 rounded-full text-xs font-medium">
//                       {registration.levelName}
//                     </span>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-900 hidden sm:table-cell">
//                     {registration.mobileNo}
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-900 hidden xl:table-cell">
//                     {formatDate(registration.createdAt)}
//                   </td>
//                   <td className="px-4 py-4 text-center">
//                     <button
//                       onClick={() => viewDetails(registration)}
//                       className="bg-[#6E2D79] text-white p-2 rounded-lg hover:bg-[#5C2166] transition-colors"
//                       title="View Details"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredRegistrations.length === 0 && !loading && (
//           <div className="text-center py-12">
//             <div className="text-gray-500 text-lg">No registrations found</div>
//             <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="bg-white rounded-lg shadow-lg p-4">
//           <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
//             <div className="text-sm text-gray-700">
//               Showing {startIndex + 1} to {Math.min(endIndex, filteredRegistrations.length)} of {filteredRegistrations.length} results
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
              
//               <div className="flex items-center space-x-1">
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   const pageNum = i + 1;
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setCurrentPage(pageNum)}
//                       className={`px-3 py-2 rounded-lg ${
//                         currentPage === pageNum
//                           ? 'bg-[#6E2D79] text-white'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
              
//               <button
//                 onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal for Registration Details */}
//       {showModal && selectedRegistration && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-bold">Registration Details</h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="text-white hover:text-gray-200 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>
            
//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Personal Information</h3>
//                   <div className="space-y-2">
//                     <p><span className="font-medium">Name:</span> {selectedRegistration.nameAsCertificate}</p>
//                     <p><span className="font-medium">Email:</span> {selectedRegistration.email}</p>
//                     <p><span className="font-medium">Mobile:</span> {selectedRegistration.mobileNo}</p>
//                     <p><span className="font-medium">Telephone:</span> {selectedRegistration.TelNo}</p>
//                     <p><span className="font-medium">Date of Birth:</span> {formatDate(selectedRegistration.dob)}</p>
//                     <p><span className="font-medium">Occupation:</span> {selectedRegistration.occupation}</p>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Address Information</h3>
//                   <div className="space-y-2">
//                     <p><span className="font-medium">Current Address:</span> {selectedRegistration.currentAddress}</p>
//                     <p><span className="font-medium">Permanent Address:</span> {selectedRegistration.permanenetAddress}</p>
//                     <p><span className="font-medium">City:</span> {selectedRegistration.city}</p>
//                     <p><span className="font-medium">Office:</span> {selectedRegistration.office}</p>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Course Information</h3>
//                   <div className="space-y-2">
//                     <p><span className="font-medium">Level:</span> {selectedRegistration.levelName}</p>
//                     <p><span className="font-medium">Date:</span> {formatDate(selectedRegistration.courseDetailDate)}</p>
//                     <p><span className="font-medium">Time:</span> {selectedRegistration.courseDetailTime}</p>
//                     <p><span className="font-medium">Venue:</span> {selectedRegistration.courseDetailVenue}</p>
//                     <p><span className="font-medium">Time Slot:</span> {selectedRegistration.timeslot}</p>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Additional Information</h3>
//                   <div className="space-y-2">
//                     <p><span className="font-medium">How did you hear about us:</span> {selectedRegistration.hearAbout}</p>
//                     <p><span className="font-medium">Communication Preferences:</span> {selectedRegistration.communicationPreferences ? 'Yes' : 'No'}</p>
//                     <p><span className="font-medium">Terms Accepted:</span> {selectedRegistration.termsandcondition ? 'Yes' : 'No'}</p>
//                     <p><span className="font-medium">Registration Date:</span> {formatDate(selectedRegistration.createdAt)}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </Layout>
//     </>
//   );
// };

// export default AllRegistration;
















import React, { useState, useEffect } from 'react';
import { Eye, Download, RefreshCw, AlertCircle, Search, Filter, X, ZoomIn } from 'lucide-react';
import Layout from '../components/layout/Layout';

const AllRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const itemsPerPage = 10;

  // Base URL for images - adjust this according to your server setup
  const BASE_IMAGE_URL = 'https://ekaausa.com/';

  // Fetch registration data
  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 100000);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL+'registration'}` , {
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
        setRegistrations(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch registrations');
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
    fetchRegistrations();
  }, []);

  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter(reg =>
    reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.levelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRegistrations = filteredRegistrations.slice(startIndex, endIndex);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
    // Handle both forward and backward slashes
    const cleanPath = imagePath.replace(/\\/g, '/');
    return `${BASE_IMAGE_URL}${cleanPath}`;
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = Object.keys(registrations[0] || {}).join(',');
    const csvContent = registrations.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      ).join(',')
    ).join('\n');
    
    const blob = new Blob([headers + '\n' + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
          <span className="text-[#6E2D79] font-medium">Loading registrations...</span>
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
    <>
    <Layout>
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#6E2D79]">Registration Management</h1>
            <p className="text-gray-600 mt-1">Total Registrations: {registrations.length}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={fetchRegistrations}
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
              placeholder="Search by name, email, city, or level..."
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
            <span className="text-sm">Found: {filteredRegistrations.length} results</span>
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
                <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">City</th>
                <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Level</th>
                <th className="px-4 py-4 text-left text-sm font-semibold hidden sm:table-cell">Mobile</th>
                <th className="px-4 py-4 text-left text-sm font-semibold hidden xl:table-cell">Registration Date</th>
                <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentRegistrations.map((registration, index) => (
                <tr key={registration._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-[#5C2166]">
                      {registration.firstName} {registration.lastName}
                    </div>
                    <div className="text-xs text-gray-500 md:hidden">
                      {registration.email}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 hidden md:table-cell">
                    {registration.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">
                    {registration.city}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">
                    <span className=" bg-opacity-10 text-gray-900  px-2 py-1 rounded-full text-xs font-medium">
                      {registration.levelName}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 hidden sm:table-cell">
                    {registration.mobileNo}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 hidden xl:table-cell">
                    {formatDate(registration.createdAt)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => viewDetails(registration)}
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

        {filteredRegistrations.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No registrations found</div>
            <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredRegistrations.length)} of {filteredRegistrations.length} results
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

      {/* Modal for Registration Details */}
      {showModal && selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg z-[500]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Registration Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Personal Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Name:</span> {selectedRegistration.nameAsCertificate}</p>
                        <p><span className="font-medium">Email:</span> {selectedRegistration.email}</p>
                        <p><span className="font-medium">Mobile:</span> {selectedRegistration.mobileNo}</p>
                        <p><span className="font-medium">Telephone:</span> {selectedRegistration.TelNo}</p>
                        <p><span className="font-medium">Date of Birth:</span> {formatDate(selectedRegistration.dob)}</p>
                        <p><span className="font-medium">Occupation:</span> {selectedRegistration.occupation}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Address Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Current Address:</span> {selectedRegistration.currentAddress}</p>
                        <p><span className="font-medium">Permanent Address:</span> {selectedRegistration.permanenetAddress}</p>
                        <p><span className="font-medium">City:</span> {selectedRegistration.city}</p>
                        <p><span className="font-medium">Office:</span> {selectedRegistration.office}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Course Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Level:</span> {selectedRegistration.levelName}</p>
                        <p><span className="font-medium">Date:</span> {formatDate(selectedRegistration.courseDetailDate)}</p>
                        {/* <p><span className="font-medium">Time:</span> {selectedRegistration.courseDetailTime}</p> */}
                        <p><span className="font-medium">Venue:</span> {selectedRegistration.courseDetailVenue}</p>
                        <p><span className="font-medium">Time Slot:</span> {selectedRegistration.timeslot}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Additional Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">How did you hear about us:</span> {selectedRegistration.hearAbout}</p>
                        <p><span className="font-medium">Communication Preferences:</span> {selectedRegistration.communicationPreferences ? 'Yes' : 'No'}</p>
                        <p><span className="font-medium">Terms Accepted:</span> {selectedRegistration.termsandcondition ? 'Yes' : 'No'}</p>
                        <p><span className="font-medium">Registration Date:</span> {formatDate(selectedRegistration.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* ID Photos Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">ID Photos</h3>
                  <div className="space-y-4">
                    {/* ID Photo Front */}
                    {selectedRegistration.idPhotofront && (
                      <div className="space-y-2">
                        <p className="font-medium text-sm">ID Photo (Front):</p>
                        <div className="relative group">
                          <img
                            src={getImageUrl(selectedRegistration.idPhotofront)}
                            alt="ID Photo Front"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#6E2D79] transition-colors"
                            onClick={() => viewImage(selectedRegistration.idPhotofront, 'ID Photo (Front)')}
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-lg">
                            <ZoomIn className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* ID Photo Back */}
                    {selectedRegistration.idphotoback && (
                      <div className="space-y-2">
                        <p className="font-medium text-sm">ID Photo (Back):</p>
                        <div className="relative group">
                          <img
                            src={getImageUrl(selectedRegistration.idphotoback)}
                            alt="ID Photo Back"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#6E2D79] transition-colors"
                            onClick={() => viewImage(selectedRegistration.idphotoback, 'ID Photo (Back)')}
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-lg">
                            <ZoomIn className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    )}

{selectedRegistration.profileImage && (
                      <div className="space-y-2">
                        <p className="font-medium text-sm">Profile Image:</p>
                        <div className="relative group">
                          <img
                            src={getImageUrl(selectedRegistration.profileImage)}
                            alt="ID Photo Front"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#6E2D79] transition-colors"
                            onClick={() => viewImage(selectedRegistration.profileImage, 'profileImage')}
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-lg">
                            <ZoomIn className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    
                    {!selectedRegistration.idPhotofront && !selectedRegistration.idphotoback && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No ID photos available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal for Full Screen View */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-60 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-center">{selectedImage.title}</h3>
              <img
                src={getImageUrl(selectedImage.path)}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg mx-auto"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAw' + 'IiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
    </>
  );
};

export default AllRegistration;