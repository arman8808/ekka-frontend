// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="p-4 border-b border-indigo-700">
          <h1 className="text-xl font-bold">Admin Portal</h1>
        </div>
        
        <nav className="flex-1 py-4">
          <ul>
            <li>
              <Link 
                to="/admin/dashboard" 
                className="block px-4 py-2 hover:bg-indigo-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/all-registration-ekaausa.com.usa" 
                className="block px-4 py-2 hover:bg-indigo-700"
              >
                All Registrations
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/all-contacts.ekaausa.com.usa" 
                className="block px-4 py-2 hover:bg-indigo-700"
              >
                All Contacts
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-indigo-700">
          <button 
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white"
          >
            Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;