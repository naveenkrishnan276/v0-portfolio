#!/bin/bash

# Portfolio Backend Setup Script
# This script automates the initial setup of the FastAPI backend

echo "🚀 Portfolio Backend Setup"
echo "=========================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"
echo ""

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "📝 Please edit .env with your database configuration"
else
    echo "✅ .env file already exists"
fi

# Create __init__.py files
echo "📁 Creating Python package structure..."
touch app/__init__.py
touch app/routes/__init__.py

# Initialize database
echo "🗄️  Initializing database..."
python3 -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Edit .env file with your database URL"
echo "  2. Activate venv: source venv/bin/activate"
echo "  3. Run: uvicorn app.main:app --reload"
echo "  4. Visit http://localhost:8000/docs for API docs"
echo ""
echo "🎉 Happy coding!"
