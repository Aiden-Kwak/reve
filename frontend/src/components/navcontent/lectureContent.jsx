import React from "react";
import "./LectureContent.css";

const teacherData = [
  { id: 1, name: "ballet", image: "/teacher/ballet_teacher.png"},
  { id: 2, name: "modern", image: "/teacher/ballet_teacher.png"},
  { id: 3, name: "korea", image: "/teacher/ballet_teacher.png"},
];

function LectureContent() {
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
            <div className="empty-slot" key={item.id}>
              Reve Story
            </div>
          ) : (
            <div className="teacher-card" key={item.id}>
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
