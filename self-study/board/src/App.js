import WriteBoard from "./components/WriteBoard";
import PostingContent from "./components/PostingContent";
import PostList from "./components/PostList";
import Home from "./components/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category_number" element={<PostList />} />
          <Route path="/category/write" element={<WriteBoard />} />
          <Route
            path="/category/update"
            element={<WriteBoard update={true} />}
          />
          <Route
            path="/category/contents/:content_id"
            element={<PostingContent />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
