from typing import Dict
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from middleware.jwt_auth import get_user
from database.models.user import User
from database.init_db import get_session

# Request model for updating profile
class ProfileUpdate(BaseModel):
    username: str | None = None
    email: str | None = None

router = APIRouter();

@router.get("/profile")
async def profile(user = Depends(get_user)):
    """
    Retrieve the authenticated user's profile information.
    
    Args:
        user: Current authenticated user from JWT token
        
    Returns:
        User object with username, email, and password hash
    """
    return user

@router.post("/edit")
async def edit_profile(edited: ProfileUpdate, user = Depends(get_user), session: AsyncSession = Depends(get_session)) -> Dict:
    """
    Update the authenticated user's profile information.
    
    Args:
        edited: Profile update data (username and/or email)
        user: Current authenticated user from JWT token
        session: Async database session
        
    Returns:
        Success message with updated user details
    """
    print(user)
    print(edited)
    # Update username if provided
    if edited.username:
        user.username = edited.username
    
    # Update email if provided
    if edited.email:
        user.email = edited.email
    
    # Merge and commit changes to database
    await session.merge(user)
    await session.commit()
    await session.refresh(user)
    
    return {
        "message": "Profile updated successfully",
        "user": {
            "username": user.username,
            "email": user.email
        }
    }

    
@router.get("/check_auth")
async def check_auth(user = Depends(get_user)):
    if user:
        return {
            "success" : "true"
        }
    else:
        return {
            "success" : "false"
        }