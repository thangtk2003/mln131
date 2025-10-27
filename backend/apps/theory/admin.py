"""
Theory admin configuration
"""
from django.contrib import admin
from .models import TheorySection


@admin.register(TheorySection)
class TheorySectionAdmin(admin.ModelAdmin):
    """
    Admin configuration for Theory Section
    """
    list_display = ['title', 'media_type', 'order', 'is_active', 'created_at']
    list_filter = ['media_type', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['order', 'created_at']
    list_editable = ['order', 'is_active']
