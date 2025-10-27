"""
Cases serializers
"""
from rest_framework import serializers
from .models import CaseStudy


class CaseStudySerializer(serializers.ModelSerializer):
    """
    Serializer for CaseStudy model
    """
    class Meta:
        model = CaseStudy
        fields = [
            'id',
            'title',
            'province',
            'description',
            'mechanism',
            'pros',
            'cons',
            'latitude',
            'longitude',
            'image_url',
            'is_featured',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']


class CaseStudyListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for list view (map pins)
    """
    class Meta:
        model = CaseStudy
        fields = [
            'id',
            'title',
            'province',
            'latitude',
            'longitude',
            'is_featured',
        ]
