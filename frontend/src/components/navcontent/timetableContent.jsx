"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "./timetable.module.css";

function TimetableContent({ schedules }) {
  const [selectedGenre, setSelectedGenre] = useState("ballet");
  const [sliderValue, setSliderValue] = useState(0); // 슬라이더 위치 초기화
  const [selectedLevel, setSelectedLevel] = useState("basic"); // 기본값: 입문반
  const router = useRouter();

  // 슬라이더 변경
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

  // 토글 버튼 변경
  const toggleLevel = () => {
    setSelectedLevel((prev) => (prev === "basic" ? "advanced" : "basic"));
  };

  const handleEnrollClick = () => {
    router.push(`/class/enroll?selectedGenre=${selectedGenre}&selectedLevel=${selectedLevel}`);
  };
  

  return (
    <div className={styles.timetableContainer}>
      <h2 className={styles.header}>시간표</h2>
      <p>ℹ️ 버튼을 드래그해서 각 수업시간을 확인하세요</p>
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
        <div className={styles.scheduleHeader}>
          <div className={styles.scheduleTitleSubmit}>
            <h3>{schedules[selectedGenre][selectedLevel].title}</h3>
            <p className={styles.classSubmit} onClick={handleEnrollClick}>신청하기</p>
          </div>
          
          <div>
            <button
              onClick={toggleLevel}
              className={`${styles.toggleButton} ${selectedLevel === "basic" ? styles.clicked : styles.unclicked}`}
            >
              {selectedLevel === "basic" ? "입문반" : "입문반"}
            </button>
            <button
              onClick={toggleLevel}
              className={`${styles.toggleButton} ${selectedLevel === "basic" ? styles.unclicked : styles.clicked}`}
            >
              {selectedLevel === "basic" ? "작품반" : "작품반"}
            </button>
          </div>
        </div>
        <p className={styles.notice}>
            📌 모든 수업은 <span className="root-color">80분 수업</span>과{" "}
            <span className="root-color">30분 자율 커뮤니티</span> 모임으로 구성됩니다.
        </p>
        <ul>
          {schedules[selectedGenre][selectedLevel].content.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TimetableContent;
