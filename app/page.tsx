"use client"

import Footer from '@/components/Footer';
import { HeroHighlight } from '@/components/ui/hero-highlight';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { motion } from 'framer-motion';
import { Briefcase, BriefcaseIcon, Clock, ClockIcon, CloudIcon, CodeIcon, DatabaseIcon, FilterIcon, GitPullRequestIcon, Globe, HomeIcon, LayersIcon, LayoutIcon, Quote, ServerIcon, TagIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  company: string;
}


export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <HeroSection />
      <ImageSection />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}


const HeroSection: FC = () => {
  const words = `Your dream job is waiting for you`
  return (
    <HeroHighlight>
      <div className="w-full py-16 md:py-24 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-[#84D03E] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1C6DD0] opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Main hero content */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, x: -800 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#002C49] mb-2 tracking-tight"
            >
              <span className="inline-block transform transition-transform hover:scale-[1.02] duration-700">
                Get The Right Job
              </span>
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, x: 800 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#87d140] mb-8 tracking-tight">
              <span className="inline-block transform transition-transform hover:scale-[1.02] duration-700">
                You Deserve
              </span>
            </motion.h1>

            {/* Simplified paragraph text */}
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Finding tech jobs shouldn't be hard. We gather all the best software jobs in India in one place,
              so you can focus on what matters - landing your next role.
            </p>

            <TextGenerateEffect words={words} />

            {/* Search button with enhanced hover effect */}
            <button
              className="bg-[#84D03E] hover:bg-opacity-90 text-[#002C49] font-semibold text-lg py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};


const ImageSection: FC = () => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('image-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div
      id="image-section"
      className="w-full bg-gradient-to-b from-[#edf4f6] to-[#e5f0f5] py-24 px-6 md:px-8 lg:px-4 relative overflow-hidden min-h-[700px] flex flex-col justify-center"
    >
      {/* Enhanced background lighting effects */}
      <div className="absolute -left-20 top-0 h-96 w-96 bg-[#84D03E] opacity-15 blur-[100px] rounded-full"></div>
      <div className="absolute -right-20 bottom-0 h-96 w-96 bg-[#1C6DD0] opacity-10 blur-[100px] rounded-full"></div>
      <div className="absolute left-1/2 top-1/2 h-64 w-64 bg-[#8A2BE2] opacity-5 blur-[80px] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* Animated particles for extra lighting effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 bg-[#84D03E] opacity-70 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 h-3 w-3 bg-[#1C6DD0] opacity-60 rounded-full animate-ping animation-delay-700"></div>
        <div className="absolute bottom-1/3 left-2/3 h-2 w-2 bg-[#8A2BE2] opacity-60 rounded-full animate-ping animation-delay-1500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative w-full">
        {/* Simple heading above the image */}
        <div className={`text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-[#002C49] mb-3">
            Find <span className="text-[#1C6DD0]">Tech Jobs</span> That Matter
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Connecting developers with opportunities across India
          </p>
        </div>

        {/* Enhanced image container with animations - now larger */}
        <div
          className={`rounded-2xl overflow-hidden shadow-2xl relative z-10 transition-all duration-700
            hover:shadow-[0_25px_60px_rgba(8,112,184,0.15)] transform hover:-translate-y-2
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Enhanced image overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,44,73,0.05)] pointer-events-none z-30"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(28,109,208,0.03)] to-transparent pointer-events-none z-30"></div>

          {/* Subtle inner highlight */}
          <div className="absolute inset-0 shadow-inner pointer-events-none z-30"></div>

          <img
            src="./landingImage.png"
            alt="TechHunt Platform"
            className="w-full h-full object-cover relative z-20"
            style={{ minHeight: "500px" }} // Making image taller
            loading="lazy"
          />

          {/* Floating highlight effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white opacity-10 transform -translate-x-full animate-shine pointer-events-none z-40"></div>
        </div>
      </div>
    </div>
  );
};


const Feature: FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-start p-6 bg-white rounded-lg shadow-md transition-all duration-300 
      hover:shadow-xl hover:-translate-y-2 h-full 
      border-t-4 border border-gray-100 border-t-[#002d4a] 
      hover:border-t-[#84D03E] group">
      <div className="p-3 mb-5 bg-[#EAF4FF] rounded-full transition-colors duration-300 group-hover:bg-[#E3F9D2]">
        <div className="transition-colors duration-300 group-hover:text-[#84D03E]">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-[#002C49] transition-colors duration-300 group-hover:text-[#1C6DD0]">
        {title}
      </h3>
      <p className="text-[#64748B] leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const FeatureSection: FC = () => {
  const features = [
    {
      icon: <BriefcaseIcon className="h-6 w-6 text-[#1C6DD0]" />,
      title: "Entry to Mid-Level Positions",
      description: "Focused on roles requiring 0-5 years of experience, perfect for new graduates and junior developers."
    },
    {
      icon: <HomeIcon className="h-6 w-6 text-[#1C6DD0]" />,
      title: "Remote Opportunities",
      description: "Browse through a curated list of remote and work-from-home positions across India."
    },
    {
      icon: <ClockIcon className="h-6 w-6 text-[#1C6DD0]" />,
      title: "Fresh Job Listings",
      description: "All job listings are updated every 4 days to ensure you're applying to active openings."
    },
    {
      icon: <CodeIcon className="h-6 w-6 text-[#1C6DD0]" />,
      title: "Full Stack Development",
      description: "Find opportunities to build both frontend and backend with modern tech stacks."
    },
    {
      icon: <LayoutIcon className="h-6 w-6 text-[#1C6DD0]" />,
      title: "Frontend Development",
      description: "Discover frontend positions working with React, Next.js, and other modern frameworks."
    },
    {
      icon: <ServerIcon className="h-6 w-6 text-[#1C6DD0]" />,
      title: "Backend Development",
      description: "Backend roles using Node.js, Express and other server-side technologies."
    },
    {
      icon: <DatabaseIcon className="h-6 w-6 text-[#1C6DD0]" />,
      title: "Data Science Roles",
      description: "Find positions focused on data analysis, machine learning, and AI development."
    },
    {
      icon: <CloudIcon className="h-6 w-6 text-[#1C6DD0]" />,
      title: "DevOps Opportunities",
      description: "Explore DevOps roles that focus on deployment, infrastructure, and CI/CD pipelines."
    },
    {
      icon: <FilterIcon className="h-6 w-6 text-[#1C6DD0]" />,
      title: "Clean, Modern Interface",
      description: "Our simple, intuitive design helps you find relevant positions without distractions."
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#F9FAFB] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-[#1C6DD0] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-[#84D03E] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002C49] mb-4">Find Your Next Tech Role Faster</h2>
          <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
            TechHunt aggregates software engineering positions across India, saving you time in your job search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, 6).map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};



const Testimonial: FC<TestimonialProps> = ({ quote, name, role, company }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-blue-50 h-full flex flex-col">
      <div className="absolute -top-4 left-8">
        <div className="bg-[#EAF4FF] p-2 rounded-full shadow-sm">
          <Quote className="h-5 w-5 text-[#1C6DD0]" />
        </div>
      </div>
      <p className="text-[#1E293B] mb-8 italic leading-relaxed flex-grow">"{quote}"</p>
      <div className="border-t border-gray-100 pt-4">
        <h4 className="font-semibold text-[#002C49]">{name}</h4>
        <p className="text-[#64748B] text-sm">{role}, {company}</p>
      </div>
    </div>
  );
};


const TestimonialSection: FC = () => {
  const testimonials = [
    {
      quote: "After months of searching on generic job sites, I found my first developer role in just two weeks on TechHunt. The focused listings saved me so much time!",
      name: "Priya Sharma",
      role: "Junior Frontend Developer",
      company: "ClearStack Technologies"
    },
    {
      quote: "As someone looking for remote work specifically, TechHunt's filtering options made it easy to find companies that are truly remote-friendly.",
      name: "Rahul Khanna",
      role: "Backend Engineer",
      company: "DigitalFlow Systems"
    },
    {
      quote: "The quality of job listings on TechHunt is consistently high. I appreciate that they focus on legitimate opportunities for developers at my experience level.",
      name: "Ananya Patel",
      role: "Full Stack Developer",
      company: "InnovateX Solutions"
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#EAF4FF] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-1/4 w-40 h-40 bg-[#84D03E] opacity-5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#1C6DD0] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002C49] mb-4">What People Say</h2>
          <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
            Don't take our word for it—hear from tech professionals who found their dream jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-[#02474f] text-white relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1C6DD0] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#87d140] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10 tracking-tight">
          Ready to Find Your Perfect Tech Job?
        </h2>
        <p className="text-xl md:text-2xl mb-12 text-[#CBD5E1] max-w-3xl mx-auto relative z-10 leading-relaxed">
          Join thousands of tech professionals who discovered their ideal positions through TechHunt.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          <button className="bg-[#87d140] hover:bg-opacity-90 text-[#002C49] font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Start Your Job Search
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-[#002C49] font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300">
            Browse Categories
          </button>
        </div>

        <p className="mt-10 text-[#CBD5E1] relative z-10">
          New jobs added every 4 days — don't miss out on your next opportunity!
        </p>
      </div>
    </section>
  );
};
