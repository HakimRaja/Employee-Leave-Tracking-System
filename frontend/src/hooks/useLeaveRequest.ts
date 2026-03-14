import { useEffect, useState } from "react";
import {
  getEmployees,
  getLeaveRequests,
  createLeaveRequest,
} from "../api/leaveRequest";
import{updateLeaveRequestStatus} from "../api/dashboard";
interface Employee {
  id: string;
  name: string;
  email: string;
}

interface LeaveRequest {
  id: string;
  employee_id: string;
  name: string;
  email: string;
  department: string;
  start_date: string;
  end_date: string;
  leave_type: string;
  notes: string;
  status: string;
}

export const useLeaveRequest = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data?.employees || []);
    } catch (error) {
      console.error(error);
    }
  };

  const addLeaveRequest = async (data: {
  employee_id: string;
  start_date: string;
  end_date: string;
  leave_type: string;
  notes?: string;
}) => {
  try {
    const newRequest = await createLeaveRequest(data);

    // setLeaveRequests((prev) => [
    //   newRequest.leave_request,
    //   ...prev,
    // ]);
    await fetchLeaveRequests(statusFilter)

    return newRequest;
  } catch (error) {
    throw error;
  }
};

  const fetchLeaveRequests = async (status: string | null = null) => {
    try {
      setLoading(true);
      const data = await getLeaveRequests(status);
      setLeaveRequests(data?.leave_requests || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "approve" | "reject") => {
    try {
      await updateLeaveRequestStatus(id, status);

    //   setLeaveRequests((prev) =>
    //     prev.map((req) =>
    //       req.id === id
    //         ? { ...req, status: status === "approve" ? "approved" : "rejected" }
    //         : req
    //     )
    //   );
      await fetchLeaveRequests(statusFilter)
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchLeaveRequests();
  }, []);

  const changeFilter = (filter: string) => {
    if (filter === "All") {
      setStatusFilter(null);
      fetchLeaveRequests(null);
    } else {
      setStatusFilter(filter.toLowerCase());
      fetchLeaveRequests(filter.toLowerCase());
    }
  };

  return {
    employees,
    leaveRequests,
    loading,
    addLeaveRequest,
    updateStatus,
    changeFilter,
    statusFilter,
  };
};