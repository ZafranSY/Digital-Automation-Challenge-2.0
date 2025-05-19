"use client"

import { useState } from "react"
import type { LeaveApplication } from "./leave-management-system"
import { EditLeaveModal } from "./edit-leave-modal"

interface LeaveApplicationTableProps {
  applications: LeaveApplication[]
  onEdit: (application: LeaveApplication) => void
  onDelete: (id: string) => void
}

export function LeaveApplicationTable({ applications, onEdit, onDelete }: LeaveApplicationTableProps) {
  const [editingApplication, setEditingApplication] = useState<LeaveApplication | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEditClick = (application: LeaveApplication) => {
    setEditingApplication(application)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (updatedApplication: LeaveApplication) => {
    onEdit(updatedApplication)
    setIsEditModalOpen(false)
    setEditingApplication(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600"
      case "Rejected":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#4f46e5] text-white">
              <th className="py-3 px-4 text-left">Employee ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Leave Type</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {applications.map((application) => (
              <tr key={application.id} className="border-b">
                <td className="py-3 px-4">{application.employeeId}</td>
                <td className="py-3 px-4">{application.name}</td>
                <td className="py-3 px-4">{application.leaveType}</td>
                <td className="py-3 px-4">{application.startDate}</td>
                <td className="py-3 px-4">{application.endDate}</td>
                <td className={`py-3 px-4 ${getStatusColor(application.status)}`}>{application.status}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditClick(application)} className="text-blue-500 hover:text-blue-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button onClick={() => onDelete(application.id)} className="text-red-500 hover:text-red-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingApplication && (
        <EditLeaveModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          application={editingApplication}
          onSubmit={handleEditSubmit}
        />
      )}
    </>
  )
}
