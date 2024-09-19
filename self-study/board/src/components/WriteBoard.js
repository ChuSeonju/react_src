import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import "react-quill/dist/quill.snow.css";
import { uploadContent } from "../Api";
import { useNavigate } from "react-router-dom";

// 이미지 사이즈 조절과 정렬 하는 라이브러리를 Quill에 추가하기
Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

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

// HTML 태그와 이미지를 나눠주는 함수
function contentDivider(contentValue, title, category_number) {
  // 객체로 저장하는 변수
  let content = {
    category_number: category_number, // 임의의 카테코리 넘버 ex.) 소모임 - 육아
    title: "",
    htmlContent: "",
    base64Image: [],
  };

  let startImgTag = 0;
  let lastImgTag = 0;

  // Base64 이미지의 인덱스를 찾고 이미지 부분만 잘라내서 Base64Image에 저장해줌
  while (true) {
    startImgTag = contentValue.indexOf("base64", lastImgTag);
    if (startImgTag === -1) {
      break;
    }
    lastImgTag = contentValue.indexOf(`" width`, startImgTag);
    content.base64Image.push(contentValue.slice(startImgTag + 7, lastImgTag));
  }

  // HTML 태그에서 이미지 부분을 공백으로 모두 대체하여 HTML 태그만 추출하여 htmlCotent에 저장함
  content.base64Image.forEach((str) => {
    contentValue = contentValue.replace("data:image/jpeg;base64," + str, "");
  });
  content.htmlContent = contentValue; // HTML태그 추가
  content.title = title; // 제목추가

  return content;
}

// 게시판 글 작성 컴포넌트
const WriteBoard = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [categoryNumber, setCategoryNumber] = useState(categories[0].number); // 기본 카테고리 상태
  const [price, setPrice] = useState(""); // 가격 상태 추가
  let contentObj = {};

  // 이벤트 핸들러
  // 이미지와 HTML태그를 분리하여 이미지는 리스트, HTML태그는 문자열로 객체에 저장함
  const onSubmit = () => {
    contentObj = contentDivider(value, title, categoryNumber); // 카테고리 넘버전달 (추가)
    contentObj.price = categoryNumber === 9 ? price : null; // 중고장터일 경우에만 가격을 포함
    const contentJson = JSON.stringify(contentObj); // 객체를 json 형태로 변환
    // console.log(contentJson); // 확인용
    uploadContent(contentJson); // API로 전달

    alert("글이 등록되었습니다.");
    navigate(`/category/${categoryNumber}`); // 이 부분을 컨텐츠 번호를 조절
    window.location.reload(); // 카테고리로 갈때 새로고침되기
  };

  const formats = [
    "size",
    "color",
    "align",
    "indent",
    "bold",
    "list",
    "italic",
    "underline",
    "strike",
    "align",
    "float",
    "height",
    "width",
    "image",
    "link",
    "clean",
  ]; // 이미지의 사이즈 조절을 위한 formats
  const modules = {
    // 이미지의 사이즈 조절을 위한 모듈 추가
    imageActions: {},
    imageFormats: {},

    // 툴바 속성
    toolbar: [
      [{ size: [] }],
      [{ color: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      ["image"],
      ["link"],
      [{ indent: "+1" }, { indent: "-1" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  // 컴포넌트 반환
  return (
    <div>
      <div>
        Title:{" "}
        <input
          type="text"
          placeholder="제목을 입력하세요"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {/*중고장터 셀렉트박스, 가격 추가?*/}
        <hr />
        <select
          value={categoryNumber}
          onChange={(e) => {
            setCategoryNumber(Number(e.target.value));
          }}
        >
          {categories.map((category) => (
            <option key={category.number} value={category.number}>
              {category.name}
            </option>
          ))}
        </select>
        {/* 카테고리가 9번일 때만 셀렉트박스와 가격 인풋박스 표시 */}
        {categoryNumber === 9 && (
          <div>
            <select>
              <option value="sell">팝니다</option>
              <option value="buy">삽니다</option>
            </select>
            <br />
            <label>상품 선택:</label>
            <select>
              <option value="electronics">전자제품</option>
              <option value="furniture">가구</option>
              <option value="electronics">의류</option>
            </select>
            <br />
            <label>가격:</label>
            <input
              type="text"
              placeholder="가격을 입력하세요"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        )}
        <hr />
        <ReactQuill
          style={{ height: "500px", width: "800px" }}
          modules={modules}
          formats={formats}
          // theme="snow"
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
          placeholder="여기에 글을 입력해주세요!"
        />
      </div>
      <div>
        <br />
        <br />
        <button type="button" onClick={onSubmit}>
          글 등록하기
        </button>
      </div>
    </div>
  );
};

export default WriteBoard;
