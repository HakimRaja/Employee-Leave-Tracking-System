from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine
from sqlalchemy.orm import sessionmaker
from src.config.settings import Settings
from sqlalchemy import text

settings = Settings()

# Database URL (must be asynchronous)
DATABASE_URL = str(settings.DATABASE_URL)

# Create the asynchronous engine
engine = create_async_engine(DATABASE_URL, echo=False,future = True)

# async session maker
async_session_maker = sessionmaker(bind = engine,expire_on_commit=False,class_=AsyncSession)

# dependency to get async session
async def get_db_session():
    async with async_session_maker() as session:
        yield session

# Function to initialize the database
async def test_connection():
    print("Testing database connection...")
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        print("✅ Database connection successful!")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        raise e

# Create all tables (async version)
async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)