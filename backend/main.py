from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.employee import router as employee_router
from src.routers.leave_request import app as leave_request_router
from src.routers.manager import app as manager_router

from src.database.connection import test_connection

app = FastAPI(title="Employee Leave Tracking System", version="1.0", description="API for managing employee leave requests and approvals.")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.on_event("startup")
async def startup_event():
    """
    Runs tasks when the application starts: testing connection and 
    creating database tables.
    """
    print("🚀 Running startup sequence...")
    
    # 1. Test connection (will exit if connection fails)
    await test_connection()
    
    # 2. Create tables
    # await create_db_and_tables()
    
    print("✅ Startup sequence complete.")

@app.get("/")
async def root():
    return {"message": "Welcome to the Employee Leave Tracking System API!"}

app.include_router(employee_router)
app.include_router(leave_request_router)
app.include_router(manager_router)