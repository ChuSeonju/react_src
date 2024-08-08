import { useState } from "react";

const heavyWork = () => {
  console.log('엄청 오래 걸리는 초기화 작업');
  return ['JAVA', 'ORACLE'];
}

export default function TodoList() {
  const [names, setNames] = useState(() => {  // 콜백함수 /렌더링 할 때마다 무거운 초기화 작업이 돌아가면 비효율적이니까
    return heavyWork(); 
  });
  //const [names, setNames] = useState(['JAVA', 'ORACLE']);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    // setter함수를 이용해 input 텍스트박스 입력값 input 상태변수에 대입
    setInput(e.target.value);
  }

  console.log(input);

  const handleUpload = () => {
    // names = names.add(input); //이러면 안되는겨
    setNames((prevState) => {
      console.log(prevState);
      return [...prevState, input]; // 전개(...) 해야 기존 데이터를 바꾸는게 아니라 복사해서 쓰는 개념?
    }) // prevState가 names 상태값을 가지고 있음
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange}/>
      <button onClick={handleUpload}>Upload</button>
      {
        names.map((name, idx) => {
          return <p key={idx}>{name}</p>;
        })
      }
    </div>
  );
}