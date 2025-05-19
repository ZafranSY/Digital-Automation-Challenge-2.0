"use client"

import { useState } from "react"
import { LeaveApplicationForm } from "./leave-application-form"
import { LeaveApplicationTable } from "./leave-application-table"
import { LeaveApplicationSearch } from "./leave-application-search"
import { Toaster } from "./ui/toaster"
import { useToast } from "../hooks/use-toast"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { CalendarDays, Home, PieChart, Settings, Users } from "lucide-react"

export type LeaveApplication = {
  id: string
  employeeId: string
  name: string
  leaveType: "Annual" | "Sick" | "Emergency"
  startDate: Date
  endDate: Date
  status: "Pending" | "Approved" | "Rejected"
}

export function LeaveManagementDashboard() {
  const { toast } = useToast()
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([])
  const [editingApplication, setEditingApplication] = useState<LeaveApplication | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [searchParams, setSearchParams] = useState({
    employeeId: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
  })

  const handleAddLeaveApplication = (application: Omit<LeaveApplication, "id">) => {
    // Check for overlapping dates for the same employee
    const hasOverlap = leaveApplications.some(
      (app) =>
        app.employeeId === application.employeeId &&
        new Date(application.startDate) <= new Date(app.endDate) &&
        new Date(application.endDate) >= new Date(app.startDate),
    )

    if (hasOverlap) {
      toast({
        title: "Duplicate Entry",
        description: "This employee already has leave scheduled during this period.",
        variant: "destructive",
      })
      return
    }

    const newApplication = {
      ...application,
      id: Math.random().toString(36).substring(2, 9),
    }

    setLeaveApplications([...leaveApplications, newApplication])
    toast({
      title: "Success",
      description: "Leave application submitted successfully.",
    })
  }

  const handleEditLeaveApplication = (application: LeaveApplication) => {
    setEditingApplication(application)
    setIsEditModalOpen(true)
  }

  const handleUpdateLeaveApplication = (updatedApplication: LeaveApplication) => {
    // Check for overlapping dates excluding the current application
    const hasOverlap = leaveApplications.some(
      (app) =>
        app.id !== updatedApplication.id &&
        app.employeeId === updatedApplication.employeeId &&
        new Date(updatedApplication.startDate) <= new Date(app.endDate) &&
        new Date(updatedApplication.endDate) >= new Date(app.startDate),
    )

    if (hasOverlap) {
      toast({
        title: "Duplicate Entry",
        description: "This employee already has leave scheduled during this period.",
        variant: "destructive",
      })
      return false
    }

    setLeaveApplications(leaveApplications.map((app) => (app.id === updatedApplication.id ? updatedApplication : app)))

    toast({
      title: "Success",
      description: "Leave application updated successfully.",
    })

    setIsEditModalOpen(false)
    setEditingApplication(null)
    return true
  }

  const handleDeleteLeaveApplication = (id: string) => {
    setLeaveApplications(leaveApplications.filter((app) => app.id !== id))
    toast({
      title: "Success",
      description: "Leave application deleted successfully.",
    })
  }

  const filteredApplications = leaveApplications.filter((app) => {
    const matchesEmployeeId = searchParams.employeeId
      ? app.employeeId.toLowerCase().includes(searchParams.employeeId.toLowerCase())
      : true

    const matchesDateRange =
      searchParams.startDate && searchParams.endDate
        ? new Date(app.startDate) >= searchParams.startDate && new Date(app.endDate) <= searchParams.endDate
        : true

    return matchesEmployeeId && matchesDateRange
  })

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-4 py-2">
              <CalendarDays className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Leave Manager</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users />
                  <span>Employees</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <PieChart />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="text-xs text-muted-foreground">© 2025 Leave Management System</div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Leave Management Dashboard</h1>
          </header>

          <div className="container mx-auto p-6">
            <LeaveApplicationSearch onSearch={setSearchParams} />

            <div className="mt-8 grid gap-8 md:grid-cols-1 lg:grid-cols-[1fr_2fr]">
              <div>
                <LeaveApplicationForm onSubmit={handleAddLeaveApplication} />
              </div>
              <div>
                <LeaveApplicationTable
                  applications={filteredApplications}
                  onEdit={handleEditLeaveApplication}
                  onDelete={handleDeleteLeaveApplication}
                  editingApplication={editingApplication}
                  isEditModalOpen={isEditModalOpen}
                  setIsEditModalOpen={setIsEditModalOpen}
                  onUpdate={handleUpdateLeaveApplication}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
