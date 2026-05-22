from sqlalchemy.orm import Session
from app.models.models import User
from app.core.security import get_password_hash, verify_password


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user


def create_user(db: Session, username: str, password: str, nickname: str = None, role: str = "user"):
    hashed_password = get_password_hash(password)
    db_user = User(
        username=username,
        password=hashed_password,
        nickname=nickname or username,
        role=role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user