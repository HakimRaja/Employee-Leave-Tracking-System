import { Link,useLocation } from "react-router-dom";
import { LayoutDashboard, Users, CalendarDays, FileText } from "lucide-react";

export default function Sidebar() {
    const location = useLocation();
    return (
        <>
        {/* Sidebar */}
        <div className=" hidden w-64 min-h-screen bg-gray-900 text-white md:flex flex-col p-5">
            <h1 className="text-2xl font-bold gap-4 m-2 pb-3"><CalendarDays className="inline-block"/> Leave Tracker</h1>
            <nav className="flex flex-col gap-4">
                <Link 
                    to="/" 
                    className={`p-2 rounded ${location.pathname === '/' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><LayoutDashboard className="inline-block"/> Dashboard</Link>
                <Link 
                    to="/employees" 
                    className={`p-2 rounded ${location.pathname === '/employees' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><Users className="inline-block"/> Employees</Link>
                <Link 
                    to="/requests" 
                    className={`p-2 rounded ${location.pathname === '/requests' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><FileText className="inline-block"/> Requests</Link>
                <Link 
                    to="/calendar" 
                    className={`p-2 rounded ${location.pathname === '/calendar' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><CalendarDays className="inline-block"/> Calendar</Link>
            </nav>
        </div>
        {/* Mobile Sidebar */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-t border-border flex justify-around py-2 bg-gray-900 text-white">
            {/* <h1 className="text-xl font-bold"><CalendarDays className="inline-block"/> Leave Tracker</h1> */}
                
                <Link 
                    to="/" 
                    className={`p-2 rounded ${location.pathname === '/' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><LayoutDashboard className="inline-block"/> Dashboard</Link>
                <Link 
                    to="/employees" 
                    className={`p-2 rounded ${location.pathname === '/employees' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><Users className="inline-block"/> Employees</Link>
                <Link 
                    to="/requests" 
                    className={`p-2 rounded ${location.pathname === '/requests' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><FileText className="inline-block"/> Requests</Link>
                <Link 
                    to="/calendar" 
                    className={`p-2 rounded ${location.pathname === '/calendar' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}><CalendarDays className="inline-block"/> Calendar</Link>
            
        </div>
        </>
    );
}