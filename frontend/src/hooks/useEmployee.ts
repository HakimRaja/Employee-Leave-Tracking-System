import { useEffect, useState } from "react";
import { getEmplopyeesDetails, createEmployee } from "../api/employee";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  total_days: number;
  availed_leaves: number;
}

export const useEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const data = await getEmplopyeesDetails();

      setEmployees(data?.employees_details || []);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employeeData: {
    name: string;
    email: string;
    department: string;
    annual_leave_balance: number;
  }) => {
    try {
      const newEmployee = await createEmployee(employeeData);

      // optimistic update
    //   setEmployees((prev) => [...prev, newEmployee.employee]);
      await fetchEmployees();
      return newEmployee;
    } catch (err: any) {
      throw err;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    addEmployee,
    refreshEmployees: fetchEmployees,
  };
};