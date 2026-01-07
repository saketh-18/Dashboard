from contextlib import asynccontextmanager
from typing import Dict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from database.init_db import engine
from routes import signup
from routes import login
from routes import tasks
from routes import profile


@asynccontextmanager
async def lifespan(app : FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    
    yield
    await engine.dispose()

app = FastAPI(lifespan=lifespan);

# Allow frontend dev origin (adjust as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get("/test")
# def test_route(name : str = "") -> Dict:
#     return {
#         "message" : "route working..",
#         "name" : name
#     }


app.include_router(signup.router)
app.include_router(login.router)
app.include_router(tasks.router)
app.include_router(profile.router)