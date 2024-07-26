function multiple(a, b = 5, c = 10) {
  return a * b +c; 
}

console.log(multiple(5, 10, 20)); // a=5, b= 10, c = 20
console.log(multiple(10, 20)); // a=10, b= 20, c = 10
console.log(multiple(10)); // a=10, b=5 c=10
console.log(multiple());  // NULL값으로 들어감
  

// 선언하기 전에 함수 호출
// hey();  // 호이스팅 가능

// //  뒤에서 함수 선언
// function hey() {
//   alert("hey!");
// }


// 함수 표현식 : 지바스크립트 - 이름없는 함수
// 이 문법은 매우 중요함
// 변수에 값을 대입하듯이 함수를 대입해서 사용할 수 있음
// logCompliment(); const 함수 표현식은 호이스팅이 안됨 / 먼소리야


const logCompliment = function() {
  console.log("잘했어요!");
}

logCompliment(); // 걍 익명함수 아닌가?



const logCompliment2 = function(firstName) {
  console.log(`잘했어요! ${firstName}`);
}

logCompliment2('창우'); // 걍 익명함수 아닌가?

const logCompliment3 = function(firstName) {
  return `잘했어요! ${firstName}`;
}

alert(logCompliment3('창우')); // 걍 익명함수 아닌가?