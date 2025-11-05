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
