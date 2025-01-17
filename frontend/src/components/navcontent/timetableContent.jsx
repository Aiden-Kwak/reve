"use client";

import React, { useState } from "react";
import styles from "./timetable.module.css";

function TimetableContent({ schedules }) {
  const [selectedGenre, setSelectedGenre] = useState("ballet");
  const [sliderValue, setSliderValue] = useState(0); // 이거 슬라이더 위치 초기화 용도임

  // 슬라이더 변경 핸들러
  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);

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
      <h2 className={styles.header}>시간표</h2>
      <p>모든 수업은 <span className="root-color">80분 수업</span>과 <span className="root-color">30분 자율 커뮤니티</span> 모임으로 구성됩니다.</p>
      {/* 슬라이더 */}
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={sliderValue}
          className={styles.slider}
          onChange={handleSliderChange}
        />
        <div className={styles.labels}>
          <span>발레</span>
          <span>현대무용</span>
          <span>한국무용</span>
        </div>
      </div>

      {/* 선택된 시간표 */}
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
