import { useEffect, useState } from "react";
import {toast} from "sonner";
import { getLeaveRequestsForCalendar } from "../api/leaveRequest";
import CalendarComponent from "../ui/Calendar"; // Adjust path as needed

// interface LeaveEvent {
//     id: number;
//     employeeName: string;
//     startDate: string; // YYYY-MM-DD
//     endDate: string;   // YYYY-MM-DD
//     colorClass: string; // Tailwind classes for the pill (e.g., 'bg-red-200 text-red-800')
// }


// // 1. Mock Data for the Calendar Grid
// const calendarLeaves: LeaveEvent[] = [
//     { id: 1, employeeName: "Carol", startDate: "2026-03-14", endDate: "2026-03-17", colorClass: "bg-green-200 text-green-900" },
//     { id: 2, employeeName: "Bob", startDate: "2026-03-14", endDate: "2026-03-14", colorClass: "bg-orange-200 text-orange-900" },
//     { id: 3, employeeName: "Alice", startDate: "2026-03-16", endDate: "2026-03-20", colorClass: "bg-red-200 text-red-900" },
//     { id: 4, employeeName: "Bob", startDate: "2026-03-18", endDate: "2026-03-18", colorClass: "bg-orange-200 text-orange-900" },
//     { id: 5, employeeName: "Bob", startDate: "2026-03-23", endDate: "2026-03-25", colorClass: "bg-green-200 text-green-900" },
// ];


export default function Calendar() {
    const [calendarLeaves,setCalendarLeaves] = useState<any[]>([]);

    const fetchCalendarLeaves = async () => {
        try {
            const data = await getLeaveRequestsForCalendar();
            setCalendarLeaves(data?.leave_requests || []);

        } catch (error) {
            toast.warning("Failed to load calendar data");
        }
    }
    useEffect(() => {
        fetchCalendarLeaves();
    }, []);
    
    return (
        <div className="max-w-5xl mx-auto p-5 pb-12">
            
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Leave Calendar</h1>
                <p className="text-gray-500 text-lg">Overview of upcoming approved leaves</p>
            </div>

            {/* The Calendar UI Component */}
            <div className="mb-10">
                <CalendarComponent leaves={calendarLeaves} />
            </div>


        </div>
    );
}