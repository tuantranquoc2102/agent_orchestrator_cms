from fastapi import FastAPI
from config import Config
from middleware.cors import add_cors
from middleware.error_handler import error_handler
from modules.auth.auth.routes import router as auth_router
from modules.posts.posts.routes import router as posts_router
from database import Base, engine

app = FastAPI()

add_cors(app)

@app.exception_handler(Exception)(error_handler)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(posts_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the API!"}