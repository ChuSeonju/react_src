import { useEffect, useState } from "react";

const NaverCallback = () => {
  const clientId = "yOx0bVhLUMBcyD2DjjZa";
  const callbackUrl = "http://localhost:3000/callback";
  const [userInfo, setUserInfo] = useState(null); // 유저 정보를 저장할 상태

  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId,
      callbackUrl,
      isPopup: false,
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(function (status) {
      if (status) {
        const email = naverLogin.user.getEmail();
        const name = naverLogin.user.getNickName();
        const profileImage = naverLogin.user.getProfileImage();

        console.log(naverLogin.user); // 나이대, 생일, 출생연도, 이메일, 성별, 아이디(네이버아이디x 고유식별자)핸드폰번호, 이름, 닉네임, 프로필이미지

        if (email === undefined || email === null) {
          alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
          naverLogin.reprompt();
          return;
        }

        setUserInfo({
          email,
          name,

          profileImage,
        });

        // 콘솔에 유저 정보 출력
        console.log("로그인 성공:", {
          email,
          name,

          profileImage,
        });
      } else {
        console.log("로그인 실패");
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <div>
      {userInfo ? (
        <div>
          <h2>네이버 로그인 성공</h2>
          <p>환영합니다, {userInfo.name}님!</p>
          <p>이메일: {userInfo.email}</p>
          {/* {userInfo.profileImage && (
            <img
              src={userInfo.profileImage}
              alt={`${userInfo.name}님의 프로필` }
            />
          )} */}
        </div>
      ) : (
        <div>로그인 처리 중...</div>
      )}
    </div>
  );
};

export default NaverCallback;
