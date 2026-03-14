import { useState } from "react";
import { Plus } from "lucide-react";
import Dropdown from "../ui/Dropdown";
import SubmitRequest from "../modals/SubmitRequest";
import { useLeaveRequest } from "../hooks/useLeaveRequest";
import { toast } from "sonner";

// Mock Data
// const allRequests = [
//     { id: 1, name: "Bob Smith", initial: "B", color: "bg-[#2ba57d]", date: "Mar 18 – Mar 17, 2026", type: "Sick", notes: '"dsjcbskd"', status: "Pending" },
//     { id: 2, name: "Carol Williams", initial: "C", color: "bg-[#f59e0b]", date: "Mar 14 – Mar 17, 2026", type: "Personal", notes: '"hello there"', status: "Approved" },
//     { id: 3, name: "Carol Williams", initial: "C", color: "bg-[#f59e0b]", date: "Mar 19 – Mar 19, 2026", type: "Sick", notes: '"help"', status: "Approved" },
//     { id: 4, name: "Alice Johnson", initial: "A", color: "bg-[#1967d2]", date: "Mar 16 – Mar 20, 2026", type: "Annual", notes: '"Family vacation"', status: "Rejected" },
// ];

export default function LeaveRequests() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        employees,
        leaveRequests,
        loading,
        addLeaveRequest,
        updateStatus,
        changeFilter,
        } = useLeaveRequest();

    const [filterOption, setFilterOption] = useState("All");
    
    const filterOptions = ["All", "Pending", "Approved", "Rejected"];

    // Filter the requests based on the dropdown selection
    // const filteredRequests = allRequests.filter(req => 
    //     filterOption === "All" ? true : req.status === filterOption
    // );
    const avatarColors = [
        "bg-blue-500", "bg-green-500", "bg-purple-500", 
        "bg-yellow-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
    ];

    const handleAddLeaveRequest = async(data : {
        employee_id: string;
        start_date: string;
        end_date: string;
        leave_type: string;
        notes?: string;
    }) => {
        try {
            await addLeaveRequest(data);
            toast.success("Leave request submitted");
            // Implementation for submitting a new leave request
        } catch (error : any) {
            console.error("Error submitting leave request:", error);
            toast.error(error)
            throw error;
        }
    };

    const handleStatusUpdate = async(id: string, status: "approve" | "reject") => {
        try {
            await updateStatus(id, status);
            toast.success(`Leave request ${status}d`);
        } catch (error : any) {
            console.error("Error updating leave request status:", error);
            toast.error(error);
        }
    };


    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    if (loading) {
        return (
            <div className="p-6 animate-pulse">
                Loading leave requests...
            </div>
        );
    }


    return (
        <div className="max-w-5xl mx-auto p-5 pb-10">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Leave Requests</h1>
                    <p className="text-gray-500 text-lg">{leaveRequests.length} total requests</p>
                </div>

                {/* Actions: Dropdown & New Request Button */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Dropdown
                    options={filterOptions}
                    value={filterOption}
                    onChange={(val) => {
                        setFilterOption(val);
                        changeFilter(val);
                    }}
                    />
                    
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#1967d2] hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex-1 sm:flex-none justify-center"
                    >
                        <Plus size={20} />
                        New Request
                    </button>
                </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
                {leaveRequests.map((req) => {
                    const initial = req.name ? req.name[0].toUpperCase() : "?";
                    const dateRange = `${formatDate(req.start_date)} – ${formatDate(req.end_date)}`
                    const randomColor = avatarColors[initial.charCodeAt(0) % avatarColors.length];
                    return (
                    <div key={req.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        
                        {/* Left Info Section */}
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${randomColor}`}>
                                {initial}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{req.name} - {req.email}</h3>
                                <p className="text-sm text-gray-500 mb-0.5">
                                    {dateRange} · {req.leave_type || "N/A"}
                                </p>
                                <p className="text-sm text-gray-400 italic">
                                    {req.notes}
                                </p>
                            </div>
                        </div>

                        {/* Right Action/Status Section */}
                        <div className="flex items-center gap-3 self-end sm:self-auto w-full sm:w-auto justify-end">
                            {req.status === "pending" && (
                                <>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 font-medium text-sm rounded-full mr-2">Pending</span>
                                    <button 
                                    onClick={() => handleStatusUpdate(req.id, "approve")}
                                    className="px-4 py-2 bg-[#1967d2] hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                                        Approve
                                    </button>
                                    <button 
                                    onClick={() => handleStatusUpdate(req.id, "reject")}
                                    className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors">
                                        Reject
                                    </button>
                                </>
                            )}
                            
                            {req.status === "approved" && (
                                <span className="px-4 py-1.5 bg-[#1967d2] text-white font-medium text-sm rounded-full">
                                    Approved
                                </span>
                            )}

                            {req.status === "rejected" && (
                                <span className="px-4 py-1.5 bg-[#dc2626] text-white font-medium text-sm rounded-full">
                                    Rejected
                                </span>
                            )}
                        </div>

                    </div>
                )})}
                
                {leaveRequests.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No requests found for "{filterOption}".
                    </div>
                )}
            </div>

            {/* Modal */}
            <SubmitRequest 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                addLeaveRequest={handleAddLeaveRequest}
                employees={employees}
            />
        </div>
    );
}