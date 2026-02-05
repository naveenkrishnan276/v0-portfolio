# Backend Setup Guide - FastAPI + PostgreSQL

Welcome! This guide will help you build the backend for your portfolio website using **FastAPI** and **PostgreSQL**.

## Prerequisites

- Python 3.9+
- PostgreSQL (local or cloud instance)
- pip (Python package manager)
- Git (for version control)

---

## Step 1: Project Setup

### 1.1 Create a project directory

```bash
mkdir portfolio-backend
cd portfolio-backend
```

### 1.2 Create a Python virtual environment

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 1.3 Create requirements.txt

Create a `requirements.txt` file with the following dependencies:

```
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
python-dotenv==1.0.0
pydantic==2.4.2
python-multipart==0.0.6
pydantic-settings==2.0.3
```

### 1.4 Install dependencies

```bash
pip install -r requirements.txt
```

---

## Step 2: Database Setup

### 2.1 Install PostgreSQL

**Option A: Local Installation**
- Download from [postgresql.org](https://www.postgresql.org/download/)
- Follow installation instructions for your OS

**Option B: Cloud Services (Recommended)**
- **Supabase** (PostgreSQL): [supabase.com](https://supabase.com) - Free tier available
- **Railway**: [railway.app](https://railway.app) - Simple deployment
- **Neon**: [neon.tech](https://neon.tech) - Serverless PostgreSQL
- **AWS RDS**: Enterprise-grade option

### 2.2 Create a database

```bash
# Local PostgreSQL
psql -U postgres
CREATE DATABASE portfolio_db;
\q
```

### 2.3 Configure connection string

Create a `.env` file in your project root:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db
SECRET_KEY=your-secret-key-here-change-in-production
DEBUG=True
```

**For cloud services**, use the connection string provided (usually in format):
```
postgresql://user:password@host:port/dbname
```

---

## Step 3: Project Structure

Create this folder structure:

```
portfolio-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── database.py             # Database configuration
│   ├── models.py               # SQLAlchemy models
│   ├── schemas.py              # Pydantic schemas
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── projects.py         # Projects endpoints
│   │   ├── skills.py           # Skills endpoints
│   │   ├── contact.py          # Contact form endpoints
│   │   └── education.py        # Education endpoints
│   └── crud.py                 # Database operations
├── .env                        # Environment variables
├── .gitignore
├── requirements.txt
└── README.md
```

---

## Step 4: Database Models (SQLAlchemy)

Create `app/database.py`:

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,  # Test connection before using
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

Create `app/models.py`:

```python
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    technologies = Column(String(500))  # JSON string
    link = Column(String(500))
    github_link = Column(String(500))
    image_url = Column(String(500))
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)  # frontend, backend, database, devops
    level = Column(String(20))  # beginner, intermediate, advanced
    order = Column(Integer, default=0)

class Education(Base):
    __tablename__ = "education"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    institution = Column(String(200), nullable=False)
    location = Column(String(200))
    start_date = Column(String(20))  # YYYY-MM format
    end_date = Column(String(20))
    description = Column(Text)
    education_type = Column(String(50))  # education, work_experience
    order = Column(Integer, default=0)

class Certification(Base):
    __tablename__ = "certifications"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    issuer = Column(String(200), nullable=False)
    date_obtained = Column(String(20))
    credential_url = Column(String(500))

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
```

---

## Step 5: Pydantic Schemas

Create `app/schemas.py`:

```python
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: Optional[str] = None
    link: Optional[str] = None
    github_link: Optional[str] = None
    image_url: Optional[str] = None

class ProjectResponse(ProjectCreate):
    id: int
    created_at: datetime

class SkillCreate(BaseModel):
    name: str
    category: str
    level: Optional[str] = None

class SkillResponse(SkillCreate):
    id: int

class EducationCreate(BaseModel):
    title: str
    institution: str
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    education_type: str

class EducationResponse(EducationCreate):
    id: int

class CertificationCreate(BaseModel):
    title: str
    issuer: str
    date_obtained: Optional[str] = None
    credential_url: Optional[str] = None

class CertificationResponse(CertificationCreate):
    id: int

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactMessageResponse(ContactMessageCreate):
    id: int
    read: bool
    created_at: datetime
```

---

## Step 6: CRUD Operations

Create `app/crud.py`:

```python
from sqlalchemy.orm import Session
from . import models, schemas

# Projects
def get_projects(db: Session):
    return db.query(models.Project).order_by(models.Project.order).all()

def create_project(db: Session, project: schemas.ProjectCreate):
    db_project = models.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

# Skills
def get_skills(db: Session, category: str = None):
    query = db.query(models.Skill)
    if category:
        query = query.filter(models.Skill.category == category)
    return query.order_by(models.Skill.order).all()

def create_skill(db: Session, skill: schemas.SkillCreate):
    db_skill = models.Skill(**skill.dict())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

# Education
def get_education(db: Session):
    return db.query(models.Education).order_by(models.Education.order).all()

def create_education(db: Session, education: schemas.EducationCreate):
    db_education = models.Education(**education.dict())
    db.add(db_education)
    db.commit()
    db.refresh(db_education)
    return db_education

# Certifications
def get_certifications(db: Session):
    return db.query(models.Certification).all()

def create_certification(db: Session, cert: schemas.CertificationCreate):
    db_cert = models.Certification(**cert.dict())
    db.add(db_cert)
    db.commit()
    db.refresh(db_cert)
    return db_cert

# Contact Messages
def create_contact_message(db: Session, message: schemas.ContactMessageCreate):
    db_message = models.ContactMessage(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_contact_messages(db: Session, unread_only: bool = False):
    query = db.query(models.ContactMessage)
    if unread_only:
        query = query.filter(models.ContactMessage.read == False)
    return query.order_by(models.ContactMessage.created_at.desc()).all()
```

---

## Step 7: Routes

Create `app/routes/projects.py`:

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.get("/", response_model=list[schemas.ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return crud.get_projects(db)

@router.post("/", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    return crud.create_project(db, project)
```

Create `app/routes/skills.py`:

```python
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/api/skills", tags=["skills"])

@router.get("/", response_model=list[schemas.SkillResponse])
def get_skills(category: str = Query(None), db: Session = Depends(get_db)):
    return crud.get_skills(db, category)

@router.post("/", response_model=schemas.SkillResponse)
def create_skill(skill: schemas.SkillCreate, db: Session = Depends(get_db)):
    return crud.create_skill(db, skill)
```

Create `app/routes/contact.py`:

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("/messages", response_model=schemas.ContactMessageResponse)
def send_message(message: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    return crud.create_contact_message(db, message)

@router.get("/messages", response_model=list[schemas.ContactMessageResponse])
def get_messages(db: Session = Depends(get_db)):
    return crud.get_contact_messages(db)
```

Create `app/routes/education.py`:

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/api/education", tags=["education"])

@router.get("/", response_model=list[schemas.EducationResponse])
def get_education(db: Session = Depends(get_db)):
    return crud.get_education(db)

@router.post("/", response_model=schemas.EducationResponse)
def create_education(edu: schemas.EducationCreate, db: Session = Depends(get_db)):
    return crud.create_education(db, edu)

@router.get("/certifications", response_model=list[schemas.CertificationResponse])
def get_certifications(db: Session = Depends(get_db)):
    return crud.get_certifications(db)
```

---

## Step 8: Main FastAPI Application

Create `app/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import projects, skills, contact, education

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Portfolio API",
    description="Backend API for personal portfolio website",
    version="1.0.0"
)

# CORS configuration (for frontend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(contact.router)
app.include_router(education.router)

@app.get("/")
def read_root():
    return {
        "message": "Portfolio API is running",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
```

---

## Step 9: Running Your Backend

### 9.1 Create migration (for database tables)

```bash
# Make sure you're in the backend directory with activated venv
python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

### 9.2 Start the server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Your API will be available at:
- **API Base URL**: `http://localhost:8000`
- **Interactive Docs**: `http://localhost:8000/docs` (Swagger UI)
- **Alternative Docs**: `http://localhost:8000/redoc`

---

## Step 10: Connecting Frontend to Backend

Update your Contact component to call the backend:

```typescript
// components/Contact.tsx
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  
  try {
    const response = await fetch('http://localhost:8000/api/contact/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    
    if (response.ok) {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
```

Similarly, fetch projects, skills, and education data:

```typescript
// app/page.tsx
'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [])

  // Rest of component...
}
```

---

## Step 11: Deployment

### Option A: Railway (Easiest for beginners)

1. Push code to GitHub
2. Connect to Railway (railway.app)
3. Add PostgreSQL database service
4. Set environment variables
5. Deploy

### Option B: Vercel + Upstash/Neon

1. Use Vercel for frontend
2. Use Railway/Heroku for FastAPI backend
3. Connect services with environment variables

### Option C: Docker + Cloud Run/EC2

Create `Dockerfile`:

```dockerfile
FROM python:3.9

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Useful Commands

```bash
# Create tables
python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"

# Drop all tables (be careful!)
python -c "from app.database import Base, engine; Base.metadata.drop_all(bind=engine)"

# Activate virtual environment (if not already activated)
source venv/bin/activate

# Run server in production
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

---

## Troubleshooting

**Database connection error?**
- Check `.env` file has correct `DATABASE_URL`
- Ensure PostgreSQL is running
- Verify credentials

**CORS errors?**
- Update `allow_origins` in `main.py` with your frontend URL

**Port 8000 already in use?**
```bash
uvicorn app.main:app --reload --port 8001
```

---

## Next Steps

1. Add authentication with JWT tokens
2. Implement image upload functionality
3. Add email notifications for contact messages
4. Create admin dashboard
5. Add database migrations with Alembic
6. Write API tests

---

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [Pydantic Validation](https://docs.pydantic.dev/)

Good luck with your portfolio backend! 🚀
