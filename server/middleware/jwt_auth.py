import email
import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from sqlalchemy.ext.asyncio import AsyncSession

from database.init_db import get_session
from database.models.user import User


# telling fastapi to look in authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET = os.getenv("JWT_SECRET", "strong_secret_key");
ALGO = "HS256"

async def get_user(token : str = Depends(oauth2_scheme), session : AsyncSession = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, key=SECRET, algorithms=[ALGO]);
        email : str = payload.get("email");
        if email is None:
            raise credentials_exception
        
    except:
        raise credentials_exception
    
    user = await session.get(User, email)
    if not user:
        raise HTTPException(status_code=404, detail="No User Found or Invalid Token")
    
    # Return ORM user so downstream dependencies can mutate/refresh
    return user
    
    