from django.contrib import admin
from django.db import models 
from django.forms import widgets
from .models import Course

class CourseAdmin(admin.ModelAdmin):
    list_display = ('category', 'level', 'pass_type', 'route', 'location', 'contact')
    list_filter = ('category', 'level', 'pass_type', 'route')
    search_fields = ('category', 'level', 'contact')
    ordering = ('-id',)

    fieldsets = (
        (None, {
            'fields': ('category', 'level', 'pass_type', 'route', 'times', 'location', 'contact')
        }),
    )

    formfield_overrides = {
        models.JSONField: {'widget': widgets.Textarea(attrs={'rows': 4, 'cols': 80})},
    }

admin.site.register(Course, CourseAdmin)
