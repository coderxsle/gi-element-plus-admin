from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from app.core.database import get_db
from app.core.security import create_access_token
from app.core.config import get_settings
from app.core.deps import get_current_user
from app.crud.user_crud import authenticate_user, get_user_by_username, create_user
from app.schemas.schemas import LoginRequest, Token, UserResponse

router = APIRouter(prefix="/auth", tags=["认证"])
settings = get_settings()


@router.post("/login", response_model=dict)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, data.username, data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户名或密码错误"
        )
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {
        "code": 200,
        "message": "登录成功",
        "data": {
            "token": access_token,
            "user": {
                "id": user.id,
                "username": user.username,
                "nickname": user.nickname,
                "role": user.role
            }
        }
    }


@router.get("/userinfo", response_model=dict)
def get_user_info(current_user = Depends(get_current_user)):
    return {
        "code": 200,
        "message": "success",
        "data": {
            "id": current_user.id,
            "username": current_user.username,
            "nickname": current_user.nickname,
            "role": current_user.role
        }
    }


@router.post("/logout", response_model=dict)
def logout(current_user = Depends(get_current_user)):
    return {"code": 200, "message": "退出成功"}


@router.post("/register", response_model=dict)
def register(data: LoginRequest, db: Session = Depends(get_db)):
    existing_user = get_user_by_username(db, data.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="用户名已存在"
        )
    user = create_user(db, data.username, data.password, role="user")
    return {
        "code": 200,
        "message": "注册成功",
        "data": {
            "id": user.id,
            "username": user.username,
            "nickname": user.nickname,
            "role": user.role
        }
    }