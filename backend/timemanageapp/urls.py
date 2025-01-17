from django.urls import path
from .views import CourseEnrollmentView, CourseListView, UserProfileView

urlpatterns = [
    path('courses/enroll/', CourseEnrollmentView.as_view(), name='course-enrollment'),
    path('courses/', CourseListView.as_view(), name='course_list'),
    path('mypage/', UserProfileView.as_view(), name='user_profile'),
]