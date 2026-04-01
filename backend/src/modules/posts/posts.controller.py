from fastapi import HTTPException, Depends
from . import posts_service
from models.post import PostCreate, PostUpdate

async def get_posts():
    return await posts_service.get_all_posts()

async def get_post(id: int):
    post = await posts_service.get_post_by_id(id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

async def create_post(post: PostCreate, user: str = Depends(get_current_user)):
    return await posts_service.create_post(post, user.id)

async def update_post(id: int, post: PostUpdate, user: str = Depends(get_current_user)):
    return await posts_service.update_post(id, post, user.id)

async def delete_post(id: int, user: str = Depends(get_current_user)):
    return await posts_service.delete_post(id, user.id)