import axios from "axios";
const BASE_URL = "http://localhost:8090/api";

// 게시판에 글을 작성해서 저장함
// http://localhost:8090/api/contents/upload
export async function uploadContent(contentJson) {
  console.log(contentJson);
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
