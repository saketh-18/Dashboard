from typing import Dict, List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database.models.tasks import Task
from database.init_db import get_session
from middleware.jwt_auth import get_user

# Request model for creating tasks
class TaskCreate(BaseModel):
    name: str
    desc: str
    status: bool = False

class TaskUpdate(BaseModel):
    name: str | None = None
    desc: str | None = None
    status: bool | None = None

router = APIRouter();

@router.get("/tasks")
async def get_tasks(user = Depends(get_user), session: AsyncSession = Depends(get_session)) -> List[Task]:
    """
    Retrieve all tasks for the authenticated user based on their email.
    
    Args:
        user: Current authenticated user from JWT token
        session: Async database session
        
    Returns:
        List of Task objects belonging to the user
    """
    # Query tasks where email matches the authenticated user's email
    statement = select(Task).where(Task.email == user.email)
    result = await session.execute(statement)
    tasks = result.scalars().all()
    
    return tasks # type: ignore

@router.post("/tasks")
async def add_task(task: TaskCreate, user = Depends(get_user), session: AsyncSession = Depends(get_session)) -> Dict:
    """
    Create a new task for the authenticated user.
    
    Args:
        task: Task creation data (name, desc, status)
        user: Current authenticated user from JWT token
        session: Async database session
        
    Returns:
        Success message with task details
    """
    # Create new task with the authenticated user's email
    new_task = Task(
        name=task.name,
        desc=task.desc,
        status=task.status,
        email=user.email
    )
    
    # Add and commit the task to database
    session.add(new_task)
    await session.commit()
    await session.refresh(new_task)
    
    return {
        "message": "Task created successfully",
        "task": {
            "id": new_task.id,
            "name": new_task.name,
            "desc": new_task.desc,
            "status": new_task.status,
            "email": new_task.email
        }
    }


@router.put("/tasks/{task_id}")
async def update_task(task_id: str, updates: TaskUpdate, user = Depends(get_user), session: AsyncSession = Depends(get_session)) -> Dict:
    # Fetch task and ensure it belongs to the user
    db_task = await session.get(Task, task_id)
    if not db_task or db_task.email != user.email:
        raise HTTPException(status_code=404, detail="Task not found")

    if updates.name is not None:
        db_task.name = updates.name
    if updates.desc is not None:
        db_task.desc = updates.desc
    if updates.status is not None:
        db_task.status = updates.status

    session.add(db_task)
    await session.commit()
    await session.refresh(db_task)

    return {"task": db_task}


@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str, user = Depends(get_user), session: AsyncSession = Depends(get_session)) -> Dict:
    db_task = await session.get(Task, task_id)
    if not db_task or db_task.email != user.email:
        raise HTTPException(status_code=404, detail="Task not found")

    await session.delete(db_task)
    await session.commit()

    return {"message": "Task deleted"}
