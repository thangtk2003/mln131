# Migration Guide - Forum Anonymous System

## Thay đổi

Hệ thống Forum đã được cập nhật để **không cần đăng nhập**. Người dùng chỉ cần nhập họ tên khi đăng bài hoặc bình luận.

## Database Changes

### Models đã thay đổi:

1. **Post model** (`apps/forum/models.py`)

   - ❌ Xóa: `author = ForeignKey(User)`
   - ✅ Thêm: `author_name = CharField(max_length=100)`

2. **Comment model** (`apps/forum/models.py`)

   - ❌ Xóa: `author = ForeignKey(User)`
   - ✅ Thêm: `author_name = CharField(max_length=100)`

3. **Vote model** (`apps/forum/models.py`)
   - ❌ Xóa: `user = ForeignKey(User)`
   - ✅ Thêm: `session_key = CharField(max_length=100)`
   - Thay đổi unique constraint: `['session_key', 'post']` thay vì `['user', 'post']`

## Migration Steps

### 1. Tạo migrations

```bash
cd backend
python manage.py makemigrations forum
```

**Lưu ý**: Django sẽ phát hiện việc xóa ForeignKey và có thể hỏi về dữ liệu cũ:

- Chọn xóa cột cũ (delete the field)
- Hoặc cung cấp giá trị mặc định cho `author_name` (ví dụ: "Anonymous")

### 2. Xem SQL migration (tùy chọn)

```bash
python manage.py sqlmigrate forum 0002  # Thay 0002 bằng số migration vừa tạo
```

### 3. Chạy migrations

```bash
python manage.py migrate
```

### 4. Xử lý dữ liệu cũ (nếu có)

Nếu database đã có dữ liệu với User relationships, bạn cần migration script:

```python
# backend/apps/forum/migrations/0003_migrate_author_data.py
from django.db import migrations

def migrate_author_names(apps, schema_editor):
    Post = apps.get_model('forum', 'Post')
    Comment = apps.get_model('forum', 'Comment')

    # Migrate existing posts
    for post in Post.objects.all():
        if hasattr(post, 'author') and post.author:
            post.author_name = post.author.get_full_name() or post.author.username
            post.save()

    # Migrate existing comments
    for comment in Comment.objects.all():
        if hasattr(comment, 'author') and comment.author:
            comment.author_name = comment.author.get_full_name() or comment.author.username
            comment.save()

class Migration(migrations.Migration):
    dependencies = [
        ('forum', '0002_auto_XXXXXXXX'),  # Previous migration
    ]

    operations = [
        migrations.RunPython(migrate_author_names),
    ]
```

Chạy migration này:

```bash
python manage.py migrate forum 0003
```

## Backend Changes

### Views đã cập nhật:

1. **PostViewSet** - `permission_classes = [AllowAny]`
2. **CommentViewSet** - `permission_classes = [AllowAny]`
3. **Vote endpoint** - Sử dụng `session_key` thay vì `user`

### Serializers đã cập nhật:

- Xóa `UserSerializer`
- Cập nhật tất cả serializers để sử dụng `author_name` thay vì `author`

## Frontend Changes

### Types đã cập nhật (`src/types/index.ts`):

```typescript
// ❌ Xóa
export interface User { ... }

// ✅ Cập nhật
export interface Post {
  author_name: string;  // Thay vì author: User
  // ...
}

export interface Comment {
  author_name: string;  // Thay vì author: User
  // ...
}
```

### Components đã cập nhật:

1. **ForumPage.tsx** - Hiển thị `post.author_name` thay vì `post.author.username`
2. **PostDetailPage.tsx** - Thêm input field cho `author_name` trong comment form
3. **CreatePostPage.tsx** - Component mới để tạo bài đăng với input `author_name`

### Routes mới:

```typescript
<Route path="/forum/create" element={<CreatePostPage />} />
```

## Testing

### 1. Test tạo bài đăng mới:

```bash
curl -X POST http://localhost:8000/api/forum/posts/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "Test content",
    "author_name": "Nguyễn Văn A",
    "is_active": true
  }'
```

### 2. Test tạo comment:

```bash
curl -X POST http://localhost:8000/api/forum/comments/ \
  -H "Content-Type: application/json" \
  -d '{
    "post": 1,
    "author_name": "Trần Thị B",
    "content": "Great post!",
    "parent": null,
    "is_active": true
  }'
```

### 3. Test vote (sử dụng session):

```bash
curl -X POST http://localhost:8000/api/forum/posts/1/vote/ \
  -H "Content-Type: application/json" \
  -H "Cookie: sessionid=YOUR_SESSION_ID" \
  -d '{"vote_type": 1}'
```

## Rollback (nếu cần)

Nếu cần quay lại phiên bản cũ:

```bash
# Rollback migrations
python manage.py migrate forum 0001  # Quay lại migration trước khi thay đổi

# Hoặc rollback toàn bộ forum app
python manage.py migrate forum zero
```

## Notes

- ✅ Không cần authentication middleware
- ✅ Session-based voting để tránh spam
- ✅ Đơn giản hóa UX - không cần đăng ký/đăng nhập
- ⚠️ Cần thêm validation/rate limiting để tránh spam
- ⚠️ Xem xét thêm CAPTCHA cho production

## Next Steps

1. ✅ Chạy migrations
2. ✅ Test API endpoints
3. ✅ Test frontend forms
4. 🔄 Thêm rate limiting (optional)
5. 🔄 Thêm CAPTCHA (optional)
6. 🔄 Seed data mới với author_name
