"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SendIcon, CheckCircleIcon, AlertCircleIcon, LoaderIcon, ArrowLeftIcon } from 'lucide-react';

export default function FeedbackPage() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!
    const router = useRouter();
    const [formData, setFormData] = useState({
        type: 'suggestion',
        message: '',
        email: '',
    });

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null as string | null,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Validate form
        if (!formData.message.trim()) {
            setStatus({ loading: false, success: false, error: 'Please enter your feedback message.' });
            return;
        }

        setStatus({ loading: true, success: false, error: null });

        try {
            const response = await fetch(`${backendUrl}/feedback/submit-feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Success
            setStatus({ loading: false, success: true, error: null });
            setFormData({ type: 'suggestion', message: '', email: '' });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus((prev) => ({ ...prev, success: false }));
            }, 5000);

        } catch (error: any) {
            setStatus({ loading: false, success: false, error: error.message });
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col">

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center py-16 px-4 relative">
                {/* Background decorative elements */}
                <div className="absolute top-20 right-0 w-64 h-64 bg-[#84D03E] opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1C6DD0] opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-40 h-40 bg-[#8A2BE2] opacity-5 rounded-full blur-2xl"></div>

                <div className="max-w-6xl w-full relative z-10">
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                        {/* Left Side - Heading */}
                        <div className="w-full md:w-2/5 text-left md:pr-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-[#002C49] mb-3 tracking-tight">
                                We Value Your <span className="text-[#87d140]">Feedback</span>
                            </h1>
                            <p className="text-lg text-gray-700 mb-6">
                                Help us improve TechHunt with your suggestions, feature requests, or bug reports.
                            </p>
                            <div className="hidden md:block mt-10 text-[#64748B]">
                                <p>Your feedback helps us build a better job hunting experience.</p>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="w-full md:w-3/5">
                            <div className="bg-white rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100">
                                {status.success ? (
                                    <div className="flex flex-col items-center justify-center py-10">
                                        <CheckCircleIcon className="h-16 w-16 text-[#84D03E] mb-4" />
                                        <h3 className="text-2xl font-semibold text-[#002C49] mb-2">Thank You!</h3>
                                        <p className="text-center text-gray-600">
                                            Your feedback has been submitted successfully. We appreciate your input!
                                        </p>
                                        <button
                                            onClick={() => setStatus((prev) => ({ ...prev, success: false }))}
                                            className="mt-6 bg-[#1C6DD0] hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                        >
                                            Submit Another Feedback
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Feedback Type */}
                                        <div>
                                            <label className="block text-[#002C49] font-medium mb-2">Feedback Type</label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {['suggestion', 'feature', 'bug', 'other'].map((type) => (
                                                    <label
                                                        key={type}
                                                        className={`
                                                        flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200
                                                        ${formData.type === type
                                                                ? 'bg-[#EAF4FF] border-[#1C6DD0] text-[#1C6DD0] font-medium'
                                                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
                                                    `}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="type"
                                                            value={type}
                                                            checked={formData.type === type}
                                                            onChange={handleChange}
                                                            className="sr-only"
                                                        />
                                                        <span className="capitalize">{type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Message Input */}
                                        <div>
                                            <label htmlFor="message" className="block text-[#002C49] font-medium mb-2">
                                                Your Feedback
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={5}
                                                placeholder="Please share your thoughts, ideas, or report an issue..."
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1C6DD0] focus:ring-2 focus:ring-[#1C6DD0] focus:ring-opacity-20 transition-all duration-200 outline-none resize-none"
                                                required
                                            ></textarea>
                                        </div>

                                        {/* Email Input (Optional) */}
                                        <div>
                                            <label htmlFor="email" className="block text-[#002C49] font-medium mb-2">
                                                Email Address <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="We'll contact you if we need more information"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1C6DD0] focus:ring-2 focus:ring-[#1C6DD0] focus:ring-opacity-20 transition-all duration-200 outline-none"
                                            />
                                        </div>

                                        {/* Error Message */}
                                        {status.error && (
                                            <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
                                                <AlertCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                                                <p>{status.error}</p>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={status.loading}
                                            className={`
                                            w-full bg-[#84D03E] hover:bg-opacity-90 text-[#002C49] font-semibold py-4 rounded-full
                                            transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
                                            flex items-center justify-center space-x-2
                                            ${status.loading ? 'opacity-70 cursor-not-allowed' : ''}
                                        `}
                                        >
                                            {status.loading ? (
                                                <>
                                                    <LoaderIcon className="h-5 w-5 animate-spin" />
                                                    <span>Submitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <SendIcon className="h-5 w-5" />
                                                    <span>Submit Feedback</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Show text below form on mobile */}
                    <div className="md:hidden text-center mt-8 text-[#64748B]">
                        <p>Your feedback helps us build a better job hunting experience.</p>
                    </div>
                </div>
            </main>

        </div>
    );
}