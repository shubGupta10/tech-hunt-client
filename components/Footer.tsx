import React, { FC } from 'react';
import { BriefcaseIcon } from 'lucide-react';

const Footer: FC = () => {
  return (
    <footer className="bg-[#1E293B] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="bg-[#84D03E] p-2 rounded mr-2">
              <BriefcaseIcon className="h-6 w-6 text-[#002C49]" />
            </div>
            <span className="text-2xl font-bold">TechHunt</span>
          </div>
          
          <nav className="flex gap-8">
            <a href="/" className="text-[#CBD5E1] hover:text-white transition-colors duration-200">Home</a>
            <a href="/select-your-preference" className="text-[#CBD5E1] hover:text-white transition-colors duration-200">Jobs</a>
          </nav>
        </div>
        
        <div className="border-t border-[#64748B] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#CBD5E1] mb-4 md:mb-0">
              © 2025 TechHunt. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;