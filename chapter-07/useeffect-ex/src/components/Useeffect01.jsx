import React, { useState } from "react";

function Checkbox() {
  const [checked, setChecked] = useState(false);

  alert(`checked: ${checked.toString()}`);  // 블럭킹돼서 멈춤 - 화면 렌더링 안됨

  return (
    <>
      <input 
        type="checkbox" 
        value={checked}
        onChange={() => setChecked(checked => !checked)}
      />
      {checked ? "checked" : "not checked"}
    </>
  );
}

export default function Useeffect01() {
  return <Checkbox />;
}