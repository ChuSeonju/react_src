import React, { useState, useEffect, useCallback } from "react";
// import { Map, Marker } from "react-kakao-maps-sdk";
import Button from "./components/Button";

export default function LocationApi() {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

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
        }
      );
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
      }
    }
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <Button onClick={getCurrentPosBtn}>현재 위치</Button>
    </div>
  );
}
