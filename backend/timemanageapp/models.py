from django.db import models

class Course(models.Model):
    CATEGORY_CHOICES = [
        ('ballet', '발레'),
        ('modern', '현대무용'),
        ('korea', '한국무용'),
    ]
    
    LEVEL_CHOICES = [
        ('basic', '입문반'),
        ('performance', '작품반'),
    ]

    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    level = models.CharField(max_length=12, choices=LEVEL_CHOICES)
    times = models.JSONField() # ex) ["10:00", "11:30"] 이런식으로 시작시간 종료시간 리스트 받을거임
    route = models.IntegerField() # 유저가 서비스 알게된 경로 설문
    location = models.CharField(max_length=255, blank=True, null=True) # 유저 위치
    contact = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.category} - {self.level}"