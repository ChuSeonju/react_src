import React, { useState, useEffect, useCallback } from "react";

function Usecallback1() {
  const [number, setNumber] = useState(0);

  // const someFunction = () => {
  //   // 종속 배열 안에 변수 -> 함수가 계속 생성돼서 참조변수 주소값 변경
  //   console.log(`someFunc: number: ${number}`);
  // };

  const someFunction = useCallback(() => {
    console.log(`someFunc: number: ${number}`);
  }, []);

  useEffect(() => {
    console.log("someFunction이 변경되었습니다.");
  }, [someFunction]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <br />
      <button onClick={someFunction}>Call someFunction</button>
    </div>
  );
}

export default Usecallback1;
