import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = int(os.getenv("PORT", 8000))
    DATABASE_URL = os.getenv("DATABASE_URL")
    JWT_SECRET = os.getenv("JWT_SECRET")
    CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:3000")