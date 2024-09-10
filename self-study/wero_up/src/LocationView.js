import Button from "./components/Button";
import { getPosSuccess } from "./LocationApi";
import { fetchWeather } from "./WeatherApi";

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

export const LocationView = () => {
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
};
