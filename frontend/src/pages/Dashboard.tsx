import { Users, CalendarDays, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

// 1. Define the exact strings allowed as labels
type StatLabel = 'Employees' | 'Pending' | 'Approved' | 'Total Requests';

// 2. Define the shape of a single stat object
interface StatConfig {
    label: StatLabel;
    value: string;
}

export default function Dashboard() {
    const pendingRequests = [
    {
        id: 1,
        name: "Bob Smith",
        initial: "B",
        date: "Mar 18 – Mar 17",
        type: "Sick",
        avatarColor: "bg-[#2ba57d]", // Matches the teal color in your image
    }
];
    const icons : Record<StatLabel, React.ReactNode> = {
        Employees: <Users size={32} className="text-blue-500" />,
        Pending: <Clock size={32} className="text-yellow-500" />,
        Approved: <CheckCircle size={32} className="text-green-500" />,
        "Total Requests": <CalendarDays size={32} className="text-gray-500" />,
    };
    const stats : StatConfig[] = [
        {
        label: 'Employees',
        value: '3',
        },
        {
        label: 'Pending',
        value: '0'
        },
        {
        label: 'Approved',
        value: '4',
        },
        {
        label: 'Total Requests',
        value: '5',
        },
    ];
    return (
        <div>
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
            <p>Overview of leave management</p>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        {icons[stat.label]}
                        <div>
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
                        {pendingRequests.map((req) => (
                            <div key={req.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                                {/* Left Side: Avatar & Info */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${req.avatarColor}`}>
                                        {req.initial}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{req.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {req.date} · {req.type}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side: Actions */}
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-[#1967d2] hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                                        Approve
                                    </button>
                                    <button className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex gap-4">
                    <Link 
                        to="/employees" 
                        className="px-5 py-2.5  hover:bg-gray-700 hover:text-white text-black font-medium rounded-md transition-all duration-300 ease-in-out inline-block border"
                    >
                        Manage Employees
                    </Link>
                    <Link 
                        to="/requests" 
                        className="px-5 py-2.5  hover:bg-gray-700 hover:text-white text-black font-medium rounded-md transition-all duration-300 ease-in-out inline-block border"
                    >
                        View All Requests
                    </Link>
                </div>
        </div>
    );
}