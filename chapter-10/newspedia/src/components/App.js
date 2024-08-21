import { useEffect, useState } from "react";
import NewsList from "./NewsList";

import { getNews } from "../api";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("aid");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const [items, setItems] = useState([]);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 처리
  const [loadingError, setLoadingError] = useState(null); // 네트웍 오류처리

  const handleNewestClick = () => setOrder("aid");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (aid) => {
    // filter로 뉴스 아이템 삭제하기
    const nextItems = items.filter((item) => item.aid !== aid);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    // 서버에서 정렬한 데이터 받아오기
    let result;
    try {
      setLoadingError(null);
      setIsLoading(true); // 진행중 시작
      result = await getNews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false); // 진행중 종료
    }

    const { paging, news } = result;

    if (options.offset === 0) {
      setItems(news);
    } else {
      setItems((prevItems) => [...prevItems, ...news]);
    }
    setOffset(options.offset + options.limit); // 상세 페이지 카운트 스테이트
    let parsePaging = JSON.parse(paging);
    setHasNext(parsePaging.hasNext);
  };

  // 더보기 버튼 핸들러
  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT });
  };

  // 마운트 시점과 정렬 항목이 바뀔 때 비동기 통신 요청
  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <NewsList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
    </div>
  );
}

export default App;
