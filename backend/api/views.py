from rest_framework import viewsets
from .models import Project, Blog, Experience, Education, Certificate
from .serializers import (
    ProjectSerializer,
    BlogSerializer,
    ExperienceSerializer,
    EducationSerializer,
    CertificateSerializer,
)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-published_at', '-created_at')
    serializer_class = BlogSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by('-start_date', '-created_at')
    serializer_class = ExperienceSerializer


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all().order_by('-start_date', '-created_at')
    serializer_class = EducationSerializer


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all().order_by('-issue_date', '-created_at')
    serializer_class = CertificateSerializer
