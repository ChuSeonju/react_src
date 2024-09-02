// components/App.js

import { useEffect, useState } from "react";
import NewsList from "./news/NewsList";
import NewsForm from "./news/NewsForm";
import { getNews, createNews, updateNews, deleteNews } from "../api_axios";
import { Link } from "react-router-dom";
import  {Menu } from './home/Home';

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("aid");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const [items, setItems] = useState([]);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const handleNewestClick = () => setOrder("aid");
  const handleBestClick = () => setOrder("rating");

  const handleDelete = async (aid) => {
    try {
      await deleteNews(aid); // Ensure deleteNews is awaited
      setItems((prevItems) => prevItems.filter((item) => item.aid !== aid));
    } catch (error) {
      console.error("Error deleting news", error);
    }
  };

  const handleLoad = async (options) => {
    try {
      setLoadingError(null);
      setIsLoading(true);
      const result = await getNews(options);
      const { paging, news } = result;

      if (options.offset === 0) {
        setItems(news);
      } else {
        setItems((prevItems) => [...prevItems, ...news]);
      }
      setOffset(options.offset + options.limit);
      setHasNext(JSON.parse(paging).hasNext);
    } catch (error) {
      setLoadingError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (news) => {
    setItems((prevItems) => [news, ...prevItems]);
  };

  const handleUpdateSuccess = (news) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.aid === news.aid);
      return [
        ...prevItems.slice(0, splitIdx),
        news,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <Menu/>
      <div>
        <button>
          <Link Link to="/">home</Link>
        </button>
      </div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <NewsForm onSubmit={createNews} onSubmitSuccess={handleCreateSuccess} />
      <NewsList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={updateNews}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
