import React, { useReducer } from "react";

const reducer = (number, newNumber) => number + newNumber;

function Numbers() {
  const [number, dispatch] = useReducer(reducer, 0);

  return <h1 onClick={() => dispatch(1)}>{number}</h1>;
}

export default function Usereducer04() {
  return <Numbers />;
}
