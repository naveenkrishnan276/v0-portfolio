"""
Seed script to add portfolio data to the database via API
Run this after starting the backend server

Usage:
  cd backend-starter
  .\venv\Scripts\python.exe seed_data.py
"""

import requests

API_BASE = "http://localhost:8000/api"

# ============================================
# YOUR PROJECTS - Edit these!
# ============================================
projects = [
    {
        "title": "Project One",
        "description": "A modern web application showcasing innovative design and seamless user experience.",
        "technologies": "React, Next.js, TypeScript, Tailwind",
        "order": 1
    },
    {
        "title": "Project Two",
        "description": "Full-stack solution with robust backend architecture and real-time features.",
        "technologies": "Node.js, Express, PostgreSQL, Docker",
        "order": 2
    },
    {
        "title": "Project Three",
        "description": "AI-powered platform delivering intelligent insights and automation.",
        "technologies": "Python, FastAPI, React, MongoDB",
        "order": 3
    },
]

# ============================================
# YOUR SKILLS - Edit these!
# ============================================
skills = [
    {"name": "JAVA", "category": "backend", "level": "advanced", "order": 1},
    {"name": "React / Next.js", "category": "frontend", "level": "advanced", "order": 2},
    {"name": "Python", "category": "backend", "level": "advanced", "order": 3},
    {"name": "CSS", "category": "frontend", "level": "advanced", "order": 4},
    {"name": "PostgreSQL", "category": "database", "level": "intermediate", "order": 5},
    {"name": "DSA", "category": "other", "level": "advanced", "order": 6},
    {"name": "Docker", "category": "devops", "level": "intermediate", "order": 7},
]

# ============================================
# YOUR EDUCATION & EXPERIENCE - Edit these!
# ============================================
education = [
    {
        "title": "Bachelor of Computer Science",
        "institution": "University Name",
        "location": "City, State",
        "start_date": "2019",
        "end_date": "2023",
        "description": "Studied computer science fundamentals, algorithms, and software engineering.",
        "education_type": "education",
        "order": 1
    },
    {
        "title": "Software Engineer",
        "institution": "Company Name",
        "location": "Remote",
        "start_date": "2023",
        "end_date": "Present",
        "description": "Building scalable web applications and APIs.",
        "education_type": "work_experience",
        "order": 2
    },
    {
        "title": "Junior Developer",
        "institution": "Previous Company",
        "location": "City, State",
        "start_date": "2022",
        "end_date": "2023",
        "description": "Developed frontend features and maintained codebase.",
        "education_type": "work_experience",
        "order": 3
    },
    {
        "title": "Professional Certificate",
        "institution": "Online Platform",
        "location": "Online",
        "start_date": "2023",
        "end_date": "2024",
        "description": "Completed advanced programming certification.",
        "education_type": "education",
        "order": 4
    },
]

# ============================================
# YOUR CERTIFICATIONS - Edit these!
# ============================================
certifications = [
    {
        "title": "AWS Certified Developer",
        "issuer": "Amazon Web Services",
        "date_obtained": "2024"
    },
]


def seed_data():
    print("Seeding portfolio data...")
    print("-" * 40)
    
    # Check if API is running
    try:
        response = requests.get(f"{API_BASE.replace('/api', '')}/health")
        if response.status_code != 200:
            print("ERROR: Backend is not running!")
            print("Start it with: .\\venv\\Scripts\\python.exe -m uvicorn app.main:app --reload --port 8000")
            return
    except requests.exceptions.ConnectionError:
        print("ERROR: Cannot connect to backend!")
        print("Start it with: .\\venv\\Scripts\\python.exe -m uvicorn app.main:app --reload --port 8000")
        return
    
    # Check existing data to prevent duplicates
    existing_projects = {p['title'] for p in requests.get(f"{API_BASE}/projects/").json()}
    existing_skills = {s['name'] for s in requests.get(f"{API_BASE}/skills/").json()}
    existing_education = {e['title'] for e in requests.get(f"{API_BASE}/education/").json()}
    existing_certs = {c['title'] for c in requests.get(f"{API_BASE}/education/certifications/").json()}
    
    # Add Projects
    print("\nAdding projects...")
    for project in projects:
        if project['title'] in existing_projects:
            print(f"  - Skipped (exists): {project['title']}")
            continue
        try:
            response = requests.post(f"{API_BASE}/projects/", json=project)
            if response.status_code == 200:
                print(f"  ✓ Added: {project['title']}")
            else:
                print(f"  ✗ Failed: {project['title']} - {response.text}")
        except Exception as e:
            print(f"  ✗ Error: {e}")
    
    # Add Skills
    print("\nAdding skills...")
    for skill in skills:
        if skill['name'] in existing_skills:
            print(f"  - Skipped (exists): {skill['name']}")
            continue
        try:
            response = requests.post(f"{API_BASE}/skills/", json=skill)
            if response.status_code == 200:
                print(f"  ✓ Added: {skill['name']}")
            else:
                print(f"  ✗ Failed: {skill['name']} - {response.text}")
        except Exception as e:
            print(f"  ✗ Error: {e}")
    
    # Add Education
    print("\nAdding education/experience...")
    for edu in education:
        if edu['title'] in existing_education:
            print(f"  - Skipped (exists): {edu['title']}")
            continue
        try:
            response = requests.post(f"{API_BASE}/education/", json=edu)
            if response.status_code == 200:
                print(f"  ✓ Added: {edu['title']}")
            else:
                print(f"  ✗ Failed: {edu['title']} - {response.text}")
        except Exception as e:
            print(f"  ✗ Error: {e}")
    
    # Add Certifications
    print("\nAdding certifications...")
    for cert in certifications:
        if cert['title'] in existing_certs:
            print(f"  - Skipped (exists): {cert['title']}")
            continue
        try:
            response = requests.post(f"{API_BASE}/education/certifications/", json=cert)
            if response.status_code == 200:
                print(f"  ✓ Added: {cert['title']}")
            else:
                print(f"  ✗ Failed: {cert['title']} - {response.text}")
        except Exception as e:
            print(f"  ✗ Error: {e}")
    
    print("\n" + "-" * 40)
    print("Done! Your data has been added to the database.")
    print("\nView your data at:")
    print("  - Projects: http://localhost:8000/api/projects")
    print("  - Skills: http://localhost:8000/api/skills")
    print("  - Education: http://localhost:8000/api/education")
    print("  - Certifications: http://localhost:8000/api/education/certifications/")


if __name__ == "__main__":
    seed_data()
