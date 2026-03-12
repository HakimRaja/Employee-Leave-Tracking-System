from fastapi import APIRouter, Depends
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
async def list_leave_requests(session: AsyncSession = Depends(get_db_session)):
    return await list_leave_requests_controller(session)