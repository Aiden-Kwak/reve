import styles from "./ballet.module.css";

export default function BalletPage() {
    return (
      <div className={styles.balletContainer}>
        {/* 카드 영역 구분용 */}
        <div className={styles.teacherCard}>
          <div className={`${styles.teacherImage} teacherCard-item`}>
            <img src="/teacherProfile/modern.jpeg" alt="ballet" />
          </div>
          <div className={`${styles.teacherInfo} teacherCard-item`}>
            <p className={styles.teacherName}><span className={styles.tag}>발 레</span>이현지</p>
            <div className={styles.teacherInfoDetail}>
              <p>- 고양예술고등학교 무용과 졸업</p>
              <p>- 동덕여자대학교 무용과 재학</p>
              <p>- 유아 발레지도 경력, 자격증 보유</p>
              <p>- 매트, 기구 필라테스 자격증</p>
              <p>- REHAB TRAINING SPECIALIST Level 1 수료</p>
            </div>
          </div>
        </div>
        {/* 여기부턴 내용 설명*/}
        <div className={styles.classDetail}>
          {/* 입문반 설명 */}
          <div className={styles.classBasicInfo}>
            <p className={styles.classTitle}>입문반</p>
            <div className={styles.classHead}>
              <p>정확한 동작과 예쁜 선을 위해 기초 동작을 훈련하는 수업입니다.</p>
              <p>기초가 중요한 장르인 만큼 <span className="root-color"><strong>발레 경험 6개월 이하</strong></span>이신 분들께 추천합니다.</p>
            </div>
            <div className={styles.classStep}>
              <p>하나, 발레의 기본 포지션과 테크닉을 배우며 기초를 탄찬히 다지기</p>
              <p>둘, 플리에(Plie), 텐듀(Tendu) 등 기초 동작과 몸의 정렬을 익히기</p>
              <p>셋, 우아한 팔과 다리 선을 만들고 기본 동작을 유연하게 연결하기</p>
              <p>넷, 프레이즈의 기초를 다지며 발레의 리듬감과 기본 표현력 학습하기</p>
            </div>
          </div>
          {/* 작품반 설명 */}
          <div className={styles.classPerformInfo}>
            <p className={styles.classTitle}>작품반</p>
            <div className={styles.classHead}>
              <p>발레의 동작과 예쁜 선을 활용하여 작품을 완성하는 수업입니다.</p>
              <p>다져 온 기초로 하나의 작품을 완성하고 싶으신 분들께 추천합니다.</p>
            </div>
            <div className={styles.classStep}>
              <p>하나, 기본 포지션과 테크닉을 활용하여 하나의 작품 완성하기</p>
              <p>둘, 프레이즈를 심화하며 음악과 동작의 조화를 통해 작품의 완성도를 높이기</p>
              <p>셋, 감정 표현과 이야기를 담아 발레의 예술적 깊이 살리기</p>
              <p>넷, 개인 및 그룹 작업을 통해 정교하고 완성도 높은 작품을 창작하기</p>
            </div>
          </div>
          {/* 초보자를 위한 추천코스 */}
          <div className={styles.classCourseRecommend}>
            <p className={styles.classTitle}>초보자를 위한 추천코스</p>
            <div className={styles.classStep}>
              <p>
                탄탄한 기본기와 예쁜 선을 원하신다면, 기초반 24회 수강 후 창작반으로 이동을,
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
  