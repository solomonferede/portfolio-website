from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    BlogViewSet,
    ExperienceViewSet,
    EducationViewSet,
    CertificateViewSet,
    download_cv,
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'blogs', BlogViewSet, basename='blog')
router.register(r'experiences', ExperienceViewSet)
router.register(r'educations', EducationViewSet)
router.register(r'certificates', CertificateViewSet)

urlpatterns = [
    path('download-cv/', download_cv, name='download-cv'),
    path('', include(router.urls)),
]
