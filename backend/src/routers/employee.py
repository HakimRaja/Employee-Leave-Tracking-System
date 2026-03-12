from fastapi import APIRouter,Depends
from src.database.connection import get_db_session
from sqlmodel.ext.asyncio.session import AsyncSession
from src.schemas.employee import EmployeeBase
from src.controllers.employee import (create_employee as create_employee_controller,
                                      list_employees as list_employees_controller,
                                      get_employee as get_employee_controller,
                                      delete_employee as delete_employee_controller)

router = APIRouter(prefix="/employee", tags=["employee"])
from uuid import UUID

# Endpoint to create a new employee (POST /employee)
@router.post("")
async def create_employee(data : EmployeeBase, session: AsyncSession = Depends(get_db_session)):
    """Create a new employee."""    
    return await create_employee_controller(data, session)

# Endpoint to list all employees (GET /employee/list)
@router.get("/list")
async def list_employees(session: AsyncSession = Depends(get_db_session)):
    """List all employees."""
    return await list_employees_controller(session)

# Endpoint to get employee details by ID (GET /employee/{employee_id})
@router.get("/{employee_id}")
async def get_employee(employee_id: UUID, session: AsyncSession = Depends(get_db_session)):
    """Get employee details by ID."""
    return await get_employee_controller(employee_id, session)

@router.delete("/{employee_id}")
async def delete_employee(employee_id: UUID, session: AsyncSession = Depends(get_db_session)):
    """Soft delete an employee by ID."""
    return await delete_employee_controller(employee_id, session)