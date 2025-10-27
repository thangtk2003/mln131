"""
Theory URLs
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TheorySectionViewSet

router = DefaultRouter()
router.register(r'sections', TheorySectionViewSet, basename='theory-section')

urlpatterns = [
    path('', include(router.urls)),
]
