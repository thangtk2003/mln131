"""
Theory serializers
"""
from rest_framework import serializers
from .models import TheorySection


class TheorySectionSerializer(serializers.ModelSerializer):
    """
    Serializer for TheorySection model
    """
    class Meta:
        model = TheorySection
        fields = [
            'id',
            'title',
            'description',
            'media_type',
            'media_url',
            'order',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']
