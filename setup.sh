#!/bin/bash

# Setup script for development environment

echo "🚀 Setting up Dialogue Map development environment..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Prerequisites checked"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
if [ ! -f .env ]; then
    cp ../.env.example .env
    echo "⚠️  Please update backend/.env with your database credentials"
fi

# Run migrations
python manage.py migrate

# Seed data
python manage.py seed_data

echo "✅ Backend setup complete"

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd ../frontend

# Install dependencies
npm install

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
fi

echo "✅ Frontend setup complete"

# Done
cd ..
echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "  Backend:  cd backend && source venv/bin/activate && python manage.py runserver"
echo "  Frontend: cd frontend && npm run dev"
echo ""
echo "Or use Docker:"
echo "  docker-compose up"
echo ""
echo "Admin credentials:"
echo "  Username: admin"
echo "  Password: admin123"
