"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/utils/axios";
import styles from "./mypage.module.css";

function MyPageForm() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        {userData.enrollments.length > 0 ? (
          <ul className={styles.enrollmentList}>
            {userData.enrollments.map((enrollment, index) => (
              <li key={index} className={styles.enrollmentItem}>
                <div>
                  <strong>강의:</strong> {enrollment.course} <br />
                  <strong>수강권:</strong> {enrollment.pass_type} <br />
                  <strong>신청일:</strong> {new Date(enrollment.enrollment_date).toLocaleDateString()} <br />
                  <strong>결제 여부:</strong> {enrollment.payed ? "결제 완료" : "미결제"} <br />
                  <strong>신청 시간:</strong> {enrollment.times.map((time, idx) => (
                    <span key={idx}>{time.day} {time.time}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>신청한 강의가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default MyPageForm;
