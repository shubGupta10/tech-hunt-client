'use client';
import { BriefcaseIcon, MenuIcon, XIcon, MessageSquareIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

function Navbar() {
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsJobsOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          event.target.id !== 'mobile-menu-button') {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    // Close mobile menu on resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const jobCategories = [
    { name: "Full Stack Jobs", path: "/job-board/fullstack-job-board" },
    { name: "Frontend Jobs", path: "/job-board/frontend-job-board" },
    { name: "Backend Jobs", path: "/job-board/backend-job-board" },
    { name: "DevOps Jobs", path: "/job-board/devops-job-board" },
  ];

  const handleNavigation = (path: string): void => {
    router.push(path);
    setIsJobsOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white text-[#002C49] py-4 px-4 md:px-6 shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <div
          className="cursor-pointer flex items-center space-x-2"
          onClick={() => router.push("/")}
        >
          <div className="bg-[#84D03E] p-1.5 md:p-2 rounded">
            <BriefcaseIcon className="h-5 w-5 md:h-6 md:w-6 text-[#002C49]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-[#002C49]">Tech</span>
            <span className="text-[#84D03E]">Hunt</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex gap-8 py-1 items-center text-lg font-semibold">
            <li
              className="hover:text-[#1C6DD0] transition-colors duration-200 cursor-pointer"
              onClick={() => router.push("/")}
            >
              Home
            </li>
            <li
              ref={dropdownRef}
              className="relative cursor-pointer"
              onMouseEnter={() => setIsJobsOpen(true)}
              onMouseLeave={() => setIsJobsOpen(false)}
            >
              <span className="hover:text-[#1C6DD0] transition-colors duration-200 flex items-center">
                Jobs
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 h-5 w-5 transition-transform duration-200 ${isJobsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>

              {isJobsOpen && (
                <div className="absolute top-full right-0 bg-white rounded-md shadow-lg w-64 border border-[#CBD5E1] overflow-hidden transition-all duration-200 text-base font-normal">
                  <div className="grid grid-cols-1">
                    {jobCategories.map((category, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-[#EAF4FF] hover:text-[#1C6DD0] cursor-pointer transition-colors duration-150 border-b last:border-b-0 border-[#F1F5F9]"
                        onClick={() => handleNavigation(category.path)}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
            <li
              className="hover:text-[#1C6DD0] transition-colors duration-200 cursor-pointer flex items-center"
              onClick={() => router.push("/feedback-form")}
            >
              <MessageSquareIcon className="mr-1 h-4 w-4" />
              Feedback
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-button"
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-6 w-6 text-[#002C49]" />
          ) : (
            <MenuIcon className="h-6 w-6 text-[#002C49]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t border-gray-100 mt-4 py-2 px-4 shadow-inner"
        >
          <ul className="space-y-2">
            <li
              className="py-3 px-2 hover:bg-[#EAF4FF] rounded-lg transition-colors duration-200 cursor-pointer font-medium"
              onClick={() => handleNavigation("/")}
            >
              Home
            </li>
            
            <li className="py-3 px-2 font-medium">
              <div
                onClick={() => setIsJobsOpen(!isJobsOpen)}
                className="flex justify-between items-center cursor-pointer hover:bg-[#EAF4FF] p-2 rounded-lg"
              >
                <span>Jobs</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 h-5 w-5 transition-transform duration-200 ${isJobsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {isJobsOpen && (
                <div className="mt-2 ml-4 space-y-1 border-l-2 border-[#EAF4FF] pl-4">
                  {jobCategories.map((category, index) => (
                    <div
                      key={index}
                      className="py-2 hover:text-[#1C6DD0] cursor-pointer transition-colors duration-150"
                      onClick={() => handleNavigation(category.path)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </li>
            
            <li
              className="py-3 px-2 hover:bg-[#EAF4FF] rounded-lg transition-colors duration-200 cursor-pointer font-medium flex items-center"
              onClick={() => handleNavigation("/feedback-form")}
            >
              <MessageSquareIcon className="mr-2 h-5 w-5" />
              Feedback
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;