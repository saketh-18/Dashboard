import uuid
from sqlmodel import SQLModel, Field


class User(SQLModel, table=True):
    username : str
    email : str = Field(primary_key=True)
    password : bytes
    
