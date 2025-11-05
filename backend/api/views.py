from rest_framework import viewsets
from .models import Project, Blog
from .serializers import ProjectSerializer, BlogSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-published_at', '-created_at')
    serializer_class = BlogSerializer
