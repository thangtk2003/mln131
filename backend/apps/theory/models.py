"""
Theory models - Quản lý nội dung lý thuyết nền tảng
"""
from django.db import models
from apps.core.models import TimeStampedModel


class TheorySection(TimeStampedModel):
    """
    Model quản lý các phần nội dung lý thuyết
    """
    MEDIA_TYPE_CHOICES = [
        ('text', 'Text'),
        ('video', 'Video'),
        ('infographic', 'Infographic'),
        ('story', 'Story'),
    ]
    
    title = models.CharField(max_length=200, verbose_name='Tiêu đề')
    description = models.TextField(verbose_name='Mô tả')
    media_type = models.CharField(
        max_length=20,
        choices=MEDIA_TYPE_CHOICES,
        default='text',
        verbose_name='Loại media'
    )
    media_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        verbose_name='URL media'
    )
    order = models.IntegerField(default=0, verbose_name='Thứ tự hiển thị')
    is_active = models.BooleanField(default=True, verbose_name='Kích hoạt')
    
    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = 'Phần lý thuyết'
        verbose_name_plural = 'Các phần lý thuyết'
    
    def __str__(self):
        return self.title
