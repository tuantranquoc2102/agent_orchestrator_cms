import bcrypt
from jwt import encode, decode, PyJWTError
from datetime import datetime, timedelta
from config import Config
from .auth.models import User

async def create_user(user: User):
    user.password_hash = bcrypt.hashpw(user.password_hash.encode('utf-8'), bcrypt.gensalt())
    # Save user to database logic here
    return user

async def authenticate_user(username: str, password: str):
    # Fetch user from database logic here
    user = None  # Replace with actual user fetching logic
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
        return create_jwt_token(user)
    return None

def create_jwt_token(user: User):
    token_data = {"sub": user.username, "exp": datetime.utcnow() + timedelta(minutes=30)}
    return encode(token_data, Config.JWT_SECRET, algorithm="HS256")

def verify_token(token: str):
    try:
        payload = decode(token, Config.JWT_SECRET, algorithms=["HS256"])
        return payload
    except PyJWTError:
        return None

async def logout_user(user: User):
    # Handle logout logic here
    return {"message": "Logged out"}

async def refresh_jwt(user: User):
    return create_jwt_token(user)