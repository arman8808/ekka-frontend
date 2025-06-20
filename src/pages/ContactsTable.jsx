import React, { useState, useEffect } from 'react';
import { Eye, RefreshCw, AlertCircle, Search, Filter, Mail, Phone, Globe, X, ZoomIn, Clock, CheckCircle, XCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';

const ContactsTable = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [pagination, setPagination] = useState(null);
    const itemsPerPage = 10;

    // Base URL for images
    const BASE_URL = 'https://ekaausa.com/';

    // Fetch contacts data
    const fetchContacts = async () => {
        setLoading(true);
        setError(null);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch('https://ekaausa.com/api/contacts', {
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
                setContacts(data.data);
                setPagination(data.pagination);
            } else {
                throw new Error('Failed to fetch contacts');
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
        fetchContacts();
    }, []);

    // Filter contacts based on search term
    const filteredContacts = contacts.filter(contact =>
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.contactNo.includes(searchTerm) ||
        contact.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get status badge color
    const getStatusBadge = (status) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            resolved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };

        const statusIcons = {
            pending: Clock,
            resolved: CheckCircle,
            rejected: XCircle
        };

        const ColorClass = statusColors[status] || 'bg-gray-100 text-gray-800';
        const IconComponent = statusIcons[status] || Clock;

        return (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${ColorClass}`}>
                <IconComponent className="w-3 h-3 mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // View contact details
    const viewDetails = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    // View image in full screen
    const viewImage = (imagePath) => {
        setSelectedImage(imagePath);
        setShowImageModal(true);
    };

    // Get image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        const cleanPath = imagePath.replace(/\\/g, '/');
        return `${BASE_URL}${cleanPath}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="flex items-center space-x-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
                    <span className="text-[#6E2D79] font-medium">Loading contacts...</span>
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
                    onClick={fetchContacts}
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
                                <h1 className="text-2xl lg:text-3xl font-bold text-[#6E2D79]">Contact Management</h1>
                                <p className="text-gray-600 mt-1">Total Contacts: {pagination?.total || contacts.length}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={fetchContacts}
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
                                    placeholder="Search by name, email, country, phone, or status..."
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
                                <span className="text-sm">Found: {filteredContacts.length} results</span>
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
                                        <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Phone</th>
                                        <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Country</th>
                                        {/* <th className="px-4 py-4 text-left text-sm font-semibold hidden sm:table-cell">Status</th> */}
                                        <th className="px-4 py-4 text-left text-sm font-semibold hidden xl:table-cell">Date</th>
                                        <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredContacts.map((contact, index) => (
                                        <tr key={contact._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-10 h-10 bg-[#6E2D79] bg-opacity-10 rounded-full flex items-center justify-center">
                                                            <span className="text-white font-medium text-sm">
                                                                {contact.fullName.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-[#5C2166]">
                                                            {contact.fullName}
                                                        </div>
                                                        <div className="text-xs text-gray-500 md:hidden">
                                                            {contact.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 hidden md:table-cell">
                                                <div className="flex items-center space-x-2">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    <span>{contact.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                    <span>{contact.phoneNumber}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">
                                                <div className="flex items-center space-x-2">
                                                    <Globe className="w-4 h-4 text-gray-400" />
                                                    <span>{contact.country}</span>
                                                </div>
                                            </td>
                                            {/* <td className="px-4 py-4 hidden sm:table-cell">
                                                {getStatusBadge(contact.status)}
                                            </td> */}
                                            <td className="px-4 py-4 text-sm text-gray-900 hidden xl:table-cell">
                                                {formatDate(contact.createdAt)}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <button
                                                    onClick={() => viewDetails(contact)}
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

                        {filteredContacts.length === 0 && !loading && (
                            <div className="text-center py-12">
                                <div className="text-gray-500 text-lg">No contacts found</div>
                                <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
                            </div>
                        )}
                    </div>

                    {/* Contact Details Modal */}
                    {showModal && selectedContact && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold">Contact Details</h2>
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="text-white hover:text-gray-200 text-2xl"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Basic Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Contact Information</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-[#6E2D79] bg-opacity-10 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-medium">
                                                            {selectedContact.fullName.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-lg">{selectedContact.fullName}</p>
                                                        {/* <p className="text-gray-600">{getStatusBadge(selectedContact.status)}</p> */}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <Mail className="w-4 h-4 text-gray-400" />
                                                        <span><strong>Email:</strong> {selectedContact.email}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Phone className="w-4 h-4 text-gray-400" />
                                                        <span><strong>Phone:</strong> {selectedContact.phoneNumber}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Globe className="w-4 h-4 text-gray-400" />
                                                        <span><strong>Country:</strong> {selectedContact.country}</span>
                                                    </div>
                                                    <p><strong>Zip Code:</strong> {selectedContact.zipCode}</p>
                                                    <p><strong>Contact Date:</strong> {selectedContact.formattedDate || formatDate(selectedContact.createdAt)}</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    {/* Message */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Message</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-gray-700 leading-relaxed">{selectedContact.message}</p>
                                        </div>
                                    </div>

                                    {/* Uploaded Image */}
                                    {/* {selectedContact.uploadImage?.path && (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-[#5C2166] border-b pb-2">Uploaded Document</h3>
                                            <div className="relative group inline-block">
                                                <img
                                                    src={getImageUrl(selectedContact.uploadImage.path)}
                                                    alt="Uploaded document"
                                                    className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#6E2D79] transition-colors"
                                                    onClick={() => viewImage(selectedContact.uploadImage.path)}
                                                    onError={(e) => {
                                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzVMMTI1IDUwSDc1TDEwMCA3NVoiIGZpbGw9IiNEMUQ1REIiLz4KPHRleHQgeD0iMTAwIiB5PSIxMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2QjcyODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD4KPHN2Zz4K';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-opacity flex items-center justify-center">
                                                    <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <p><strong>Filename:</strong> {selectedContact.uploadImage.originalName}</p>
                                                <p><strong>Size:</strong> {(selectedContact.uploadImage.size / 1024).toFixed(2)} KB</p>
                                                <p><strong>Type:</strong> {selectedContact.uploadImage.mimetype}</p>
                                            </div>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Image Zoom Modal */}
                    {showImageModal && selectedImage && (
                        <div className="fixed inset-0 bg-black bg-opacity-90 z-60 flex items-center justify-center p-4">
                            <div className="relative max-w-4xl max-h-full">
                                <button
                                    onClick={() => setShowImageModal(false)}
                                    className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
                                >
                                    <X className="w-8 h-8" />
                                </button>
                                <div className="text-white text-center mb-4">
                                    <h3 className="text-lg font-semibold">Uploaded Document</h3>
                                </div>
                                <img
                                    src={getImageUrl(selectedImage)}
                                    alt="Uploaded document"
                                    className="max-w-full max-h-[80vh] object-contain rounded-lg border-2 border-white"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDI1MCAxMDBIMTUwTDIwMCAxNTBaIiBmaWxsPSIjRDFENURCIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPgo=';
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default ContactsTable;