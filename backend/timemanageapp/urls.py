from django.urls import path
from .views import CourseEnrollmentView

urlpatterns = [
    path('enroll/', CourseEnrollmentView.as_view(), name='course-enrollment'),
]