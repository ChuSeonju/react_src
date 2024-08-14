import React, { useEffect, useState } from "react";

// 로컬 스토리지에서 정보 읽어올 때
const loadJSON = (key) => key && JSON.parse(localStorage.getItem(key));

// 로컬 스토리지에 GitHub user정보 저장
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function GitHubUser({ login }) {
  const [data, setData] = useState(loadJSON(`user: ${login}`));

  // 로컬 스토리지에 저장 useEffect
  useEffect(() => {
    if (!data) return;
    if (data.login === login) return; // 로컬 스토리지에 저장된 정보와 같은 사용자면 저장할 필요 x. 바로 return
    const { name, avatar_url, location } = data;
    // 로컬 스토리지 저장
    saveJSON(`user: ${login}`, {
      name,
      login,
      avatar_url,
      location,
    });
  }, [data]);

  // 비동기 통신으로 해당 GitHubUser 정보 조회
  useEffect(() => {
    if (!login) return;
    // data 상태값과 로컬 스토리지의 로그인 아이디와 조회하는 로그인 아이디가 같으면 비동기 통신할 필요 x. 바로 return
    if (data && data.login === login) return;
    // 비동기 통신으로 data state 생성
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then(setData)
      .catch(console.error);
  }, [login]);

  // data state가 있으면
  if (data) return <pre>{JSON.stringify(data, null, 2)}</pre>;

  return null;
}

export default function App() {
  return <GitHubUser login="moonhighway" />;
}
