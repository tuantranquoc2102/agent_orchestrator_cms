// ===== FILE: src/config/index.py =====
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = int(os.getenv("PORT", 8000))
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    JWT_SECRET = os.getenv("JWT_SECRET", "your_jwt_secret")
    CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:3000")

// ===== FILE: src/middleware/cors.py =====
from fastapi.middleware.cors import CORSMiddleware
from config.index import Config

def add_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[Config.CORS_ORIGIN],
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE"],
        allow_headers=["*"],
    )

// ===== FILE: src/middleware/auth.py =====
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from models.user import User
from services.auth import get_user_by_username

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = {"username": username}
    except JWTError:
        raise credentials_exception
    user = await get_user_by_username(token_data["username"])
    if user is None:
        raise credentials_exception
    return user

// ===== FILE: src/middleware/error_handler.py =====
from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse

async def error_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)},
    )

// ===== FILE: src/modules/auth/auth.routes.py =====
from fastapi import APIRouter
from controllers.auth import register, login, logout, refresh_token

router = APIRouter()

router.post("/register", response_model=dict)(register)
router.post("/login", response_model=dict)(login)
router.post("/logout")(logout)
router.post("/token/refresh", response_model=dict)(refresh_token)

// ===== FILE: src/modules/auth/auth.controller.py =====
from fastapi import HTTPException, Depends
from models.user import User
from services.auth import create_user, authenticate_user, logout_user, refresh_access_token
from schemas.auth import UserCreate, UserLogin
from middleware.auth import get_current_user

async def register(user: UserCreate):
    return await create_user(user)

async def login(user: UserLogin):
    token = await authenticate_user(user)
    if not token:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"access_token": token, "token_type": "bearer"}

async def logout(current_user: User = Depends(get_current_user)):
    await logout_user(current_user)

async def refresh_token(current_user: User = Depends(get_current_user)):
    return await refresh_access_token(current_user)

// ===== FILE: src/modules/auth/auth.service.py =====
from models.user import User
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from config.index import Config

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_user(user):
    hashed_password = pwd_context.hash(user.password)
    # Save user to database logic here
    return user

async def authenticate_user(user):
    # Authenticate user logic here
    return "token"

async def logout_user(user):
    # Logout logic here
    pass

async def refresh_access_token(user):
    # Refresh token logic here
    return "new_token"

// ===== FILE: src/modules/posts/posts.routes.py =====
from fastapi import APIRouter, Depends
from controllers.posts import get_posts, get_post, create_post, update_post, delete_post
from middleware.auth import get_current_user

router = APIRouter()

router.get("/", response_model=list)(get_posts)
router.get("/{id}", response_model=dict)(get_post)
router.post("/", response_model=dict, dependencies=[Depends(get_current_user)])(create_post)
router.put("/{id}", response_model=dict, dependencies=[Depends(get_current_user)])(update_post)
router.delete("/{id}", dependencies=[Depends(get_current_user)])(delete_post)

// ===== FILE: src/modules/posts/posts.controller.py =====
from fastapi import HTTPException
from models.post import Post

async def get_posts():
    # Logic to get all posts
    return []

async def get_post(id: int):
    # Logic to get a single post
    return {}

async def create_post(post: Post):
    # Logic to create a post
    return post

async def update_post(id: int, post: Post):
    # Logic to update a post
    return post

async def delete_post(id: int):
    # Logic to delete a post
    return {"message": "Post deleted"}

// ===== FILE: src/modules/posts/posts.service.py =====
from models.post import Post

async def save_post(post: Post):
    # Save post to database logic here
    pass

async def find_post_by_id(post_id: int):
    # Find post by ID logic here
    pass

// ===== FILE: src/models/user.py =====
from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, server_default="CURRENT_TIMESTAMP")

// ===== FILE: src/models/post.py =====
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, server_default="CURRENT_TIMESTAMP")
    updated_at = Column(DateTime, server_default="CURRENT_TIMESTAMP")

    author = relationship("User", back_populates="posts")

User.posts = relationship("Post", order_by=Post.id, back_populates="author")

// ===== FILE: src/main.py =====
from fastapi import FastAPI
from config.index import Config
from middleware.cors import add_cors
from middleware.error_handler import error_handler
from modules.auth.auth.routes import router as auth_router
from modules.posts.posts.routes import router as posts_router

app = FastAPI()

add_cors(app)

@app.exception_handler(Exception)(error_handler)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(posts_router, prefix="/api/posts")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=Config.PORT)

// ===== FILE: requirements.txt =====
fastapi
uvicorn
passlib[bcrypt]
python-jose
sqlalchemy
databases
python-dotenv

// ===== FILE: .env.example =====
PORT=8000
DATABASE_URL="sqlite:///./test.db"
JWT_SECRET="your_jwt_secret"
CORS_ORIGIN="http://localhost:3000"