"use client";

import React from "react";
import { useRouter } from "next/navigation"; // useRouter 훅 가져오기
import "./LectureContent.css";

const teacherData = [
  { id: 1, name: "ballet", image: "/teacher/ballet_teacher.png" },
  { id: 2, name: "modern", image: "/teacher/modern_teacher.png" },
  { id: 3, name: "korea", image: "/teacher/korea_teacher.png" },
];

function LectureContent() {
  const router = useRouter(); // useRouter 인스턴스 생성
  const totalSlots = 4;
  const items = [...teacherData];

  while (items.length < totalSlots) {
    items.push({ id: `empty-${items.length}`, isEmpty: true });
  }

  return (
    <div className="lecture-container">
      <div className="teacher-grid">
        {items.map((item) =>
          item.isEmpty ? (
            <div 
                className="empty-slot" 
                key={item.id}
                onClick={() => router.push("/class/story")}
            >
              Reve Story
            </div>
          ) : (
            <div
              className="teacher-card"
              key={item.id}
              onClick={() => router.push(`/class/${item.name}`)}
            >
              <div className="teacher-image">
                <img src={item.image} alt={item.name} />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default LectureContent;
