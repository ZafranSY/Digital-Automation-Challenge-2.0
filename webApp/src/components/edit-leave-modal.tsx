"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { LeaveApplication } from "./leave-management-system"

interface EditLeaveModalProps {
  isOpen: boolean
  onClose: () => void
  application: LeaveApplication
  onSubmit: (application: LeaveApplication) => void
}

export function EditLeaveModal({ isOpen, onClose, application, onSubmit }: EditLeaveModalProps) {
  const [formData, setFormData] = useState<LeaveApplication>(application)

  useEffect(() => {
    setFormData(application)
  }, [application])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Edit Leave Application</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                Employee ID
              </label>
              <input
                id="edit-employeeId"
                name="employeeId"
                type="text"
                required
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.employeeId}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="edit-name"
                name="name"
                type="text"
                required
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="edit-leaveType" className="block text-sm font-medium text-gray-700 mb-1">
                Leave Type
              </label>
              <select
                id="edit-leaveType"
                name="leaveType"
                required
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.leaveType}
                onChange={handleChange}
              >
                <option value="Annual">Annual</option>
                <option value="Sick">Sick</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label htmlFor="edit-startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                id="edit-startDate"
                name="startDate"
                type="text"
                required
                placeholder="YYYY-MM-DD"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="edit-endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                id="edit-endDate"
                name="endDate"
                type="text"
                required
                placeholder="YYYY-MM-DD"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="edit-status"
                name="status"
                required
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[#4f46e5] text-white rounded hover:bg-[#4338ca]">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
