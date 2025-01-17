import React from "react";
import styles from "./pass.module.css"; // 기존 CSS 가져오기
import { useRouter } from "next/navigation";

function PassContent() {
  const router = useRouter();
  return (
    <div className={styles.passContainer}>
      <p className={styles.head}>강의료는 어떻게 되나요?</p>
      <div className={styles.eventNotice}>
        <p><strong>Open EVENT!</strong></p>
        <p>인스타그램 스토리 인증 시,</p>
        <p>최초 1회, 차후 수업 1만 5천원 할인</p>
      </div>
      <div className={styles.passList}>
        {/* 1회 체험권 */}
        <div className={`${styles.passCard} ${styles.trialPass}`}>
          <p className={styles.passTitle}>1회 체험권</p>
          <p className={styles.passPrice}>3만원</p>
          <p className={styles.passDetail}>상시구매가능</p>
          <p className={styles.passDetail}>한 번의 체험으로 첫걸음을 내딛어보세요</p>
          <p className={styles.passBuyBtn}
          onClick={() => router.push("/class/enroll/?selectedGenre=ballet&selectedLevel=basic")}>
            지금 시작하기
          </p>
        </div>
        {/* 주 1회권 */}
        <div className={`${styles.passCard} ${styles.singlePass}`}>
          <p className={styles.passTitle}>주 1회권</p>
          <p className={styles.passPrice}>12만원<span>/mo</span></p>
          <p className={styles.passDetail}>가볍게 시작하기 좋아요</p>
          <p className={styles.passDetail}>부담없이 시작하기 좋은 선택!</p>
          <p className={styles.passBuyBtn}
          onClick={() => router.push("/class/enroll/?selectedGenre=ballet&selectedLevel=basic")}>지금 시작하기</p>
        </div>
        {/* 주 2회권 */}
        <div className={`${styles.passCard} ${styles.biPass}`}>
          <p className={styles.passTitle}>주 2회권</p>
          <p className={styles.passPrice}>22만원<span>/mo</span></p>
          <p className={styles.passDetail}>1회권 대비 8.3% 할인</p>
          <p className={styles.passDetail}>효율적으로 실력을 쌓아가요</p>
          <p className={styles.passBuyBtn}
          onClick={() => router.push("/class/enroll/?selectedGenre=ballet&selectedLevel=basic")}>지금 시작하기</p>
        </div>
        {/* 주 3회권 */}
        <div className={`${styles.passCard} ${styles.triPass}`}>
          <p className={styles.passTitle}>주 3회권</p>
          <p className={styles.passPrice}>32만원<span>/mo</span></p>
          <p className={styles.passDetail}>1회권 대비 11.1% 할인</p>
          <p className={styles.passDetail}>빠른 성장과 몰입을 원한다면</p>
          <p className={styles.passBuyBtn}
          onClick={() => router.push("/class/enroll/?selectedGenre=ballet&selectedLevel=basic")}>지금 시작하기</p>
        </div>
      </div>
      <div className={styles.PassNotice}>
        <p><strong>수강권 안내</strong></p>
        <p>- 체험권은 상시 구매 가능하며, 수강권은 매달 25일부터 말일까지 구매가 가능합니다.</p>
        <p>- 인권 수를 고려해야 함에 따라 신청은 변경 전, 후 수업의 최소 2일 전까지만 가능합니다.</p>
        <p>- 주 1회 수강권은 월 1회, 주 2회 수강권은 월 2회, 주 3회 수강권은 월 3회 이내로 요일, 시간 변경이 가능합니다.</p>
        <p className="root-color">- 등록 마감 최소 4일 전까지는 100%, 3일 전에는 50% 환불이 가능하며, 2일 전부터는 환불이 불가능합니다.</p>
      </div>
    </div>
  );
}

export default PassContent;
