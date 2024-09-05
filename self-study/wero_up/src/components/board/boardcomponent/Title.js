import React from "react";

function Title({ onChange, value }) {
  return (
    <div>
      <input onChange={onChange} value={value} />
    </div>
  );
}

export default Title;
