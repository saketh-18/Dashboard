import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
    elif DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    if "sslmode=" in DATABASE_URL:
        base_url = DATABASE_URL.split("?")[0]
        DATABASE_URL = base_url
else:
    DATABASE_URL = "postgresql+asyncpg://postgres:saketh@localhost:5432/Dashboard"

engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    future=True,
    connect_args={
        "ssl": True
    }
)

async_session = async_sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)

async def get_session():
    async with async_session() as session:
        yield session