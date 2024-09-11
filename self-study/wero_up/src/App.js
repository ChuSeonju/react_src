// import ListItem from "./components/ListItem";
// import { useState, useEffect } from "react";
// import mock from "./mock.json";
// import BoardWriteForm from "./components/board/BoardWriteForm";
// import Button from "./components/Button";
// import BoardListItem from "./components/board/BoardListItem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NaverCallback from "./components/user/usercomponents/NaverCallback";
import Login from "./components/user/LogIn";

function App() {
  // const [userId, setUserId] = useState();

  // useEffect(() => {
  //   const findNick = 13;
  //   const boardData = mock.find((board) => board.nickname === findNick);
  //   setUserId(boardData);
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<NaverCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
