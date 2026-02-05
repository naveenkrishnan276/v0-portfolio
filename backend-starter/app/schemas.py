"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr, HttpUrl, Field
from typing import Optional
from datetime import datetime

# Projects
class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=10)
    technologies: Optional[str] = None
    link: Optional[HttpUrl] = None
    github_link: Optional[HttpUrl] = None
    image_url: Optional[HttpUrl] = None
    order: Optional[int] = 0

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[str] = None
    link: Optional[HttpUrl] = None
    github_link: Optional[HttpUrl] = None
    image_url: Optional[HttpUrl] = None
    order: Optional[int] = None

class ProjectResponse(ProjectCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Skills
class SkillCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=1)
    level: Optional[str] = None
    order: Optional[int] = 0

class SkillResponse(SkillCreate):
    id: int

    class Config:
        from_attributes = True

# Education
class EducationCreate(BaseModel):
    title: str = Field(..., min_length=1)
    institution: str = Field(..., min_length=1)
    location: Optional[str] = None
    start_date: Optional[str] = None  # YYYY-MM
    end_date: Optional[str] = None
    description: Optional[str] = None
    education_type: str  # education, work_experience
    highlights: Optional[str] = None
    order: Optional[int] = 0

class EducationResponse(EducationCreate):
    id: int

    class Config:
        from_attributes = True

# Certifications
class CertificationCreate(BaseModel):
    title: str = Field(..., min_length=1)
    issuer: str = Field(..., min_length=1)
    date_obtained: Optional[str] = None  # YYYY or YYYY-MM
    credential_url: Optional[HttpUrl] = None

class CertificationResponse(CertificationCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Contact Messages
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=5000)

class ContactMessageResponse(ContactMessageCreate):
    id: int
    read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Generic response
class BaseResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
