from typing import Optional
from sqlmodel import SQLModel ,Field
import uuid
from pydantic import EmailStr
from datetime import datetime

class Employee(SQLModel, table=True):
    __tablename__ = "employees"

    id : uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    name : str = Field(..., index=True)
    email : EmailStr = Field(..., unique=True, index=True)
    department : str = Field(..., index=True)
    annual_leave_balance : int = Field(default=20)

    created_at : datetime = Field(default_factory=datetime.utcnow)
    updated_at : datetime = Field(default_factory=datetime.utcnow, sa_column_kwargs={"onupdate": datetime.utcnow},nullable=False)
    deleted_at : Optional[datetime] = Field(default=None, index=True)