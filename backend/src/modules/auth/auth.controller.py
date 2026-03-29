from fastapi import Request, Depends
from .auth.service import AuthService
from .auth.schemas import UserCreate, UserLogin

class AuthController:
    @staticmethod
    async def register(user: UserCreate):
        return await AuthService.register(user)

    @staticmethod
    async def login(user: UserLogin):
        return await AuthService.login(user)

    @staticmethod
    async def logout():
        return {"message": "Logged out"}

    @staticmethod
    async def refresh():
        return await AuthService.refresh()