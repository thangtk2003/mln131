"""
Forum serializers
"""
from rest_framework import serializers
from .models import Post, Comment, Vote


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for Comment model
    """
    replies_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = [
            'id',
            'post',
            'author_name',
            'content',
            'parent',
            'replies_count',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def get_replies_count(self, obj):
        return obj.replies.count()


class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for Post model
    """
    score = serializers.ReadOnlyField()
    comment_count = serializers.ReadOnlyField()
    case_study_title = serializers.CharField(
        source='case_study.title',
        read_only=True
    )
    
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'content',
            'author_name',
            'case_study',
            'case_study_title',
            'upvotes',
            'downvotes',
            'score',
            'comment_count',
            'image_url',
            'video_url',
            'is_solution',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at', 'upvotes', 'downvotes']


class PostListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for post list
    """
    score = serializers.ReadOnlyField()
    comment_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'author_name',
            'score',
            'comment_count',
            'is_solution',
            'created_at',
        ]


class VoteSerializer(serializers.ModelSerializer):
    """
    Serializer for Vote model
    """
    class Meta:
        model = Vote
        fields = ['id', 'session_key', 'post', 'vote_type', 'created_at']
        read_only_fields = ['created_at']
