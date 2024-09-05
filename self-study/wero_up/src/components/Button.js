import React from "react";
import "./Button.css";

const Button = ({ onClick, children, onSubmit }) => {
  return (
    <button onClick={onClick} onSubmit={onSubmit} className="button">
      {children}
    </button>
  );
};

export default Button;

// 스타일 적용
