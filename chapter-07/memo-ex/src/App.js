import React, { useState, useMemo, useCallback } from "react";
import Child from "./Child";

function App() {
  const [parentAge, setParentAge] = useState(0);
  const [childAge, setChildAge] = useState(0);

  const incrementParentAge = () => {
    setParentAge(parentAge + 1);
  };
  const incrementChildAge = () => {
    setChildAge(childAge + 1);
  };
  console.log("부모 컴포넌트가 렌더링이 되었습니다.");

  const job = useMemo(() => {
    {
      name: "학생";
    }
  }, []);

  const tellMe = useCallback(() => {
    console.log("길동love");
  }, []);

  return (
    <div style={{ border: "2px solid navy", padding: "10px" }}>
      <h1>부모</h1>
      <p>age: {parentAge}</p>
      <button onClick={incrementParentAge}>부모 나이 증가</button>
      <button onClick={incrementChildAge}>자녀 나이 증가</button>
      <Child name={"홍길동"} age={childAge} job={job} tellMe={tellMe} />
    </div>
  );
}

export default App;
