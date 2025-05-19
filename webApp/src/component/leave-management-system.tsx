"use client"

import { useState } from "react"
import { LeaveApplicationForm } from "@/components/leave-application-form"
import { LeaveApplicationTable } from "@/components/leave-application-table"
import { DateRangeSearch } from "@/components/date-range-search"

export type LeaveApplication = {
  id: string
  employeeId: string
  name: string
  leaveType: "Annual" | "Sick" | "Emergency"
  startDate: string
  endDate: string
  status: "Pending" | "Approved" | "Rejected"
}

export function LeaveManagementSystem() {
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([
    {
      id: "1",
      employeeId: "E001",
      name: "Alice Johnson",
      leaveType: "Annual",
      startDate: "2023-11-01",
      endDate: "2023-11-10",
      status: "Pending",
    },
    {
      id: "2",
      employeeId: "E002",
      name: "Bob Smith",
      leaveType: "Sick",
      startDate: "2023-11-05",
      endDate: "2023-11-07",
      status: "Approved",
    },
    {
      id: "3",
      employeeId: "E003",
      name: "Carol White",
      leaveType: "Emergency",
      startDate: "2023-11-12",
      endDate: "2023-11-15",
      status: "Rejected",
    },
  ])

  const handleAddLeaveApplication = (application: Omit<LeaveApplication, "id">) => {
    const newApplication = {
      ...application,
      id: Math.random().toString(36).substring(2, 9),
    }

    setLeaveApplications([...leaveApplications, newApplication])
  }

  const handleEditLeaveApplication = (updatedApplication: LeaveApplication) => {
    setLeaveApplications(leaveApplications.map((app) => (app.id === updatedApplication.id ? updatedApplication : app)))
  }

  const handleDeleteLeaveApplication = (id: string) => {
    setLeaveApplications(leaveApplications.filter((app) => app.id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-normal flex items-center">
          <span className="inline-block w-4 h-4 bg-black mr-2"></span>
          Leave Management System
        </h1>
        <DateRangeSearch />
      </div>

      <LeaveApplicationForm onSubmit={handleAddLeaveApplication} />

      <div className="mt-8">
        <LeaveApplicationTable
          applications={leaveApplications}
          onEdit={handleEditLeaveApplication}
          onDelete={handleDeleteLeaveApplication}
        />
      </div>
    </div>
  )
}
