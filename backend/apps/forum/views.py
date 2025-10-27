"""
Forum views
"""
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Count, Q, F
from .models import Post, Comment, Vote
from .serializers import (
    PostSerializer,
    PostListSerializer,
    CommentSerializer,
    VoteSerializer
)


class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Posts - Không cần authentication, chỉ cần author_name
    """
    queryset = Post.objects.filter(is_active=True)
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'author_name']
    ordering_fields = ['created_at', 'upvotes', 'score']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        return PostSerializer
    
    @action(detail=False, methods=['get'])
    def solutions(self, request):
        """
        Get all solution posts (sorted by score)
        """
        posts = self.get_queryset().filter(is_solution=True).order_by('-upvotes', '-created_at')
        page = self.paginate_queryset(posts)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def trending(self, request):
        """
        Get trending posts (high score + recent)
        """
        posts = self.get_queryset().annotate(
            score_calc=F('upvotes') - F('downvotes')
        ).filter(score_calc__gte=0).order_by('-score_calc', '-created_at')[:10]
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def vote(self, request, pk=None):
        """
        Vote on a post (upvote or downvote)
        Sử dụng session key để track anonymous votes
        """
        post = self.get_object()
        vote_type = request.data.get('vote_type')  # 1 for upvote, -1 for downvote
        
        if vote_type not in [1, -1]:
            return Response(
                {'error': 'vote_type must be 1 (upvote) or -1 (downvote)'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get or create session key
        if not request.session.session_key:
            request.session.create()
        session_key = request.session.session_key
        
        # Check if session already voted
        vote, created = Vote.objects.get_or_create(
            session_key=session_key,
            post=post,
            defaults={'vote_type': vote_type}
        )
        
        if not created:
            # Update existing vote
            if vote.vote_type == vote_type:
                # Remove vote if same type
                vote.delete()
                if vote_type == 1:
                    post.upvotes = max(0, post.upvotes - 1)
                else:
                    post.downvotes = max(0, post.downvotes - 1)
            else:
                # Change vote type
                vote.vote_type = vote_type
                vote.save()
                if vote_type == 1:
                    post.upvotes += 1
                    post.downvotes = max(0, post.downvotes - 1)
                else:
                    post.downvotes += 1
                    post.upvotes = max(0, post.upvotes - 1)
        else:
            # New vote
            if vote_type == 1:
                post.upvotes += 1
            else:
                post.downvotes += 1
        
        post.save()
        return Response({
            'upvotes': post.upvotes,
            'downvotes': post.downvotes,
            'score': post.score
        })
    
    @action(detail=False, methods=['get'])
    def insights(self, request):
        """
        Get insights and analytics data
        """
        total_posts = Post.objects.filter(is_active=True).count()
        total_solutions = Post.objects.filter(is_active=True, is_solution=True).count()
        total_comments = Comment.objects.filter(is_active=True).count()
        
        # Top posts by score
        top_posts = Post.objects.filter(is_active=True).annotate(
            score_calc=F('upvotes') - F('downvotes')
        ).order_by('-score_calc')[:5]
        
        # Posts by case study
        posts_by_case = Post.objects.filter(
            is_active=True,
            case_study__isnull=False
        ).values('case_study__title').annotate(count=Count('id')).order_by('-count')[:10]
        
        return Response({
            'total_posts': total_posts,
            'total_solutions': total_solutions,
            'total_comments': total_comments,
            'top_posts': PostListSerializer(top_posts, many=True).data,
            'posts_by_case': list(posts_by_case),
        })


class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Comments - Không cần authentication, chỉ cần author_name
    """
    queryset = Comment.objects.filter(is_active=True)
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering = ['created_at']
    
    def get_queryset(self):
        """
        Filter comments by post if post_id is provided
        """
        queryset = super().get_queryset()
        post_id = self.request.query_params.get('post_id')
        if post_id:
            queryset = queryset.filter(post_id=post_id, parent__isnull=True)
        return queryset
