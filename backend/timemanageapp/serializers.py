from rest_framework import serializers
from .models import Course, CourseEnrollment

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'category', 'level', 'times', 'enrollment_count']

class CourseEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseEnrollment
        fields = ['user', 'course', 'route', 'location', 'pass_type', 'enrollment_date', 'contact', 'payed']

    def create(self, validated_data):
        user = validated_data.get('user')
        if not validated_data.get('contact'):
            validated_data['contact'] = user.email
        return super().create(validated_data)
