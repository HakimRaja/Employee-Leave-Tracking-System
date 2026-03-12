from fastapi import status,HTTPException
from src.models.employee import Employee
from src.models.leave_request import LeaveRequest
from sqlmodel.ext.asyncio.session import AsyncSession
from src.schemas.leave_request import LeaveRequestBase
from sqlmodel import select,func
from datetime import datetime,timedelta

# Create a new leave request
async def create_leave_request(leave_data : LeaveRequestBase,session: AsyncSession):
    try:
        # Check if the employee exists and is not deleted
        result = await session.exec(select(Employee).where(Employee.id == leave_data.employee_id, Employee.deleted_at.is_(None)))
        employee = result.first()
        
        if not employee:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found.")
        
        total = (await session.exec(select(func.sum(LeaveRequest.end_date - LeaveRequest.start_date
                                              ).label("total_leave_days"),func.count().label("total_leave_requests")).where(
                                                LeaveRequest.employee_id == leave_data.employee_id,
                                                LeaveRequest.deleted_at.is_(None), 
                                                LeaveRequest.status != "rejected"))).first()
        
        total_leave_days = total.total_leave_days + total.total_leave_requests if total.total_leave_days else 0
        # Validate leave request data
        if leave_data.start_date > leave_data.end_date:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Start date cannot be after end date.")
        
        if leave_data.start_date < employee.created_at.date():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Start date cannot be before employee creation date.")
        
        if leave_data.start_date < datetime.utcnow().date():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Start date cannot be in the past.")
        
        leave_days = (leave_data.end_date - leave_data.start_date).days + 1
        # print(f"Calculated leave days: {leave_days}")
        if (leave_days + total_leave_days ) > employee.annual_leave_balance:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Leave duration cannot exceed annual leave balance.{employee.annual_leave_balance - total_leave_days} days remaining.")
        
        # check overlapping leave
        overlap_leave = (
            await session.exec(
                select(LeaveRequest).where(
                    LeaveRequest.employee_id == leave_data.employee_id,
                    LeaveRequest.deleted_at.is_(None),
                    LeaveRequest.start_date <= leave_data.end_date,
                    LeaveRequest.end_date >= leave_data.start_date,
                    LeaveRequest.status != "rejected"
                )
            )
        ).first()

        if overlap_leave:
            raise HTTPException(
                status_code=400,
                detail="Leave request overlaps with existing leave."
            )

        # employee.annual_leave_balance -= leave_days
        
        new_leave_request = LeaveRequest.validate(leave_data.dict())
        session.add(new_leave_request)

        await session.commit()
        await session.refresh(new_leave_request)

        return {"message": "Leave request created successfully.", "leave_request": new_leave_request, "remaining_leave_balance": employee.annual_leave_balance - (total_leave_days + leave_days)}
    except HTTPException as e:
        raise 
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Something went wrong while creating the leave request.{e}")

# List leave requests with employee details
async def list_leave_requests(session: AsyncSession):
    try:
        result = await session.exec(select(LeaveRequest.id,LeaveRequest.employee_id,Employee.name,Employee.email,Employee.department,Employee.annual_leave_balance,
                                           LeaveRequest.start_date,LeaveRequest.end_date,
                                           LeaveRequest.leave_type,LeaveRequest.notes,
                                           LeaveRequest.status).join(Employee, LeaveRequest.employee_id == Employee.id)
                                           .where(LeaveRequest.deleted_at.is_(None), Employee.deleted_at.is_(None))
                                           ).order_by(LeaveRequest.created_at.desc())
        leave_requests = result.mappings().all()
        return {"leave_requests": leave_requests}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Something went wrong while fetching the leave requests.{e}")