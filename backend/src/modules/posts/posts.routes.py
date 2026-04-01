from fastapi import APIRouter
from . import posts_controller

router = APIRouter()

router.get("/", posts_controller.get_posts)
router.get("/{id}", posts_controller.get_post)
router.post("/", posts_controller.create_post)
router.put("/{id}", posts_controller.update_post)
router.delete("/{id}", posts_controller.delete_post)