from typing import Optional
from sqlmodel import SQLModel ,Field
import uuid
from datetime import datetime

class LeaveRequest(SQLModel, table=True):
    __tablename__ = "leave_requests"

    id : uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    employee_id : uuid.UUID = Field(...,foreign_key="employees.id",index=True)
    start_date : datetime = Field(..., index=True)
    end_date : datetime = Field(..., index=True)
    leave_type : str = Field(..., index=True)
    notes : str = Field(...)
    status : str = Field(default="pending", index=True)

    created_at : datetime = Field(default_factory=datetime.utcnow)
    updated_at : datetime = Field(default_factory=datetime.utcnow, sa_column_kwargs={"onupdate": datetime.utcnow},nullable=False)
    deleted_at : Optional[datetime] = Field(default=None, index=True)