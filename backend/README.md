# Backend development guide

## Quick Start

1. Create virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\Activate.ps1
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Setup database:

```bash
python manage.py migrate
python manage.py seed_data
```

4. Create superuser:

```bash
python manage.py createsuperuser
```

5. Run server:

```bash
python manage.py runserver
```

## Django Admin

Access admin panel at: http://localhost:8000/admin

Use the superuser credentials you created.

## API Documentation

Base URL: http://localhost:8000/api

All endpoints return JSON responses.

### Authentication

Most endpoints support both JWT and Session authentication.

To get JWT token:

```bash
POST /api/auth/token/
{
  "username": "admin",
  "password": "admin123"
}
```

Use token in headers:

```
Authorization: Bearer <your-token>
```

## Database Schema

### Core Models

- `TimeStampedModel` - Abstract base with created_at/updated_at

### Theory App

- `TheorySection` - Content sections for theory page

### Cases App

- `CaseStudy` - Case studies with geographic data

### Forum App

- `Post` - Forum posts with voting
- `Comment` - Comments on posts
- `Vote` - User votes tracking

## Management Commands

Seed database with sample data:

```bash
python manage.py seed_data
```

## Testing

Run all tests:

```bash
python manage.py test
```

Run specific app tests:

```bash
python manage.py test apps.forum
```
