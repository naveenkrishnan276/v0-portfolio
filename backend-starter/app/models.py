"""
SQLAlchemy models for database tables
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from datetime import datetime
from .database import Base

class Project(Base):
    """Project portfolio entry"""
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=False)
    technologies = Column(String(500))  # Comma-separated or JSON
    link = Column(String(500))
    github_link = Column(String(500))
    image_url = Column(String(500))
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Skill(Base):
    """Technical skill entry"""
    __tablename__ = "skills"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    category = Column(String(50), nullable=False)  # frontend, backend, database, devops
    level = Column(String(20))  # beginner, intermediate, advanced
    order = Column(Integer, default=0)

class Education(Base):
    """Education and work experience entry"""
    __tablename__ = "education"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    institution = Column(String(200), nullable=False)
    location = Column(String(200))
    start_date = Column(String(20))  # YYYY-MM format
    end_date = Column(String(20))
    description = Column(Text)
    education_type = Column(String(50))  # education, work_experience
    highlights = Column(String(500))  # Comma-separated
    order = Column(Integer, default=0)

class Certification(Base):
    """Professional certification entry"""
    __tablename__ = "certifications"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    issuer = Column(String(200), nullable=False)
    date_obtained = Column(String(20))
    credential_url = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)

class ContactMessage(Base):
    """Contact form submissions"""
    __tablename__ = "contact_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False, index=True)
    message = Column(Text, nullable=False)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f"<ContactMessage(id={self.id}, name='{self.name}', email='{self.email}')>"
