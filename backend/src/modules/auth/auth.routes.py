from fastapi import APIRouter
from . import auth_controller

router = APIRouter()

router.post("/register", auth_controller.register)
router.post("/login", auth_controller.login)
router.post("/logout", auth_controller.logout)
router.post("/refresh", auth_controller.refresh)