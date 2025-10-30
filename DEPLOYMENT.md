# 🚀 DEPLOYMENT GUIDE

Hướng dẫn chi tiết deploy ứng dụng lên production.

---

## 📋 Checklist trước khi deploy

- [ ] Đã test toàn bộ features
- [ ] Đã cấu hình environment variables
- [ ] Đã có Neon database
- [ ] Đã commit và push code lên Git
- [ ] Đã đọc kỹ hướng dẫn

---

## 🗄️ Bước 1: Setup Neon Database

### 1.1. Tạo tài khoản Neon

1. Truy cập https://neon.tech
2. Đăng ký tài khoản (free tier đủ dùng)
3. Verify email

### 1.2. Tạo Database

1. Click "Create Project"
2. Chọn region gần nhất (Singapore cho VN)
3. Đặt tên project: `dialogue-map`
4. Click "Create Project"

### 1.3. Lấy Connection String

1. Vào project dashboard
2. Click "Connection Details"
3. Copy connection string:

```
postgresql://user:password@host.neon.tech/main?sslmode=require
```

4. Lưu lại để dùng sau

---

## 🔧 Bước 2: Deploy Backend (Render)

### 2.1. Chuẩn bị Backend

1. Đảm bảo có file `requirements.txt`
2. Đảm bảo có file `backend/Dockerfile`
3. Push code lên GitHub

### 2.2. Tạo Web Service trên Render

1. Truy cập https://render.com
2. Đăng ký/Đăng nhập
3. Click "New +" → "Web Service"
4. Connect GitHub repository

### 2.3. Cấu hình Service

**OPTION 1: Dùng build.sh (Khuyến nghị)**

```
Name: dialogue-map-backend
Region: Singapore
Branch: main (hoặc master)
Root Directory: backend
Runtime: Python 3
Build Command: chmod +x build.sh && ./build.sh
Start Command: gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2
```

**OPTION 2: Manual commands**

```
Name: dialogue-map-backend
Region: Singapore
Branch: main (hoặc master)
Root Directory: backend
Runtime: Python 3
Build Command: pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate
Start Command: gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2
```

**⚠️ LƯU Ý QUAN TRỌNG:**

- Start Command phải là: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
- `config` là tên folder chứa wsgi.py trong backend
- Nếu bạn thấy error "No module named 'your_application'", nghĩa là bạn đang dùng lệnh mặc định sai của Render
- Phải thay đổi Start Command trong Render dashboard manually

### 2.4. Environment Variables

Thêm các biến môi trường:

```
DATABASE_URL=<neon-connection-string>
SECRET_KEY=<generate-random-string>
DEBUG=False
ALLOWED_HOSTS=.onrender.com,your-frontend-domain.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
PYTHON_VERSION=3.11.0
```

**Generate SECRET_KEY:**

