import React, { useEffect, useState } from "react";

function GitHubUser({ login }) {
  // 정상, 진행 중, 에러
  const [data, setData] = useState(); // 정상
  const [error, setError] = useState(); // 에러
  const [loading, setLoading] = useState(false); // 진행 중

  useEffect(() => {
    if (!login) return;
    setLoading(true); // 로딩중 시작
    fetch(`https://api.github.com/users/${login}`)
      .then((data) => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [login]);

  if (loading) return <h1>통신 중.....</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (!data) return null;

  return (
    <div>
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
    </div>
  );
}

export default function App() {
  return <GitHubUser login="moonhighway" />;
}
