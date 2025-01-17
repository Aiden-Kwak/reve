from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['category', 'level', 'times', 'route', 'location', 'contact', 'pass_type']
