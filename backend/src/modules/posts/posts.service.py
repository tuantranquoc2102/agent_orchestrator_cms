from models.post import PostCreate, PostUpdate, Post
from . import posts_repository

async def get_all_posts():
    return await posts_repository.get_posts()

async def get_post_by_id(id: int):
    return await posts_repository.get_post(id)

async def create_post(post: PostCreate, author_id: int):
    return await posts_repository.create_post(post, author_id)

async def update_post(id: int, post: PostUpdate, author_id: int):
    return await posts_repository.update_post(id, post, author_id)

async def delete_post(id: int, author_id: int):
    return await posts_repository.delete_post(id, author_id)