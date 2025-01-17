import React, { useState } from "react";
import styles from "./timetable.module.css";

// 시간표 데이터
const schedules = {
  ballet: {
    title: "발레 시간표",
    content: [
      "월요일: 10:00 AM - 12:00 PM",
      "수요일: 2:00 PM - 4:00 PM",
      "금요일: 6:00 PM - 8:00 PM",
    ],
  },
  modern: {
    title: "현대무용 시간표",
    content: [
      "화요일: 11:00 AM - 1:00 PM",
      "목요일: 3:00 PM - 5:00 PM",
      "토요일: 1:00 PM - 3:00 PM",
    ],
  },
  korean: {
    title: "한국무용 시간표",
    content: [
      "월요일: 4:00 PM - 6:00 PM",
      "수요일: 10:00 AM - 12:00 PM",
      "금요일: 2:00 PM - 4:00 PM",
    ],
  },
};

function TimetableContent() {
  const [selectedGenre, setSelectedGenre] = useState("ballet");

  // 슬라이더 값 변경 핸들러
  const handleSliderChange = (e) => {
    const value = e.target.value;
    if (value < 33) {
      setSelectedGenre("ballet");
    } else if (value < 67) {
      setSelectedGenre("modern");
    } else {
      setSelectedGenre("korean");
    }
  };

  return (
    <div className={styles.timetableContainer}>
      <p>* 드래그를 움직여 시간표를 확인하세요.</p>
      {/* 슬라이더 */}
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          className={styles.slider}
          onChange={handleSliderChange}
        />
        <div className={styles.labels}>
          <span>발레</span>
          <span>현대무용</span>
          <span>한국무용</span>
        </div>
      </div>

      {/*시간표 */}
      <div className={styles.schedule}>
        <h3>{schedules[selectedGenre].title}</h3>
        <ul>
          {schedules[selectedGenre].content.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TimetableContent;
