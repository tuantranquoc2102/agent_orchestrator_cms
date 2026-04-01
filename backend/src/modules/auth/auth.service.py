from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from models.user import UserCreate, User
from . import user_service

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = "your_jwt_secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)
    return encoded_jwt

async def register_user(user: UserCreate):
    user.password_hash = hash_password(user.password)
    return await user_service.create_user(user)

async def authenticate_user(user: UserCreate):
    db_user = await user_service.get_user_by_username(user.username)
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": db_user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

async def refresh_token(token: str):
    # Implement token refresh logic
    pass