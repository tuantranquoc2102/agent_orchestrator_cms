from fastapi import APIRouter, Depends
from .posts.controller import PostsController
from middleware.auth import get_current_user

router = APIRouter()

router.get("/api/posts")(PostsController.get_all_posts)
router.get("/api/posts/{id}")(PostsController.get_post_by_id)
router.post("/api/posts", dependencies=[Depends(get_current_user)])(PostsController.create_post)
router.put("/api/posts/{id}", dependencies=[Depends(get_current_user)])(PostsController.update_post)
router.delete("/api/posts/{id}", dependencies=[Depends(get_current_user)])(PostsController.delete_post)