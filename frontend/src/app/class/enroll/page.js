"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/utils/axios";
import styles from "./enrollment.module.css";

function EnrollmentForm() {
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [times, setTimes] = useState([]); // 선택된 시간들
  const [route, setRoute] = useState(1); // 경로
  const [location, setLocation] = useState(""); // 장소
  const [contact, setContact] = useState(""); // 연락처
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    // 쿼리 파라미터가 있을 때만 설정
    const selectedGenre = searchParams.get("selectedGenre");
    const selectedLevel = searchParams.get("selectedLevel");

    if (selectedGenre && selectedLevel) {
      setCategory(selectedGenre);
      setLevel(selectedLevel);

      if (selectedGenre === "ballet") {
        setSliderValue(0);
      } else if (selectedGenre === "modern") {
        setSliderValue(50);
      } else {
        setSliderValue(100);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contact) {
      const userEmail = "user@example.com"; // 구글 로그인에서 받은 이메일로 설정
      setContact(userEmail);
    }

    const data = {
      category,
      level,
      times,
      route,
      location,
      contact,
    };

    try {
      const response = await apiClient.post("/api/timemanageapp/enroll/", data);
      console.log("성공적으로 제출됨:", response.data);
    } catch (error) {
      console.error("신청 실패:", error.response?.data || error.message);
    }
  };

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);
    if (value < 33) {
      setCategory("ballet");
    } else if (value < 67) {
      setCategory("modern");
    } else {
      setCategory("korean");
    }
  };

  const toggleLevel = () => {
    setLevel((prev) => (prev === "basic" ? "advanced" : "basic"));
  };

  const handleTimeSelection = (day, timeSlot) => {
    const newTime = { day, time: timeSlot };
    setTimes((prevTimes) => {
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

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label>
        카테고리:
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
      </label>

      <label>
        레벨:
        <div className={styles.labelWrapper}>
          <button
            type="button"
            onClick={toggleLevel}
            className={`${styles.toggleButton} ${level === "basic" ? styles.clicked : styles.unclicked}`}
          >
            입문반
          </button>
          <button
            type="button"
            onClick={toggleLevel}
            className={`${styles.toggleButton} ${level === "advanced" ? styles.clicked : styles.unclicked}`}
          >
            작품반
          </button>
        </div>
      </label>

      <label>
        가능 시간 선택:
        <div className={styles.scheduleTable}>
          {["월요일", "화요일", "수요일", "목요일", "금요일"].map((day) => (
            <div key={day} className={styles.scheduleRow}>
              <span>{day}</span>
              {["10:00-12:00", "14:00-16:00", "16:00-18:00", "19:30-21:30"].map((timeSlot) => (
                <button
                  type="button"
                  key={timeSlot}
                  className={`${styles.timeSlotButton} ${times.some(
                    (t) => t.day === day && t.time === timeSlot
                  ) ? styles.selected : ""}`}
                  onClick={() => handleTimeSelection(day, timeSlot)}
                >
                  {timeSlot}
                </button>
              ))}
            </div>
          ))}
        </div>
      </label>

      <label>
        저희 레브를 어떻게 알게 되셨나요?<br/>
        <input
          type="number"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          className={styles.inputField}
        />
      </label>

      <label>
        장소:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={styles.inputField}
        />
      </label>

      <label>
        연락처:
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className={styles.inputField}
        />
      </label>

      <button type="submit" className={styles.submitButton}>신청하기</button>
    </form>
  );
}

export default EnrollmentForm;
