# reve

### 작업가능시간:
- 목: 17시 ~ 24시, 01시 (약 7시간 가능) 
- 금: 17시 ~ 24시 (약 6시간)
- 토: 00시 ~ 12시 (12시간 가능)
- 데드라인: 토요일 13시
- 대략 순작업시간 24시간 가정, cicd없이 ec2 직접올리고 nginx로 프록시. 네트워크 구성 -3시간
- 프론트 구성 10시간, 서버 db스키마 고안 및 구현 10시간.  
### 해야할일(목,금,토)
- google OAuth2.0 구현, 로그인 구현
- django, nextjs cors 및 proxy 해결
- 프론트 껍데기부터 작업하자. client url 대충 구성. url별로 페이지 구성
```bash
reve.com/class # 홈(클래스)
reve.com/class/ballet # 발레강사진
reve.com/class/modern # 현대무용강사진
reve.com/class/korea # 한국무용강사진
reve.com/time # time table
reve.com/time/ballet/basic # 입문반 시간표
reve.com/time/ballet/performance # 작품반 시간표
reve.com/time/modern/basic # 입문반 시간표
reve.com/time/modern/performance # 작품반 시간표
reve.com/time/korea/basic # 입문반 시간표
reve.com/time/korea/performance # 작품반 시간표
reve.com/time/apply # ?param으로 발레, 입문반 전송해 사전 구성. 그러면 url 한개로 축소가능
reve.com/price # 수강권
reve.com/map # 장소지도
reve.com/qna # qna
reve.com/notice # 이용약관
reve.com/login # 이건 리다이렉트할거임
reve.com/mypage
```

- 서버 앱 분리 고안
```bash
accountapp # 계정
timetableapp # 시간표 관리를 위함
```

- timetable model 임시 고안
```python
from django.db import models
from django.contrib.auth.models import User


class DanceClass(models.Model):
    CLASS_TYPES = [
        ('ballet', 'Ballet'),
        ('modern', 'Modern Dance'),
        ('korean', 'Korean Dance'),
    ]
    LEVELS = [
        ('basic', 'Basic'),
        ('performance', 'Performance'),
    ]

    name = models.CharField(max_length=100)
    class_type = models.CharField(max_length=20, choices=CLASS_TYPES)
    level = models.CharField(max_length=20, choices=LEVELS)

    def __str__(self):
        return f"{self.get_class_type_display()} - {self.get_level_display()}"


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name


class TimetableSlot(models.Model):
    DAYS_OF_WEEK = [
        ('sun', 'Sunday'),
        ('mon', 'Monday'),
        ('tue', 'Tuesday'),
        ('wed', 'Wednesday'),
        ('thu', 'Thursday'),
        ('fri', 'Friday'),
        ('sat', 'Saturday'),
    ]

    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK)
    time = models.TimeField()  # 디스크리트하게 시간을 구성하기로 했지만 디비상에서는 타임필드로 관리하고 프론트에서 디스크리트하게 입력된 결과를 뷰에서 처리하는 식으로 하는게 나중 생각했을때 좋을 듯.
    dance_class = models.ForeignKey(DanceClass, on_delete=models.CASCADE, related_name='slots', null=True, blank=True)
    students = models.ManyToManyField(Student, through='Enrollment', blank=True)

    class Meta:
        unique_together = ('day', 'time')

    def __str__(self):
        return f"{self.get_day_display()} {self.time.strftime('%H:%M')}"


class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    timetable_slot = models.ForeignKey(TimetableSlot, on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'timetable_slot')

    def __str__(self):
        return f"{self.student.name} in {self.timetable_slot}"


```

- 고민점
1. 타임테이블 다수 사용자 동시접근해 공유자원 사용시 데드락 가능성.

