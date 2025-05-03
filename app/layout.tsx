import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JobProvider } from "@/context/JobContext";
import Navbar from "@/components/Navbar";
import { PostHogProvider } from '@/components/providers'
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechHunt — Find Your Next Tech Opportunity",
  description:
    "TechHunt is a job board for tech professionals in India. Discover the latest remote-friendly roles in Full Stack, Frontend, Backend, DevOps, and Data Science.",
  keywords: [
    "Tech jobs",
    "Remote tech jobs India",
    "Full Stack Developer jobs",
    "Frontend jobs",
    "Backend jobs",
    "DevOps jobs",
    "Data Science roles",
    "Junior developer jobs",
    "Software engineering jobs India",
  ],
  authors: [{ name: "TechHunt Team", url: "https://techhunt.vercel.app" }],
  creator: "TechHunt",
  themeColor: "#84D03E",
  openGraph: {
    title: "TechHunt — Find Your Next Tech Opportunity",
    description:
      "A modern job board for Indian tech professionals. Find fresh listings, remote work, and entry-level roles updated every 4 days.",
    url: "https://techhunt.vercel.app",
    siteName: "TechHunt",
    images: [
      {
        url: "https://techhunt.vercel.app/og-image.png", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "TechHunt Job Board",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JobProvider>
          <Navbar />
          <Analytics/>
          <PostHogProvider>
            {children}
          </PostHogProvider>
          <Footer/>
        </JobProvider>
      </body>
    </html>
  );
}
