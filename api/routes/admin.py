"""
Admin API routes for portfolio management
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas, models
from ..database import get_db
from ..auth import (
    Token, LoginRequest, authenticate_admin, 
    create_access_token, get_current_user
)
from datetime import timedelta

router = APIRouter(prefix="/api/admin", tags=["admin"])


# ===== Authentication =====
@router.post("/login", response_model=Token)
def admin_login(login_data: LoginRequest):
    """Admin login endpoint"""
    if not authenticate_admin(login_data.username, login_data.password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password"
        )
    
    access_token = create_access_token(
        data={"sub": login_data.username},
        expires_delta=timedelta(hours=24)
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/verify")
def verify_token(current_user: str = Depends(get_current_user)):
    """Verify if current token is valid"""
    return {"valid": True, "username": current_user}


# ===== Projects CRUD =====
@router.get("/projects", response_model=List[schemas.ProjectResponse])
def get_all_projects(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Get all projects (admin)"""
    return crud.get_projects(db)


@router.post("/projects", response_model=schemas.ProjectResponse)
def create_project(
    project: schemas.ProjectCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Create a new project"""
    return crud.create_project(db, project)


@router.put("/projects/{project_id}", response_model=schemas.ProjectResponse)
def update_project(
    project_id: int,
    project: schemas.ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Update a project"""
    db_project = crud.update_project(db, project_id, project)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


@router.delete("/projects/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete a project"""
    project = crud.delete_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}


# ===== Skills CRUD =====
@router.get("/skills", response_model=List[schemas.SkillResponse])
def get_all_skills(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Get all skills (admin)"""
    return crud.get_skills(db)


@router.post("/skills", response_model=schemas.SkillResponse)
def create_skill(
    skill: schemas.SkillCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Create a new skill"""
    return crud.create_skill(db, skill)


@router.delete("/skills/{skill_id}")
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete a skill"""
    skill = crud.delete_skill(db, skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"message": "Skill deleted successfully"}


# ===== Education CRUD =====
@router.get("/education", response_model=List[schemas.EducationResponse])
def get_all_education(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Get all education entries (admin)"""
    return crud.get_education(db)


@router.post("/education", response_model=schemas.EducationResponse)
def create_education(
    education: schemas.EducationCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Create a new education entry"""
    return crud.create_education(db, education)


@router.delete("/education/{education_id}")
def delete_education(
    education_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete an education entry"""
    education = crud.delete_education(db, education_id)
    if not education:
        raise HTTPException(status_code=404, detail="Education entry not found")
    return {"message": "Education entry deleted successfully"}


# ===== Certifications CRUD =====
@router.get("/certifications", response_model=List[schemas.CertificationResponse])
def get_all_certifications(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Get all certifications (admin)"""
    return crud.get_certifications(db)


@router.post("/certifications", response_model=schemas.CertificationResponse)
def create_certification(
    cert: schemas.CertificationCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Create a new certification"""
    return crud.create_certification(db, cert)


@router.delete("/certifications/{cert_id}")
def delete_certification(
    cert_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete a certification"""
    cert = crud.delete_certification(db, cert_id)
    if not cert:
        raise HTTPException(status_code=404, detail="Certification not found")
    return {"message": "Certification deleted successfully"}


# ===== Contact Messages =====
@router.get("/messages", response_model=List[schemas.ContactMessageResponse])
def get_all_messages(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Get all contact messages (admin)"""
    return crud.get_contact_messages(db)


@router.delete("/messages/{message_id}")
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete a contact message"""
    message = crud.delete_contact_message(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message deleted successfully"}
