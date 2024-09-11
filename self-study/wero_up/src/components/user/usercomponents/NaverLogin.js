import React, { useEffect } from "react";

const NaverLogin = () => {
  useEffect(() => {
    console.log("네이버 객체 확인:", window.naver);
    if (window.naver) {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: "yOx0bVhLUMBcyD2DjjZa",
        callbackUrl: "http://localhost:3000/callback",
        isPopup: false,
        loginButton: {
          color: "green",
          type: 3,
          height: 50,
        },
      });

      try {
        naverLogin.init();
        console.log("네이버 로그인 초기화 성공");
      } catch (err) {
        console.error("네이버 로그인 초기화 실패:", err);
      }
    } else {
      console.error("네이버 SDK 로드 실패");
    }
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;
