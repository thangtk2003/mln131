# Setup script for Windows PowerShell

Write-Host "🚀 Setting up Dialogue Map development environment..." -ForegroundColor Cyan

# Check if Python is installed
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Python is not installed. Please install Python 3.11 or higher." -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18 or higher." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Prerequisites checked" -ForegroundColor Green

# Setup Backend
Write-Host ""
Write-Host "📦 Setting up Backend..." -ForegroundColor Cyan
Set-Location backend

# Create virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Copy environment file
if (-not (Test-Path .env)) {
    Copy-Item ..\.env.example .env
    Write-Host "⚠️  Please update backend\.env with your database credentials" -ForegroundColor Yellow
}

# Run migrations
python manage.py migrate

# Seed data
python manage.py seed_data

Write-Host "✅ Backend setup complete" -ForegroundColor Green

# Setup Frontend
Write-Host ""
Write-Host "📦 Setting up Frontend..." -ForegroundColor Cyan
Set-Location ..\frontend

# Install dependencies
npm install

# Copy environment file
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
}

Write-Host "✅ Frontend setup complete" -ForegroundColor Green

# Done
Set-Location ..
Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:"
Write-Host "  Backend:  cd backend; .\venv\Scripts\Activate.ps1; python manage.py runserver" -ForegroundColor Cyan
Write-Host "  Frontend: cd frontend; npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Or use Docker:"
Write-Host "  docker-compose up" -ForegroundColor Cyan
Write-Host ""
Write-Host "Admin credentials:"
Write-Host "  Username: admin" -ForegroundColor Yellow
Write-Host "  Password: admin123" -ForegroundColor Yellow
