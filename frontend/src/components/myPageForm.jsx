"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/utils/axios";
import styles from "./mypage.module.css";

const MyPageForm = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 확인 모달 상태
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null); // 취소할 ID


  const courseMap = {
    ballet: "발레",
    modern: "현대무용",
    korean: "한국무용",
  };

  const levelMap = {
    basic: "입문반",
    advanced: "작품반",
  };

  const formatCourseName = (course) => {
    const [genre, level] = course.split(" - ");
    const translatedGenre = courseMap[genre] || genre;
    const translatedLevel = levelMap[level] || level;
    return `${translatedGenre} / ${translatedLevel}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get("/api/timemanageapp/mypage/");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const cancelEnrollment = async () => {
    try {
      const response = await apiClient.delete(`/api/timemanageapp/enrollments/${selectedEnrollmentId}/cancel/`);
      setPopupMessage(response.data.message);
      setShowPopup(true);

      // 신청 취소 후 데이터 새로고침
      const updatedUserData = { ...userData };
      updatedUserData.enrollments = updatedUserData.enrollments.filter(
        (enrollment) => enrollment.id !== selectedEnrollmentId
      );
      setUserData(updatedUserData);
    } catch (error) {
      setPopupMessage("신청 취소에 실패했습니다.");
      setShowPopup(true);
      console.error("Error canceling enrollment:", error);
    } finally {
      setShowConfirmModal(false); // 모달 닫기
      setSelectedEnrollmentId(null); // 선택 초기화
    }
  };

  const openConfirmModal = (enrollmentId) => {
    setSelectedEnrollmentId(enrollmentId); // 선택된 ID 저장
    setShowConfirmModal(true); // 모달 열기
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedEnrollmentId(null);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Failed to load data.</div>;
  }

  return (
    <div className={styles.myPageContainer}>
      <h2 className={styles.header}>마이페이지</h2>
      <div className={styles.profileContainer}>
        <p className={styles.email}>이메일: {userData.email}</p>
      </div>

      <div className={styles.enrollmentContainer}>
        <h3>신청한 강의</h3>
        <div className={styles.notice}>
        <p>📌 결제를 위한 계좌는 선택해주신 강의가 개설되면 작성하신 연락처로 전송됩니다.</p>
        <p>📌 확인란은 결제 완료후 1~2일내에 반영됩니다.</p>
        </div>    
        {userData.enrollments.length > 0 ? (
          <ul className={styles.enrollmentList}>
            {userData.enrollments.map((enrollment, index) => (
              <li key={index} className={styles.enrollmentItem}>
                <div>
                  <p><strong>강의:</strong> {formatCourseName(enrollment.course)}</p>
                  <p><strong>수강권:</strong> {enrollment.pass_type}</p>
                  <p><strong>신청일:</strong>{" "}
                  {new Date(enrollment.enrollment_date).toLocaleDateString()}</p>
                  <p><strong>결제 여부:</strong>{" "}
                  {enrollment.payed ? "결제 완료" : "미결제"}</p>
                  <p><strong>신청 시간:</strong>{" "}
                  {enrollment.times.map((time, idx) => (
                    <span key={idx}>
                      {time.day} {time.time}
                    </span>
                  ))}</p>
                </div>
                <div className={styles.buttonContainer}>
                {!enrollment.payed && (
                  <button
                    className={styles.cancelButton}
                    onClick={() => openConfirmModal(enrollment.id)}
                  >
                    X 신청 취소
                  </button>
                )}
                </div>         
              </li>
            ))}
          </ul>
        ) : (
          <p>신청한 강의가 없습니다.</p>
        )}
      </div>

      {/* 확인 모달 */}
      {showConfirmModal && (
        <div className={styles.confirmModal}>
          <div className={styles.confirmModalContent}>
            <p>정말 신청을 취소하시겠습니까?</p>
            <button onClick={cancelEnrollment} className={styles.confirmButton}>
              네, 취소합니다
            </button>
            <button onClick={closeConfirmModal} className={styles.cancelButton}>
              아니요, 취소하지 않습니다
            </button>
          </div>
        </div>
      )}

      {/* 팝업 */}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>{popupMessage}</p>
            <button onClick={closePopup} className={styles.closePopupButton}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageForm;

