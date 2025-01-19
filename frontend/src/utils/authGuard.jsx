"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/utils/axios";
import styles from "./popup.css";

function AuthGuard({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await apiClient.get("/api/accountapp/me/");
        const loggedIn = response.status === 200;
        setIsLoggedIn(loggedIn);

        if (!loggedIn) {
            setShowPopup(true); // 이동대신 팝업띄울래
          //router.push("/"); // 비로그인 상태에서 루트로 리다이렉트
        }
      } catch (error) {
        setIsLoggedIn(false);
        setShowPopup(true); // 이동대신 팝업띄울래
        setIsLoggedIn(false);
        //router.push("/"); // API 호출 실패 시 루트로 리다이렉트
      }
    };

    checkLoginStatus();
  }, [router]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // 로딩 중 상태 표시
  }

  return (
        <>
        {showPopup && (
            <div className="popup">
            <div className="popup-content">
                <p>로그인 후 이용해주세요!</p>
                <button onClick={() => router.push("/")}>홈으로 이동</button>
            </div>
            </div>
        )}
        {children}
        </>
    );
}

export default AuthGuard;
