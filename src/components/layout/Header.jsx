import React from "react";
import { FaBars,FaBell,FaUserCircle } from "react-icons/fa";


const Header = ({ onToggleSidebar }) => {
    return (
      <header className="h-16 bg-white flex items-center px-4 shadow-md justify-between">
        <div className="flex items-center space-x-4">
          <button className="md:hidden" onClick={onToggleSidebar}>
            <FaBars className="text-gray-600 h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <FaBell className="text-gray-500 h-5 w-5" />
          <FaUserCircle className="text-gray-500 h-8 w-8" />
        </div>
      </header>
    );
  };
  
  export default Header;