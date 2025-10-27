# 🗺️ Bản đồ Đối thoại Dân chủ Cơ sở

## Interactive Dialogue & Policy Map

[![CI/CD](https://github.com/yourusername/dialogue-map/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/yourusername/dialogue-map/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ứng dụng web tương tác hiển thị và quản lý các mô hình dân chủ cơ sở tại Việt Nam, cho phép cộng đồng tham gia đối thoại và đóng góp giải pháp.

## 🌟 Tính năng chính

### 1️⃣ Trang Lý thuyết Nền tảng

- Hiển thị nội dung lý thuyết về "Đảng lãnh đạo – Nhà nước quản lý – Nhân dân làm chủ"
- Hỗ trợ nhiều định dạng: Text, Video, Infographic, Story
- Quản lý nội dung qua Django Admin Panel

### 2️⃣ Bản đồ Tương tác

- Hiển thị các Case Study trên bản đồ Việt Nam
- Click vào marker để xem chi tiết dự án
- Thông tin đầy đủ: cơ chế dân chủ, ưu điểm, hạn chế
- Liên kết trực tiếp đến forum thảo luận

### 3️⃣ Cổng Đối thoại & Phân tích

- **Dashboard:** Thống kê tổng quan với biểu đồ trực quan
- **Forum:** Đăng bài, bình luận, vote (upvote/downvote)
- **Kho Giải pháp:** Tổng hợp các đề xuất được cộng đồng ủng hộ

## 🛠️ Công nghệ sử dụng

### Backend

- **Django 5.0** - Web framework
- **Django REST Framework** - API RESTful
- **PostgreSQL (Neon)** - Database serverless
- **JWT Authentication** - Bảo mật API

### Frontend

- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Leaflet** - Interactive maps
- **Recharts** - Data visualization
- **Lucide React** - Icons

### DevOps

- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Nginx** - Reverse proxy

## 📁 Cấu trúc project

```
assignment/
├── backend/                 # Django Backend
│   ├── apps/
│   │   ├── core/           # Base models & utilities
│   │   ├── theory/         # Theory sections API
│   │   ├── cases/          # Case studies API
│   │   └── forum/          # Forum & comments API
│   ├── config/             # Django settings
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── config/        # Configuration
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── docker-compose.yml      # Docker orchestration
├── .env.example           # Environment template
└── README.md              # This file
```

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống

- **Python** 3.11+
- **Node.js** 18+
- **PostgreSQL** 15+ (hoặc Neon account)
- **Docker** & **Docker Compose** (tùy chọn)

### Cách 1: Cài đặt thủ công

#### Backend Setup

1. **Clone repository**

```powershell
git clone <repository-url>
cd assignment
```

2. **Tạo virtual environment**

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

3. **Cài đặt dependencies**

```powershell
pip install -r requirements.txt
```

4. **Cấu hình môi trường**

```powershell
# Copy file .env.example về .env và chỉnh sửa
cp ..\.env.example .env
```

Sửa file `.env`:

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

5. **Chạy migrations**

```powershell
python manage.py migrate
```

6. **Tạo dữ liệu mẫu**

```powershell
python manage.py seed_data
```

7. **Chạy development server**

```powershell
python manage.py runserver
```

Backend sẽ chạy tại: `http://localhost:8000`

#### Frontend Setup

1. **Cài đặt dependencies**

```powershell
cd ../frontend
npm install
```

2. **Cấu hình API URL**

```powershell
# Tạo file .env
echo "VITE_API_URL=http://localhost:8000/api" > .env
```

3. **Chạy development server**

```powershell
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

### Cách 2: Sử dụng Docker

1. **Cấu hình environment**

```powershell
cp .env.example .env
# Chỉnh sửa file .env với thông tin database
```

2. **Build và chạy containers**

```powershell
docker-compose up --build
```

3. **Truy cập ứng dụng**

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- Admin Panel: `http://localhost:8000/admin`

## 👤 Tài khoản mặc định

Sau khi chạy `seed_data`, bạn có thể đăng nhập với:

**Admin:**

- Username: `admin`
- Password: `admin123`

**User thường:**

- Username: `user1`, `user2`, `user3`
- Password: `password123`

## 📚 API Endpoints

### Theory API

- `GET /api/theory/sections/` - Lấy danh sách lý thuyết
- `POST /api/theory/sections/` - Tạo mới (admin)

### Cases API

- `GET /api/cases/` - Lấy danh sách case studies
- `GET /api/cases/{id}/` - Chi tiết case study
- `GET /api/cases/map_data/` - Dữ liệu cho bản đồ
- `GET /api/cases/featured/` - Case studies nổi bật

### Forum API

- `GET /api/forum/posts/` - Danh sách bài viết
- `POST /api/forum/posts/` - Tạo bài viết mới
- `GET /api/forum/posts/{id}/` - Chi tiết bài viết
- `POST /api/forum/posts/{id}/vote/` - Vote bài viết
- `GET /api/forum/posts/solutions/` - Kho giải pháp
- `GET /api/forum/posts/insights/` - Thống kê dashboard
- `GET /api/forum/comments/?post_id={id}` - Bình luận của bài viết
- `POST /api/forum/comments/` - Tạo bình luận mới

### Authentication

- `POST /api/auth/token/` - Lấy JWT token
- `POST /api/auth/token/refresh/` - Refresh token

## 🎨 Giao diện

### Design System

- **Font:** Inter (16px base)
- **Colors:**
  - Primary: `#2D9CDB` (Blue)
  - Success: `#27AE60` (Green)
  - Warning: `#F2994A` (Orange)
  - Danger: `#EB5757` (Red)
  - Gray: `#F5F6FA` (Background)

### Responsive

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Bảo mật

- **JWT Authentication** cho API endpoints
- **CSRF Protection** từ Django
- **XSS Protection** với Content Security Policy
- **SQL Injection Prevention** với Django ORM
- **HTTPS** trong production
- **Environment Variables** cho sensitive data

## 🚀 Deployment

### Neon Database Setup

1. Tạo tài khoản tại [neon.tech](https://neon.tech)
2. Tạo project mới
3. Copy connection string
4. Cập nhật `DATABASE_URL` trong `.env`

### Backend Deployment (Render/Railway)

1. Connect GitHub repository
2. Set environment variables
3. Deploy command: `gunicorn config.wsgi:application`

### Frontend Deployment (Vercel/Netlify)

1. Connect GitHub repository
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set `VITE_API_URL` environment variable

## 🧪 Testing

### Backend Tests

```powershell
cd backend
python manage.py test
```

### Frontend Tests

```powershell
cd frontend
npm run test
```

## 📝 Development

### Tạo migration mới

```powershell
python manage.py makemigrations
python manage.py migrate
```

### Tạo superuser

```powershell
python manage.py createsuperuser
```

### Format code

```powershell
# Backend
black backend/

# Frontend
npm run lint --fix
```

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Tác giả

- **Your Name** - _Initial work_

## 📞 Liên hệ

- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Django & Django REST Framework
- React & Vite
- TailwindCSS
- Leaflet & React Leaflet
- Recharts

---

**Made with ❤️ for Vietnamese Democracy**
