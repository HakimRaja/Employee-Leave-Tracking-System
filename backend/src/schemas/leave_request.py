from pydantic import BaseModel
from datetime import date

class LeaveRequestBase(BaseModel):
    """Base model for LeaveRequest."""
    employee_id: str
    start_date: date
    end_date: date
    leave_type: str
    notes: str

    class Config:
        json_scheme_example = {
            "employee_id": "123e4567-e89b-12d3-a456-426614174000",
            "start_date": "2024-07-01",
            "end_date": "2024-07-10",
            "leave_type": "Annual Leave",
            "notes": "Family vacation"
        }

