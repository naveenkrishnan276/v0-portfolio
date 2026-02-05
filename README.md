# Portfolio Website - Full Stack Application

A modern, interactive personal portfolio website built with **React/Next.js**, **FastAPI**, and **PostgreSQL**. Features a gym + coding theme with dark mode and neon accents.

## Overview

This is a complete full-stack portfolio solution that combines:

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Design**: Dark mode with neon cyan & magenta accents
- **Deployment**: Vercel (frontend) + Railway/Heroku (backend)

## Features

### Frontend
- ✨ Interactive hero section with smooth animations
- 🎯 Projects showcase with tech stack tags
- 🛠️ Dynamic skills display with category filtering
- 📚 Education & experience timeline
- 📜 Certifications gallery
- 📧 Contact form with backend integration
- 🔗 Social links (GitHub, LinkedIn, Twitter, Email)
- 📱 Fully responsive design
- ♿ Accessibility-first approach
- 🎨 Customizable design system with CSS variables

### Backend
- 🔌 RESTful API with FastAPI
- 🗄️ PostgreSQL database with SQLAlchemy ORM
- ✅ Data validation with Pydantic
- 📝 Comprehensive API documentation (Swagger/ReDoc)
- 🔐 CORS-enabled for frontend communication
- 📊 Contact message management
- 🚀 Production-ready configuration

## Project Structure

```
portfolio-website/
├── app/                          # Next.js frontend
│   ├── page.tsx                 # Main page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles & design tokens
│   └── ...
├── components/
│   ├── Header.tsx               # Navigation header
│   ├── Hero.tsx                 # Hero section
│   ├── Projects.tsx             # Projects showcase
│   ├── Skills.tsx               # Skills display
│   ├── Education.tsx            # Education timeline
│   ├── Contact.tsx              # Contact form
│   └── ui/                      # shadcn/ui components
├── backend-starter/             # FastAPI backend template
│   ├── app/
│   │   ├── main.py             # FastAPI app
│   │   ├── database.py         # Database configuration
│   │   ├── models.py           # SQLAlchemy models
│   │   ├── schemas.py          # Pydantic schemas
│   │   ├── crud.py             # Database operations
│   │   └── routes/             # API endpoints
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example            # Environment template
│   └── setup.sh                # Setup automation
├── BACKEND_SETUP_GUIDE.md      # Comprehensive backend guide
└── README.md                    # This file
```

## Quick Start

### Frontend Setup

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# Visit http://localhost:3000
```

### Backend Setup

See **[BACKEND_SETUP_GUIDE.md](./BACKEND_SETUP_GUIDE.md)** for comprehensive instructions, or follow the quick setup:

```bash
# 1. Navigate to backend directory
cd backend-starter

# 2. Copy environment template
cp .env.example .env

# 3. Edit .env with your PostgreSQL URL
# DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db

# 4. Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 5. Install dependencies
pip install -r requirements.txt

# 6. Run server
uvicorn app.main:app --reload

# 7. Visit documentation
# http://localhost:8000/docs
```

## Database Setup

### Option 1: PostgreSQL Locally
1. Download from [postgresql.org](https://www.postgresql.org/download/)
2. Create database: `createdb portfolio_db`
3. Set `DATABASE_URL=postgresql://postgres:password@localhost:5432/portfolio_db`

### Option 2: Cloud Services (Recommended)

**Supabase** (easiest for beginners)
```
1. Sign up at supabase.com
2. Create new project
3. Copy connection string
4. Paste in .env DATABASE_URL
```

**Railway**
```
1. Sign up at railway.app
2. Add PostgreSQL service
3. Copy connection URL
4. Paste in .env DATABASE_URL
```

**Neon**
```
1. Sign up at neon.tech
2. Create project
3. Copy connection string
4. Paste in .env DATABASE_URL
```

## API Endpoints

All endpoints are prefixed with `/api`

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (admin)

### Skills
- `GET /api/skills?category=frontend` - Get skills by category
- `POST /api/skills` - Create skill (admin)

