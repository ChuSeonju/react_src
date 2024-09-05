// import ListItem from "./components/ListItem";
import { useState, useEffect } from "react";
import mock from "./mock.json";
import BoardWriteForm from "./components/board/BoardWriteForm";
import Button from "./components/Button";
import BoardListItem from "./components/board/BoardListItem";

function App() {
  const [userId, setUserId] = useState();

  useEffect(() => {
    const findNick = 13;
    const boardData = mock.find((board) => board.nickname === findNick);
    setUserId(boardData);
  }, []);

  return (
    <>
      <BoardListItem />
      {/* {userId ? <BoardWriteForm board={userId} /> : <p>s</p>} */}
    </>
  );
}

export default App;
