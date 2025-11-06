from django.contrib import admin
from .models import Project, Blog, Experience, Education, Certificate
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title", "technologies")


class BlogAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = Blog
        fields = '__all__'

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    form = BlogAdminForm
    list_display = ("title", "slug", "published_at", "created_at")
    search_fields = ("title", "slug", "tags", "author")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "start_date", "end_date")
    search_fields = ("role", "company")


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "start_date", "end_date")
    search_fields = ("degree", "institution")


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("name", "issuer", "issue_date")
    search_fields = ("name", "issuer")
