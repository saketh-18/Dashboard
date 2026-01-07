from typing import Dict
import bcrypt
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from database.models.user import User
from database.init_db import get_session

class Sign_up_cred(BaseModel):
    username : str
    email : str
    password : str | bytes

router = APIRouter();

@router.post("/signup")
async def signup(user : Sign_up_cred, session : AsyncSession = Depends(get_session)) -> Dict:
    pass_bytes = user.password.encode('utf-8') # type: ignore
    
    hashed = bcrypt.hashpw(password=pass_bytes, salt=bcrypt.gensalt());
    
    user_cred : User = User(
        username=user.username,
        email=user.email,
        password=hashed
    )
    
    session.add(user_cred)
    await session.commit()
    await session.refresh(user_cred)
    
    
    return {
        "message" : f"Hi, {user.username} you are succesfully signed up, go to login to get a jwt token"
    }