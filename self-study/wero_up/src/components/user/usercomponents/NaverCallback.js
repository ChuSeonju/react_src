import { useEffect, useState } from "react";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";

const NaverCallback = () => {
  const clientId = "yOx0bVhLUMBcyD2DjjZa";
  //  const clientSecret = "eFMwSRYF6Y";
  const callbackUrl = "http://localhost:3000/callback";
  const [userInfo, setUserInfo] = useState(null); // 유저 정보를 저장할 상태
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // 로그아웃하면서 네이버로 이동됨,,
    const logoutWindow = window.open("https://nid.naver.com/nidlogin.logout");

    // 로그아웃 후 원래 페이지로 돌아오기 위한 타임아웃 설정
    setTimeout(() => {
      logoutWindow.close(); // 로그아웃 후 탭 닫기
      setUserInfo(null); // 사용자 정보 초기화
      navigate("/"); // 로그인 페이지로 리다이렉트
    }, 100); // 0.1초의 지연을 줘서 로그아웃이 확실히 처리되도록 했다는데 그냥 네이버 페이지 빨리 사라지게 하려고 1초에서 0.1초로 설정
  };

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
          <Button onClick={handleLogout}>로그아웃</Button>
        </div>
      ) : (
        <div>로그인 처리 중...</div>
      )}
    </div>
  );
};

export default NaverCallback;
