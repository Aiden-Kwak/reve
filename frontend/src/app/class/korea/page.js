import styles from "../class.module.css";

export default function KoreaPage() {
    return (
      <div className={styles.classContainer}>
        {/* 카드 영역 구분용 */}
        <div className={styles.teacherCard}>
          <div className={`${styles.teacherImage} teacherCard-item korea`}>
            <img src="/teacherProfile/korea_top.png" alt="ballet" />
          </div>
          <div className={`${styles.teacherInfo} teacherCard-item`}>
            <p className={styles.teacherName}><span className={`${styles.tag} ${styles.koreaTag}`}>한국무용</span>정주연</p>
            <div className={styles.teacherInfoDetail}>
              <p>- 한국예술종합학교 재학</p>
              <p>- 전) 고양예술고등학교 졸업</p>
              <p>- 현) 한국무용 전공 및 지도</p>
            </div>
          </div>
        </div>
        {/* 여기부턴 내용 설명*/}
        <div className={styles.classDetail}>
          {/* 입문반 설명 */}
          <div className={styles.classBasicInfo}>
            <p className={styles.classTitle}>입문반</p>
            <div className={styles.classHead}>
              <p>한국무용의 기본 동작과 테크닉을 배우며 기초를 탄탄히 다지는 수업입니다.</p>
              <p>기초가 중요한 장르인 만큼 <span className="root-color"><strong>한국무용 경험 6개월 이하</strong></span>이신 분들께 추천합니다.</p>
            </div>
            <div className={styles.classStep}>
              <p>하나, 한국무용의 기본 동작과 테크닉을 배우며 기초 다지기</p>
              <p>둘, 정중동(정적인 움직임 속 동적인 표현)과 장단의 리듬에 맞춘 움직임 익히기</p>
              <p>셋, 우아한 손동작과 발동작을 연결하며 한국무용의 선 학습하기</p>
              <p>넷, 기본 동작과 리듬감, 표현력을 통해 프레이즈의 기초 다지기</p>
            </div>
          </div>
          {/* 작품반 설명 */}
          <div className={styles.classPerformInfo}>
            <p className={styles.classTitle}>작품반</p>
            <div className={styles.classHead}>
              <p>한국무용의 기본기와 우아한 동작을 활용하여 작품을 완성하는 수업입니다.</p>
              <p>다져 온 기초로 하나의 프레이즈를 완성하고 싶으신 분들께 추천합니다.</p>
            </div>
            <div className={styles.classStep}>
              <p>하나, 테크닉과 동작을 활용하여 하나의 작품 완성하기</p>
              <p>둘, 프레이즈를 심화하며 전통적 감각과 창작적 해석을 통해 완성도 높이기</p>
              <p>셋, 감정과 이야기 전달을 위한 섬세한 움직임 개발하기</p>
              <p>넷, 개인 및 그룹 프레이즈 작업으로 완성도 높은 한국무용 작품 창작하기</p>
            </div>
          </div>
          {/* 초보자를 위한 추천코스 */}
          <div className={styles.classCourseRecommend}>
            <p className={styles.classTitle}>초보자를 위한 추천코스</p>
            <div className={styles.classStep}>
              <p>
                우아한 기본 동작과 한국무용의 섬세한 표현력을 원하신다면, 기초반 24회 수강 후 창작반으로 이동을, 
                빠른 기본기 습득 후 작품을 완성하고 싶다면, 기초반 12회 수강 후 창작반 이동을 추천드립니다. 
                인원이 모집됨에 따라 향후 추가 클래스가 오픈되며 이는 안내가 이루어질 예정입니다.
              </p>
            </div>
          </div>
          <p className={styles.notice}>선생님 사정에 따라 커리큘럼 내용이 일부 변동될 수 있으며, 사전안내가 이루어질 예정입니다.</p>
        </div>
      </div>
    );
  }
  