// src/pages/Employees.tsx
import { useState } from "react";
import { Plus } from "lucide-react";
import AddEmployee from "../modals/AddEmployee";
import { useEmployee } from "../hooks/useEmployee";
import { toast } from "sonner";
// Mock Data Structure
// const employeesData = [
//     {
//         id: 1,
//         name: "Alice Johnson",
//         email: "alice@company.com",
//         initials: "A",
//         color: "bg-[#1967d2]", // Blue
//         department: "Engineering",
//         daysLeft: 20,
//         daysUsed: 0,
//         daysTotal: 20,
//     },
//     {
//         id: 2,
//         name: "Bob Smith",
//         email: "bob@company.com",
//         initials: "B",
//         color: "bg-[#2ba57d]", // Teal
//         department: "Design",
//         daysLeft: 17,
//         daysUsed: 3,
//         daysTotal: 20,
//     },
//     {
//         id: 3,
//         name: "Carol Williams",
//         email: "carol@company.com",
//         initials: "C",
//         color: "bg-[#f59e0b]", // Orange/Yellow
//         department: "Marketing",
//         daysLeft: 12,
//         daysUsed: 6,
//         daysTotal: 18,
//     },
// ];

export default function Employees() {
    // State to control the modal
    const { employees, loading ,addEmployee} = useEmployee();

    const avatarColors = [
        "bg-blue-500", "bg-green-500", "bg-purple-500", 
        "bg-yellow-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
    ];

    const handleAddEmployee = async(employeeData : {
        name: string;
        email: string;
        department: string;
        annual_leave_balance: number;
    }) => {
        try {
            await addEmployee(employeeData);
            toast.success("Employee added successfully");
        } catch (error : any) {
            toast.error(error);
            throw error;
        }
        
    };


    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    if (loading) {
        return <div className="p-6 animate-pulse">Loading employees...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-5 pb-10">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Employees</h1>
                    <p className="text-gray-500 text-lg">{employees.length} team members</p>
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
                {employees.map((emp) => {

                    const daysUsed = emp.availed_leaves;
                    const daysTotal = emp.total_days;
                    const daysLeft = daysTotal - daysUsed;
                    const progressPercentage = (daysUsed / daysTotal) * 100;

                    const initial = emp.name?.[0]?.toUpperCase() || "?";
                    const randomColor = avatarColors[initial.charCodeAt(0) % avatarColors.length];

                    return (
                        <div key={emp.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${randomColor}`}>
                                    {initial}
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{emp.name}</h3>
                                    <p className="text-gray-500">{emp.email}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-500 font-medium">{emp.department}</span>
                                <span className="font-bold text-gray-900">{daysLeft} days left</span>
                            </div>

                            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                                <div
                                    className="bg-[#1967d2] h-2.5 rounded-full"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>

                            <p className="text-sm text-gray-500 font-medium">
                                {daysUsed} of {daysTotal} days used
                            </p>

                        </div>
                    );
                })}

                {employees.length === 0 && (
                    <p className="text-gray-500">No employees found.</p>
                )}
            </div>

            {/* Render the Modal */}
            <AddEmployee 
                handleAdd={handleAddEmployee}
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
            />
        </div>
    );
}