import { useState, useEffect } from "react";
// import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const AddressMap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areaAddress, setAreaAddress] = useState(""); // 지역 주소 (시, 도 등)
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소 (도로명, 건물명 등)
  const [map, setMap] = useState(null); // 지도 객체 상태
  const [marker, setMarker] = useState(null); // 마커 객체 상태

  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    setMap(map); // 지도 객체를 상태에 저장
  }, []);

  const handleComplete = (data) => {
    // Kakao Maps API가 로드되었는지 확인합니다.
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      alert("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    // Geocoder 객체를 생성합니다.
    const geocoder = new window.kakao.maps.services.Geocoder();

    if (!geocoder) {
      console.error("Geocoder 객체를 생성할 수 없습니다.");
      return;
    }

    const fullAddress = data.address;
    let extraAddress = "";

    // 주소 유형이 도로명 주소인 경우 추가 정보를 포함합니다.
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
    }

    // 지역 주소와 상세 주소 분리
    const areaAddress = `${data.sido} ${data.sigungu}`.trim(); // '시, 도' + '시, 군, 구'
    const detailAddress = fullAddress.replace(areaAddress, "").trim(); // 지역 주소를 제외한 나머지 주소

    setAreaAddress(areaAddress);
    setDetailAddress(
      detailAddress + (extraAddress !== "" ? ` (${extraAddress})` : "")
    );

    // 주소를 좌표로 변환하여 지도에 마커로 표시
    geocoder.addressSearch(fullAddress, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        if (marker) {
          // 이전 마커가 있으면 제거
          marker.setMap(null);
        }

        const newMarker = new window.kakao.maps.Marker({
          position: coords,
          map: map,
        });

        setMarker(newMarker);
        map.setCenter(coords);
      } else {
        console.error("Geocoding 실패: " + status);
      }
    });

    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpenModal}>
        주소 찾기
      </button>

      {isModalOpen && (
        <div>
          <DaumPostcode
            onComplete={handleComplete}
            width={380}
            height={500}
            autoClose={true}
            style={{ padding: "10px" }}
          />
          <button onClick={handleCloseModal}>닫기</button>
        </div>
      )}

      <div>
        지역 주소: {areaAddress}
        <br />
        상세 주소: {detailAddress}
      </div>

      <div>
        <div id="map" style={{ width: "100%", height: "400px" }} />
      </div>
    </div>
  );
};

export default AddressMap;
