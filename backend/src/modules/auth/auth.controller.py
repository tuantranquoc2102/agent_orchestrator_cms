from fastapi import HTTPException, Depends
from .auth.service import create_user, authenticate_user, logout_user, refresh_jwt
from modules.auth.auth.models import User
from fastapi.security import OAuth2PasswordRequestForm

async def register(user: User):
    return await create_user(user)

async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return user

async def logout(current_user: User = Depends(get_current_user)):
    return await logout_user(current_user)

async def refresh_token(current_user: User = Depends(get_current_user)):
    return await refresh_jwt(current_user)