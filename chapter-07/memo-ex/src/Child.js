import React, { memo } from "react";

const Child = ({ name, age, job, tellMe }) => {
  console.log("자녀도 렌더링이 되었습니다.");
  return (
    <div style={{ border: "2px solid powderblue", padding: "10px" }}>
      <h3>자녀</h3>
      <p>name: {name}</p>
      <p>age: {age}살</p>
      <p>{job}</p>
      <p>{tellMe}</p>
    </div>
  );
};

export default memo(Child);
