from fastapi import APIRouter
from .auth.controller import register, login, logout, refresh_token

router = APIRouter()

router.post("/api/auth/register", response_model=dict)(register)
router.post("/api/auth/login", response_model=dict)(login)
router.post("/api/auth/logout")(logout)
router.post("/api/auth/refresh-token", response_model=dict)(refresh_token)