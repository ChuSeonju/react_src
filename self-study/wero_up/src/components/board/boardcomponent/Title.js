import React from "react";

function Title({ onChange, value, id }) {
  return (
    <div>
      <label for={id}>제목</label>
      <input id={id} onChange={onChange} value={value} />
    </div>
  );
}

export default Title;
