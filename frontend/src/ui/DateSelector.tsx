import React from "react";
import { Calendar } from "lucide-react";

interface DateSelectorProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minDate?: string;
}

export default function DateSelector({ value, onChange, minDate }: DateSelectorProps) {
    return (
        <div className="relative">
            {/* Calendar Icon overlay */}
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
            </div>
            
            <input
                type="date"
                value={value}
                min={minDate}
                onChange={onChange}
                className={`w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow ${!value ? 'text-gray-400' : 'text-gray-900'}`}
            />
        </div>
    );
}