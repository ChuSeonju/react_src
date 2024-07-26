// greeting 함수를 선언한 후 콜백 함수로 사용
// 함수 안에서 함수를 호출하는 걸 콜백 함수라고 함

let count = 0;

let timer = setInterval(() => { // 이 값을 timer라는 변수에 넣어줌
  count++;
  console.log("안녕하세요?" + count);
  if(count === 3){ // 3번 하고 그만하도록
    clearInterval(timer); 
  }
}, 2000); 



