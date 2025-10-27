"""
Django management command to seed database with sample data
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.theory.models import TheorySection
from apps.cases.models import CaseStudy
from apps.forum.models import Post, Comment


class Command(BaseCommand):
    help = 'Seed database with sample data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')
        
        # Create superuser if not exists
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@example.com',
                password='admin123',
                first_name='Admin',
                last_name='User'
            )
            self.stdout.write(self.style.SUCCESS('✓ Created admin user (admin/admin123)'))
        
        # Create sample users
        users = []
        for i in range(1, 4):
            user, created = User.objects.get_or_create(
                username=f'user{i}',
                defaults={
                    'email': f'user{i}@example.com',
                    'first_name': f'User',
                    'last_name': f'{i}'
                }
            )
            if created:
                user.set_password('password123')
                user.save()
            users.append(user)
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(users)} sample users'))
        
        # Create Theory Sections
        theory_sections = [
            {
                'title': 'Đảng lãnh đạo - Trụ cột chính trị',
                'description': '''Đảng Cộng sản Việt Nam là lực lượng lãnh đạo Nhà nước và xã hội, 
                định hướng chiến lược phát triển đất nước. Nguyên tắc lãnh đạo của Đảng được thể hiện 
                qua việc xây dựng đường lối, chính sách và định hướng phát triển.''',
                'media_type': 'infographic',
                'media_url': 'https://example.com/infographic1.png',
                'order': 1
            },
            {
                'title': 'Nhà nước quản lý - Công cụ thực thi',
                'description': '''Nhà nước pháp quyền xã hội chủ nghĩa thực thi đường lối của Đảng, 
                quản lý xã hội bằng pháp luật. Các cơ quan nhà nước hoạt động theo hiến pháp và pháp luật, 
                phục vụ nhân dân.''',
                'media_type': 'video',
                'media_url': 'https://www.youtube.com/watch?v=example',
                'order': 2
            },
            {
                'title': 'Nhân dân làm chủ - Mục tiêu cao nhất',
                'description': '''Nhân dân là chủ thể của nền dân chủ xã hội chủ nghĩa. 
                Quyền làm chủ của nhân dân được thực hiện thông qua các hình thức dân chủ trực tiếp 
                và dân chủ đại diện.''',
                'media_type': 'story',
                'media_url': 'https://example.com/story.html',
                'order': 3
            },
        ]
        
        for section_data in theory_sections:
            TheorySection.objects.get_or_create(
                title=section_data['title'],
                defaults=section_data
            )
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(theory_sections)} theory sections'))
        
        # Create Case Studies
        case_studies = [
            {
                'title': 'Mô hình "Dân hỏi - Chính quyền trả lời"',
                'province': 'Thành phố Hồ Chí Minh',
                'description': '''Mô hình tổ chức các buổi đối thoại trực tiếp giữa người dân và 
                lãnh đạo thành phố, giải quyết các vấn đề bức xúc của dân cư.''',
                'mechanism': '''Tổ chức định kỳ hàng tháng, người dân đặt câu hỏi trực tiếp 
                với lãnh đạo thành phố và các sở ngành.''',
                'pros': '''- Tăng cường minh bạch\n- Giải quyết vấn đề nhanh chóng\n- 
                Nâng cao niềm tin của người dân''',
                'cons': '''- Chưa tiếp cận được nhiều người dân\n- Cần nguồn lực tổ chức''',
                'latitude': 10.762622,
                'longitude': 106.660172,
                'is_featured': True
            },
            {
                'title': 'Ngân sách công khai xã',
                'province': 'Hà Nội',
                'description': '''Công khai toàn bộ ngân sách xã trên website và bảng tin, 
                cho phép người dân giám sát và đóng góp ý kiến.''',
                'mechanism': '''Mỗi quý công bố chi tiết thu chi ngân sách, tổ chức họp dân 
                để báo cáo và lấy ý kiến.''',
                'pros': '''- Minh bạch tài chính\n- Người dân tham gia giám sát\n- 
                Giảm tham nhũng''',
                'cons': '''- Cần cải thiện công nghệ\n- Người dân chưa quen việc giám sát''',
                'latitude': 21.028511,
                'longitude': 105.804817,
                'is_featured': True
            },
            {
                'title': 'Hội nghị "Công dân - Chính quyền"',
                'province': 'Đà Nẵng',
                'description': '''Tổ chức hội nghị định kỳ để người dân tham gia vào quá trình 
                ra quyết định về các dự án đầu tư công.''',
                'mechanism': '''Tổ chức bỏ phiếu trực tuyến và trực tiếp cho các dự án quan trọng, 
                lấy ý kiến người dân trước khi quyết định.''',
                'pros': '''- Dân chủ trong quyết định\n- Dự án phù hợp nhu cầu thực tế\n- 
                Tăng sự đồng thuận''',
                'cons': '''- Tốn thời gian\n- Cần nâng cao nhận thức người dân''',
                'latitude': 16.047079,
                'longitude': 108.206230,
                'is_featured': False
            },
        ]
        
        case_objs = []
        for case_data in case_studies:
            case, created = CaseStudy.objects.get_or_create(
                title=case_data['title'],
                defaults=case_data
            )
            case_objs.append(case)
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(case_studies)} case studies'))
        
        # Create Posts
        posts_data = [
            {
                'title': 'Đề xuất mở rộng mô hình "Dân hỏi - Chính quyền trả lời"',
                'content': '''Mô hình này rất hiệu quả ở TP.HCM. Tôi đề xuất nên nhân rộng 
                ra các tỉnh thành khác. Các buổi đối thoại trực tiếp giúp người dân hiểu rõ 
                chính sách và giải quyết được nhiều vấn đề bức xúc.''',
                'case_study': case_objs[0],
                'author': users[0],
                'upvotes': 15,
                'downvotes': 2,
                'is_solution': True
            },
            {
                'title': 'Kinh nghiệm công khai ngân sách xã',
                'content': '''Ở xã chúng tôi đã triển khai công khai ngân sách được 1 năm. 
                Người dân rất hài lòng vì biết được tiền thuế của mình được sử dụng như thế nào. 
                Tuy nhiên cần có hướng dẫn chi tiết hơn cho người dân về cách đọc báo cáo tài chính.''',
                'case_study': case_objs[1],
                'author': users[1],
                'upvotes': 12,
                'downvotes': 1,
                'is_solution': False
            },
            {
                'title': 'Cần có nền tảng online cho đối thoại dân chủ',
                'content': '''Trong thời đại số, chúng ta nên xây dựng nền tảng trực tuyến 
                để người dân có thể tham gia đối thoại mọi lúc mọi nơi. Điều này sẽ tiếp cận 
                được nhiều người hơn, đặc biệt là giới trẻ.''',
                'case_study': None,
                'author': users[2],
                'upvotes': 20,
                'downvotes': 3,
                'is_solution': True,
                'video_url': 'https://www.youtube.com/watch?v=example2'
            },
        ]
        
        post_objs = []
        for post_data in posts_data:
            post, created = Post.objects.get_or_create(
                title=post_data['title'],
                defaults=post_data
            )
            post_objs.append(post)
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(posts_data)} posts'))
        
        # Create Comments
        comments_data = [
            {
                'post': post_objs[0],
                'author': users[1],
                'content': 'Tôi đồng ý! Mô hình này rất cần thiết. Tuy nhiên cần có sự chuẩn bị kỹ lưỡng về nguồn lực.'
            },
            {
                'post': post_objs[0],
                'author': users[2],
                'content': 'Có thể kết hợp cả hình thức trực tuyến để tiếp cận nhiều người dân hơn.'
            },
            {
                'post': post_objs[1],
                'author': users[0],
                'content': 'Đề xuất tổ chức các lớp tập huấn cho người dân về đọc báo cáo tài chính cơ bản.'
            },
            {
                'post': post_objs[2],
                'author': users[0],
                'content': 'Ý tưởng hay! Nên tích hợp cả xác thực eKYC để đảm bảo tính minh bạch.'
            },
            {
                'post': post_objs[2],
                'author': users[1],
                'content': 'Cần có cơ chế kiểm duyệt nội dung để tránh thông tin sai lệch.'
            },
        ]
        
        for comment_data in comments_data:
            Comment.objects.get_or_create(
                post=comment_data['post'],
                author=comment_data['author'],
                content=comment_data['content']
            )
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(comments_data)} comments'))
        
        self.stdout.write(self.style.SUCCESS('\n🎉 Database seeded successfully!'))
        self.stdout.write(self.style.SUCCESS('\nLogin credentials:'))
        self.stdout.write(self.style.SUCCESS('  Admin: admin / admin123'))
        self.stdout.write(self.style.SUCCESS('  Users: user1, user2, user3 / password123'))
