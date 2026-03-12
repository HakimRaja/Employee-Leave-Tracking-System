from fastapi import APIRouter, Depends,HTTPException
from src.database.connection import get_db_session
from sqlmodel.ext.asyncio.session import AsyncSession

app = APIRouter(prefix="/manager", tags=["manager operations"])

@app.patch("/leave-request/{request_id}/{action}")
async def manage_leave_request(request_id: str, action: str, session: AsyncSession = Depends(get_db_session)):
    try:
        if action not in ["approve", "reject"]:
            raise HTTPException(status_code=400, detail="Invalid action. Use 'approve' or 'reject'.")
        return
    except HTTPException as e:
        raise