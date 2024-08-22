import React from "react";
import { boardList } from "../data/data";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BoardList = () => {
  return (
    <div className="board-list my-5">
      <h1 className="text-center p-5">게시글 목록</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>
                <Link to={{ pathname: `/view/${b.id}` }}>{b.title}</Link>
              </td>
              <td>{b.writer}</td>
              <td>{b.reg_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end my-2">
        <Link to={`/write`}>
          <Button className="mx-2">작성하기</Button>
        </Link>
      </div>
    </div>
  );
};

export default BoardList;
