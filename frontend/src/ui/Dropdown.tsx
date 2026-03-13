import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface DropdownProps {
    options: string[];
    value: string;
    onChange: (val: string) => void;
}

export default function Dropdown({ options, value, onChange }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown if user clicks outside of it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-32 px-4 py-2 bg-white border border-blue-500 text-gray-700 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
                <span>{value}</span>
                <ChevronDown size={18} className="text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 overflow-hidden">
                    {options.map((option) => {
                        const isSelected = option === value;
                        return (
                            <button
                                key={option}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                                    isSelected 
                                    ? "bg-[#2ba57d] text-white hover:bg-[#238a68]" 
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {/* Only show checkmark if selected, otherwise add empty space to keep text aligned */}
                                {isSelected ? <Check size={16} /> : <div className="w-4" />}
                                {option}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}