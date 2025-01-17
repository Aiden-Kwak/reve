"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import apiClient from "@/utils/axios"; // API 요청을 위한 axios 클라이언트
import styles from "./timetable.module.css";

function TimetableContent({ schedules }) {
  const [selectedGenre, setSelectedGenre] = useState("ballet");
  const [sliderValue, setSliderValue] = useState(0); // 슬라이더 위치 초기화
  const [selectedLevel, setSelectedLevel] = useState("basic"); // 기본값: 입문반
  const [selectedTimes, setSelectedTimes] = useState([]); // 선택한 시간과 요일 관리
  const [enrollmentData, setEnrollmentData] = useState([]); // 각 시간대별 지원자 수 데이터
  const router = useRouter();

  useEffect(() => {
    // 시간대별 지원자 수를 받아오는 API 호출
    const fetchEnrollmentData = async () => {
      try {
        const response = await apiClient.get(`/api/timemanageapp/courses/`, {
          params: {
            category: selectedGenre,
            level: selectedLevel
          }
        });
        setEnrollmentData(response.data); // API 응답을 데이터에 저장
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
      }
    };
    fetchEnrollmentData();
  }, [selectedGenre, selectedLevel]);

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

  // 레벨 토글
  const toggleLevel = () => {
    setSelectedLevel((prev) => (prev === "basic" ? "advanced" : "basic"));
  };

  // 시간 선택
  const handleTimeSelection = (day, timeSlot) => {
    const newTime = { day, time: timeSlot };
    setSelectedTimes((prevTimes) => {
      const timeIndex = prevTimes.findIndex(
        (item) => item.day === day && item.time === timeSlot
      );
      if (timeIndex === -1) {
        return [...prevTimes, newTime]; // 새로 선택된 시간 추가
      } else {
        const updatedTimes = [...prevTimes];
        updatedTimes.splice(timeIndex, 1); // 이미 선택된 시간은 제거
        return updatedTimes;
      }
    });
  };

  const handleEnrollClick = () => {
    router.push(`/class/enroll?selectedGenre=${selectedGenre}&selectedLevel=${selectedLevel}`);
  };

  // 요일과 시간대별 지원자 수를 찾는 함수
  const getEnrollmentCount = (day, timeSlot) => {
    const courseData = enrollmentData.find((course) => {
      return course.category === selectedGenre && course.level === selectedLevel;
    });

    if (!courseData) return 0;

    const timeData = courseData.times.find(
      (time) => time.day === day && time.time === timeSlot
    );

    return timeData ? timeData.enrollment_count : 0;
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
              입문반
            </button>
            <button
              onClick={toggleLevel}
              className={`${styles.toggleButton} ${selectedLevel === "advanced" ? styles.clicked : styles.unclicked}`}
            >
              작품반
            </button>
          </div>
        </div>
        <p className={styles.notice}>
            📌 모든 수업은 <span className="root-color">80분 수업</span>과{" "}
            <span className="root-color">30분 자율 커뮤니티</span> 모임으로 구성됩니다.
        </p>

        {/* 시간 선택 버튼들 */}
        <div className={styles.scheduleTable}>
          {["월요일", "화요일", "수요일", "목요일", "금요일"].map((day) => (
            <div key={day} className={styles.scheduleRow}>
              <span>{day}</span>
              {["10:00-12:00", "14:00-16:00", "16:00-18:00", "19:30-21:30"].map((timeSlot) => (
                <button
                  type="button"
                  key={timeSlot}
                  className={`${styles.timeSlotButton} ${selectedTimes.some(
                    (t) => t.day === day && t.time === timeSlot
                  ) ? styles.selected : ""}`}
                  onClick={() => handleTimeSelection(day, timeSlot)}
                >
                  {timeSlot} ({getEnrollmentCount(day, timeSlot)}명)
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimetableContent;
