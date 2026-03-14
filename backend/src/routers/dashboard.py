from fastapi import APIRouter, Depends
from src.database.connection import get_db_session
from sqlmodel.ext.asyncio.session import AsyncSession
from src.controllers.dashboard import get_dashboard_data as get_dashboard_data_controller

app = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@app.get("/stats")
async def read_dashboard_data(session: AsyncSession = Depends(get_db_session)):
    return await get_dashboard_data_controller(session)