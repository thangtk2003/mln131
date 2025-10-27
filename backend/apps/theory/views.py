"""
Theory views
"""
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import TheorySection
from .serializers import TheorySectionSerializer


class TheorySectionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Theory Sections
    Provides CRUD operations for theory content
    """
    queryset = TheorySection.objects.filter(is_active=True)
    serializer_class = TheorySectionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'created_at']
    ordering = ['order']
