from fastapi import APIRouter
from .auth.controller import AuthController

router = APIRouter()

router.post("/api/auth/register", response_model=dict)(AuthController.register)
router.post("/api/auth/login", response_model=dict)(AuthController.login)
router.post("/api/auth/logout")(AuthController.logout)
router.post("/api/auth/refresh")(AuthController.refresh)