import React from "react";
import { useParams } from "react-router-dom";
import { boardList } from "../data/data";
import { Row, Col, Form, Button } from "react-bootstrap";

const BoardModify = () => {
  const { id } = useParams();

  const idx = boardList.findIndex((b) => b.id === Number(id));
  const board = boardList[idx];

  console.log(board);

  return (
    <div>
      <Row className="my-5">
        <Col className="p-5">
          <h1 className="text-center my-5">게시글 수정</h1>
          <Form>
            <h4>제목</h4>
            <Form.Control
              placeholder={board.title}
              className="my-3"
              name="title"
            />
            <h4>작성자</h4>
            <Form.Control
              placeholder={board.writer}
              className="my-3"
              name="writer"
            />
            <h4>내용</h4>
            <Form.Control
              as="textarea"
              rows={10}
              placeholder={board.contents}
              className="my-3"
              name="contents"
            />
            <div className="text-center">
              <Button className="mx-2 px-3 btn-sm">저장</Button>
              <Button className="mx-2 px-3 btn-sm" variant="secondary">
                초기화
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default BoardModify;
