"""
Cases models - Quản lý Case Study về thực tiễn dân chủ cơ sở
"""
from django.db import models
from apps.core.models import TimeStampedModel


class CaseStudy(TimeStampedModel):
    """
    Model quản lý các Case Study về thực tiễn dân chủ cơ sở
    """
    title = models.CharField(max_length=200, verbose_name='Tên dự án')
    province = models.CharField(max_length=100, verbose_name='Tỉnh/Thành phố')
    description = models.TextField(verbose_name='Mô tả')
    mechanism = models.TextField(verbose_name='Cơ chế dân chủ áp dụng')
    pros = models.TextField(verbose_name='Ưu điểm', blank=True)
    cons = models.TextField(verbose_name='Hạn chế', blank=True)
    
    # Geographic coordinates
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        verbose_name='Vĩ độ',
        help_text='Ví dụ: 21.028511'
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        verbose_name='Kinh độ',
        help_text='Ví dụ: 105.804817'
    )
    
    # Additional information
    image_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        verbose_name='URL hình ảnh'
    )
    is_featured = models.BooleanField(default=False, verbose_name='Nổi bật')
    is_active = models.BooleanField(default=True, verbose_name='Kích hoạt')
    
    class Meta:
        ordering = ['-is_featured', '-created_at']
        verbose_name = 'Case Study'
        verbose_name_plural = 'Case Studies'
    
    def __str__(self):
        return f"{self.title} - {self.province}"
