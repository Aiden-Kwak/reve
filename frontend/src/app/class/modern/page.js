import styles from "../class.module.css";

export default function ModernPage() {
    return (
      <div className={styles.classContainer}>
        {/* 카드 영역 구분용 */}
        <div className={styles.teacherCard}>
          <div className={`${styles.teacherImage} teacherCard-item korea`}>
            <img src="/teacherProfile/modern.jpeg" alt="ballet" />
          </div>
          <div className={`${styles.teacherInfo} teacherCard-item`}>
            <p className={styles.teacherName}><span className={`${styles.tag} ${styles.modernTag}`}>현대무용</span>이유진</p>
            <div className={styles.teacherInfoDetail}>
              <p>- 고양예술고등학교 졸업, 현대무용전공</p>
              <p>- 성균관대학교 무용학과 졸업 (컨템포러리댄스)</p>
              <p>- 전) 현대무용 성인 및 입시생 지도</p>
              <p>- 현) 리듬체조 학원 강사</p>
            </div>
          </div>
        </div>
        {/* 여기부턴 내용 설명*/}
        <div className={styles.classDetail}>
          {/* 입문반 설명 */}
          <div className={styles.classBasicInfo}>
            <p className={styles.classTitle}>입문반</p>
            <div className={styles.classHead}>
              <p>현대무용의 기본 동작과 테크닉을 배우며 기초를 탄탄히 다지는 수업입니다.</p>
              <p>기초가 중요한 장르인 만큼 <span className="root-color"><strong>현대무용 경험 6개월 이하</strong></span>이신 분들께 추천합니다.</p>
            </div>
            <div className={styles.classStep}>
              <p>하나, 플로어 워크, 폴 앤드 릴리스 등 신체 인지와 움직임 원리 익히기</p>
              <p>둘, 리듬감과 에너지 흐름을 통해 동작을 유연하게 연결하기</p>
              <p>셋, 공간 활용과 기본 즉흥 동작을 통해 움직임의 표현력을 확장하기</p>
              <p>넷, 현대무용의 핵심 기초 체계적으로 배우기</p>
            </div>
          </div>
          {/* 작품반 설명 */}
          <div className={styles.classPerformInfo}>
            <p className={styles.classTitle}>작품반</p>
            <div className={styles.classHead}>
              <p>현대무용의 테크닉과 자연스러운 움직임을 활용하여 작품을 완성하는 수업입니다. </p>
              <p>다져 온 기초로 하나의 프레이즈를 완성하고 싶으신 분들께 추천합니다.</p>
            </div>
            <div className={styles.classStep}>
              <p>하나, 테크닉과 동작을 활용하여 하나의 작품 완성하기</p>
              <p>둘, 프레이즈를 심화하며 안무 구성과 음악 해석을 통해 작품 완성도 높이기.</p>
              <p>셋, 감정 표현과 이야기 전달에 중점을 두어 독창적인 움직임 개발하기</p>
              <p>넷, 개인 및 그룹 프레이즈 작업으로 완성도 높은 작품을 창작하기</p>
            </div>
          </div>
          {/* 초보자를 위한 추천코스 */}
          <div className={styles.classCourseRecommend}>
            <p className={styles.classTitle}>초보자를 위한 추천코스</p>
            <div className={styles.classStep}>
              <p>
                탄탄한 기본기와 자연스러운 움직임을 원하신다면, 기초반 24회 수강 후 창작반으로 이동을,
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
  