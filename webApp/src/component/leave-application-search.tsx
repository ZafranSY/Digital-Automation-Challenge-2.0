"use client"

import { useState } from "react"
import { CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface SearchParams {
  employeeId: string
  startDate: Date | null
  endDate: Date | null
}

interface LeaveApplicationSearchProps {
  onSearch: (params: SearchParams) => void
}

export function LeaveApplicationSearch({ onSearch }: LeaveApplicationSearchProps) {
  const [employeeId, setEmployeeId] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const handleSearch = () => {
    onSearch({
      employeeId,
      startDate,
      endDate,
    })
  }

  const handleReset = () => {
    setEmployeeId("")
    setStartDate(null)
    setEndDate(null)
    onSearch({
      employeeId: "",
      startDate: null,
      endDate: null,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Leave Applications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto_auto]">
          <div className="space-y-2">
            <Label htmlFor="employee-id">Employee ID</Label>
            <Input
              id="employee-id"
              placeholder="Search by ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="start-date"
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="end-date"
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full">
              Search
            </Button>
          </div>

          <div className="flex items-end">
            <Button onClick={handleReset} variant="outline" className="w-full">
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
