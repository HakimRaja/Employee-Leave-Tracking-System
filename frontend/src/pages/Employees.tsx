// src/pages/Employees.tsx
import { useState } from "react";
import { Plus } from "lucide-react";
import AddEmployee from "../modals/AddEmployee";
// Mock Data Structure
const employeesData = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@company.com",
        initials: "AJ",
        color: "bg-[#1967d2]", // Blue
        department: "Engineering",
        daysLeft: 20,
        daysUsed: 0,
        daysTotal: 20,
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@company.com",
        initials: "BS",
        color: "bg-[#2ba57d]", // Teal
        department: "Design",
        daysLeft: 17,
        daysUsed: 3,
        daysTotal: 20,
    },
    {
        id: 3,
        name: "Carol Williams",
        email: "carol@company.com",
        initials: "CW",
        color: "bg-[#f59e0b]", // Orange/Yellow
        department: "Marketing",
        daysLeft: 12,
        daysUsed: 6,
        daysTotal: 18,
    },
];

export default function Employees() {
    // State to control the modal
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="max-w-5xl mx-auto p-5 pb-10">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Employees</h1>
                    <p className="text-gray-500 text-lg">{employeesData.length} team members</p>
                </div>
                
                {/* Add Employee Button */}
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1967d2] hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 ease-in-out"
                >
                    <Plus size={20} />
                    Add Employee
                </button>
            </div>

            {/* Employee Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {employeesData.map((emp) => {
                    // Calculate the percentage for the progress bar
                    const progressPercentage = (emp.daysUsed / emp.daysTotal) * 100;

                    return (
                        <div key={emp.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                            
                            {/* Card Top: Avatar & Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${emp.color}`}>
                                    {emp.initials}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{emp.name}</h3>
                                    <p className="text-gray-500">{emp.email}</p>
                                </div>
                            </div>

                            {/* Card Middle: Stats */}
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-500 font-medium">{emp.department}</span>
                                <span className="font-bold text-gray-900">{emp.daysLeft} days left</span>
                            </div>

                            {/* Card Bottom: Progress Bar */}
                            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                                <div 
                                    className="bg-[#1967d2] h-2.5 rounded-full transition-all duration-500 ease-out" 
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">
                                {emp.daysUsed} of {emp.daysTotal} days used
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Render the Modal */}
            <AddEmployee 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
            />
        </div>
    );
}