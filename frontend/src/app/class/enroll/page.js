"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/utils/axios";
import styles from "./enrollment.module.css";

function EnrollmentForm() {
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [times, setTimes] = useState([["10:00", "12:00"]]);
  const [route, setRoute] = useState(1); // integer
  const [location, setLocation] = useState(""); // optional
  const [contact, setContact] = useState("");
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
      const userEmail = "user@example.com"; // TODO: 구글 로그인에서 받은 이메일로 설정
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
    if (value < 33) {
      setCategory("ballet");
    } else if (value < 67) {
      setCategory("modern");
    } else {
      setCategory("korean");
    }
  };

  const toggleLevel = () => {
    setLevel((prev) => (prev === "basic" ? "performance" : "basic"));
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
        시간:
        <input
          type="text"
          value={times[0].join(", ")}
          onChange={(e) => setTimes([[...e.target.value.split(", ")]] )}
          className={styles.inputField}
        />
      </label>

      <label>
        경로:
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
