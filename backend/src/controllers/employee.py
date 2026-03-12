from fastapi import status,HTTPException
from src.models.employee import Employee
from sqlmodel.ext.asyncio.session import AsyncSession
from src.schemas.employee import EmployeeBase
from sqlmodel import select
from datetime import datetime
from uuid import UUID

async def create_employee(data : EmployeeBase, session: AsyncSession):
    try:
        # Check if an employee with the same email already exists
        result = await session.exec(select(Employee).where(Employee.email == data.email,Employee.deleted_at.is_(None)))
        if result.first():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="An employee with this email already exists.")
        new_employee = Employee.validate(data.dict())
        session.add(new_employee)
        await session.commit()
        await session.refresh(new_employee)

        return {"message": "Employee created successfully.", "employee": new_employee}
    except HTTPException as e:
        raise 
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong while creating the employee.")
    
async def list_employees(session: AsyncSession):
    try:
        result = await session.exec(select(Employee.id,Employee.name,Employee.email
                                           ).where(Employee.deleted_at.is_(None))
                                           ).order_by(Employee.created_at.desc())
        
        employees = result.mappings().all()
        # print(f"Retrieved ({employees} )employees from the database.")
        return {"employees": employees}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Something went wrong while fetching the employee list.{e}")
    
async def get_employee(employee_id: UUID, session: AsyncSession):
    try:
        result = await session.exec(select(Employee).where(Employee.id == employee_id,Employee.deleted_at.is_(None)))
        employee = result.first()
        if not employee:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found.")
        return {"employee": employee}
    except HTTPException as e:
        raise 
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong while fetching the employee details.")
    
async def delete_employee(employee_id: UUID, session: AsyncSession):
    try:
        result = await session.exec(select(Employee).where(Employee.id == employee_id,Employee.deleted_at.is_(None)))
        employee = result.first()
        if not employee:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found.")
        employee.deleted_at = datetime.utcnow()
        session.add(employee)
        await session.commit()
        return {"message": "Employee deleted successfully."}
    except HTTPException as e:
        raise 
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong while deleting the employee.")