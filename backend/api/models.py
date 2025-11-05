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


class Experience(models.Model):
    role = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.role} @ {self.company}"


class Education(models.Model):
    degree = models.CharField(max_length=150)
    institution = models.CharField(max_length=150)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.degree} — {self.institution}"


class Certificate(models.Model):
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=150, blank=True)
    issue_date = models.DateField(null=True, blank=True)
    credential_url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
