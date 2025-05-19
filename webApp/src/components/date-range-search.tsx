export function DateRangeSearch() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <input type="text" placeholder="Search by Employee ID" className="p-2 border border-gray-300 rounded-md w-48" />
      </div>
      <div className="flex items-center gap-2">
        <input type="text" placeholder="YYYY-MM-DD" className="p-2 border border-gray-300 rounded-md w-32" />
        <span>to</span>
        <input type="text" placeholder="YYYY-MM-DD" className="p-2 border border-gray-300 rounded-md w-32" />
      </div>
    </div>
  )
}