```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 2.5. Deploy

1. Click "Create Web Service"
2. Đợi build (5-10 phút)
3. Sau khi deploy, truy cập URL để test

### 2.6. Run Migrations

Vào Render dashboard → Shell:

```bash
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
```

---

## 🎨 Bước 3: Deploy Frontend (Vercel)

### 3.1. Chuẩn bị Frontend

1. Đảm bảo có `frontend/package.json`
2. Đảm bảo có `frontend/vite.config.ts`
3. Push code lên GitHub

### 3.2. Import Project

1. Truy cập https://vercel.com
2. Đăng ký/Đăng nhập
3. Click "Add New..." → "Project"
4. Import từ GitHub

### 3.3. Cấu hình Project

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 3.4. Environment Variables

Thêm:

```
VITE_API_URL=https://dialogue-map-backend.onrender.com/api
```

### 3.5. Deploy

1. Click "Deploy"
2. Đợi build (2-5 phút)
3. Truy cập URL để test

---

## 🔄 Bước 4: Cấu hình CORS

### 4.1. Update Backend CORS

Vào Render → Environment Variables:

```
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
```

### 4.2. Redeploy Backend

Click "Manual Deploy" → "Deploy latest commit"

---

## 📱 Bước 5: Test Production

### 5.1. Test Checklist

- [ ] Frontend loads correctly
- [ ] API calls work
- [ ] Login works
- [ ] Map displays
- [ ] Forum works
- [ ] Admin panel accessible

### 5.2. Test URLs

```
Frontend: https://your-app.vercel.app
Backend API: https://dialogue-map-backend.onrender.com/api
Admin: https://dialogue-map-backend.onrender.com/admin
```

---

## 🔒 Bước 6: Security Hardening

### 6.1. Backend Security

Thêm vào environment variables:

```
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
SECURE_BROWSER_XSS_FILTER=True
```

### 6.2. Custom Domain (Optional)

**Vercel:**

1. Vào Project Settings → Domains
2. Add custom domain
3. Configure DNS records

**Render:**

1. Vào Service Settings → Custom Domain
2. Add domain
3. Configure DNS records

---

## 🐳 Alternative: Deploy with Docker

### Option A: DigitalOcean App Platform

1. **Create App**

```
- Connect GitHub
- Select repository
- Choose "Docker Compose"
```

2. **Configure**

```yaml
# Upload docker-compose.yml
# Add environment variables
```

3. **Deploy**

- Click "Create Resources"
- Wait for deployment

### Option B: Self-hosted VPS

1. **Setup VPS**

```bash
# SSH into VPS
ssh root@your-server-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose
```

2. **Clone Repository**

```bash
git clone <your-repo>
cd assignment
```

3. **Configure Environment**

```bash
cp .env.example .env
nano .env  # Edit with your values
```

4. **Deploy**

```bash
docker-compose up -d
```

5. **Setup Nginx Reverse Proxy**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

6. **Setup SSL with Certbot**

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## 📊 Bước 7: Monitoring

### 7.1. Render Monitoring

- Vào dashboard để xem logs
- Monitor resource usage
- Set up alerts

### 7.2. Vercel Analytics

- Enable Vercel Analytics
- Monitor page views
- Track performance

### 7.3. Database Monitoring

- Neon dashboard shows:
  - Connection count
  - Storage usage
  - Query performance

---

## 🔄 Bước 8: CI/CD Setup

### 8.1. GitHub Actions (Already configured)

File `.github/workflows/ci-cd.yml` đã có sẵn.

### 8.2. Auto Deploy

**Vercel:** Auto deploy on push to main
**Render:** Enable auto-deploy in settings

---

## 🐛 Troubleshooting

### ❌ Error: "ModuleNotFoundError: No module named 'your_application'"

**Nguyên nhân:** Start Command đang dùng lệnh mặc định sai của Render

**Cách sửa:**

1. Vào Render Dashboard → chọn service backend
2. Settings → Build & Deploy
3. Tìm "Start Command"
4. Thay đổi thành: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
5. Save Changes
6. Manual Deploy → Deploy latest commit

### Backend không start

```bash
# Check logs
render logs

# Common issues:
- Database connection failed → Check DATABASE_URL
- Module not found → Rebuild with dependencies
- Port binding → Check if using $PORT variable
- Wrong wsgi path → Must be config.wsgi:application
```

### Frontend không load API

```bash
# Check browser console
# Common issues:
- CORS error → Update CORS_ALLOWED_ORIGINS
- API URL wrong → Check VITE_API_URL
- Network error → Check backend is running
```

### Database connection timeout

```bash
# Check Neon dashboard
# Common issues:
- Connection limit reached → Upgrade plan
- SSL required → Ensure ?sslmode=require in URL
- IP restrictions → Check Neon IP allowlist
```

---

## 📈 Post-Deployment Tasks

### 1. Create Admin User

```bash
# Via Render Shell
python manage.py createsuperuser
```

### 2. Seed Initial Data

```bash
python manage.py seed_data
```

### 3. Configure Email (Optional)

```python
# Add to environment variables
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### 4. Setup Backup

- Neon auto-backups (paid plan)
- Manual backup via pg_dump
- Export data regularly

---

## 💰 Cost Estimate

### Free Tier (Testing)

- Neon: Free (500MB)
- Render: Free (750 hours/month)
- Vercel: Free (unlimited)
  **Total: $0/month**

### Production (Recommended)

- Neon Pro: $19/month
- Render Standard: $7/month
- Vercel Pro: $20/month
  **Total: ~$46/month**

### High Traffic

- Neon Scale: $69/month
- Render Plus: $25/month
- Vercel Enterprise: Custom
  **Total: ~$100+/month**

---

## 📞 Support

Nếu gặp vấn đề:

1. Check logs first
2. Read error messages
3. Search documentation
4. Open GitHub issue
5. Contact support

---

## ✅ Deployment Checklist

- [ ] Neon database created
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] Migrations run successfully
- [ ] Seed data loaded
- [ ] Admin user created
- [ ] All features tested
- [ ] SSL/HTTPS working
- [ ] Monitoring setup
- [ ] Backups configured

---

**Chúc mừng! 🎉 Ứng dụng của bạn đã live!**

Share URL với team và users để test.

---

_Last updated: January 2025_
