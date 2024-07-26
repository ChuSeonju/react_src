// greeting 함수를 선언한 후 콜백 함수로 사용
// 함수 안에서 함수를 호출하는 걸 콜백 함수라고 함

let count = 0;

// function greeting() {
//   count++;
//   console.log("안녕하세요?" + count);
// }

// setInterval(greeting, 2000);

// 직접 함수 선언(화살표 함수) 실행 
setInterval(() => {
  count++;
  console.log("안녕하세요?" + count);
}, 2000); // 영원히 2초마다 출력됨