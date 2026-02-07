"""
Skills API routes
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/api/skills", tags=["skills"])


@router.get("/", response_model=List[schemas.SkillResponse])
def get_skills(
    category: Optional[str] = Query(None, description="Filter by category (frontend, backend, database, devops)"),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all skills, optionally filtered by category"""
    return crud.get_skills(db, category=category, skip=skip, limit=limit)


@router.get("/{skill_id}", response_model=schemas.SkillResponse)
def get_skill(skill_id: int, db: Session = Depends(get_db)):
    """Get a single skill by ID"""
    skill = crud.get_skill(db, skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill


@router.post("/", response_model=schemas.SkillResponse)
def create_skill(skill: schemas.SkillCreate, db: Session = Depends(get_db)):
    """Create a new skill"""
    return crud.create_skill(db, skill)


@router.delete("/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    """Delete a skill"""
    skill = crud.delete_skill(db, skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"message": "Skill deleted successfully"}