### Education
- `GET /api/education` - Get all education entries
- `POST /api/education` - Create entry (admin)

### Certifications
- `GET /api/certifications` - Get all certifications
- `POST /api/certifications` - Create certification (admin)

### Contact
- `POST /api/contact/messages` - Submit contact form
- `GET /api/contact/messages` - Get messages (admin only)

### Health
- `GET /health` - Health check
- `GET /` - Root endpoint with API info

View full API docs at `http://localhost:8000/docs`

## Customization

### Change Your Name
1. Update `app/page.tsx` - Hero section
2. Update `BACKEND_SETUP_GUIDE.md` - Email and contact info
3. Update `components/Header.tsx` - Logo "YN" to your initials

### Change Colors
Edit `app/globals.css` to customize design tokens:

```css
:root {
  --primary: 180 100% 50%;      /* Cyan */
  --secondary: 300 100% 50%;    /* Magenta */
  --background: 15 29% 8%;      /* Dark navy */
}
```

### Add Your Projects
After backend is running:

```bash
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "technologies": "React,TypeScript",
    "link": "https://project.com",
    "github_link": "https://github.com/user/project"
  }'
```

Or add them directly to the database.

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy
5. Your site is live! 🎉

**Set environment variable:**
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### Backend (Railway)

1. Push backend folder to GitHub
2. Sign up at [railway.app](https://railway.app)
3. Create new project
4. Connect GitHub repository
5. Add PostgreSQL service
6. Set environment variables (.env)
7. Deploy

### Backend Alternative: Heroku

```bash
# Install Heroku CLI
brew install heroku

# Login
heroku login

# Create app
heroku create your-portfolio-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

## Development Tips

### Running Both Frontend & Backend Simultaneously

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd backend-starter
source venv/bin/activate
uvicorn app.main:app --reload
```

### Frontend API Calls

```typescript
// In your React components
const response = await fetch('http://localhost:8000/api/projects')
const projects = await response.json()

// Or for production
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
```

### Database Debugging

```python
# Interactive Python shell with database access
python3

# Then in Python:
from app.database import SessionLocal
from app.models import Project

db = SessionLocal()
projects = db.query(Project).all()
for p in projects:
    print(p.title)
```

## Troubleshooting

**Frontend won't connect to backend?**
- Check CORS settings in `backend-starter/app/main.py`
- Ensure backend is running on port 8000
- Check browser console for errors

**Database connection failed?**
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env` file
- Try connecting with `psql` directly

**Port 8000 already in use?**
```bash
# Find process using port 8000
lsof -i :8000

# Or use different port
uvicorn app.main:app --reload --port 8001
```

**Module not found errors?**
```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall requirements
pip install -r requirements.txt
```

## Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

## Next Steps

1. ✅ **Frontend complete** - Interactive, responsive design done
2. 🔧 **Build backend** - Follow BACKEND_SETUP_GUIDE.md
3. 🔗 **Connect frontend to backend** - Update API URLs
4. 📝 **Add your content** - Projects, skills, education
5. 🚀 **Deploy** - Vercel (frontend) + Railway/Heroku (backend)
6. 🔐 **Add auth** - JWT authentication for admin panel
7. 📧 **Email notifications** - Send alerts for contact messages
8. 📸 **Image uploads** - Support portfolio images

## Security Checklist

- [ ] Change `SECRET_KEY` in production `.env`
- [ ] Set `DEBUG=False` in production
- [ ] Update CORS `allow_origins` with your domain
- [ ] Use HTTPS for all connections
- [ ] Add authentication for admin endpoints
- [ ] Set strong database passwords
- [ ] Never commit `.env` file to version control
- [ ] Use environment variables for API keys

## Support

- 📖 Read BACKEND_SETUP_GUIDE.md for detailed backend help
- 🐛 Check troubleshooting section above
- 📚 Review example code in backend-starter/
- 🤝 Open an issue if you encounter problems

## License

This portfolio template is free to use and modify for your personal use.

---

Built with ❤️ for developers who are serious about their portfolios. Good luck! 🚀
