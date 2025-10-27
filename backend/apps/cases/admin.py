"""
Cases admin configuration
"""
from django.contrib import admin
from .models import CaseStudy


@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    """
    Admin configuration for Case Study
    """
    list_display = ['title', 'province', 'is_featured', 'is_active', 'created_at']
    list_filter = ['province', 'is_featured', 'is_active', 'created_at']
    search_fields = ['title', 'province', 'description']
    ordering = ['-is_featured', '-created_at']
    list_editable = ['is_featured', 'is_active']
    fieldsets = (
        ('Thông tin cơ bản', {
            'fields': ('title', 'province', 'description')
        }),
        ('Chi tiết', {
            'fields': ('mechanism', 'pros', 'cons')
        }),
        ('Vị trí địa lý', {
            'fields': ('latitude', 'longitude')
        }),
        ('Khác', {
            'fields': ('image_url', 'is_featured', 'is_active')
        }),
    )
