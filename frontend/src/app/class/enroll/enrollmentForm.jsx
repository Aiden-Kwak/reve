"use client";

import React, { useState, useEffect } from "react";
import apiClient from "@/utils/axios";
import styles from "./enrollment.module.css";
import AuthGuard from "@/utils/authGuard";

function EnrollmentForm({ selectedGenre, selectedLevel }) {
  const [category, setCategory] = useState(selectedGenre || ""); // 장르 상태
  const [level, setLevel] = useState(selectedLevel || ""); // 레벨 상태
  const [times, setTimes] = useState([]); // 선택된 시간들
  const [route, setRoute] = useState("1"); // 경로
  const [location, setLocation] = useState("");
  const [pass_type, setPass] = useState("1"); // 수강권
  const [contact, setContact] = useState(""); // 연락처
  const [sliderValue, setSliderValue] = useState(0); // 슬라이더 값 초기화

  useEffect(() => {
    // 초기 슬라이더 값 설정
    if (selectedGenre === "ballet") {
      setSliderValue(0);
    } else if (selectedGenre === "modern") {
      setSliderValue(50);
    } else if (selectedGenre === "korean") {
      setSliderValue(100);
    }
  }, [selectedGenre]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contact) {
      const userEmail = ""; // 구글 로그인에서 받은 이메일로 설정
      setContact(userEmail);
    }

    const data = {
      category,
      level,
      times,
      pass_type,
      route,
      location,
      contact,
    };

    try {
      const response = await apiClient.post("/api/timemanageapp/courses/enroll/", data);
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

  const getCategoryLabel = (category) => {
    switch (category) {
      case "ballet":
        return "발레";
      case "modern":
        return "현대무용";
      case "korean":
        return "한국무용";
      default:
        return "";
    }
  };

  const getLevelLabel = (level) => {
    switch (level) {
      case "basic":
        return "입문반";
      case "advanced":
        return "작품반";
      default:
        return "";
    }
  };

  const selectedClass = `${getCategoryLabel(category)} - ${getLevelLabel(level)}`;

  return (
    <AuthGuard>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label>
          <p className={styles.formItem}>
            ⭐ 선택한 수업: <span className="root-color">{selectedClass}</span>
          </p>
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
              <span className={styles.modern}>현대무용</span>
              <span>한국무용</span>
            </div>
          </div>
        </label>

        <label>
          <br />
          <div className={styles.labelWrapper}>
            <button
              type="button"
              onClick={toggleLevel}
              className={`${styles.toggleButton} ${
                level === "basic" ? styles.clicked : styles.unclicked
              }`}
            >
              입문반
            </button>
            <button
              type="button"
              onClick={toggleLevel}
              className={`${styles.toggleButton} ${
                level === "advanced" ? styles.clicked : styles.unclicked
              }`}
            >
              작품반
            </button>
          </div>
        </label>

        <label>
          <p className={styles.formItem}>⭐ 가능 시간 선택</p>
          <p className={styles.formSubItem}>
            희망하시는 모든 시간을 선택해주세요. 강사님, 다른 학생들과의
            조정을 통해 빠른 클래스 개설이 가능해집니다.
          </p>
          <div className={styles.scheduleTable}>
            {["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"].map((day) => (
              <div key={day} className={styles.scheduleRow}>
                <span>{day}</span>
                {["10:00-12:00", "14:00-16:00", "16:00-18:00", "19:30-21:30"].map(
                  (timeSlot) => (
                    <button
                      type="button"
                      key={timeSlot}
                      className={`${styles.timeSlotButton} ${
                        times.some((t) => t.day === day && t.time === timeSlot)
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handleTimeSelection(day, timeSlot)}
                    >
                      {timeSlot}
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        </label>

        <label>
          <p className={styles.formItem}>⭐ 희망하시는 수강권을 선택해주세요!</p>
          <select
            value={pass_type}
            onChange={(e) => setPass(e.target.value)}
            className={styles.inputField}
          >
            <option value="1">1회 체험권</option>
            <option value="2">주 1회권</option>
            <option value="3">주 2회권</option>
            <option value="4">주 3회권</option>
          </select>
        </label>

        <label>
          <p className={styles.formItem}>⭐ 저희 레브를 어떻게 알게되셨나요?</p>
          <select
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            className={styles.inputField}
          >
            <option value="1">인스타</option>
            <option value="2">블로그</option>
            <option value="3">인터넷검색</option>
            <option value="4">에브리타임</option>
            <option value="5">지인소개</option>
            <option value="6">재방문</option>
            <option value="7">기타</option>
          </select>
        </label>

        <label>
          <p className={styles.formItem}>⭐ 어디에 거주 중이신가요?</p>
          <p className={styles.formSubItem}>
            추후 지점 확장을 위한 질문으로 응답하지 않으셔도 됩니다.
          </p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="ex) 서대문구 신촌동"
            className={styles.inputField}
          />
        </label>

        <label>
          <p className={styles.formItem}>⭐ 연락처</p>
          <p className={styles.formSubItem}>
            연락 가능한 번호를 입력해주세요. 미입력시 가입한 이메일로 연락이
            진행됩니다.
          </p>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="ex) 010-1234-5678"
            className={styles.inputField}
          />
        </label>

        <button type="submit" className={styles.submitButton}>
          신청하기
        </button>
      </form>
    </AuthGuard>
  );
}

export default EnrollmentForm;
