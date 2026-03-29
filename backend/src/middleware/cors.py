from fastapi.middleware.cors import CORSMiddleware
from config import Config

def add_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[Config.CORS_ORIGIN],
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE"],
        allow_headers=["*"],
    )