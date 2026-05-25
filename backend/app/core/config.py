from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    APP_NAME: str = "学生信息管理系统"
    DEBUG: bool = True

    DATABASE_URL: str = "mysql+pymysql://root:123456@localhost:3306/gi_admin"

    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()