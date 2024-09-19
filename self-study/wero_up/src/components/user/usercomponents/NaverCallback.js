import { useEffect, useState } from "react"; // React의 useEffect와 useState 훅을 사용해 사이드 이펙트 관리 및 상태 관리를 합니다.
import Button from "../../Button"; // 커스텀 Button 컴포넌트를 가져옵니다. 스타일링 또는 재사용을 위한 것일 수 있습니다.
import { useNavigate } from "react-router-dom"; // 리액트 라우터의 useNavigate 훅을 사용해 프로그래밍적으로 페이지 이동을 처리합니다.

const NaverCallback = () => {
  const clientId = "yOx0bVhLUMBcyD2DjjZa"; // 네이버 로그인용 클라이언트 ID (실제 코드에서는 보안상 숨겨야 합니다)
  //  const clientSecret = "eFMwSRYF6Y"; // 클라이언트 시크릿 (보안상으로 중요하며 프론트엔드 코드에 포함시키지 않는 것이 좋습니다)
  const callbackUrl = "http://localhost:3000/callback"; // 네이버 로그인 후 리다이렉트될 URL
  const [userInfo, setUserInfo] = useState(null); // 유저 정보를 저장할 상태 변수
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  const initializeNaverLogin = () => {
    // 네이버 로그인 객체를 초기화하는 함수
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId, // 클라이언트 ID 설정
      callbackUrl, // 콜백 URL 설정
      isPopup: false, // 팝업 여부 (팝업 사용 안 함)
      callbackHandle: true, // 콜백 처리를 활성화
    });
    naverLogin.init(); // 네이버 로그인 초기화

    naverLogin.getLoginStatus(function (status) {
      // 로그인 상태를 확인하는 함수
      if (status) {
        const email = naverLogin.user.getEmail(); // 유저 이메일 가져오기
        const name = naverLogin.user.getNickName(); // 유저 닉네임 가져오기
        const profileImage = naverLogin.user.getProfileImage(); // 유저 프로필 이미지 가져오기

        console.log(naverLogin.user); // 전체 유저 정보를 콘솔에 출력합니다. (디버깅용)

        if (email === undefined || email === null) {
          // 이메일이 없을 경우 재동의를 요청합니다.
          alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
          naverLogin.reprompt(); // 이메일을 필수로 받아야 하는 경우 사용
          return;
        }

        setUserInfo({
          // 유저 정보를 상태에 저장
          email,
          name,
          profileImage,
        });

        // 로그인 성공 시 유저 정보를 콘솔에 출력합니다.
        console.log("로그인 성공:", {
          email,
          name,
          profileImage,
        });
      } else {
        console.log("로그인 실패"); // 로그인 실패 시 메시지 출력
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin(); // 컴포넌트가 마운트될 때 네이버 로그인을 초기화
  }, []); // 빈 배열을 전달해 한 번만 실행되도록 설정

  const handleLogout = () => {
    // 로그아웃을 처리하는 함수
    const logoutWindow = window.open("https://nid.naver.com/nidlogin.logout"); // 네이버 로그아웃 페이지를 새 창으로 엽니다.

    setTimeout(() => {
      logoutWindow.close(); // 로그아웃 후 새 창을 닫습니다.
      setUserInfo(null); // 사용자 정보를 초기화합니다.
      navigate("/"); // 로그인 페이지로 리다이렉트합니다.
    }, 100); // 0.1초의 지연을 주어 로그아웃이 확실히 처리되도록 합니다.
  };

  return (
    <div>
      {userInfo ? ( // 유저 정보가 있을 경우, 즉 로그인 성공 시의 화면
        <div>
          <h2>네이버 로그인 성공</h2>
          <p>환영합니다, {userInfo.name}님!</p>
          <p>이메일: {userInfo.email}</p>
          {/* 프로필 이미지가 있을 경우 표시합니다. */}
          {userInfo.profileImage && (
            <img
              src={userInfo.profileImage}
              alt={`${userInfo.name}님의 프로필`}
              style={{ width: "100px" }}
            />
          )}
          <Button onClick={handleLogout}>로그아웃</Button> {/* 로그아웃 버튼 */}
        </div>
      ) : (
        <div>로그인 처리 중...</div> // 로그인 중일 때의 화면
      )}
    </div>
  );
};

export default NaverCallback;
