"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the job interface based on the API response structure
export interface JobListing {
  title: string
  companyName: string
  location: string
  via: string
  shareLink: string
  extras?: string[]
  description: string
  thumbnail?: string
  metadata?: {
    postedAt?: string
    scheduleType?: string
    salary?: string
    workFromHome?: boolean
    qualifications?: string
    [key: string]: any
  }
  applyOptions?: Array<{
    title: string
    link: string
  }>
}

interface JobContextType {
  jobs: JobListing[]
  setJobs: (jobs: JobListing[]) => void
  selectedJob: JobListing | null
  setSelectedJob: (job: JobListing | null) => void
}

const JobContext = createContext<JobContextType | undefined>(undefined)

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)

  return <JobContext.Provider value={{ jobs, setJobs, selectedJob, setSelectedJob }}>{children}</JobContext.Provider>
}

export function useJobContext() {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error("useJobContext must be used within a JobProvider")
  }
  return context
}
