import React, { useState } from "react";
import { useEffect } from "react";

function Checkbox() {
  const [checked, setChecked] = useState(false);
  // 렌더링 부수효과로 alert 창 띄움
  useEffect(() => {
    alert(`checked: ${checked.toString()}`);
  });

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

export default function Useeffect03() {
  return <Checkbox />;
}