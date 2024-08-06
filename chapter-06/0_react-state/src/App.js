import { useState } from "react";

function App() {
/* 리액트 훅(hook)
  함수형 컴포넌트에서 상태(state)와 생명주기(lifecycle) 기능을 
  사용할 수 있도록 해주는 함수

  리액트 생명주기(React LifeCycle): 리액트 컴포넌트가 **[화면]**에 나타나고,
  업데이트(수정) 되고, 최종적으로 사라지는 과정에서 발생하는 일련의 이벤트들을 의미함
*/
  const [time, setTime] = useState(1); // 리턴값 배열[state변수, setter함수]
  // time -  상태변수(state)
  console.log('업데이트');

  const handleClick = () => {
    let newTime;  // 지역 변수
    if (time >= 12) { // 12에서 13으로 증가 시점
      newTime = 1;
    } else {
      newTime = time + 1;
    } 
    setTime(newTime); // time = time + 1
    console.log(time);
  };
  return (
    <div>
      <span>현재 시각 {time}시</span>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

export default App;
