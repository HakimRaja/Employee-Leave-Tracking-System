import { Users, CalendarDays, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import { toast } from "sonner";

export default function Dashboard() {
    const {
        stats,
        pendingRequests,
        loading,
        approveRequest,
        rejectRequest
    } = useDashboard();

    // Helper to format dates from "2026-03-17" to "Mar 17"
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Array of Tailwind colors for the avatars
    const avatarColors = [
        "bg-blue-500", "bg-green-500", "bg-purple-500", 
        "bg-yellow-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
    ];

    if (loading) {
        return (
            <div className="p-6 animate-pulse">
                Loading dashboard...
            </div>
        );
    }

    // 1. Map the incoming backend stats object directly to an array for rendering
    const statsData = [
        { label: "Employees", value: stats?.total_employees || 0, icon: <Users size={32} className="text-blue-500" /> },
        { label: "Pending", value: stats?.pending_leave_requests || 0, icon: <Clock size={32} className="text-yellow-500" /> },
        { label: "Approved", value: stats?.approved_leave_requests || 0, icon: <CheckCircle size={32} className="text-green-500" /> },
        { label: "Total Requests", value: stats?.total_leave_requests || 0, icon: <CalendarDays size={32} className="text-gray-500" /> },
    ];
    const handleApprove = async(id: string) =>{
        try {
            await approveRequest(id);
            toast.success("Leave request approved");
        } catch (error : any) {
            toast.error(error);
        }
        
    } 
    const handleReject = async(id: string) =>{
        try {
            await rejectRequest(id);
            toast.success("Leave request rejected");
        } catch (error : any) {
            toast.error(error);
        }
         }

    // Extract the array from the backend payload safely
    const requestsList = pendingRequests|| [];

    return (
        <div>
            <div className="p-5">
                <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
                <p>Overview of leave management</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between">
                            {stat.icon}
                            <div className="text-right">
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pending Requests Block */}
            <div className="p-5">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-5">Pending Requests</h2>

                    <div className="space-y-3">
                        {requestsList.map((req: any, index: number) => {
                            // Calculate values directly inside the map loop
                            const initial = req.name ? req.name[0].toUpperCase() : "?";
                            const dateRange = `${formatDate(req.start_date)} – ${formatDate(req.end_date)}`;
                            // Use the index to pick a color so it stays consistent on re-renders
                            const randomColor = avatarColors[initial.charCodeAt(0) % avatarColors.length];

                            return (
                                <div key={req.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                                    {/* Left Side: Avatar & Info */}
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${randomColor}`}>
                                            {initial}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{req.name} - {req.email}</p>
                                            <p className="text-sm text-gray-500">
                                                {dateRange} · {req.leave_type || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Side: Actions (Transitions removed based on your previous request) */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleApprove(req.id)}
                                            className="px-4 py-2 bg-[#1967d2] hover:bg-blue-700 text-white text-sm font-medium rounded-md">
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(req.id)}
                                            className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Fallback if no pending requests exist */}
                        {requestsList.length === 0 && (
                            <p className="text-gray-500">No pending leave requests at the moment.</p>
                        )}
                    </div>
                </div>

                {/* Bottom Navigation Buttons (Transitions removed) */}
                <div className="flex gap-4">
                    <Link
                        to="/employees"
                        className="px-5 py-2.5 hover:bg-gray-700 hover:text-white text-black font-medium rounded-md inline-block border"
                    >
                        Manage Employees
                    </Link>
                    <Link
                        to="/requests"
                        className="px-5 py-2.5 hover:bg-gray-700 hover:text-white text-black font-medium rounded-md inline-block border"
                    >
                        View All Requests
                    </Link>
                </div>
            </div>
        </div>
    );
}