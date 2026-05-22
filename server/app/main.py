from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.api import auth, student, menu
from app.core.database import Base, engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="学生信息管理系统", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(student.router, prefix="/api")
app.include_router(menu.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "学生信息管理系统 API"}


@app.get("/health")
def health():
    return {"status": "ok"}