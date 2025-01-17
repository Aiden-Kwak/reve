import styles from "../class.module.css";

export default function StoryPage() {
    return (
      <div className={styles.classContainer}>
        {/* 카드 영역 구분용 */}
        <div className={styles.teacherCard}>
          <div className={`${styles.teacherImage} teacherCard-item reve`}>
            <img src="/teacherProfile/logo.png" alt="logo" />
          </div>
          <div className={`${styles.teacherInfo} teacherCard-item`}>
            <p className={styles.teacherName}><span className={`${styles.tag} ${styles.reveTag}`}>Rêve</span>레브</p>
            <div className={`${styles.teacherInfoDetail} ${styles.reveDetail}`}>
              <p> 추후 유명 강사님 초청, 지점별 공연, 발레, 무용 공연 관람 등 다양한 이벤트가 준비될 예정입니다.</p>
            </div>
          </div>
        </div>
        {/* 여기부턴 내용 설명*/}
        <div className={styles.classDetail}>
          {/* 입문반 설명 */}
          <div className={styles.classBasicInfo}>
            <p className={`${styles.classTitle} logo-main-style`}>Rêve story</p>
            <div className={styles.classHead}>
              <p>Rêve는 발레와 무용이 전하는 따뜻한 가치를 공유하기 위해 탄생한 <span className="root-color">대학생, 직장인을 위한 발레, 무용 커뮤니티 클래스</span>입니다. 무대가 열리는 순간, 꿈의 이야기가 시작됩니다.</p>
              <p>발레와 무용의 섬세한 아름다움을 배우고, 일상에서 벗어나 새로운 영감을 발견할 여러분들을 기다립니다.</p>
            </div>
            <div className={styles.classStep}>
              <p>체형 교정을 하고 싶으신 분들</p>
              <p>발레, 무용을 취미로 배우고 싶은 분들</p>
              <p>아름다운 춤선을 영상으로 간직하고 싶으신 분들</p>
              <p>공통된 관심사를 가진 사람들과 교류하고 싶으신 분들</p>
              <p>활동적이면서도 몸과 마음에 여유를 가져다 주는 취미를 가지고 싶으신 분들</p>
              <p><strong><span className="root-color">여러분 모두를 환영합니다!</span></strong></p>
            </div>
          </div>  
        </div>
      </div>
    );
  }
  