import api from "./api";

export const getEmplopyeesDetails = async () => {
  try {
    const response = await api.get("/employee/details-all");
    return response.data;
  } catch (error : any) {
    console.error("Error fetching employee details:", error);
    throw  error?.response?.data?.detail || error?.response?.data?.detail?.msg || error;
  }
};

export const createEmployee = async (employeeData: { name: string; email: string; department: string; annual_leave_balance: number }) => {
  try {
    const response = await api.post("/employee", employeeData);
    return response.data;
  }
    catch (error : any) {
    console.error("Error creating employee:", error);
    throw error?.response?.data?.detail || error?.response?.data?.detail?.msg || error;
    }
}