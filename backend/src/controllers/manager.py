from fastapi import APIRouter,HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from src.models.leave_request import LeaveRequest

async def manage_leave_request(request_id: str, action: str, session: AsyncSession):
    try:
        result = await session.exec(select(LeaveRequest).where(LeaveRequest.id == request_id,
                                                                LeaveRequest.status == "pending",
                                                                LeaveRequest.deleted_at.is_(None)))
        leave_request = result.first()
        
        if not leave_request:
            raise HTTPException(status_code=404, detail="Leave request not found.")
        
        if action == "approve":
            leave_request.status = "approved"
        elif action == "reject":
            leave_request.status = "rejected"
        
        session.add(leave_request)
        await session.commit()
        return {"message": f"Leave request {action}d successfully."}
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Something went wrong while managing the leave request.")