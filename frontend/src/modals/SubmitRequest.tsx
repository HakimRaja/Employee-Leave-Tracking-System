// src/components/modals/SubmitRequest.tsx
import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import DateSelector from "../ui/DateSelector";

interface SubmitRequestProps {
    isOpen: boolean;
    onClose: () => void;
    addLeaveRequest: (data: any) => Promise<any>;
    employees: {
        id: string;
        name: string;
        email: string;
    }[];
}

export default function SubmitRequest({ isOpen, onClose, addLeaveRequest,employees }: SubmitRequestProps) {
    const [employeeId, setEmployeeId] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [notes, setNotes] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Reset fields when modal closes
    useEffect(() => {
        if (!isOpen) {
            setStartDate("");
            setEndDate("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // --- Date Constraint Logic ---
    // Calculate tomorrow's date in YYYY-MM-DD format
    const getTomorrowString = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
    };

    const tomorrow = getTomorrowString();
    
    // The end date cannot be earlier than the start date. 
    // If no start date is selected yet, it cannot be earlier than tomorrow.
    const minEndDate = startDate ? startDate : tomorrow;

    // Handle Start Date Change - if user pushes Start Date past the End Date, reset End Date
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStart = e.target.value;
        setStartDate(newStart);
        if (endDate && newStart > endDate) {
            setEndDate("");
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await addLeaveRequest({
            employee_id: employeeId,
            start_date: startDate,
            end_date: endDate,
            leave_type: leaveType,
            notes
            });

            onClose();
        } catch (error) {
            console.error(error);
        }
};

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative shadow-xl">
                
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition-colors">
                    <X size={20} strokeWidth={2} />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-6">Submit Leave Request</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Employee Select */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-800">Employee</label>
                        <div className="relative">
                            <select 
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="w-full border border-blue-600 rounded-lg px-3 py-2.5 outline-none appearance-none focus:ring-1 focus:ring-blue-600 text-gray-700 bg-white">
                                <option value="" disabled>Select employee</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name}-{emp.email}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                                <ChevronDown size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Date Pickers */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-800">Start Date</label>
                            <DateSelector 
                                value={startDate} 
                                onChange={handleStartDateChange} 
                                minDate={tomorrow} // Cannot select today or past
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-800">End Date</label>
                            <DateSelector 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                                minDate={minEndDate} // Must be >= Start Date
                            />
                        </div>
                    </div>

                    {/* Leave Type Select */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-800">Leave Type</label>
                        <div className="relative">
                            <select 
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 bg-white">
                                <option value="" disabled className="text-gray-400">Select type</option>
                                <option value="sick">Sick Leave</option>
                                <option value="annual">Annual Leave</option>
                                <option value="personal">Personal Leave</option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                                <ChevronDown size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Notes Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-800">Notes (optional)</label>
                        <textarea 
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            placeholder="Any additional details..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none placeholder:text-gray-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button type="submit" className="w-full bg-[#1967d2] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}