from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from .models import User
from .schemas import UserCreate, UserLogin
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from database import get_db

class AuthService:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @classmethod
    def verify_password(cls, plain_password, hashed_password):
        return cls.pwd_context.verify(plain_password, hashed_password)

    @classmethod
    def get_password_hash(cls, password):
        return cls.pwd_context.hash(password)

    @classmethod
    async def register(cls, user: UserCreate):
        db: Session = get_db()
        user.password_hash = cls.get_password_hash(user.password)
        db.add(user)
        db.commit()
        return {"message": "User registered"}

    @classmethod
    async def login(cls, user: UserLogin):
        db: Session = get_db()
        db_user = db.query(User).filter(User.username == user.username).first()
        if not db_user or not cls.verify_password(user.password, db_user.password_hash):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        token = cls.create_token(db_user.username)
        return {"access_token": token, "token_type": "bearer"}

    @classmethod
    def create_token(cls, username: str):
        expires = timedelta(minutes=30)
        to_encode = {"sub": username, "exp": datetime.utcnow() + expires}
        return jwt.encode(to_encode, Config.JWT_SECRET, algorithm="HS256")

    @classmethod
    async def refresh(cls):
        # Implement token refresh logic
        pass