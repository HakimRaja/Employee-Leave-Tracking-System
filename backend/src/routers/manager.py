from fastapi import APIRouter, Depends,HTTPException
from src.database.connection import get_db_session
from sqlmodel.ext.asyncio.session import AsyncSession
from src.controllers.manager import (manage_leave_request as manage_leave_request_controller)
from src.schemas.manager import ManagerActionData

app = APIRouter(prefix="/manager", tags=["manager operations"])

@app.patch("/leave-request/{request_id}")
async def manage_leave_request(request_id: str, data: ManagerActionData, session: AsyncSession = Depends(get_db_session)):
    try:
        if data.status not in ["approve", "reject"]:
            raise HTTPException(status_code=400, detail="Invalid status. Use 'approve' or 'reject'.")
        return await manage_leave_request_controller(request_id, data.status, session)
    except HTTPException as e:
        raise