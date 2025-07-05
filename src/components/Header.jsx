import React, { useState, useEffect, useRef } from "react";
import { IoCallOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";



const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const sidebarRef = useRef(null);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Don't hide header if sidebar is open
      if (isOpen) return;

      const currentScrollY = window.scrollY;

      // Scroll direction detection
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }

      setPrevScrollY(currentScrollY);
      setScrolled(currentScrollY > 10); // original logic
    };

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, prevScrollY]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[10000] transition-all duration-500 transform 
        ${scrolled ? "bg-white shadow-md" : "hover:bg-white"} 
        ${showHeader ? "" : "-translate-y-full"}
      `}
    >
      <div className="w-full mx-auto h-full flex items-center justify-between px-4 md:px-8 py-2">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="/logo.svg"
              alt="Ekaa Logo"
              className="w-[60px] h-[70px] md:w-[80px] md:h-[90px] lg:w-[101px] lg:h-[112px] object-contain"
            />
          </div>
        </Link>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
          {/* Mobile Register Button */}
          <button
            onClick={() => navigate("/schedule")}
            className="md:hidden inline-flex items-center justify-center gap-[10px] px-3 py-2 border border-[#6E2D79] rounded-full text-[#6E2D79] text-sm font-medium font-[Poppins] bg-white transition whitespace-nowrap cursor-pointer"
          >
            Register
          </button>

          {/* Desktop Register Button */}
          <button
            onClick={() => navigate("/schedule")}
            className="hidden md:inline-flex items-center justify-center gap-[10px] px-[14px] py-[10px] lg:py-[12px] border border-[#6E2D79] rounded-full text-[#6E2D79] text-base lg:text-[18px] leading-tight lg:leading-[33px] font-medium font-[Poppins] bg-white transition whitespace-nowrap cursor-pointer"
          >
            Register Now
          </button>

          <LuMenu
            className="text-[#6E2D79] hover:text-purple-900 transition cursor-pointer w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        ref={sidebarRef}
        style={{
          backgroundImage: `url('/Menu links.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-[#6E2D79] transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-2">
          <button
            onClick={() => navigate("/schedule")}
            className="inline-flex items-center justify-center gap-[10px] px-[14px] py-[10px] border border-[#6E2D79] rounded-full text-[#6E2D79] text-lg font-medium font-[Poppins] bg-white transition cursor-pointer"
          >
            Register Now
          </button>
        </div>

        <div className="flex flex-col px-6 py-4 space-y-6">
          <Link
            to="/"
            className="text-lg font-medium hover:text-[#6E2D79] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-lg font-medium hover:text-[#6E2D79] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/decode"
            className="text-lg font-medium hover:text-[#6E2D79] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Decode
          </Link>
          <Link
            to="/ich"
            className="text-lg font-medium hover:text-[#6E2D79] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Hypnotherapy
          </Link>

          {/* Workshop Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsWorkshopOpen(!isWorkshopOpen)}
              className="flex items-center justify-between w-full text-lg font-medium hover:text-[#6E2D79] transition-colors"
            >
              <span>Workshop</span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${
                  isWorkshopOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isWorkshopOpen && (
              <div className="mt-2 pl-4 space-y-3 animate-fadeIn">
                <Link
                  to="/family-constellation"
                  className="block text-lg font-medium hover:text-[#6E2D79] transition-colors"
                  onClick={() => {
                    setIsWorkshopOpen(false);
                    setIsOpen(false);
                  }}
                >
                  Family Constellation
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/contact-us"
            className="text-lg font-medium hover:text-[#6E2D79] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>

        <div className="px-6 mt-6">
          <div className="border-t border-gray-200"></div>
        </div>

        <div className="mt-auto px-6 py-4">
          <div className="flex space-x-4 mb-4">
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-700">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-gray-800 inline-block mr-1"></span>
              <a
                href="mailto:contact@ekaausa.com"
                className="hover:text-[#6E2D79]"
              >
                contact@ekaausa.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};



export default Header;
