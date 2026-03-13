export interface LeaveEvent {
    id: number;
    employeeName: string;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
    colorClass: string; // Tailwind classes for the pill (e.g., 'bg-red-200 text-red-800')
}

export interface CalendarProps {
    leaves: LeaveEvent[];
}
