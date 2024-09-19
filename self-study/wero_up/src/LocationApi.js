import React, { useState } from "react"; // React와 useState 훅을 불러옵니다.
import Button from "./components/Button"; // 커스텀 Button 컴포넌트를 불러옵니다.
import { fetchWeather } from "./WeatherApi"; // WeatherApi.js에서 fetchWeather 함수를 불러옵니다.

export default function LocationApi() {
  const [weather, setWeather] = useState(null); // 날씨 정보를 저장할 상태를 선언합니다. 초기값은 null입니다.

  const getCurrentPosition = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
      // 브라우저가 지오로케이션 API를 지원하는지 확인합니다.
      navigator.geolocation.getCurrentPosition(
        successCallback, // 위치 정보를 성공적으로 가져왔을 때 실행할 콜백 함수
        errorCallback, // 위치 정보 가져오기에 실패했을 때 실행할 콜백 함수
        {
          enableHighAccuracy: true, // 가능한 가장 높은 정확도로 위치를 가져오도록 요청합니다.
          maximumAge: 30000, // 캐시된 위치 정보를 사용할 최대 시간(밀리초)입니다.
          timeout: 27000, // 위치 정보를 가져오는 데 걸리는 최대 시간(밀리초)입니다.
        }
      );
    } else {
      alert("Geolocation is not supported by this browser."); // 지오로케이션을 지원하지 않는 브라우저에 대한 경고 메시지
    }
  };

  const handleWeatherCheck = () => {
    // 날씨 확인 버튼을 클릭했을 때 실행되는 함수
    getCurrentPosition(
      (pos) => {
        // 위치 정보를 성공적으로 가져온 경우 실행되는 콜백 함수
        const lat = pos.coords.latitude; // 위도 정보를 가져옵니다.
        const lng = pos.coords.longitude; // 경도 정보를 가져옵니다.
        fetchWeather(lat, lng, setWeather); // 위도와 경도를 fetchWeather 함수에 전달하여 날씨 정보를 가져옵니다.
      },
      () => {
        alert("위치 정보를 가져오는데 실패했습니다."); // 위치 정보 가져오기에 실패했을 때 경고 메시지를 표시합니다.
      }
    );
  };

  return (
    <div>
      <Button onClick={handleWeatherCheck}>현재 위치의 날씨 확인</Button>{" "}
      {/* 날씨 확인 버튼 */}
      {weather && ( // weather 상태에 값이 있을 때만 날씨 정보를 표시합니다.
        <div>
          <h2>날씨 정보</h2>
          <p>현재 온도: {weather.TMP} °C</p> {/* 현재 온도 */}
          <p>강수 확률: {weather.POP} %</p> {/* 강수 확률 */}
          <p>습도: {weather.REH} %</p> {/* 습도 */}
          <p>풍속: {weather.WSD} m/s</p> {/* 풍속 */}
          <p>최저 기온: {weather.TMN} °C</p> {/* 최저 기온 */}
          <p>최고 기온: {weather.TMX} °C</p> {/* 최고 기온 */}
        </div>
      )}
    </div>
  );
}
