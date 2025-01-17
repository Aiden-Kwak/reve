from django.urls import path
from .views import CourseEnrollmentView, CourseListView

urlpatterns = [
    path('courses/enroll/', CourseEnrollmentView.as_view(), name='course-enrollment'),
    path('courses/', CourseListView.as_view(), name='course_list'),
]