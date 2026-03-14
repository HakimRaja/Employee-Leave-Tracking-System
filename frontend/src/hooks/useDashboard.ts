import { useEffect,useState } from "react";
import { getDashboardData,
    getPendingRequests,
    updateLeaveRequestStatus }
     from "../api/dashboard";

interface PendingRequest {
    id: string;
    employee_id: string;
    name: string;
    email: string;
    department: string;
    annual_leave_balance: number;
    start_date: string;
    end_date: string;
    leave_type: string;
    notes: string;
    status: string;
}

interface Stats {
  total_employees: number;
  pending_leave_requests: number;
  approved_leave_requests: number;
  total_leave_requests: number;
}

export const useDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [statsData, pendingData] = await Promise.all([
        getDashboardData(),
        getPendingRequests(),
      ]);

      setStats(statsData);
      setPendingRequests(pendingData.leave_requests || []);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: "approve" | "reject") => {
    try {
      await updateLeaveRequestStatus(id, status);

      // Optimistic update for better UX
      setPendingRequests((prev) =>
        prev.filter((req) => req.id !== id)
      );

      // Refresh stats
      fetchDashboard();
    } catch (err: any) {
      console.error("Failed to update request status", err);
      throw err
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    stats,
    pendingRequests,
    loading,
    error,
    approveRequest: (id: string) => handleUpdateStatus(id, "approve"),
    rejectRequest: (id: string) => handleUpdateStatus(id, "reject"),
    refreshDashboard: fetchDashboard,
  };
};
