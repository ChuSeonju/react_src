import React, { useState } from "react";
import Button from "./components/Button";
import { fetchWeather } from "./WeatherApi"; // WeatherApi.js의 fetchWeather 함수를 불러옵니다.

export default function LocationApi() {
  const [weather, setWeather] = useState(null);

  const getCurrentPosition = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleWeatherCheck = () => {
    getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        fetchWeather(lat, lng, setWeather); // 현재 위치의 위도와 경도를 fetchWeather 함수에 전달합니다.
      },
      () => {
        alert("위치 정보를 가져오는데 실패했습니다.");
      }
    );
  };

  return (
    <div>
      <Button onClick={handleWeatherCheck}>현재 위치의 날씨 확인</Button>
      {weather && (
        <div>
          <h2>날씨 정보</h2>
          <p>현재 온도: {weather.TMP} °C</p>
          <p>강수 확률: {weather.POP} %</p>
          <p>습도: {weather.REH} %</p>
          <p>풍속: {weather.WSD} m/s</p>
          <p>최저 기온: {weather.TMN} °C</p>
          <p>최고 기온: {weather.TMX} °C</p>
        </div>
      )}
    </div>
  );
}
