const factor = 5;
// 함수 선언
function calc() {
  return num * factor; // 에러 not define num
}

{
  const num = 10; // const, let은 블록 범위 한정
  let result = calc();
  // console.log("result : " + result);
  console.log(`result : ${result}`);
}