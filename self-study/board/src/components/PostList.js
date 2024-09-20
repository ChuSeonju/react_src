import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";

const BASE_URL = "http://localhost:8090/api";

// 카테고리 정보 배열
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
  // 추가 카테고리들
];

const PostList = () => {
  const { userLoginId } = useContext(UserContext); // 로그인한 아이디 불러오기
  const { category_number } = useParams(); // 이전 라우터 home에서 url에서 1을 가져옴
  const location = useLocation(); // 라우터로 이동했을때 새로고침을 함

  // 타이틀 데이터를 받아오는 JSON 파일
  const [listsJSON, setListsJson] = useState();
  const [error, setError] = useState(null);

  // 선택된 카테고리 정보 가져오기
  const selectedCategory = categories.find(
    (category) => category.number === parseInt(category_number, 10)
  );

  // salestype 변환 함수
  const getSaleTypeLabel = (type) => {
    switch (type) {
      case "sell":
        return "팝니다";
      case "buy":
        return "삽니다";
      case "reservation":
        return "예약중";
      default:
        return "";
    }
  };

  useEffect(() => {
    const getList = async () => {
      try {
        // axios는 JSON을 자동으로 인스턴스화 해줌
        const response = await axios.get(
          `${BASE_URL}/contents/lists/category?name=${category_number}`
        );
        console.log(response.data);
        setListsJson(response.data);
      } catch (error) {
        setError("리스트를 가져오는데 실패했습니다...");
        console.error(error);
      }
    };
    getList();
  }, [category_number, location.pathname]); // 여기 로케이션이 변할때 useEffect로 다시 데이터 불러옴

  // 에러처리
  if (error) {
    return <div>{error}</div>;
  }

  // 서버통신이 원활하지 않을때 처리하기
  if (!listsJSON) {
    return <div>로딩 중...</div>;
  }

  return (
    <div key={location.pathname}>
      {/* 카테고리 번호에 따른 제목 렌더링 */}
      <h1>{selectedCategory ? selectedCategory.name : "카테고리 없음"}</h1>
      <ul style={{ listStyleType: "none" }}>
        {listsJSON.map((list, index) => (
          <li key={list.content_id}>
            <Link to={{ pathname: `/category/contents/${list.content_id}` }}>
              {/* 카테고리가 중고장터(9번)일 때와 아닐 때 구분하여 렌더링 */}
              {category_number === "9" ? (
                <>
                  {index + 1} | {getSaleTypeLabel(list.salestype)}{" "}
                  {/* 삽니다 / 팝니다 */} | {list.title} | {list.price}원 |{" "}
                  {list.update_day}
                </>
              ) : (
                <>
                  {index + 1} | {list.title} | {"작성자:" + list.user_id} |{" "}
                  {list.update_day}
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <Link to={`/category/write`}>
        <button type="button">글쓰기</button>
      </Link>
    </div>
  );
};

export default PostList;
