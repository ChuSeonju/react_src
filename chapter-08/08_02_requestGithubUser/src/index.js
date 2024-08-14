const BASE_URL = "http://localhost:8090/api";

async function requestGithubUser(githubLogin) {
  try {
    const response = await fetch(`https://api.github.com/users/${githubLogin}`);
    // const response = await fetch(`${BASE_URL}`/news/${githubLogin}
    const userData = await response.json();
    console.log(userData);
  } catch (error) {
    console.error(error);
  }
}

// 데이터 생성 : POST  변경할 때 : PUT
/*
입력 컴포넌트 폼
const formData = new FormData();
formData.append("title", "뉴스제목데이터");
formData.append("dt", "2024-08-14");
formData.append("content", "뉴스내용데이터");
formData.append("img", "imgFile");


export async function createNews(formdata)
  const response = await(`${BASE_URL}`/news, {
    method: "POST",
    body: formdata
  })

  if(!response.ok) {
    throw new Error("뉴스를 등록하는데 실패했소")
  }
  const body = await response.json();
  return body;

  }


*/

requestGithubUser("moonhighway");
// requestGithubUser("1");
