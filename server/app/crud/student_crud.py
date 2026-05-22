from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.models import Student
from app.schemas.schemas import StudentCreate, StudentUpdate
from typing import Optional


def get_student(db: Session, student_id: int):
    return db.query(Student).filter(Student.id == student_id).first()


def get_student_by_no(db: Session, student_no: str):
    return db.query(Student).filter(Student.student_no == student_no).first()


def get_students(db: Session, page: int = 1, page_size: int = 10, name: Optional[str] = None):
    query = db.query(Student)
    if name:
        query = query.filter(Student.name.like(f"%{name}%"))
    total = query.count()
    items = query.order_by(Student.id.desc()).offset((page - 1) * page_size).limit(page_size).all()
    return {"items": items, "total": total, "page": page, "page_size": page_size}


def create_student(db: Session, student: StudentCreate):
    db_student = Student(**student.model_dump())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def update_student(db: Session, student_id: int, student: StudentUpdate):
    db_student = get_student(db, student_id)
    if not db_student:
        return None
    for key, value in student.model_dump(exclude_unset=True).items():
        setattr(db_student, key, value)
    db.commit()
    db.refresh(db_student)
    return db_student


def delete_student(db: Session, student_id: int):
    db_student = get_student(db, student_id)
    if not db_student:
        return False
    db.delete(db_student)
    db.commit()
    return True