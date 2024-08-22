import React from "react";
import { useParams, Link } from "react-router-dom";
import { boardList } from "../data/data";
import { Row, Col, Button, Card } from "react-bootstrap";

const BoardView = () => {
  const { id } = useParams();

  const idx = boardList.findIndex((b) => b.id === Number(id));

  console.log(`path id: ${id}`);
  console.log(`idx: ${idx}`);
  const board = boardList[idx];

  console.log(board);

  return (
    <div>
      <Row className="my-5">
        <Col className="px-5">
          <h1 className="my-5" text-center>
            {board.id}번 게시글 정보
          </h1>

          <div className="text-end my-2">
            <Link to={{ pathname: `/modify/${id}` }}>
              <Button className="btn-sm mx-2">수정</Button>
            </Link>
            <Button className="btn-sm" variant="danger">
              삭제
            </Button>
          </div>

          <div>
            <Card>
              <Card.Body>
                <h5>
                  [{board.id}] {board.title}
                </h5>
                <hr />
                <div className="cArea">{board.contents}</div>
              </Card.Body>
              <Card.Footer>
                Created on {board.reg_date} by {board.writer}
              </Card.Footer>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BoardView;
