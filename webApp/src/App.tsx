import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LeaveManagementSystem } from "./component/leave-management-system"

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-6">
      <LeaveManagementSystem />
    </main>
  )
}
