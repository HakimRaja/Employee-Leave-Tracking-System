from fastapi import status,HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from src.models.employee import Employee
from src.models.leave_request import LeaveRequest
from sqlmodel import select,func

async def get_dashboard_data(session: AsyncSession):
    try:
        # Total number of employees
        total_employees_result = await session.exec(select(func.count(Employee.id)).where(Employee.deleted_at.is_(None)))
        total_employees = total_employees_result.first()

        # Total number of leave requests
        total_leave_requests_result = await session.exec(select(func.count(LeaveRequest.id)).where(LeaveRequest.deleted_at.is_(None)))
        total_leave_requests = total_leave_requests_result.first()

        # Number of pending leave requests
        pending_leave_requests_result = await session.exec(select(func.count(LeaveRequest.id)).where(LeaveRequest.status == 'pending',LeaveRequest.deleted_at.is_(None)))
        pending_leave_requests = pending_leave_requests_result.first()

        # Number of approved leave requests
        approved_leave_requests_result = await session.exec(select(func.count(LeaveRequest.id)).where(LeaveRequest.status == 'approved',LeaveRequest.deleted_at.is_(None)))
        approved_leave_requests = approved_leave_requests_result.first()

        return {
            "total_employees": total_employees,
            "total_leave_requests": total_leave_requests,
            "approved_leave_requests": approved_leave_requests,
            "pending_leave_requests": pending_leave_requests
        }
    except Exception as e:
        print(f"Error fetching dashboard data: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong while fetching the dashboard data.")