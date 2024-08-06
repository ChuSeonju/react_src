import React, { useEffect, useRef } from "react";

const AppUseRefDOM = () => {
  const inputRef = useRef();
  // useRef 변수 두번째 사용처는 DOM객체에
  // ref속성으로 연결해서 직접 접근 가능
  useEffect(()=>{
    console.log(inputRef);
    inputRef.current.focus();
    inputRef.current.value = "11";
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="userId"/>
      <button>로그인</button>
    </div>
  );
};

export default AppUseRefDOM;