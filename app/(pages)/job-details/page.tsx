"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useJobContext } from "@/context/JobContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Building,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  ExternalLink,
  Calendar,
  Share2,
  Bookmark,
  AlertCircle,
} from "lucide-react"

export default function JobDetailsPage() {
  const router = useRouter()
  const { selectedJob } = useJobContext()

  useEffect(() => {
    if (!selectedJob) {
      router.push("/")
    }
  }, [selectedJob, router])

  if (!selectedJob) {
    return null
  }

  const getPostedTime = () => {
    if (selectedJob.metadata?.postedAt) {
      return selectedJob.metadata.postedAt
    }

    const extras = selectedJob.extras?.join(" ") || ""
    if (extras.includes("day") || extras.includes("hour") || extras.includes("week") || extras.includes("month")) {
      return extras.match(/(\d+\s*(?:day|hour|week|month)s?\s*ago)/i)?.[0] || ""
    }

    return ""
  }

  const getSalary = () => {
    if (selectedJob.metadata?.salary) {
      return selectedJob.metadata.salary
    }

    const extras = selectedJob.extras?.join(" ") || ""
    if (extras.includes("$") || extras.includes("₹") || extras.includes("hour") || extras.includes("year")) {
      return (
        extras.match(/(\$[\d,]+(?:\s*[-–—]\s*\$?[\d,]+)?(?:\s*(?:an hour|a year|per hour|per year))?)/i)?.[0] ||
        extras.match(/(₹[\d,]+(?:\s*[-–—]\s*₹?[\d,]+)?(?:\s*(?:a month|a year|per month|per year))?)/i)?.[0] ||
        ""
      )
    }

    return "Salary not specified"
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this job: ${selectedJob.title}`,
          text: `${selectedJob.companyName} is hiring! Here's the job: ${selectedJob.title}.`,
          url: window.location.href,
        });
        console.log(" Shared successfully");
      } catch (error) {
        console.error(" Error sharing", error);
      }
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };

  return (
    <div className="container mx-auto py-8 bg-[#F9FAFB] min-h-screen">
      <Button
        variant="ghost"
        className="mb-6 text-[#1E293B] hover:bg-[#EAF4FF] hover:text-[#1C6DD0]"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#002C49] text-white p-6 rounded-tr-xl">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{selectedJob.title}</h1>
                <div className="flex items-center mt-2 text-[#F1F5F9]">
                  <Building className="h-4 w-4 mr-2" />
                  {selectedJob.companyName}
                </div>
              </div>
              {selectedJob.thumbnail ? (
                <div className="h-16 w-16 rounded-md overflow-hidden bg-white p-1">
                  <img
                    src={selectedJob.thumbnail || "/placeholder.svg?height=56&width=56"}
                    alt={selectedJob.companyName}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-md bg-[#EAF4FF] flex items-center justify-center">
                  <Building className="h-8 w-8 text-[#1C6DD0]" />
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#EAF4FF] px-6 py-4 flex flex-wrap gap-2">
            <Badge className="bg-white text-[#1E293B] border-[#CBD5E1] hover:bg-[#F1F5F9]">
              <MapPin className="h-3 w-3 mr-1 text-[#1C6DD0]" />
              {selectedJob.location}
            </Badge>
            {selectedJob.metadata?.scheduleType && (
              <Badge className="bg-white text-[#1E293B] border-[#CBD5E1] hover:bg-[#F1F5F9]">
                <Briefcase className="h-3 w-3 mr-1 text-[#1C6DD0]" />
                {selectedJob.metadata.scheduleType}
              </Badge>
            )}
            {selectedJob.metadata?.workFromHome && (
              <Badge className="bg-white text-[#1E293B] border-[#CBD5E1] hover:bg-[#F1F5F9]">Remote</Badge>
            )}
            {getPostedTime() && (
              <Badge className="bg-white text-[#1E293B] border-[#CBD5E1] hover:bg-[#F1F5F9]">
                <Clock className="h-3 w-3 mr-1 text-[#1C6DD0]" />
                {getPostedTime()}
              </Badge>
            )}
            {getSalary() !== "Salary not specified" && (
              <Badge className="bg-white text-[#1E293B] border-[#CBD5E1] hover:bg-[#F1F5F9]">
                <DollarSign className="h-3 w-3 mr-1 text-[#1C6DD0]" />
                {getSalary()}
              </Badge>
            )}
          </div>

          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#002C49]">Job Description</h2>
              <div className="flex gap-2">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="border-[#CBD5E1] text-[#64748B] hover:bg-[#EAF4FF] hover:text-[#1C6DD0]"
                >
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
                {/* <Button
                    variant="outline"
                    size="sm"
                    className="border-[#CBD5E1] text-[#64748B] hover:bg-[#EAF4FF] hover:text-[#1C6DD0]"
                  >
                    <Bookmark className="h-4 w-4 mr-1" /> Save
                  </Button> */}
              </div>
            </div>

            <div className="prose max-w-none text-[#1E293B]">
              {selectedJob.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#CBD5E1] flex justify-between items-center">
              <Button
                variant="outline"
                className="border-[#CBD5E1] text-[#1E293B] hover:bg-[#EAF4FF] hover:text-[#1C6DD0]"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
              </Button>
              <a href={selectedJob.shareLink} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#84D03E] hover:bg-[#84D03E]/90 text-white">
                  Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </CardContent>
        </div>

        <div className="space-y-6">
          <div className="bg-[#002C49] text-white px-6 py-4 rounded-tl-2xl">
            <CardTitle className="text-lg font-semibold">Quick Apply</CardTitle>
          </div>
          <CardContent className="p-6">
            <a href={selectedJob.shareLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-[#84D03E] hover:bg-[#84D03E]/90 text-white">
                Apply on {selectedJob.via || "Company Website"} <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>

            {getPostedTime() && (
              <div className="mt-4 flex items-center text-[#64748B] text-sm">
                <Calendar className="h-4 w-4 mr-2 text-[#1C6DD0]" />
                Posted {getPostedTime()}
              </div>
            )}

            <div className="mt-4 p-3 bg-[#EAF4FF] rounded-md text-sm text-[#1E293B] flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 text-[#1C6DD0] mt-0.5" />
              <span>Apply soon! Jobs like this usually receive many applications.</span>
            </div>
          </CardContent>

          <Card className="border-[#CBD5E1] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-[#002C49]">Application Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedJob.applyOptions && selectedJob.applyOptions.length > 0 ? (
                  <div className="space-y-2">
                    {selectedJob.applyOptions.map((option, index) => (
                      <a
                        key={index}
                        href={option.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-[#CBD5E1] rounded-md hover:bg-[#EAF4FF] transition-colors"
                      >
                        <span className="font-medium text-[#1E293B]">{option.title}</span>
                        <ExternalLink className="h-4 w-4 text-[#1C6DD0]" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-[#64748B] p-3 border border-[#CBD5E1] rounded-md">
                    Apply directly through the main application link.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#CBD5E1] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-[#002C49]">Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-[#64748B]">Posted via</span>
                  <span className="font-medium text-[#1E293B]">{selectedJob.via}</span>
                </div>
                <Separator className="bg-[#CBD5E1]" />

                <div className="flex justify-between py-2">
                  <span className="text-[#64748B]">Location</span>
                  <span className="font-medium text-[#1E293B]">{selectedJob.location}</span>
                </div>
                <Separator className="bg-[#CBD5E1]" />

                {selectedJob.metadata?.scheduleType && (
                  <>
                    <div className="flex justify-between py-2">
                      <span className="text-[#64748B]">Job Type</span>
                      <span className="font-medium text-[#1E293B]">{selectedJob.metadata.scheduleType}</span>
                    </div>
                    <Separator className="bg-[#CBD5E1]" />
                  </>
                )}

                {selectedJob.metadata?.workFromHome && (
                  <>
                    <div className="flex justify-between py-2">
                      <span className="text-[#64748B]">Remote Work</span>
                      <span className="font-medium text-[#1E293B]">Yes</span>
                    </div>
                    <Separator className="bg-[#CBD5E1]" />
                  </>
                )}

                <div className="flex justify-between py-2">
                  <span className="text-[#64748B]">Salary</span>
                  <span className="font-medium text-[#1E293B]">{getSalary()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
