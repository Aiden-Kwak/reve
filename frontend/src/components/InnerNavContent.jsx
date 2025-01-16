"use client";

import React, { useState } from "react";
import "./InnerNavForm.css";

function InnerNavContent() {
  const [selectedTab, setSelectedTab] = useState("lecture");

  const renderContent = () => {
    switch (selectedTab) {
      case "lecture":
        return <div>강의 내용이 표시됩니다.</div>;
      case "timetable":
        return <div>시간표 내용이 표시됩니다.</div>;
      case "pass":
        return <div>수강권 내용이 표시됩니다.</div>;
      case "location":
        return <div>장소 내용이 표시됩니다.</div>;
      case "qna":
        return <div>QnA 내용이 표시됩니다.</div>;
      default:
        return <div>선택된 탭이 없습니다.</div>;
    }
  };

  return (
    <div>
      <div className="innernav-container">
        <span className="inner-btn" onClick={() => setSelectedTab("lecture")}>
          강의
        </span>
        |
        <span className="inner-btn" onClick={() => setSelectedTab("timetable")}>
          시간표
        </span>
        |
        <span className="inner-btn" onClick={() => setSelectedTab("pass")}>
          수강권
        </span>
        |
        <span className="inner-btn" onClick={() => setSelectedTab("location")}>
          장소
        </span>
        |
        <span className="inner-btn" onClick={() => setSelectedTab("qna")}>
          QnA
        </span>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

export default InnerNavContent;
