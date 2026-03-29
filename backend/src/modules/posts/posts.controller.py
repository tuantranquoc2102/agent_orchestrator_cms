from fastapi import HTTPException
from .posts.service import PostsService
from .schemas import PostCreate, PostUpdate

class PostsController:
    @staticmethod
    async def get_all_posts():
        return await PostsService.get_all_posts()

    @staticmethod
    async def get_post_by_id(id: int):
        post = await PostsService.get_post_by_id(id)
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        return post

    @staticmethod
    async def create_post(post: PostCreate):
        return await PostsService.create_post(post)

    @staticmethod
    async def update_post(id: int, post: PostUpdate):
        return await PostsService.update_post(id, post)

    @staticmethod
    async def delete_post(id: int):
        return await PostsService.delete_post(id)