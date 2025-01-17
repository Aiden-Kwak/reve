"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // next/navigation에서 useRouter 사용
import apiClient from "@/utils/axios";

function EnrollmentForm() {
  const [category, setCategory] = useState("ballet");
  const [level, setLevel] = useState("basic");
  const [times, setTimes] = useState([["10:00", "12:00"]]);
  const [route, setRoute] = useState(1); // integer
  const [location, setLocation] = useState(""); // optional
  const [contact, setContact] = useState("");
  const router = useRouter();

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    // router.query가 준비되었을 때만 쿼리 값을 설정
    if (router.isReady) {
      const { selectedGenre, selectedLevel } = router.query;
      if (selectedGenre && selectedLevel) {
        setSelectedGenre(selectedGenre);
        setSelectedLevel(selectedLevel);
      }
    }
  }, [router.isReady, router.query]); // router.isReady와 router.query가 변경되었을 때 실행

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 전화번호가 없으면 구글 로그인에서 받은 이메일로 설정
    if (!contact) {
      const userEmail = "user@example.com"; // TODO: 구글 로그인에서 받은 이메일로 설정
      setContact(userEmail);
    }

    const data = {
      category: selectedGenre,
      level: selectedLevel,
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        카테고리:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="ballet">발레</option>
          <option value="modern">현대무용</option>
          <option value="korea">한국무용</option>
        </select>
      </label>

      <label>
        레벨:
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="basic">입문반</option>
          <option value="performance">작품반</option>
        </select>
      </label>

      <label>
        시간:
        <input
          type="text"
          value={times[0].join(", ")}
          onChange={(e) => setTimes([[...e.target.value.split(", ")]] )}
        />
      </label>

      <label>
        경로:
        <input
          type="number"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />
      </label>

      <label>
        장소:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>

      <label>
        연락처:
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </label>

      <button type="submit">신청하기</button>
    </form>
  );
}

export default EnrollmentForm;
