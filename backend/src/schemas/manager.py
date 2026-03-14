from sqlmodel import BaseModel, Field

class ManagerActionData(BaseModel):
    status: str = Field(..., description="The new status for the leave request")