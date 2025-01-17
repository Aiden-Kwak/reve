"use client";

import React, { useState } from "react";
import "./InnerNavForm.css";
import LectureContent from "./navcontent/lectureContent";
import LocationContent from "./navcontent/locationContent";
import PassContent from "./navcontent/passContent";
import QnaContent from "./navcontent/qnaContent";
import TimetablePage from "./navcontent/timetablePage";

function InnerNavContent() {
  const [selectedTab, setSelectedTab] = useState("lecture");

  const renderContent = () => {
    switch (selectedTab) {
      case "lecture":
        return <LectureContent />;
      case "timetable":
        return <TimetablePage />;
      case "pass":
        return <PassContent />;
      case "location":
        return <LocationContent />;
      case "qna":
        return <QnaContent />;
      default:
        return <div>선택된 탭이 없습니다.</div>;
    }
  };

  return (
    <div>
      <div className="innernav-container">
        <span
          className={`inner-btn ${selectedTab === "lecture" ? "selected" : ""}`}
          onClick={() => setSelectedTab("lecture")}
        >
          강의
        </span>
        |
        <span
          className={`inner-btn ${selectedTab === "timetable" ? "selected" : ""}`}
          onClick={() => setSelectedTab("timetable")}
        >
          시간표
        </span>
        |
        <span
          className={`inner-btn ${selectedTab === "pass" ? "selected" : ""}`}
          onClick={() => setSelectedTab("pass")}
        >
          수강권
        </span>
        |
        <span
          className={`inner-btn ${selectedTab === "location" ? "selected" : ""}`}
          onClick={() => setSelectedTab("location")}
        >
          장소
        </span>
        |
        <span
          className={`inner-btn ${selectedTab === "qna" ? "selected" : ""}`}
          onClick={() => setSelectedTab("qna")}
        >
          QnA
        </span>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

export default InnerNavContent;
