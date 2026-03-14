from pydantic import BaseModel, Field

class ManagerActionData(BaseModel):
    status: str = Field(..., description="The new status for the leave request")
    class Config:
        schema_extra = {
            "example": {
                "status": "approve"
            }
        }