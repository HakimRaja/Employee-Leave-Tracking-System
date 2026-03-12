from fastapi import APIRouter, Depends,HTTPException
from src.database.connection import get_db_session
from sqlmodel.ext.asyncio.session import AsyncSession
from src.controllers.manager import (manage_leave_request as manage_leave_request_controller)

app = APIRouter(prefix="/manager", tags=["manager operations"])

@app.patch("/leave-request/{request_id}/{action}")
async def manage_leave_request(request_id: str, action: str, session: AsyncSession = Depends(get_db_session)):
    try:
        if action not in ["approve", "reject"]:
            raise HTTPException(status_code=400, detail="Invalid action. Use 'approve' or 'reject'.")
        return await manage_leave_request_controller(request_id, action, session)
    except HTTPException as e:
        raise