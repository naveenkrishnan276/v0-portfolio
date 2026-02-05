"""
FastAPI main application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

from .database import engine, Base, init_db
from . import models

load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Portfolio API",
    description="Backend API for personal portfolio website",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# CORS configuration (allow frontend to access API)
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        frontend_url,
        "http://localhost:3000",
        "http://localhost:3001",
        "https://yourdomain.com",  # Add your production domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def read_root():
    """API root endpoint"""
    return {
        "message": "Portfolio API is running",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

# Health check
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "portfolio-api"
    }

# API v1 routers will be included here
# Placeholder for routes that will be added
@app.get("/api/projects")
def get_projects():
    """Placeholder for projects endpoint"""
    return {"message": "Projects endpoint - will be implemented"}

@app.get("/api/skills")
def get_skills():
    """Placeholder for skills endpoint"""
    return {"message": "Skills endpoint - will be implemented"}

@app.get("/api/education")
def get_education():
    """Placeholder for education endpoint"""
    return {"message": "Education endpoint - will be implemented"}

@app.post("/api/contact/messages")
def send_message(data: dict):
    """Placeholder for contact message endpoint"""
    return {"message": "Message received - will be saved to database"}

# Error handlers
@app.exception_handler(404)
async def not_found_exception_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "Not found"},
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    init_db()
    print("Database initialized")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    print("Shutting down...")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True
    )
