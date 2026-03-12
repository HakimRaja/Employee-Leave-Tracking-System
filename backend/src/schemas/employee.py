from typing import Optional
from pydantic import BaseModel, EmailStr

class EmployeeBase(BaseModel):
    """Base model for Employee."""
    name: str
    email: EmailStr
    department: str
    annual_leave_balance: int = 20
    class Config:
        json_scheme_example = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "department": "Engineering",
            "annual_leave_balance": 20
        }
