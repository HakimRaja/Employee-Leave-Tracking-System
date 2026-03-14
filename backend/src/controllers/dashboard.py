from fastapi import status,HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from src.models.employee import Employee
from src.models.leave_request import LeaveRequest
from sqlmodel import select,func

async def get_dashboard_data(session: AsyncSession):
    try:
        # Total number of employees
        total_employees_result = await session.exec(select(func.count(Employee)).where(Employee.deleted_at.is_(None)))
        total_employees = total_employees_result.first().count()

        # Total number of leave requests
        total_leave_requests_result = await session.exec(select(func.count(LeaveRequest)).where(LeaveRequest.deleted_at.is_(None)))
        total_leave_requests = total_leave_requests_result.first().count()

        # Number of pending leave requests
        pending_leave_requests_result = await session.exec(select(func.count(LeaveRequest)).where(LeaveRequest.status == 'pending'))
        pending_leave_requests = pending_leave_requests_result.first().count()

        # Number of approved leave requests
        approved_leave_requests_result = await session.exec(select(func.count(LeaveRequest)).where(LeaveRequest.status == 'approved'))
        approved_leave_requests = approved_leave_requests_result.first().count()

        return {
            "total_employees": total_employees,
            "total_leave_requests": total_leave_requests,
            "approved_leave_requests": approved_leave_requests,
            "pending_leave_requests": pending_leave_requests
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong while fetching the dashboard data.")