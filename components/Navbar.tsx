'use client';
import { BriefcaseIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

function Navbar() {
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsJobsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
  };

  return (
    <nav className="w-full bg-white text-[#002C49] py-5 px-6 shadow-sm relative top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div
          className="cursor-pointer flex items-center space-x-2"
          onClick={() => router.push("/")}
        >
          <div className="bg-[#84D03E] p-2 rounded">
            <BriefcaseIcon className="h-6 w-6 text-[#002C49]" />
          </div>
          <h1 className="text-3xl font-bold">
            <span className="text-[#002C49]">Tech</span>
            <span className="text-[#84D03E]">Hunt</span>
          </h1>
        </div>

        <div>
          <ul className="flex gap-10 py-1 items-center text-lg font-semibold">
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
