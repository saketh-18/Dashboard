from typing import Dict
import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import jwt
from sqlalchemy.ext.asyncio import AsyncSession

from middleware.jwt_auth import ALGO, SECRET
from database.init_db import get_session
from database.models.user import User

router = APIRouter();

class Cred(BaseModel):
    email : str
    password: str
    
    
@router.post("/login")
async def login(cred : Cred, session : AsyncSession = Depends(get_session)) -> Dict:
    # fetch password from db and verify
    pass_bytes = cred.password.encode('utf-8');
    user = await session.get(User, cred.email)
    if not user:
        raise HTTPException(status_code=404, detail="User with email not found")
    is_valid = bcrypt.checkpw(password=pass_bytes, hashed_password=user.password)
    
    if not is_valid:
        raise HTTPException(status_code=404, detail="Wrong Password");
    # token generation
    token = jwt.encode(key=SECRET, algorithm=ALGO, payload={"email":cred.email});
    
    return {
        "token" : token
    }