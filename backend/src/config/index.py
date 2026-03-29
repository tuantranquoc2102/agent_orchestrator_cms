import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = os.getenv("PORT", 8000)
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    JWT_SECRET = os.getenv("JWT_SECRET", "your_jwt_secret")
    CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:3000")