import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface AddEmployeeProps {
    isOpen: boolean;
    onClose: () => void;
    // 1. Update the type to match what the parent is actually sending
    handleAdd: (data: {
        name: string;
        email: string;
        department: string;
        annual_leave_balance: number;
    }) => void;
}

export default function AddEmployee({ isOpen, onClose, handleAdd }: AddEmployeeProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [balance, setBalance] = useState<number>(20);
    if (!isOpen) return null;
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Stops the page from reloading!
        try {
            await handleAdd({
            name,
            email,
            department,
            annual_leave_balance: balance
        });
        setName("");
        setEmail("");
        setDepartment("");
        setBalance(20);
        
        onClose(); // Close the modal
        } catch (error) {
            
        }
    
        
    };

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
                <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    {/* Name Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-800">Name</label>
                        <input 
                            required
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" 
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-800">Email</label>
                        <input 
                            required
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" 
                        />
                    </div>

                    {/* Department Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-800">Department</label>
                        <div className="relative">
                            <select 
                                required
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow text-gray-700 bg-white"
                                
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
                           required
                            type="number" 
                            min={0}
                            value={balance}
                            onChange={(e) => {
                                const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                                setBalance(val);
                            }}
                            onKeyDown={(e) => {
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