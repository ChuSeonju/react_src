import { useState, useRef } from "react";

const AppUseRef = () => {
  const [count, setCount] = useState(0);  // count = 0
  const countRef = useRef(0); // 리턴값이 속성을 current를 가진 객체를 리턴
  console.log('렌더링.....');
  let countVar = 0;
  const increaseVar = () => {
    countVar = countVar + 1;
    console.log('var: ', countVar);
  };

  /* useRef 훅
    State의 변화 - 렌더링 -> 컴포넌트 내부 변수들이 있다면 초기화됨
    Ref의 변화 - no렌더링 -> 변수들의 값이 유지됨
    State의 변화 -> 렌더링 -> 그래도 Ref의 값은 유지됨
    */

  const increaseCountState = () => {
    // let newCnt;
    // newCnt = count + 1;
    // setCount(newCnt);
    setCount(count + 1);
  }

  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log('Ref: ', countRef.current);
  }

  return (
    <div>
      <p>State: {count}</p>
      <p>Ref: {countRef.current}</p>
      <button onClick={increaseCountState}>State올려</button>
      <button onClick={increaseCountRef}>Ref올려</button>
    </div>
  )

};

export default AppUseRef;