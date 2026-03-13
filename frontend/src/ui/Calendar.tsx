import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeaveEvent {
    id: number;
    employeeName: string;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
    colorClass: string; // Tailwind classes for the pill (e.g., 'bg-red-200 text-red-800')
}

interface CalendarProps {
    leaves: LeaveEvent[];
}

export default function Calendar({ leaves }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Date Math Variables
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Total days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Day of the week the month starts on (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // We want Monday to be the first column (index 0).
    // If the month starts on Sunday (0), we need 6 empty slots. Otherwise, startDay - 1.
    const emptySlots = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Handlers for month navigation
    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    // Array of abbreviated weekday names (Starting on Monday)
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Format current Month and Year for header
    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Helper to check if today
    const isToday = (day: number) => {
        const today = new Date();
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6 px-2">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                    <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-gray-900">{monthYearString}</h2>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
                
                {/* Empty slots for days before the 1st of the month */}
                {Array.from({ length: emptySlots }).map((_, index) => (
                    <div key={`empty-${index}`} className="min-h-25 bg-gray-50/50 rounded-lg border border-transparent"></div>
                ))}

                {/* Actual days of the month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    
                    // Find all leaves that overlap with this specific date
                    const dayLeaves = leaves.filter(leave => 
                        dateStr >= leave.startDate && dateStr <= leave.endDate
                    );

                    const todayStyling = isToday(day) 
                        ? "border-blue-400 text-blue-700 font-bold bg-blue-50/30" 
                        : "border-gray-100 text-gray-500";

                    return (
                        <div key={day} className={`min-h-25 rounded-lg border p-2 flex flex-col ${todayStyling}`}>
                            {/* Day Number */}
                            <span className="text-sm mb-1">{day}</span>
                            
                            {/* Leave Pills */}
                            <div className="flex flex-col gap-1">
                                {/* Only show first 2 leaves to prevent calendar from stretching massively */}
                                {dayLeaves.slice(0, 2).map(leave => (
                                    <div 
                                        key={leave.id} 
                                        className={`text-xs px-2 py-0.5 rounded-sm truncate ${leave.colorClass}`}
                                    >
                                        {/* Just show the first name */}
                                        {leave.employeeName.split(' ')[0]} 
                                    </div>
                                ))}
                                
                                {/* "+1" Indicator if there are more than 2 leaves on this day */}
                                {dayLeaves.length > 2 && (
                                    <div className="text-xs text-gray-500 pl-1 font-medium">
                                        +{dayLeaves.length - 2}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}