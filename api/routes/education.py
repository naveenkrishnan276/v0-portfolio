"""
Education and Certifications API routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/api/education", tags=["education"])


@router.get("/", response_model=List[schemas.EducationResponse])
def get_education(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all education entries"""
    return crud.get_education(db, skip=skip, limit=limit)


@router.get("/{education_id}", response_model=schemas.EducationResponse)
def get_education_item(education_id: int, db: Session = Depends(get_db)):
    """Get a single education entry by ID"""
    education = crud.get_education_item(db, education_id)
    if not education:
        raise HTTPException(status_code=404, detail="Education entry not found")
    return education


@router.post("/", response_model=schemas.EducationResponse)
def create_education(education: schemas.EducationCreate, db: Session = Depends(get_db)):
    """Create a new education entry"""
    return crud.create_education(db, education)


@router.put("/{education_id}", response_model=schemas.EducationResponse)
def update_education(education_id: int, education: schemas.EducationCreate, db: Session = Depends(get_db)):
    """Update an education entry"""
    db_education = crud.update_education(db, education_id, education)
    if not db_education:
        raise HTTPException(status_code=404, detail="Education entry not found")
    return db_education


@router.delete("/{education_id}")
def delete_education(education_id: int, db: Session = Depends(get_db)):
    """Delete an education entry"""
    education = crud.delete_education(db, education_id)
    if not education:
        raise HTTPException(status_code=404, detail="Education entry not found")
    return {"message": "Education entry deleted successfully"}


# Certifications
@router.get("/certifications/", response_model=List[schemas.CertificationResponse])
def get_certifications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all certifications"""
    return crud.get_certifications(db, skip=skip, limit=limit)


@router.post("/certifications/", response_model=schemas.CertificationResponse)
def create_certification(cert: schemas.CertificationCreate, db: Session = Depends(get_db)):
    """Create a new certification"""
    return crud.create_certification(db, cert)


@router.delete("/certifications/{cert_id}")
def delete_certification(cert_id: int, db: Session = Depends(get_db)):
    """Delete a certification"""
    cert = crud.delete_certification(db, cert_id)
    if not cert:
        raise HTTPException(status_code=404, detail="Certification not found")
    return {"message": "Certification deleted successfully"}
