from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Course
from .serializers import CourseSerializer

"""
class CourseEnrollmentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data

        category = data.get('category')
        level = data.get('level')
        print(f"Requested category: {category}, level: {level}")

        course = Course.objects.filter(category=category, level=level).first()

        course.increment_enrollment()
        
        serializer = CourseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
class CourseEnrollmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        category = data.get('category')
        level = data.get('level')

        # 해당 강의를 찾기
        course = Course.objects.filter(category=category, level=level).first()

        # 강의가 없으면 새로 생성
        if not course:
            course = Course.objects.create(
                category=category,
                level=level,
                times=data.get('times', []),  # 시간대 정보
                pass_type=data.get('pass', ''),  # 수강권 정보
                route=data.get('route', 1),  # 경로
                location=data.get('location', ''),
                contact=data.get('contact', '')
            )

        # 새로 생성된 강의 또는 기존 강의에 대해 지원자 수 증가
        course.increment_enrollment()

        # 강의 정보를 반환
        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CourseListView(APIView):
    def get(self, request):
        category = request.GET.get('category')
        level = request.GET.get('level')

        courses = Course.objects.filter(category=category, level=level)

        if not courses.exists():
            return Response({"error": "해당 강의를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        result = []
        for course in courses:
            times_data = []
            for time_slot in course.times:
                day = time_slot.get('day')
                time = time_slot.get('time')

                enrollment_count = course.enrollment_count

                times_data.append({
                    "day": day,
                    "time": time,
                    "enrollment_count": enrollment_count
                })

            result.append({
                "category": course.category,
                "level": course.level,
                "times": times_data
            })

        return Response(result, status=status.HTTP_200_OK)