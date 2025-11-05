from django.contrib import admin
from .models import Project, Blog

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title", "technologies")


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "published_at", "created_at")
    search_fields = ("title", "slug", "tags", "author")
    prepopulated_fields = {"slug": ("title",)}
