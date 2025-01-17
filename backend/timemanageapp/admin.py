from django.contrib import admin
from django.db import models
from django.forms import widgets
from .models import Course, CourseEnrollment

class CourseAdmin(admin.ModelAdmin):
    list_display = ('category', 'level', 'enrollment_count')
    list_filter = ('category', 'level')
    search_fields = ('category', 'level')
    ordering = ('-id',)

    fieldsets = (
        (None, {
            'fields': ('category', 'level', 'times', 'enrollment_count')
        }),
    )

    formfield_overrides = {
        models.JSONField: {'widget': widgets.Textarea(attrs={'rows': 4, 'cols': 80})},
    }

class CourseEnrollmentAdmin(admin.ModelAdmin):
    exclude = ('enrollment_date',)
    readonly_fields = ('enrollment_date',)
    
    list_display = ('user', 'course', 'pass_type', 'route', 'contact', 'enrollment_date', 'payed')
    list_filter = ('course', 'pass_type', 'route', 'payed')
    search_fields = ('user__username', 'course__category', 'course__level', 'contact')
    ordering = ('-enrollment_date',)

    fieldsets = (
        (None, {
            'fields': ('user', 'course', 'route', 'location', 'pass_type', 'contact', 'enrollment_date', 'payed')
        }),
    )

    def save_model(self, request, obj, form, change):
        if not obj.contact:
            obj.contact = obj.user.email  # 사용자의 이메일을 contact 필드에 기본값으로 설정
        super().save_model(request, obj, form, change)

admin.site.register(Course, CourseAdmin)
admin.site.register(CourseEnrollment, CourseEnrollmentAdmin)
