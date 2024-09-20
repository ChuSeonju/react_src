import axios from "axios";
const BASE_URL = "http://localhost:8090/api";

// 게시판에 글을 작성해서 저장함
// http://localhost:8090/api/contents/upload
export async function uploadContent(contentJson) {
  // console.log(contentJson);
  try {
    const response = await axios.post(
      `${BASE_URL}/contents/upload`,
      contentJson,
      {
        // 헤더 설정을 통해 한글이 깨지지 않게 함
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    const body = response.data;
    return body;
  } catch (error) {
    throw new Error("컨텐츠를 저장하는데 실패했습니다.");
  }
}

// 컨텐츠 삭제
export async function deleteContent(content_id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/contents/delete?id=${content_id}`
    );
    const body = response.data;
    return body;
  } catch (error) {
    throw new Error("컨텐츠를 삭제하는데 실패했습니다.");
  }
}

// 컨텐츠 업데이트
export async function updateContent(contentJson, content_id) {
  console.log("컨텐츠아이디", content_id);
  console.log("html데이터", contentJson);
  try {
    const response = await axios.post(
      `${BASE_URL}/contents/update/${content_id}`,
      contentJson,
      {
        // 헤더 설정을 통해 한글이 깨지지 않게 함
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    const body = response.data;
    return body;
  } catch (error) {
    throw new Error("컨텐츠를 업데이트하는데 실패했습니다.");
  }
}
