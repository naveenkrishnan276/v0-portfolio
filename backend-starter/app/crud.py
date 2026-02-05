"""
CRUD operations for database models
"""
from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas

# ===== Projects =====

def get_projects(db: Session, skip: int = 0, limit: int = 100):
    """Get all projects"""
    return db.query(models.Project).order_by(models.Project.order).offset(skip).limit(limit).all()

def get_project(db: Session, project_id: int):
    """Get a single project by ID"""
    return db.query(models.Project).filter(models.Project.id == project_id).first()

def create_project(db: Session, project: schemas.ProjectCreate):
    """Create a new project"""
    db_project = models.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def update_project(db: Session, project_id: int, project: schemas.ProjectUpdate):
    """Update an existing project"""
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        return None
    
    update_data = project.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)
    
    db.commit()
    db.refresh(db_project)
    return db_project

def delete_project(db: Session, project_id: int):
    """Delete a project"""
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project:
        db.delete(db_project)
        db.commit()
    return db_project

# ===== Skills =====

def get_skills(db: Session, category: str = None, skip: int = 0, limit: int = 100):
    """Get skills, optionally filtered by category"""
    query = db.query(models.Skill)
    if category:
        query = query.filter(models.Skill.category == category)
    return query.order_by(models.Skill.order).offset(skip).limit(limit).all()

def get_skill(db: Session, skill_id: int):
    """Get a single skill by ID"""
    return db.query(models.Skill).filter(models.Skill.id == skill_id).first()

def create_skill(db: Session, skill: schemas.SkillCreate):
    """Create a new skill"""
    db_skill = models.Skill(**skill.dict())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

def delete_skill(db: Session, skill_id: int):
    """Delete a skill"""
    db_skill = db.query(models.Skill).filter(models.Skill.id == skill_id).first()
    if db_skill:
        db.delete(db_skill)
        db.commit()
    return db_skill

# ===== Education =====

def get_education(db: Session, skip: int = 0, limit: int = 100):
    """Get all education entries"""
    return db.query(models.Education).order_by(models.Education.order).offset(skip).limit(limit).all()

def get_education_item(db: Session, education_id: int):
    """Get a single education item by ID"""
    return db.query(models.Education).filter(models.Education.id == education_id).first()

def create_education(db: Session, education: schemas.EducationCreate):
    """Create a new education entry"""
    db_education = models.Education(**education.dict())
    db.add(db_education)
    db.commit()
    db.refresh(db_education)
    return db_education

def update_education(db: Session, education_id: int, education: schemas.EducationCreate):
    """Update an education entry"""
    db_education = db.query(models.Education).filter(models.Education.id == education_id).first()
    if not db_education:
        return None
    
    for key, value in education.dict(exclude_unset=True).items():
        setattr(db_education, key, value)
    
    db.commit()
    db.refresh(db_education)
    return db_education

def delete_education(db: Session, education_id: int):
    """Delete an education entry"""
    db_education = db.query(models.Education).filter(models.Education.id == education_id).first()
    if db_education:
        db.delete(db_education)
        db.commit()
    return db_education

# ===== Certifications =====

def get_certifications(db: Session, skip: int = 0, limit: int = 100):
    """Get all certifications"""
    return db.query(models.Certification).order_by(models.Certification.created_at.desc()).offset(skip).limit(limit).all()

def get_certification(db: Session, cert_id: int):
    """Get a single certification by ID"""
    return db.query(models.Certification).filter(models.Certification.id == cert_id).first()

def create_certification(db: Session, cert: schemas.CertificationCreate):
    """Create a new certification"""
    db_cert = models.Certification(**cert.dict())
    db.add(db_cert)
    db.commit()
    db.refresh(db_cert)
    return db_cert

def delete_certification(db: Session, cert_id: int):
    """Delete a certification"""
    db_cert = db.query(models.Certification).filter(models.Certification.id == cert_id).first()
    if db_cert:
        db.delete(db_cert)
        db.commit()
    return db_cert

# ===== Contact Messages =====

def create_contact_message(db: Session, message: schemas.ContactMessageCreate):
    """Create a new contact message"""
    db_message = models.ContactMessage(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_contact_messages(db: Session, unread_only: bool = False, skip: int = 0, limit: int = 100):
    """Get contact messages"""
    query = db.query(models.ContactMessage)
    if unread_only:
        query = query.filter(models.ContactMessage.read == False)
    return query.order_by(models.ContactMessage.created_at.desc()).offset(skip).limit(limit).all()

def get_contact_message(db: Session, message_id: int):
    """Get a single contact message"""
    return db.query(models.ContactMessage).filter(models.ContactMessage.id == message_id).first()

def mark_message_as_read(db: Session, message_id: int):
    """Mark a message as read"""
    db_message = db.query(models.ContactMessage).filter(models.ContactMessage.id == message_id).first()
    if db_message:
        db_message.read = True
        db.commit()
        db.refresh(db_message)
    return db_message

def delete_contact_message(db: Session, message_id: int):
    """Delete a contact message"""
    db_message = db.query(models.ContactMessage).filter(models.ContactMessage.id == message_id).first()
    if db_message:
        db.delete(db_message)
        db.commit()
    return db_message

# ===== Statistics =====

def get_statistics(db: Session):
    """Get portfolio statistics"""
    return {
        "total_projects": db.query(func.count(models.Project.id)).scalar() or 0,
        "total_skills": db.query(func.count(models.Skill.id)).scalar() or 0,
        "total_education": db.query(func.count(models.Education.id)).scalar() or 0,
        "total_messages": db.query(func.count(models.ContactMessage.id)).scalar() or 0,
        "unread_messages": db.query(func.count(models.ContactMessage.id)).filter(models.ContactMessage.read == False).scalar() or 0,
    }
