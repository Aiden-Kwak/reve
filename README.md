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

### TODO 0118 02시 기준
- 유저 지원현황
- 마이페이지
- 강의 강사 카드 화면축소시 깨짐
- 그 외 모바일 친화도 개선
- 글자 크기에 신경쓸 것.
- 도메인 구입, ec2 점검, nginx 연결

- 고민점
1. 타임테이블 다수 사용자 동시접근해 공유자원 사용시 데드락 가능성.

