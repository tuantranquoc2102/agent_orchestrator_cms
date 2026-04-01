from fastapi import FastAPI
from config.index import Config
from middleware.cors import add_cors_middleware
from modules.auth.auth.routes import router as auth_router
from modules.posts.posts.routes import router as posts_router

app = FastAPI()

add_cors_middleware(app)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(posts_router, prefix="/api/posts")

@app.get("/")
async def root():
    return {"message": "Welcome to the API!"}