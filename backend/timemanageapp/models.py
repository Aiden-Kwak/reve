from django.contrib.auth.models import User
from django.db import models
from django.core.exceptions import ValidationError

class Course(models.Model):
    CATEGORY_CHOICES = [
        ('ballet', '발레'),
        ('modern', '현대무용'),
        ('korea', '한국무용'),
    ]
    
    LEVEL_CHOICES = [
        ('basic', '입문반'),
        ('advanced', '작품반'),
    ]

    PASS_CHOICES = [
        ('1', '1회 체험권'),
        ('2', '주 1회권'),
        ('3', '주 2회권'),
        ('4', '주 3회권'),
    ]

    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    level = models.CharField(max_length=12, choices=LEVEL_CHOICES)
    times = models.JSONField()  # 시간대
    enrollment_count = models.PositiveIntegerField(default=0)  # 지원자 수

    def __str__(self):
        return f"{self.category} - {self.level}"

    def increment_enrollment(self):
        self.enrollment_count += 1
        self.save()

    def clean(self):
        """시간 배열 비면 안돼"""
        if not self.times:
            raise ValidationError('Times cannot be an empty array.')
        


class CourseEnrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    route = models.IntegerField(blank=False, null=False, default="1")  # 유저가 서비스 알게된 경로 설문
    location = models.CharField(max_length=100, blank=True, null=True)  # 유저 위치
    pass_type = models.CharField(max_length=1, choices=Course.PASS_CHOICES)
    enrollment_date = models.DateTimeField(auto_now_add=True)
    contact = models.CharField(max_length=100, blank=True, null=True)  # 기본값은 사용자 이메일
    payed = models.BooleanField(default=False) # 결제여부 체크용 어떻게 써먹을진 모르겠음

    class Meta:
        unique_together = ('user', 'course')  # 중복 신청 방지

    def save(self, *args, **kwargs):
        if not self.contact:  # contact가 비어있다면, 유저의 이메일을 기본값으로 설정
            print('self.user: ', self.user)
            print('self.user.email: ', self.user.email)
            self.contact = self.user
        super(CourseEnrollment, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.course.category} ({self.course.level})"