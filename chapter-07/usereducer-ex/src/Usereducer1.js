import React, { useReducer, useState } from "react";

const ACTION_TYPES = {
  plus: "deposit",
  minus: "withdraw",
};

const reducer = (state, action) => {
  console.log("reducer가 일을 합니다.", state, action);
  switch (action.type) {
    case ACTION_TYPES.plus:
      return state + action.payload;
    case ACTION_TYPES.minus:
      return state - action.payload;
    default:
      return state;
  }
};

export default function Usereducer1() {
  const [number, setNumber] = useState(0);
  const [money, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h2>useReducer 은행에 오신것을 환영합니다.</h2>
      <p>잔고: {money}원</p>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
        step="1000"
      />
      <button
        onClick={() => {
          dispatch({ type: ACTION_TYPES.plus, payload: number });
        }}
      >
        예금
      </button>
      <button
        onClick={() => {
          dispatch({ type: ACTION_TYPES.minus, payload: number });
        }}
      >
        출금
      </button>
    </div>
  );
}
