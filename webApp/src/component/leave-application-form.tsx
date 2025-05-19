"use client"

import type React from "react"

import { useState } from "react"
import type { LeaveApplication } from "./leave-management-system"

interface LeaveApplicationFormProps {
  onSubmit: (values: Omit<LeaveApplication, "id">) => void
  initialValues?: Omit<LeaveApplication, "id">
}

export function LeaveApplicationForm({ onSubmit, initialValues }: LeaveApplicationFormProps) {
  const [formData, setFormData] = useState<Omit<LeaveApplication, "id">>(
    initialValues || {
      employeeId: "",
      name: "",
      leaveType: "Annual",
      startDate: "",
      endDate: "",
      status: "Pending",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)

    // Reset form if not editing
    if (!initialValues) {
      setFormData({
        employeeId: "",
        name: "",
        leaveType: "Annual",
        startDate: "",
        endDate: "",
        status: "Pending",
      })
    }
  }

  const handleReset = () => {
    setFormData({
      employeeId: "",
      name: "",
      leaveType: "Annual",
      startDate: "",
      endDate: "",
      status: "Pending",
    })
  }

  return (
    <div className="bg-[#f8f9fe] rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Add Leave Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
              Employee ID
            </label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              required
              placeholder="Enter Employee ID"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.employeeId}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter Employee Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-1">
              Leave Type
            </label>
            <select
              id="leaveType"
              name="leaveType"
              required
              className="w-full p-2 border border-gray-300 rounded appearance-none bg-white"
              value={formData.leaveType}
              onChange={handleChange}
            >
              <option value="Annual">Annual</option>
              <option value="Sick">Sick</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              id="startDate"
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
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              id="endDate"
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
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              required
              className="w-full p-2 border border-gray-300 rounded appearance-none bg-white"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#4f46e5] text-white rounded hover:bg-[#4338ca] transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
