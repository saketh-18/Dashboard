import uuid
from sqlmodel import Field, SQLModel

class Task(SQLModel, table=True):
    # Generate UUIDs as strings so asyncpg binds to VARCHAR correctly
    id : str = Field(primary_key=True, default_factory=lambda: str(uuid.uuid4()))
    email : str = Field(foreign_key="user.email")
    name : str
    desc : str
    status : bool = Field(default=False)