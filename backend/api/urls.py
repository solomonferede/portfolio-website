from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    BlogViewSet,
    ExperienceViewSet,
    EducationViewSet,
    CertificateViewSet,
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'blogs', BlogViewSet)
router.register(r'experiences', ExperienceViewSet)
router.register(r'educations', EducationViewSet)
router.register(r'certificates', CertificateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
