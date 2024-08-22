import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardList from "./BoardList";
import BoardWrite from "./BoardWrite";
import BoardView from "./BoardView";
import BoardModify from "./BoardModify";

const BoardMain = () => {
  return (
    <div className="board-main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/write" element={<BoardWrite />} />
          <Route path="/view/:id" element={<BoardView />} />
          <Route path="/modify/:id" element={<BoardModify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default BoardMain;
