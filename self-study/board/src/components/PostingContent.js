import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

const BASE_URL = "http://localhost:8090/api";

// content 내부에 분리되어 저장된 htmlContent와 Base64img를
// 합쳐서 하나의 contentHtml로 만드는 함수
// <img src="" 을 찾아서 base64와 통째로 교체하기
function contentCombiner(content) {
  let wholeContent = content.htmlContent.replace(/<img src=""/g, () => {
    return `<img src="data:image/jpeg;base64,${content.base64Image.shift()}"`;
  });
  console.log(wholeContent);
  return wholeContent;
}

const PostingContent = () => {
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
        console.log(response.data);
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

  // 컴포넌트 생성
  return (
    <div>
      <h1>{content.title}</h1>
      <p>수정 날짜: {content.update_day}</p>
      <div
        className="ql-editor" // 이부분이 핵심 innerHTML로 div에 넣은 HTML에 quill에서 입력한 CSS 적용하기
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
};

export default PostingContent;
