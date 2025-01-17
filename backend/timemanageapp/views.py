from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Course, CourseEnrollment
from .serializers import CourseSerializer

class CourseEnrollmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        category = data.get('category')
        level = data.get('level')

        course = Course.objects.filter(category=category, level=level).first()

        # 강의가 없으면 새로 생성
        if not course:
            course = Course(
                category=category,
                level=level,
                #pass_type=data.get('pass_type'),
                #route=data.get('route'),
                #location=data.get('location', ''),
                #contact=data.get('contact', request.user.email),
                times=data.get('times', []),
                enrollment_count=0
            )
            course.save()

        # 이미 해당 수업에 신청한 유저인지 확인
        user = request.user
        if CourseEnrollment.objects.filter(user=user, course=course).exists():
            return Response({"error": "이미 신청한 수업입니다."}, status=status.HTTP_400_BAD_REQUEST)

        pass_type = data.get('pass_type')
        contact = data.get('contact', user.email)

        enrollment = CourseEnrollment(
            user=user,
            course=course,
            route=data.get('route'),
            location=data.get('location', ''),
            pass_type=pass_type,
            contact=contact
        )
        enrollment.save()

        course.increment_enrollment()

        return Response({
            "message": "수업 신청이 완료되었습니다.",
            "course": CourseSerializer(course).data,
        }, status=status.HTTP_201_CREATED)


class CourseListView(APIView):
    def get(self, request):
        category = request.GET.get('category')
        level = request.GET.get('level')

        courses = Course.objects.filter(category=category, level=level)

        # 기본 시간대 설정 (강의가 없을 경우 프론트에서 대조할 수 있도록 기본 데이터를 생성)
        time_slots = [
            "10:00-12:00", "14:00-16:00", "16:00-18:00", "19:30-21:30"
        ]
        result = [{
            "category": category,
            "level": level,
            "times": [{
                "day": day,
                "time": time_slot,
                "enrollment_count": 0  # 강의가 없으면 기본값 0으로 설정
            } for day in ["일요일","월요일", "화요일", "수요일", "목요일", "금요일", "토요일"] for time_slot in time_slots]
        }]

        # 강의가 있는 경우, 해당 강의의 시간과 신청자 수를 업데이트
        for course in courses:
            for time_slot in course.times:
                for item in result[0]["times"]:
                    if item["day"] == time_slot["day"] and item["time"] == time_slot["time"]:
                        item["enrollment_count"] = course.enrollment_count

        return Response(result, status=status.HTTP_200_OK)
    

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        
        enrollments = CourseEnrollment.objects.filter(user=user)
        
        enrollment_data = []
        for enrollment in enrollments:
            enrollment_data.append({
                'course': str(enrollment.course),
                'pass_type': dict(Course.PASS_CHOICES).get(enrollment.pass_type),
                'enrollment_date': enrollment.enrollment_date,
                'payed': enrollment.payed,
                'times': enrollment.course.times
            })

        return Response({
            'email': user.email,
            'enrollments': enrollment_data
        }, status=200)