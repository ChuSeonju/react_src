import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import { fetchWeather } from "./WeatherApi"; // WeatherApi.js의 fetchWeather 함수를 불러옵니다.

export default function LocationApi() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          37.47678518773601,
          126.87954257577638
        ),
        level: 3,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);

      const kakaoMarker = new window.kakao.maps.Marker({
        map: kakaoMap,
        position: options.center,
      });
      setMarker(kakaoMarker);

      window.kakao.maps.event.addListener(
        kakaoMap,
        "click",
        function (mouseEvent) {
          const latlng = mouseEvent.latLng;
          kakaoMarker.setPosition(latlng);
          logMarkerPosition();
        }
      );

      function logMarkerPosition() {
        const markerPosition = kakaoMarker.getPosition();
        console.log(
          "마커 위치 - 위도: " +
            markerPosition.getLat() +
            ", 경도: " +
            markerPosition.getLng()
        );
      }

      window.kakao.maps.event.addListener(
        kakaoMarker,
        "dragend",
        logMarkerPosition
      );
      kakaoMarker.setDraggable(true);
    });
  }, []);

  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };

  const getPosSuccess = (pos) => {
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude
    );
    if (map) {
      map.panTo(currentPos);
      if (marker) {
        marker.setPosition(currentPos);
        console.log(
          "현재 마커 위치 - 위도: " +
            currentPos.getLat() +
            ", 경도: " +
            currentPos.getLng()
        );
      }
    }
  };

  const handleWeatherCheck = () => {
    if (marker) {
      const markerPosition = marker.getPosition();
      const lat = markerPosition.getLat();
      const lng = markerPosition.getLng();
      fetchWeather(lat, lng, setWeather); // WeatherApi.js의 fetchWeather 함수를 호출합니다.
    } else {
      alert("마커가 설정되지 않았습니다.");
    }
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <Button onClick={getCurrentPosBtn}>현재위치</Button>
      <Button onClick={handleWeatherCheck}>날씨확인</Button>
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
