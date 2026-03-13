import CalendarComponent from "../ui/Calendar"; // Adjust path as needed

interface LeaveEvent {
    id: number;
    employeeName: string;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
    colorClass: string; // Tailwind classes for the pill (e.g., 'bg-red-200 text-red-800')
}


// 1. Mock Data for the Calendar Grid
const calendarLeaves: LeaveEvent[] = [
    { id: 1, employeeName: "Carol", startDate: "2026-03-14", endDate: "2026-03-17", colorClass: "bg-green-200 text-green-900" },
    { id: 2, employeeName: "Bob", startDate: "2026-03-14", endDate: "2026-03-14", colorClass: "bg-orange-200 text-orange-900" },
    { id: 3, employeeName: "Alice", startDate: "2026-03-16", endDate: "2026-03-20", colorClass: "bg-red-200 text-red-900" },
    { id: 4, employeeName: "Bob", startDate: "2026-03-18", endDate: "2026-03-18", colorClass: "bg-orange-200 text-orange-900" },
    { id: 5, employeeName: "Bob", startDate: "2026-03-23", endDate: "2026-03-25", colorClass: "bg-green-200 text-green-900" },
];

// 2. Mock Data for the Upcoming Leaves List below the calendar
const upcomingLeaves = [
    { 
        id: 1, 
        name: "Carol Williams", 
        initial: "C", 
        avatarColor: "bg-[#f59e0b]", 
        dateString: "Mar 14 – Mar 17", 
        type: "Personal", 
        status: "Approved" 
    },
    { 
        id: 2, 
        name: "Bob Smith", 
        initial: "B", 
        avatarColor: "bg-[#2ba57d]", 
        dateString: "Mar 14 – Mar 14", 
        type: "Sick", 
        status: "Pending" 
    },
];

export default function Calendar() {
    return (
        <div className="max-w-5xl mx-auto p-5 pb-12">
            
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Leave Calendar</h1>
                <p className="text-gray-500 text-lg">Overview of upcoming leaves</p>
            </div>

            {/* The Calendar UI Component */}
            <div className="mb-10">
                <CalendarComponent leaves={calendarLeaves} />
            </div>

            {/* Upcoming Leaves List */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Leaves</h2>
                
                <div className="space-y-4">
                    {upcomingLeaves.map((leave) => (
                        <div key={leave.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                            
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${leave.avatarColor}`}>
                                    {leave.initial}
                                </div>
                                
                                {/* Text Details */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{leave.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {leave.dateString} · {leave.type}
                                    </p>
                                </div>
                            </div>

                            {/* Status Pill */}
                            <div>
                                {leave.status === "Approved" ? (
                                    <span className="px-4 py-1.5 bg-[#1967d2] text-white font-medium text-sm rounded-full">
                                        Approved
                                    </span>
                                ) : (
                                    <span className="px-4 py-1.5 bg-gray-100 text-gray-700 font-medium text-sm rounded-full">
                                        Pending
                                    </span>
                                )}
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}