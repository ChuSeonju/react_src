import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import { parseStringPromise } from "xml2js"; // xml2js 라이브러리

export default function LocationApi() {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [weather, setWeather] = useState(null);
  // 1) 카카오맵 불러오기
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

      // 지도 클릭 이벤트 리스너 추가
      window.kakao.maps.event.addListener(
        kakaoMap,
        "click",
        function (mouseEvent) {
          const latlng = mouseEvent.latLng;
          kakaoMarker.setPosition(latlng);
          logMarkerPosition(); // 마커 위치를 로그에 출력
        }
      );

      // 마커 위치 변경 시 호출할 함수
      function logMarkerPosition() {
        const markerPosition = kakaoMarker.getPosition();
        console.log(
          "마커 위치 - 위도: " +
            markerPosition.getLat() +
            ", 경도: " +
            markerPosition.getLng()
        );
      }

      // 마커의 위치를 변경할 때마다 logMarkerPosition 호출
      window.kakao.maps.event.addListener(
        kakaoMarker,
        "dragend",
        logMarkerPosition
      );

      // 마커 드래그 가능하도록 설정
      kakaoMarker.setDraggable(true);
    });
  }, []);

  // 2) 현재 위치 함수
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

  // 3) 정상적으로 현재위치 가져올 경우 실행
  const getPosSuccess = (pos) => {
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude // 경도
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
        ); //소수점 반올림
      }
    }
  };

  // 날씨 정보 요청 함수
  const fetchWeather = async (lat, lng) => {
    try {
      // const apiKey =
      //   "WXHtcvFrkFPssVR/mf0ka3DL3OY2OmoV5kAASB50TZTcwaidSftVlW5mmW7yd7mLci/Y6OSztvcaUVijo2+B9g=="; // 기상청 API 키
      const response = await fetch(
        // `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst
        // ?serviceKey=${apiKey}
        // &numOfRows=1&pageNo=1&dataType='JSON'&base_date=20240906&base_time=1300&nx=${lat}&ny=${lng}`
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=WXHtcvFrkFPssVR/mf0ka3DL3OY2OmoV5kAASB50TZTcwaidSftVlW5mmW7yd7mLci/Y6OSztvcaUVijo2+B9g==&numOfRows=10&pageNo=1&base_date=20240906&base_time=0600&nx=55&ny=127`
      );

      const xmlText = await response.text(); // 응답을 텍스트로 읽기
      const jsonData = await parseStringPromise(xmlText); // XML을 JSON으로 변환

      console.log("날씨 정보:", jsonData);
      setWeather(jsonData);
    } catch (error) {
      console.error("날씨 정보 가져오기 실패:", error);
    }
  };

  // 날씨 확인 버튼 클릭 핸들러
  const handleWeatherCheck = () => {
    if (marker) {
      const markerPosition = marker.getPosition();
      const lat = markerPosition.getLat(); // 위도
      const lng = markerPosition.getLng(); // 경도
      fetchWeather(lat, lng);
    } else {
      alert("마커가 설정되지 않았습니다.");
    }
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <Button onClick={getCurrentPosBtn}>현재 위치</Button>

      <Button onClick={handleWeatherCheck}>날씨 확인</Button>
      {weather && (
        <div>
          <h2>날씨 정보</h2>
          <p>위도: {weather.lat}</p>
          <p>경도: {weather.lng}</p>
          {/* <p>현재 온도: {weather.current.temp_c} °C</p>
          <p>날씨: {weather.current.condition.text}</p> */}
        </div>
      )}
    </div>
  );
}
