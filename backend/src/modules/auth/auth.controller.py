from fastapi import HTTPException, Depends
from . import auth_service
from models.user import UserCreate, UserOut

async def register(user: UserCreate):
    return await auth_service.register_user(user)

async def login(user: UserCreate):
    return await auth_service.authenticate_user(user)

async def logout():
    # Implement logout logic if needed
    return {"msg": "Logged out"}

async def refresh(token: str):
    return await auth_service.refresh_token(token)