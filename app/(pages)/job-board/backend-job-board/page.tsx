"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Building, DollarSign, Briefcase, Clock, Filter } from "lucide-react"
import { useJobContext, type JobListing } from "@/context/JobContext"
import { cn } from "@/lib/utils"

export default function FullStackJobBoard() {
  const router = useRouter()
  const { jobs, setJobs, setSelectedJob } = useJobContext()
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterLocation, setFilterLocation] = useState<string>("all")
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${backendUrl}/api/fetch-backend`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()

        // Extract jobs from the nested structure
        let allJobs: JobListing[] = []
        for (const category in data.jobs[0]) {
          if (Array.isArray(data.jobs[0][category])) {
            data.jobs[0][category].forEach((item: any) => {
              if (item && item.googleJobs && Array.isArray(item.googleJobs)) {
                allJobs = allJobs.concat(item.googleJobs)
              }
            })
          }
        }

        setJobs(allJobs)
        setFilteredJobs(allJobs)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [setJobs])

  useEffect(() => {
    if (searchTerm === "" && filterType === "all" && filterLocation === "all") {
      setFilteredJobs(jobs)
      return
    }

    let filtered = jobs

    // Apply search filter
    if (searchTerm !== "") {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply job type filter
    if (filterType !== "all") {
      filtered = filtered.filter((job) => {
        const scheduleType = job.metadata?.scheduleType?.toLowerCase() || ""
        const extras = job.extras?.join(" ").toLowerCase() || ""

        if (filterType === "remote") {
          return job.metadata?.workFromHome || extras.includes("remote") || extras.includes("work from home")
        } else if (filterType === "full-time") {
          return scheduleType.includes("full") || extras.includes("full-time")
        } else if (filterType === "part-time") {
          return scheduleType.includes("part") || extras.includes("part-time")
        } else if (filterType === "contract") {
          return scheduleType.includes("contract") || extras.includes("contract")
        } else if (filterType === "internship") {
          return scheduleType.includes("intern") || extras.includes("intern")
        }
        return true
      })
    }

    // Apply location filter
    if (filterLocation !== "all") {
      filtered = filtered.filter((job) => {
        return job.location.toLowerCase().includes(filterLocation.toLowerCase())
      })
    }

    setFilteredJobs(filtered)
  }, [searchTerm, filterType, filterLocation, jobs])

  const getSalary = (job: JobListing) => {
    if (job.metadata?.salary) {
      return job.metadata.salary
    }

    // Try to find salary in extras
    const extras = job.extras?.join(" ") || ""
    if (extras.includes("$") || extras.includes("₹") || extras.includes("hour") || extras.includes("year")) {
      return (
        extras.match(/(\$[\d,]+(?:\s*[-–—]\s*\$?[\d,]+)?(?:\s*(?:an hour|a year|per hour|per year))?)/i)?.[0] ||
        extras.match(/(₹[\d,]+(?:\s*[-–—]\s*₹?[\d,]+)?(?:\s*(?:a month|a year|per month|per year))?)/i)?.[0] ||
        ""
      )
    }

    return "Salary not specified"
  }

  const getPostedTime = (job: JobListing) => {
    if (job.metadata?.postedAt) {
      return job.metadata.postedAt
    }

    const extras = job.extras?.join(" ") || ""
    if (extras.includes("day") || extras.includes("hour") || extras.includes("week") || extras.includes("month")) {
      return extras.match(/(\d+\s*(?:day|hour|week|month)s?\s*ago)/i)?.[0] || ""
    }

    return ""
  }

  const viewJobDetails = (job: JobListing) => {
    setSelectedJob(job)
    router.push(`/job-details`)
  }

  // Get unique locations for filter
  const locations = [
    "all",
    ...new Set(
      jobs
        .map((job) => {
          const parts = job.location.split(", ")
          return parts.length > 1 ? parts[parts.length - 1] : job.location
        })
        .filter(Boolean),
    ),
  ]

  return (
    <div className="mx-auto bg-[#F9FAFB] ">
        <div className="bg-[#002C49] text-white  px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Backend Developer Jobs</CardTitle>
              <CardDescription className="text-[#F1F5F9] mt-1">
                Browse through {filteredJobs.length} available positions
              </CardDescription>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative col-span-1 md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
              <Input
                placeholder="Search jobs by title, company or keywords..."
                className="pl-10 border-[#CBD5E1] bg-white focus-visible:ring-[#1C6DD0]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 col-span-1">
              <div className="relative flex-1">
                <Select defaultValue="all" onValueChange={setFilterType}>
                  <SelectTrigger className="w-full border-[#CBD5E1] bg-white focus:ring-[#1C6DD0]">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-[#64748B]" />
                      <SelectValue placeholder="Job Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Job Types</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative flex-1">
                <Select defaultValue="all" onValueChange={setFilterLocation}>
                  <SelectTrigger className="w-full border-[#CBD5E1] bg-white focus:ring-[#1C6DD0]">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#64748B]" />
                      <SelectValue placeholder="Location" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations
                      .filter((loc) => loc !== "all")
                      .map((location, index) => (
                        <SelectItem key={index} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64 bg-[#EAF4FF] rounded-lg">
              <div className="text-[#1E293B] flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1C6DD0] mb-3"></div>
                <p>Loading jobs...</p>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="flex justify-center items-center h-64 bg-[#EAF4FF] rounded-lg">
              <div className="text-center text-[#1E293B] max-w-md">
                <Filter className="h-10 w-10 mx-auto mb-3 text-[#64748B]" />
                <p className="text-lg font-medium">No jobs found</p>
                <p className="text-[#64748B] mt-1">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-[#CBD5E1] overflow-hidden">
              <Table>
                <TableHeader className="bg-[#F1F5F9]">
                  <TableRow className="hover:bg-[#F1F5F9]">
                    <TableHead className="w-[40%] text-[#1E293B] font-semibold">Position</TableHead>
                    <TableHead className="w-[20%] text-[#1E293B] font-semibold">Company</TableHead>
                    <TableHead className="hidden md:table-cell w-[15%] text-[#1E293B] font-semibold">
                      Location
                    </TableHead>
                    <TableHead className="hidden md:table-cell w-[15%] text-[#1E293B] font-semibold">Salary</TableHead>
                    <TableHead className="w-[10%] text-right text-[#1E293B] font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job, index) => (
                    <TableRow
                      key={index}
                      className={cn(
                        "cursor-pointer border-b border-[#CBD5E1] hover:bg-[#EAF4FF]",
                        index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]",
                      )}
                      onClick={() => viewJobDetails(job)}
                    >
                      <TableCell className="font-medium text-[#002C49]">
                        <div className="space-y-1.5">
                          <div className="font-semibold">{job.title}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {job.metadata?.scheduleType && (
                              <Badge variant="outline" className="text-xs border-[#CBD5E1] text-[#1E293B] bg-white">
                                <Briefcase className="h-3 w-3 mr-1 text-[#1C6DD0]" />
                                {job.metadata.scheduleType}
                              </Badge>
                            )}
                            {job.metadata?.workFromHome && (
                              <Badge variant="outline" className="text-xs border-[#CBD5E1] text-[#1E293B] bg-white">
                                Remote
                              </Badge>
                            )}
                            {getPostedTime(job) && (
                              <Badge variant="secondary" className="text-xs bg-[#EAF4FF] text-[#1C6DD0] border-none">
                                <Clock className="h-3 w-3 mr-1" />
                                {getPostedTime(job)}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-[#1E293B]">
                        <div className="flex items-center gap-2">
                          {job.thumbnail ? (
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-[#EAF4FF] flex items-center justify-center">
                              <img
                                src={job.thumbnail || "/placeholder.svg?height=32&width=32"}
                                alt={job.companyName}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-[#EAF4FF] flex items-center justify-center">
                              <Building className="h-4 w-4 text-[#1C6DD0]" />
                            </div>
                          )}
                          <span className="font-medium">{job.companyName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-[#64748B]">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-[#1C6DD0]" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-[#64748B]">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="h-3.5 w-3.5 text-[#1C6DD0]" />
                          <span className="text-sm truncate max-w-[150px]">{getSalary(job)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#CBD5E1] text-[#1E293B] hover:bg-[#EAF4FF] hover:text-[#1C6DD0]"
                            onClick={(e) => {
                              e.stopPropagation()
                              viewJobDetails(job)
                            }}
                          >
                            Details
                          </Button>
                          <a
                            href={job.shareLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button size="sm" className="bg-[#84D03E] hover:bg-[#84D03E]/90 text-white">
                              Apply
                            </Button>
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
    </div>
  )
}
