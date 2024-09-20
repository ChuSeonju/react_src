import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { deleteContent } from "../Api";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8090/api";

// content 내부에 분리되어 저장된 htmlContent와 Base64img를
// 합쳐서 하나의 contentHtml로 만드는 함수
// <img src="" 을 찾아서 base64와 통째로 교체하기
function contentCombiner(content) {
  let wholeContent = content.htmlContent.replace(/<img src=""/g, () => {
    return `<img src="data:image/jpeg;base64,${content.base64Image.shift()}"`;
  });
  // console.log(wholeContent);
  return wholeContent;
}

const PostingContent = () => {
  const navigate = useNavigate(); // 네비게이터
  const { userLoginId } = useContext(UserContext); // 로그인한 아이디 불러오기
  const { content_id } = useParams();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [html, setHtml] = useState("");

  useEffect(() => {
    // 게시판 컨텐츠 id를 통해 컨텐츠 데이터를 가져옴
    // http://localhost:8090/api/contents/posting?content={}
    const getContent = async () => {
      // axios는 자동으로 JSON을 피싱하므로 .JSON()이 필요없음
      try {
        const response = await axios.get(
          `${BASE_URL}/contents/posting/content?id=${content_id}`
        );
        // console.log(response.data);
        setContent(response.data);
      } catch (error) {
        setError("컨텐츠를 불러오는데 실패했습니다..");
        console.error(error);
      }
    };
    getContent();
  }, [content_id]);

  useEffect(() => {
    if (content) {
      const combinedHtml = contentCombiner(content);
      setHtml(combinedHtml);
    }
  }, [content]);

  // 에러일 때 예외 처리하기
  if (error) {
    return <div>{error}</div>;
  }

  // 서버통신이 원활하지 않을때 처리하기
  if (!content) {
    return <div>로딩 중...</div>;
  }

  // 업데이트 핸들러
  const onUpdate = () => {
    const data = content; // 객체 데이터 전달
    const dataHtml = html;
    navigate("/category/update", { state: { data, dataHtml } });
  };

  // 삭제 핸들러
  const onDelete = () => {
    deleteContent(content.content_id);
    alert("컨텐츠를 삭제했습니다.");
    navigate(`/category/${content.category_number}`); // 이 부분을 컨텐츠 번호를 조절
    window.location.reload(); // 카테고리로 갈때 새로고침되기
  };

  // 컴포넌트 생성
  return (
    <div>
      <h1>{content.title}</h1>
      <p>작성자: {content.user_id}</p>
      <p>수정 날짜: {content.update_day}</p>
      <div
        className="ql-editor" // 이부분이 핵심 innerHTML로 div에 넣은 HTML에 quill에서 입력한 CSS 적용하기
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      {content.user_id === userLoginId ? ( // 작성한 유저와 로그인한 유저가 다를때 수정하기와 삭제하기가 보이지 않음 (뒤로가기만 보임)
        <button onClick={onUpdate}>수정하기</button>
      ) : (
        <Link to={`/category/${content.category_number}`}>
          <button>뒤로가기</button>
        </Link>
      )}
      {content.user_id === userLoginId ? (
        <button onClick={onDelete}>삭제하기</button>
      ) : null}
    </div>
  );
};

export default PostingContent;
