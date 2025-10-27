"""
Forum models - Quản lý đối thoại, bình luận và giải pháp cộng đồng
"""
from django.db import models
from apps.core.models import TimeStampedModel
from apps.cases.models import CaseStudy


class Post(TimeStampedModel):
    """
    Model quản lý bài đăng trong forum
    """
    title = models.CharField(max_length=200, verbose_name='Tiêu đề')
    content = models.TextField(verbose_name='Nội dung')
    author_name = models.CharField(
        max_length=100,
        verbose_name='Họ và tên tác giả',
        help_text='Tên người đăng bài'
    )
    case_study = models.ForeignKey(
        CaseStudy,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='posts',
        verbose_name='Case Study liên quan'
    )
    
    # Voting system
    upvotes = models.IntegerField(default=0, verbose_name='Số lượt ủng hộ')
    downvotes = models.IntegerField(default=0, verbose_name='Số lượt phản đối')
    
    # Media
    image_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        verbose_name='URL hình ảnh'
    )
    video_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        verbose_name='URL video'
    )
    
    # Status
    is_solution = models.BooleanField(
        default=False,
        verbose_name='Là giải pháp',
        help_text='Đánh dấu bài viết là giải pháp được đề xuất'
    )
    is_active = models.BooleanField(default=True, verbose_name='Kích hoạt')
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Bài đăng'
        verbose_name_plural = 'Bài đăng'
    
    def __str__(self):
        return self.title
    
    @property
    def score(self):
        """Calculate post score"""
        return self.upvotes - self.downvotes
    
    @property
    def comment_count(self):
        """Get number of comments"""
        return self.comments.count()


class Comment(TimeStampedModel):
    """
    Model quản lý bình luận
    """
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments',
        verbose_name='Bài đăng'
    )
    author_name = models.CharField(
        max_length=100,
        verbose_name='Họ và tên tác giả',
        help_text='Tên người bình luận'
    )
    content = models.TextField(verbose_name='Nội dung')
    
    # Reply system
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies',
        verbose_name='Bình luận cha'
    )
    
    is_active = models.BooleanField(default=True, verbose_name='Kích hoạt')
    
    class Meta:
        ordering = ['created_at']
        verbose_name = 'Bình luận'
        verbose_name_plural = 'Bình luận'
    
    def __str__(self):
        return f"Comment by {self.author_name} on {self.post.title}"


class Vote(TimeStampedModel):
    """
    Model quản lý vote (upvote/downvote)
    Sử dụng session hoặc IP để tracking votes anonymous
    """
    VOTE_CHOICES = [
        (1, 'Upvote'),
        (-1, 'Downvote'),
    ]
    
    # Tracking anonymous user bằng session key hoặc IP
    session_key = models.CharField(
        max_length=100,
        verbose_name='Session Key',
        help_text='Session ID hoặc identifier của người vote'
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='votes',
        verbose_name='Bài đăng'
    )
    vote_type = models.IntegerField(
        choices=VOTE_CHOICES,
        verbose_name='Loại vote'
    )
    
    class Meta:
        unique_together = ['session_key', 'post']
        verbose_name = 'Vote'
        verbose_name_plural = 'Votes'
    
    def __str__(self):
        return f"{self.session_key[:10]}... - {self.get_vote_type_display()} - {self.post.title}"
