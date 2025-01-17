"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/utils/axios";

function AuthGuard({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await apiClient.get("/api/accountapp/me/");
        const loggedIn = response.status === 200;
        setIsLoggedIn(loggedIn);

        if (!loggedIn) {
          router.push("/"); // 비로그인 상태에서 루트로 리다이렉트
        }
      } catch (error) {
        setIsLoggedIn(false);
        router.push("/"); // API 호출 실패 시 루트로 리다이렉트
      }
    };

    checkLoginStatus();
  }, [router]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // 로딩 중 상태 표시
  }

  return <>{children}</>; // 로그인된 상태에서만 자식 컴포넌트를 렌더링
}

export default AuthGuard;
