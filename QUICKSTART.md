# 🚀 QUICK START GUIDE

## Cài đặt nhanh với PowerShell (Windows)

### Bước 1: Cài đặt tự động

```powershell
# Clone repository (nếu có)
git clone <your-repo-url>
cd assignment

# Chạy script setup
.\setup.ps1
```

### Bước 2: Cấu hình Database

Mở file `backend\.env` và cập nhật:

```env
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
SECRET_KEY=your-random-secret-key-here
```

**Lấy Neon Database URL:**

1. Đăng ký tại https://neon.tech
2. Tạo project mới
3. Copy Connection String
4. Dán vào `DATABASE_URL`

### Bước 3: Khởi động ứng dụng

**Terminal 1 - Backend:**

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

**Terminal 2 - Frontend:**

```powershell
cd frontend
npm run dev
```

### Bước 4: Truy cập

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api
- **Admin Panel:** http://localhost:8000/admin

**Đăng nhập Admin:**

- Username: `admin`
- Password: `admin123`

---

## Hoặc sử dụng Docker

```powershell
# Chỉnh sửa .env với database credentials
docker-compose up --build
```

Truy cập:

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

---

## Cấu trúc trang

1. **Trang Chủ (/)** → Lý thuyết Nền tảng
2. **Bản đồ (/map)** → Case Study trên bản đồ
3. **Forum (/forum)** → Đối thoại & Phân tích

---

## Thêm dữ liệu mẫu

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python manage.py seed_data
```

---

## Sửa lỗi thường gặp

### Lỗi: Module not found (Frontend)

```powershell
cd frontend
rm -rf node_modules
npm install
```

### Lỗi: Database connection

- Kiểm tra `DATABASE_URL` trong `.env`
- Đảm bảo Neon database đang hoạt động

### Lỗi: Port đã được sử dụng

```powershell
# Backend (port 8000)
netstat -ano | findstr :8000
taskkill /PID <process-id> /F

# Frontend (port 5173)
netstat -ano | findstr :5173
taskkill /PID <process-id> /F
```

---

## Liên hệ hỗ trợ

Mở issue trên GitHub nếu gặp vấn đề!
