import React, { useState, useEffect } from "react";
import Button from "./components/Button";

export default function LocationApi() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [weather, setWeather] = useState(null);

  const convertLatLngToGrid = (lat, lon) => {
    const map = {
      Re: 6371.00877,
      grid: 5.0,
      slat1: 30.0,
      slat2: 60.0,
      olon: 126.0,
      olat: 38.0,
      xo: 43,
      yo: 136,
      first: 0,
    };

    const PI = Math.asin(1.0) * 2.0;
    const DEGRAD = PI / 180.0;

    const re = map.Re / map.grid;
    const slat1 = map.slat1 * DEGRAD;
    const slat2 = map.slat2 * DEGRAD;
    const olon = map.olon * DEGRAD;
    const olat = map.olat * DEGRAD;

    let sn =
      Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    let ro = Math.tan(PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);

    const ra = Math.tan(PI * 0.25 + lat * DEGRAD * 0.5);
    const raCalculated = (re * sf) / Math.pow(ra, sn);
    let theta = lon * DEGRAD - olon;

    if (theta > PI) theta -= 2.0 * PI;
    if (theta < -PI) theta += 2.0 * PI;

    theta *= sn;

    const x = Math.floor(raCalculated * Math.sin(theta) + map.xo + 0.5);
    const y = Math.floor(ro - raCalculated * Math.cos(theta) + map.yo + 0.5);

    return { nx: x, ny: y };
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");

    return `${year}${month}${date}`;
    // return "20240909";
  };

  const getCurrentHour = () => {
    const now = new Date();
    return now.getHours() * 100; // HHmm 형식으로 반환
    // return 130;
  };

  const getCurrentBaseTime = () => {
    const timeBlocks = [
      "0200",
      "0500",
      "0800",
      "1100",
      "1400",
      "1700",
      "2000",
      "2300",
    ];
    const updateTimeBlocks = [310, 610, 910, 1210, 1510, 1810, 2110, 2410]; // 업데이트 시각

    const now = new Date();
    const currentMinutes = now.getHours() * 100 + now.getMinutes();
    // const currentMinutes = 130;

    let baseTime;
    let baseDate = getCurrentDate(); // 현재 날짜를 기본으로 설정
    // let baseDate = "20240909";

    // 02:00 이전이라면 전날의 23:00 데이터를 사용
    if (currentMinutes < 200) {
      baseTime = "2300";
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const year = yesterday.getFullYear();
      const month = String(yesterday.getMonth() + 1).padStart(2, "0");
      const date = String(yesterday.getDate()).padStart(2, "0");
      // baseTime = "2300";
      // baseDate = "20240908";
      baseDate = `${year}${month}${date}`; // 전날로 날짜를 설정
    } else {
      baseTime = timeBlocks[0];
      for (let i = 0; i < timeBlocks.length; i++) {
        if (currentMinutes < updateTimeBlocks[i]) {
          baseTime = timeBlocks[i - 1] || timeBlocks[0];
          break;
        }
        baseTime = timeBlocks[i];
      }
    }

    return { baseTime, baseDate };
  };

  const findClosestFcstValue = (items, category, targetTime) => {
    let closestItem = null;
    let minDiff = Number.MAX_VALUE;

    items.forEach((item) => {
      if (item.category === category) {
        const fcstTime = parseInt(item.fcstTime, 10);
        const diff = Math.abs(fcstTime - targetTime);

        if (diff < minDiff) {
          minDiff = diff;
          closestItem = item;
        }
      }
    });

    return closestItem ? closestItem.fcstValue : null;
  };

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

  const fetchWeather = async (lat, lng) => {
    try {
      const { nx, ny } = convertLatLngToGrid(lat, lng);
      const { baseTime, baseDate } = getCurrentBaseTime();

      console.log("nx:" + nx + " ny:" + ny);
      console.log("baseTime:" + baseTime);
      console.log("baseDate:" + baseDate);

      const API_KEY =
        "WXHtcvFrkFPssVR%2Fmf0ka3DL3OY2OmoV5kAASB50TZTcwaidSftVlW5mmW7yd7mLci%2FY6OSztvcaUVijo2%2BB9g%3D%3D";

      // 1. TMN과 TMX 값 구하기 - baseTime을 항상 0200으로 설정
      const baseTimeForTMNAndTMX = "0200";
      const responseForTMNAndTMX = await fetch(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&numOfRows=200&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTimeForTMNAndTMX}&nx=${nx}&ny=${ny}`
      );
      const jsonDataForTMNAndTMX = await responseForTMNAndTMX.json();
      console.log("TMN, TMX 응답 데이터:", jsonDataForTMNAndTMX);

      let tmn = null;
      let tmx = null;

      if (jsonDataForTMNAndTMX.response?.body?.items?.item) {
        const items = jsonDataForTMNAndTMX.response.body.items.item;
        tmn = findClosestFcstValue(items, "TMN", 600); // TMN은 0600 고정
        tmx = findClosestFcstValue(items, "TMX", 1500); // TMX는 1500 고정
      } else {
        console.error("TMN, TMX 데이터를 찾을 수 없습니다.");
      }

      // 2. 나머지 값들 구하기 - baseTime을 유동적으로 설정
      const response = await fetch(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&numOfRows=200&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`
      );
      const jsonData = await response.json();
      console.log("전체 응답 데이터:", jsonData);

      let tmp = null;
      let pop = null;
      let reh = null;
      let wsd = null;

      if (jsonData.response?.body?.items?.item) {
        const items = jsonData.response.body.items.item;
        const currentTime = getCurrentHour(); // 현재 시간 (HHmm 형식)

        tmp = findClosestFcstValue(items, "TMP", currentTime);
        pop = findClosestFcstValue(items, "POP", currentTime);
        reh = findClosestFcstValue(items, "REH", currentTime);
        wsd = findClosestFcstValue(items, "WSD", currentTime);
      } else {
        console.error("API 응답에서 데이터를 찾을 수 없습니다.");
      }

      // 3. 날씨 상태 업데이트
      setWeather({
        TMP: tmp,
        POP: pop,
        REH: reh,
        WSD: wsd,
        TMN: tmn,
        TMX: tmx,
      });
    } catch (error) {
      console.error("날씨 정보 가져오기 실패:", error);
      setWeather(null);
    }
  };

  const handleWeatherCheck = () => {
    if (marker) {
      const markerPosition = marker.getPosition();
      const lat = markerPosition.getLat();
      const lng = markerPosition.getLng();
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
