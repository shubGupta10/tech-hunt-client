'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Code2, Layers, Server, Terminal } from 'lucide-react';

function SelectYourPreference() {
    const router = useRouter();

    const jobCategories = [
        {
            title: "Full Stack Jobs",
            description: "Find roles working with both frontend and backend technologies",
            icon: <Layers className="h-12 w-12" />,
            path: "/job-board/fullstack-job-board",
        },
        {
            title: "Frontend Jobs",
            description: "Discover opportunities in UI development and design",
            icon: <Code2 className="h-12 w-12" />,
            path: "/job-board/frontend-job-board",
        },
        {
            title: "Backend Jobs",
            description: "Explore roles focused on server-side development",
            icon: <Server className="h-12 w-12" />,
            path: "/job-board/backend-job-board",
        },
        {
            title: "DevOps Jobs",
            description: "Find positions in infrastructure and deployment",
            icon: <Terminal className="h-12 w-12" />,
            path: "/job-board/devops-job-board",
        }
    ];

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#002C49] sm:text-5xl mb-4">
                        Find Your Ideal Tech Job
                    </h1>
                    <p className="text-lg text-[#334155] max-w-2xl mx-auto">
                        Choose a category that matches your skills and explore opportunities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {jobCategories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-t-4 border-[#D6FF49]"
                            onClick={() => router.push(category.path)}
                        >
                            <div className="p-8 flex flex-col items-center text-center h-full">
                                <div className="mb-6 bg-[#EAF4FF] p-4 rounded-full text-[#002C49]">
                                    {category.icon}
                                </div>
                                <h2 className="text-xl font-semibold text-[#1E293B] mb-3">{category.title}</h2>
                                <p className="text-[#64748B] mb-6 flex-grow">{category.description}</p>
                                <Button
                                    className="w-full bg-[#002C49] hover:bg-[#001A33] text-white font-medium py-2 rounded-lg cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(category.path);
                                    }}
                                >
                                    Browse Jobs
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SelectYourPreference;
