import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

function Cat({ name }) {
  return (
    <>
      <h1>고양이 이름은 {name} 입니다.</h1>
      <p>이 고양이는 예뻐요.</p>
    </>
  );
}

const product = "MacBook";
const model = " Air";
// jsx에서는 가급적 간단하게 가독성 좋게 하는 걸 지향
const item = product.toUpperCase() + model;
const imageUrl =
"https://i.namu.wiki/i/ttd2VtbULFYOJj84zGBRUYlYG7TYY-8oaKesut3CKfTLVcjL5GdQ6DO6JqOe_y4Vg69y-d08lkIA3FzP5JWwHAlk26xL7obtE9WhdwnpT4gV-64_h8OEozYXbwdTUmxY6L_339LIvq53uXfUDrBWBQ.webp";

function handleClick(e) {
  alert('곧 도착합니다!');
}

const WINS = {
  rock : 'scissor', // 이기는 조건의 정답값
  scissor : 'paper',
  paper : 'rock'
}
// WINS.rock : === WINS['rock']  / 각괄호로 접근하면 공백 있는 값 불러올 수 있음

function getResult(me, other) {
  // WINS['rock']
  if(WINS[me] === other) return "승리";
  else if(me === WINS[other]) return "패배";
  return "무승부";
}
const me = "rock";
const other = "scissor";
const result = getResult(me, other);

// 매우매우 중요: JSX에서는 자바스크립트를 {중괄호} 안에 사용할 수 있다.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <h1>나만의 {item} 주문하기</h1>
    <img src={imageUrl} alt="제품사진" />
    <button onClick={handleClick}>확인</button>
    <h2>{result}</h2>
    <h2>{WINS.rock}</h2>
    <h2>{WINS['rock']}</h2>
  </>
);
// root.render(
//     <Cat name="나비" />
// );
