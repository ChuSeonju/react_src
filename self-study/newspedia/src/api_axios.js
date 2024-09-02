import axios from "axios";

const BASE_URL = "http://localhost:8090/api";

export async function getNews({ order = "aid", offset = 0, limit = 6 }) {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: { order, offset, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error("뉴스를 불러오는데 실패했습니다.");
  }
}

export async function createNews(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/news`, formData);
    return response.data;
  } catch (error) {
    throw new Error("뉴스를 생성하는데 실패했습니다.");
  }
}

export async function updateNews(aid, formData) {
  try {
    const response = await axios.post(`${BASE_URL}/news/${aid}`, formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("updateError", error);
    // console.log(response.data);
    throw new Error("뉴스를 수정하는데 실패했습니다.");
  }
}

export async function deleteNews(aid) {
  try {
    const response = await axios.post(`${BASE_URL}/news/del/${aid}`);
    return response.data;
  } catch (error) {
    throw new Error("뉴스를 삭제하는데 실패했습니다.");
  }
}

export async function getNewsById(aid) {
  try {
    const response = await axios.get(`${BASE_URL}/news/${aid}`);
    return response.data;
  } catch (error) {
    throw new Error("뉴스를 불러오는데 실패했습니다.");
  }
}
