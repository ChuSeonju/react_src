import React, { useEffect, useMemo, useState } from "react";

export default function Usememo2() {
  const [number, setNumber] = useState(0);
  const [isKorea, setIsKorea] = useState(true);

  // location 변수 : 의존 관계를 깊이 검사하기
  //                  의존 배열 값이 원시타입이냐 참조타입이냐를 명확히 해야함

  // const location = isKorea ? "한국" : "외국"; // 참조변수 : 문자열 값 - 리터럴이라 렌더링 계속해도 안 바뀜
  // location 변수가   객체 - 참조변수가 메모리 주소를 참조
  // const location = {
  //   country: isKorea ? '한국' : '외국',
  // }

  const location = useMemo(() => {
    return { country: isKorea ? "한국" : "외국" };
  }, [isKorea]); // isKorea 값이 안 바뀌면 그 전의 값 그대로 가져와

  useEffect(() => {
    console.log("useEffect 호출");
  }, [location]);

  return (
    <div>
      <h2>하루에 몇끼 먹어요?</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <hr />
      <h2>어느나라에 있어요?</h2>
      <p>나라: {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
    </div>
  );
}
