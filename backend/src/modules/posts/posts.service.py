from .models import Post
from sqlalchemy.orm import Session
from database import get_db

class PostsService:
    @classmethod
    async def get_all_posts(cls):
        db: Session = get_db()
        return db.query(Post).all()

    @classmethod
    async def get_post_by_id(cls, id: int):
        db: Session = get_db()
        return db.query(Post).filter(Post.id == id).first()

    @classmethod
    async def create_post(cls, post):
        db: Session = get_db()
        db.add(post)
        db.commit()
        return post

    @classmethod
    async def update_post(cls, id: int, post):
        db: Session = get_db()
        db_post = db.query(Post).filter(Post.id == id).first()
        if not db_post:
            return None
        for key, value in post.dict().items():
            setattr(db_post, key, value)
        db.commit()
        return db_post

    @classmethod
    async def delete_post(cls, id: int):
        db: Session = get_db()
        db_post = db.query(Post).filter(Post.id == id).first()
        if not db_post:
            return None
        db.delete(db_post)
        db.commit()
        return {"message": "Post deleted"}