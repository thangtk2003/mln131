"""
Cases views
"""
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import CaseStudy
from .serializers import CaseStudySerializer, CaseStudyListSerializer


class CaseStudyViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Case Studies
    Provides CRUD operations and map data
    """
    queryset = CaseStudy.objects.filter(is_active=True)
    serializer_class = CaseStudySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'province', 'description']
    ordering_fields = ['created_at', 'is_featured']
    ordering = ['-is_featured', '-created_at']
    
    def get_serializer_class(self):
        """
        Use simplified serializer for list action
        """
        if self.action == 'list':
            return CaseStudyListSerializer
        return CaseStudySerializer
    
    @action(detail=False, methods=['get'])
    def map_data(self, request):
        """
        Custom endpoint for map markers
        Returns simplified data for all case studies
        """
        cases = self.get_queryset()
        serializer = CaseStudyListSerializer(cases, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """
        Get featured case studies
        """
        cases = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(cases, many=True)
        return Response(serializer.data)
