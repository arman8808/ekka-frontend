import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaWpforms,
    FaClipboardList,
    FaSuitcase,
    FaAddressBook,
    FaTachometerAlt,
    FaCog,
    FaUserCircle,
    FaSignOutAlt,
    FaTimes,
} from "react-icons/fa";

const navigation = [
    // { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "All Registration", path: "/all-registration-ekaausa.com.usa", icon: <FaWpforms /> },
    { name: "All Contacts", path: "/all-contacts.ekaausa.com.usa", icon: <FaWpforms /> },

];


const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
    fixed md:static z-50 top-0 left-0 h-full w-64
    transform md:translate-x-0 bg-white border-r border-gray-200
    text-gray-800 transition-transform duration-300 ease-in-out
    shadow-lg
    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
            >
                {/* Close button on mobile */}
                <div className="md:hidden flex justify-end p-4">
                    <button
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="text-gray-300 hover:text-white focus:outline-none"
                    >
                        <FaTimes className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-col h-full">
                    {/* Branding */}
                    <div className="px-6 py-5 text-3xl font-bold tracking-tight border-b border-indigo-700 select-none">
                        Ekaa
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`group flex items-center px-4 py-3 rounded-lg font-semibold text-sm
                    transition
                    ${isActive
                                            ? "bg-[#6E2D79] text-white shadow-md"
                                            : "text-indigo-300 hover:bg-indigo-700 hover:text-white"
                                        }
                  `}
                                >
                                    <span
                                        className={`mr-3 text-lg flex-shrink-0
                      ${isActive
                                                ? "text-white"
                                                : "text-indigo-400 group-hover:text-white"
                                            }
                    `}
                                    >
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer/User */}
                    {/* <div className="border-t border-indigo-700 px-6 py-4 bg-indigo-900">
                        <div className="flex items-center space-x-4">
                            <FaUserCircle className="text-indigo-400 h-12 w-12" />
                            <div className="flex flex-col">
                                <p className="text-white font-semibold text-base">Admin User</p>
                                <Link
                                    to="/logout"
                                    className="flex items-center gap-2 text-indigo-400 text-sm hover:text-white transition"
                                >
                                    <FaSignOutAlt /> Sign out
                                </Link>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Sidebar;