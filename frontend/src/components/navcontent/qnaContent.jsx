import React from "react";
import styles from "./qna.module.css";

const qnaList = [
  {
    question: "해당 수강권으로 다른 장르의 수업을 들어볼 수 있나요?",
    answer: "1월 18일(토)부터 1월 25일(토) 자정까지 모집이 이루어지고, 2월 첫 주차 월요일인 2월 3일(월)부터 정규 클래스가 오픈됩니다. 매달 날짜는 변동 가능하니 신청 시 마감 기한 확인 부탁드립니다.",
  },
  {
    question: "해당 수강권으로 다른 장르의 수업을 들어볼 수 있나요?",
    answer: "레브 수강생의 최대 장점입니다. 수강권에 따라 부여되는 체험권의 개수에 한하여, 모든 장르, 요일, 시간대의 수업을 들어보실 수 있습니다. 타 장르도 궁금하시다면 적극적으로 이용해보세요 :)",
  },
  {
    question: "준비물은 따로 필요 없나요?",
    answer: "네, 움직이기 편한 옷 차림이 전부입니다 :) 탈의실과 샤워실이 구비가 되어있으니 갈아입을 옷 챙겨오셔도 무방합니다. 정수기도 마련되어 있으니 물통 챙겨오시는 것 추천드릴게요.",
  },
  {
    question: "처음 배우는데 각 수업의 기초반은 얼마나 수강하면 될까요?",
    answer: "기초는 선생님의 커리큘럼에 따라 24회 수강 후, 창작반으로 이동하시는 것을 추천드립니다. 구매하신 수강권은 입문반과 작품반 모두 사용이 가능하니 다양하게 수강해 보며 여러분과 딱 맞는 선생님과 수업을 찾아보세요 :)",
  },
  {
    question: "커뮤니티 모임에는 꼭 참여해야 하나요?",
    answer: "모든 커뮤니티 모임은 자율 참석입니다. 하지만 발레와 무용으로 만난 소중한 인연인 만큼 의미있는 시간이 되실 거에요 :)",
  },
  {
    question: "수업에 참여하지 못하게 되었어요. 환불이 가능한가요?",
    answer: "신청하신 최초 수강 날짜의 4일 전까지는 전액 환불, 3일 전까지는 50% 환불이 가능하며 2일 전부터는 환불이 불가합니다. 만약 고정 날짜에 참여하시지 못한다면, 부여된 체험권을 통해 날짜와 시간 이동이 가능하니 알뜰하게 사용해주세요. 주 1회 수강권은 월 1회, 주 2회 수강권은 월 2회, 주 3회 수강권은 월 3회 이내로 장르, 요일, 시간 변경 가능합니다.",
  },
  {
    question: "강사님과 시간대는 한 달동안 고정으로 진행되나요?",
    answer: "강사님 개인 사정에 따라 변동이 될 수 있으며, 이는 월 단위 클래스 개설 확정 전에 개별 문자를 통해 연락드릴 예정입니다.",
  },
];

function QnaContent() {
  return (
    <div className={styles.qnaContainer}>
      <h2 className={styles.qnaHeader}>QnA</h2>
      <ul className={styles.qnaList}>
        {qnaList.map((qna, index) => (
          <li key={index} className={styles.qnaItem}>
            <p className={styles.qnaQuestion}>Q. {qna.question}</p>
            <p className={styles.qnaAnswer}>A. {qna.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QnaContent;
