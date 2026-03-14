import api from "./api";

export const getEmployees = async () => {
  try {
    const response = await api.get("/employee/list");
    return response.data;
  }
  catch(error : any) { 
    console.error("Error fetching employees:", error);
    throw error?.response?.data?.detail || error?.response?.data?.detail?.msg || error;
    }
};

export const getLeaveRequests = async(status : string | null=null)=>{
    try {
        const response = await api.get("/leave-request",{params : {type: status}});
        return response.data;
    } catch (error : any) {
        console.error("Error fetching leave requests:", error);
        throw error?.response?.data?.detail || error?.response?.data?.detail?.msg || error;
    }
}

export const createLeaveRequest = async (data: {
  employee_id: string;
  start_date: string;
  end_date: string;
  leave_type: string;
  notes?: string;
}) => {
  try {
    const response = await api.post("/leave-request", data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating leave request:", error);
    throw error?.response?.data?.detail || error;
  }
};
