"""
Forum admin configuration
"""
from django.contrib import admin
from .models import Post, Comment, Vote


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    """
    Admin configuration for Post
    """
    list_display = ['title', 'author_name', 'case_study', 'score', 'comment_count', 'is_solution', 'created_at']
    list_filter = ['is_solution', 'is_active', 'created_at', 'case_study']
    search_fields = ['title', 'content', 'author_name']
    ordering = ['-created_at']
    list_editable = ['is_solution']
    readonly_fields = ['upvotes', 'downvotes', 'score', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Thông tin cơ bản', {
            'fields': ('title', 'content', 'author_name', 'case_study')
        }),
        ('Voting', {
            'fields': ('upvotes', 'downvotes', 'score')
        }),
        ('Media', {
            'fields': ('image_url', 'video_url')
        }),
        ('Status', {
            'fields': ('is_solution', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    """
    Admin configuration for Comment
    """
    list_display = ['post', 'author_name', 'content_preview', 'parent', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['content', 'author_name', 'post__title']
    ordering = ['-created_at']
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Nội dung'


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    """
    Admin configuration for Vote
    """
    list_display = ['session_key_preview', 'post', 'vote_type', 'created_at']
    list_filter = ['vote_type', 'created_at']
    search_fields = ['session_key', 'post__title']
    ordering = ['-created_at']
    
    def session_key_preview(self, obj):
        return obj.session_key[:20] + '...' if len(obj.session_key) > 20 else obj.session_key
    session_key_preview.short_description = 'Session Key'
