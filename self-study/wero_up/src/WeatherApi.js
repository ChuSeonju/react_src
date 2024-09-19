export const convertLatLngToGrid = (lat, lon) => {
  // 기상청 API에서 사용하는 좌표체계로 변환하기 위함
  const map = {
    Re: 6371.00877, // 지구 반경 (km)
    grid: 5.0, // 격자 크기 (km)
    slat1: 30.0, // 표준위도 1 (투영 기준)
    slat2: 60.0, // 표준위도 2 (투영 기준)
    olon: 126.0, // 기준 경도 (중심 경도)
    olat: 38.0, // 기준 위도 (중심 위도)
    xo: 43, // X 좌표의 원점
    yo: 136, // Y 좌표의 원점
    first: 0, // 첫 계산 여부 플래그
  };

  const PI = Math.asin(1.0) * 2.0; // PI 값
  const DEGRAD = PI / 180.0; // 도(degree)를 라디안으로 변환하는 상수

  // 지도 변환을 위한 상수 계산
  const re = map.Re / map.grid;
  const slat1 = map.slat1 * DEGRAD;
  const slat2 = map.slat2 * DEGRAD;
  const olon = map.olon * DEGRAD;
  const olat = map.olat * DEGRAD;

  // 지도 변환 계산식
  let sn =
    Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  // 위도 및 경도 변환
  const ra = Math.tan(PI * 0.25 + lat * DEGRAD * 0.5);
  const raCalculated = (re * sf) / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;

  if (theta > PI) theta -= 2.0 * PI;
  if (theta < -PI) theta += 2.0 * PI;

  theta *= sn;

  // 격자 좌표로 변환
  const x = Math.floor(raCalculated * Math.sin(theta) + map.xo + 0.5);
  const y = Math.floor(ro - raCalculated * Math.cos(theta) + map.yo + 0.5);

  return { nx: x, ny: y }; // 변환된 격자 좌표 반환
};

export const getCurrentDate = () => {
  // 현재 날짜를 YYYYMMDD 형식으로 반환하기 위함
  const now = new Date();
  const year = now.getFullYear(); // 현재 연도
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 현재 월 (0부터 시작하므로 1을 더함)
  const date = String(now.getDate()).padStart(2, "0"); // 현재 일

  return `${year}${month}${date}`; // YYYYMMDD 형식으로 반환
};

export const getCurrentHour = () => {
  // 현재 시간을 HHmm 형식으로 반환하기 위함
  const now = new Date();
  return now.getHours() * 100; // 현재 시각을 HHmm 형식으로 반환
};

export const getCurrentBaseTime = () => {
  // 기상청 API의 예측시간에 가장 가까운 시간을 찾음
  const timeBlocks = [
    "0200",
    "0500",
    "0800",
    "1100",
    "1400",
    "1700",
    "2000",
    "2300",
  ]; // 기상청 API에서 사용하는 기본 시각 구간

  const updateTimeBlocks = [310, 610, 910, 1210, 1510, 1810, 2110, 2410];
  // 각 시각 구간의 업데이트 시각인데 업데이트 첫번째 데이터가 한시간 뒤라서 한시간을 더 더함
  // ex.) 0200 업데이트 첫번째 데이터 fcstTime이 0300임

  const now = new Date();
  const currentMinutes = now.getHours() * 100 + now.getMinutes(); // 현재 시간 분 계산

  let baseTime;
  let baseDate = getCurrentDate(); // 현재 날짜 계산

  if (currentMinutes < 200) {
    // 자정 이전에는 전날의 23:00을 기준으로 설정
    baseTime = "2300";
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const date = String(yesterday.getDate()).padStart(2, "0");
    baseDate = `${year}${month}${date}`;
  } else {
    // 현재 시간에 가장 가까운 기본 시각을 설정
    baseTime = timeBlocks[0];
    for (let i = 0; i < timeBlocks.length; i++) {
      if (currentMinutes < updateTimeBlocks[i]) {
        baseTime = timeBlocks[i - 1] || timeBlocks[0];
        break;
      }
      baseTime = timeBlocks[i];
    }
  }

  return { baseTime, baseDate }; // 기본 시각과 날짜 반환
};

export const findClosestFcstValue = (items, category, targetTime) => {
  // 주어진 예측 데이터에서 목표 시간과 가장 가까운 값 찾기 위함
  let closestItem = null;
  let minDiff = Number.MAX_VALUE; // 최소 차이값을 무한대로 초기화

  items.forEach((item) => {
    if (item.category === category) {
      const fcstTime = parseInt(item.fcstTime, 10);
      const diff = Math.abs(fcstTime - targetTime); // 예측 시간과 목표 시간의 차이 계산

      if (diff < minDiff) {
        minDiff = diff;
        closestItem = item; // 차이가 가장 작은 예측 값 선택
      }
    }
  });

  return closestItem ? closestItem.fcstValue : null; // 가장 가까운 예측 값을 반환
};

export const fetchWeather = async (lat, lng, setWeather) => {
  // 받아온 위경도로 해당 위치의 날씨 정보 가져오기 위함
  try {
    const { nx, ny } = convertLatLngToGrid(lat, lng); // 위도, 경도를 격자 좌표로 변환
    const { baseTime, baseDate } = getCurrentBaseTime(); // 기본 시각과 날짜 계산

    console.log("nx:" + nx + " ny:" + ny);
    console.log("baseTime:" + baseTime);
    console.log("baseDate:" + baseDate);

    const API_KEY =
      "WXHtcvFrkFPssVR%2Fmf0ka3DL3OY2OmoV5kAASB50TZTcwaidSftVlW5mmW7yd7mLci%2FY6OSztvcaUVijo2%2BB9g%3D%3D"; // API 키 (실제 환경에서는 보안에 유의)

    // 1. TMN(최저 기온)과 TMX(최고 기온) 값 가져오기 - baseTime을 항상 0200으로 설정
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

    // 2. 나머지 값들 가져오기 - baseTime을 유동적으로 설정
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

      tmp = findClosestFcstValue(items, "TMP", currentTime); // 현재 시간에 가장 가까운 기온(TMP) 값 찾기
      pop = findClosestFcstValue(items, "POP", currentTime); // 현재 시간에 가장 가까운 강수확률(POP) 값 찾기
      reh = findClosestFcstValue(items, "REH", currentTime); // 현재 시간에 가장 가까운 습도(REH) 값 찾기
      wsd = findClosestFcstValue(items, "WSD", currentTime); // 현재 시간에 가장 가까운 풍속(WSD) 값 찾기
    } else {
      console.error("API 응답에서 데이터를 찾을 수 없습니다."); // API 응답에서 데이터를 찾을 수 없는 경우 에러 메시지 출력
    }

    // 3. 날씨 상태 업데이트
    setWeather({
      TMP: tmp,
      POP: pop,
      REH: reh,
      WSD: wsd,
      TMN: tmn,
      TMX: tmx,
    }); // 가져온 날씨 데이터를 setWeather 함수로 업데이트
  } catch (error) {
    console.error("날씨 정보 가져오기 실패:", error); // 에러 발생 시 콘솔에 에러 메시지 출력
    setWeather(null); // 에러 발생 시 날씨 상태를 null로 설정
  }
};
