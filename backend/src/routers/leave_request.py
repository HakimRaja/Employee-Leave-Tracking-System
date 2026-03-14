from fastapi import APIRouter, Depends,HTTPException, status
from src.database.connection import get_db_session
from sqlmodel.ext.asyncio.session import AsyncSession
from src.schemas.leave_request import LeaveRequestBase
from src.controllers.leave_request import (create_leave_request as create_leave_request_controller
                                           ,list_leave_requests as list_leave_requests_controller)

app = APIRouter(prefix="/leave-request", tags=["leave-request"])

# Endpoint to create a new leave request (POST /leave-request)
@app.post("")
async def create_leave_request(leave_data : LeaveRequestBase,session: AsyncSession = Depends(get_db_session)):
    return await create_leave_request_controller(leave_data, session)

# Endpoint to list all leave requests (GET /leave-request)
@app.get("")
async def list_leave_requests(type:  str = None, session: AsyncSession = Depends(get_db_session)):
    try:
        if type and type not in ["pending", "approved", "rejected"]:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid type filter. Allowed values are 'pending', 'approved', 'rejected'.")
        return await list_leave_requests_controller(type, session)
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Something went wrong while fetching the leave requests.{e}")