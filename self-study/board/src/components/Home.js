import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { number: 1, name: "소모임 육아" },
  { number: 2, name: "소모임 여행" },
  { number: 3, name: "소모임 등산" },
  { number: 4, name: "소모임 술" },
  { number: 5, name: "소모임 동물" },
  { number: 6, name: "소모임 게임" },
  { number: 7, name: "소모임 연예" },
  { number: 8, name: "소모임 스포츠" },
  { number: 9, name: "중고장터" },
  // 다른 카테고리를 추가할 수 있음
];

const Home = () => {
  return (
    <div>
      <h1>WWERO 메인 홈페이지</h1>
      {categories.map((category) => (
        <div key={category.number}>
          <Link to={`/category/${category.number}`}>{category.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
