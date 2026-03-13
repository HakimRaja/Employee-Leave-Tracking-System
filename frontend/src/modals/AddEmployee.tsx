import { X, ChevronDown } from "lucide-react";

interface AddEmployeeProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddEmployee({ isOpen, onClose }: AddEmployeeProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            {/* Modal Container */}
            <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-xl">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <X size={20} strokeWidth={2} />
                </button>

                {/* Header */}
                <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Employee</h2>

                {/* Form */}
                <form className="space-y-4">
                    
                    {/* Name Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-800">Name</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" 
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-800">Email</label>
                        <input 
                            type="email" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" 
                        />
                    </div>

                    {/* Department Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-800">Department</label>
                        <div className="relative">
                            <select 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow text-gray-700 bg-white"
                                defaultValue=""
                            >
                                <option value="" disabled className="text-gray-400">Select department</option>
                                <option value="engineering">Engineering</option>
                                <option value="design">Design</option>
                                <option value="sales">Sales</option>
                                <option value="hr">Hr</option>
                                <option value="finance">Finance</option>
                                <option value="marketing">Marketing</option>
                            </select>
                            {/* Custom Chevron Icon */}
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                                <ChevronDown size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Annual Leave Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-800">Annual Leave Entitlement (days)</label>
                        <input 
                            type="number" 
                            min={0}
                            defaultValue={20}
                            onChange={(e) => {
                                // If the user leaves the field completely empty, reset it to "0"
                                if (e.target.value === '') {
                                    e.target.value = '0';
                                }
                            }}
                            onKeyDown={(e) => {
                                // Prevent typing the minus sign and the letter 'e' (for scientific notation)
                                if (e.key === '-' || e.key === 'e') {
                                    e.preventDefault();
                                }
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" 
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="w-full bg-[#1967d2] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                        >
                            Add Employee
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}