import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const BoardWrite = () => {
  return (
    <div>
      <Row className="my-5">
        <Col className="p-5">
          <h1 className="text-center my-5">게시글 작성</h1>
          <Form>
            <h4>제목</h4>
            <Form.Control
              placeholder="제목을 입력하세요"
              className="my-3"
              name="title"
            />
            <h4>작성자</h4>
            <Form.Control
              placeholder="작성자를 입력하세요"
              className="my-3"
              name="writer"
            />
            <h4>내용</h4>
            <Form.Control
              as="textarea"
              rows={10}
              placeholder="내용을 입력하세요"
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
export default BoardWrite;
