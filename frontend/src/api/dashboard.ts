import api from "./api";

export const getDashboardData = async () => {
  try {
    const response = await api.get("/dashboard/stats");
    return response.data;
  } catch (error : any) {
    console.error("Error fetching dashboard data:", error);
    throw error?.response?.data?.detail || error?.response?.data?.detail?.msg || error;
  }
};

export const getPendingRequests = async () => {
  try {
    const response = await api.get("/leave-request", { params: { type: "pending" } });
    return response.data;
  } catch (error : any) {
    console.error("Error fetching pending requests:", error);
    throw error?.response?.data?.detail || error?.response?.data?.detail?.msg || error;
  }
};

export const updateLeaveRequestStatus = async (requestId: string, status: string) => {
  try {
    const response = await api.patch(`/manager/leave-request/${requestId}`, { status });
    console.log("Leave request status updated successfully:", response.data);
    return response.data;
  } catch (error : any) {
    console.error("Error updating leave request status:", error);
    console.log(error)
    throw error?.response?.data?.detail || error?.response?.data?.detail?.msg || error;
  }
};
