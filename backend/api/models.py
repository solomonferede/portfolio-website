from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    technologies = models.CharField(max_length=200, blank=True)
    github_link = models.URLField(blank=True)
    live_link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Blog(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    author = models.CharField(max_length=120, blank=True)
    cover_image = models.URLField(blank=True)
    tags = models.CharField(max_length=250, blank=True, help_text="Comma-separated tags")
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
