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

    PASS_CHOICES = [
        ('1', '1회 체험권'),
        ('2', '주 1회권'),
        ('3', '주 2회권'),
        ('4', '주 3회권'),
    ]

    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    level = models.CharField(max_length=12, choices=LEVEL_CHOICES)
    # ex: [{"day": "월요일", "time": "10:00-12:00"}, {"day": "화요일", "time": "14:00-16:00"}]
    times = models.JSONField()
    pass_type = models.CharField(max_length=1, choices=PASS_CHOICES)
    route = models.IntegerField() # 유저가 서비스 알게된 경로 설문
    location = models.CharField(max_length=100, blank=True, null=True) # 유저 위치
    contact = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.category} - {self.level}"