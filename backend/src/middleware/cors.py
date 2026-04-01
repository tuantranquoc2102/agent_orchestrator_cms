from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from config.index import Config

def add_cors_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[Config.CORS_ORIGIN],
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE"],
        allow_headers=["*"],
    )